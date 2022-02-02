const { json } = require('express');
var express = require('express');
var fs = require('fs');
const path = require('path');
var readimage = require("readimage");
const SeriesGenre = require('../controllers/SeriesGenre');

var router = express.Router();
const { episodeModel } = require("../models/episodeModel");




router.get("/GetSeries", async (req, res) => {
    let defaultImg;
    let location;
    let seriesData = []; //Series data array
    let genres = await episodeModel.distinct('genre', {});// gets the genres from the db
    let data = await episodeModel.find({});//gets the data from db
    genres.map((genre) => {

        seriesData.push(new SeriesGenre(genre));
    });
    data.forEach((obj) => {
        defaultImg = "Empty_Img.png";
        location = 'G:/Movies&Series/Series';// Series location on hard drive
        if (obj.image != defaultImg)
            location = obj.location;

        let bitImg = fs.readFileSync(location + '/' + obj.image);//gets the image data in binery
        objImg = new Buffer.from(bitImg).toString("base64");//convert tthe image from base 2 to base 64

        dataJson = {
            location: obj.location, //the data location 
            image: objImg,//img in base 64
            name: obj.name, //movie name
            genre: obj.genre
        };
        seriesData.forEach((seriesGenre) => {

            if (obj.genre.includes(seriesGenre.genre)) {
                console.log(obj.genre.includes(seriesGenre.genre));
                seriesGenre.MoviesListUpdater(dataJson);
            }
        });

    });
    console.log(seriesData);
    res.json(seriesData);//sending response
});
module.exports = router;


router.get("/episodes/:location", async (req, res) => {

    let path = req.params.location; // video location from parameter
    path = path.replace("location=", "");
    path = path.replaceAll("+", " ");// cleaning the the path

    const stat = fs.statSync(path);// acccessing the video
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(path, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);

    }

});
module.exports = router;