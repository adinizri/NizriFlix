const { json } = require('express');
var express = require('express');
var fs = require('fs');
const path = require('path');
var readimage = require("readimage");
const Season = require('../controllers/Season');
const Series = require('../controllers/Series');
const SeriesGenre = require('../controllers/SeriesGenre');
var router = express.Router();
const { episodeModel } = require("../models/episodeModel");
const { seriesModel } = require("../models/seriesModel");




router.get("/GetSeries", async (req, res) => {
    let defaultImg;
    let location;
    let seriesDataByGenre = []; //Series data array
    let genres = await seriesModel.distinct('genre', {}); //gets the genres from the db
    let SeriesDbData = await seriesModel.find({}); //gets the data from db
    episodesDbData = await episodeModel.find();
    genres.map((genre) => {

        seriesDataByGenre.push(new SeriesGenre(genre));
    });
    SeriesDbData.map((s) => {
        series = new Series(s.name, s.genre);
        for (let i = 1; i < s.seasons; i++) {

            season = new Season(s.name, i);
            seasonEpisodes = episodesDbData.filter(epi => epi.seriesName == s.name && epi.season == i);
            season.EpisodesUpdater(seasonEpisodes);
            series.SeasonsUpdater(season);

        }




        defaultImg = "Empty_Img.png";
        location = 'G:/Movies&Series/Series';// Series location on hard drive

        if (s.image != defaultImg)
            location = s.location;

        let bitImg = fs.readFileSync(location + '/' + s.image);//gets the image data in binery
        sImg = new Buffer.from(bitImg).toString("base64");//convert tthe image from base 2 to base 64

        // dataJson = {
        //     location: s.location, //the video location 
        //     image: sImg,//img in base 64
        //     name: s.name, //movie name
        //     genre: s.genre,
        //     seasons: JSON.stringify(series.GetSeasons)
        // };
        series.SetImage(sImg);
        seriesDataByGenre.forEach((seriesGenre) => {

            if (s.genre.includes(seriesGenre.genre)) {
                seriesGenre.ListUpdater(series);
            }
        });
    });



    //res.json(seriesDataByGenre);//sending response

    res.json(seriesDataByGenre);


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