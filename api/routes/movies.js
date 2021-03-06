const { json } = require('express');
var express = require('express');
var fs = require('fs');
const path = require('path');
var readimage = require("readimage");
const MoviesGenre = require('../controllers/MoviesGenre');

var router = express.Router();
const { movieModel } = require("../models/movieModel");




router.get("/GetMovies", async (req, res) => {
    let defaultImg;
    let location;
    let moviesDataByGenres = []; //movies data array in every genre
    let genres = await movieModel.distinct('genre', {});// gets the genres from the db
    let data = await movieModel.find({});//gets the data from db
    genres.map((genre) => {

        moviesDataByGenres.push(new MoviesGenre(genre));
    });
    data.forEach((obj) => {
        defaultImg = "Empty_Img.png";
        imageLocation = 'G:/Movies&Series/Movies';
        if (obj.image != defaultImg)
            imageLocation = obj.location;

        let bitImg = fs.readFileSync(imageLocation + '/' + obj.image);//gets the image data in binery
        objImg = new Buffer.from(bitImg).toString("base64");//convert tthe image from base 2 to base 64

        movieDataJson = {
            location: obj.location, //the video location 
            image: objImg,//img in base 64
            name: obj.name, //movie name
            genre: obj.genre
        };
        moviesDataByGenres.forEach((movieGenre) => {

            if (obj.genre.includes(movieGenre.genre)) {
                console.log(obj.genre.includes(movieGenre.genre));
                movieGenre.ListUpdater(movieDataJson);
            }
        });

    });
    console.log(moviesDataByGenres);
    res.json(moviesDataByGenres);//sending response
});
module.exports = router;


router.get("/movie/:location", async (req, res) => {
    // const path = 'G:/Movies&Series/Movies/Genres/Black Panther/Black Panther.mp4';
    let path = req.params.location;
    path = path.replace("location=", "");
    path = path.replaceAll("+", " ");

    const stat = fs.statSync(path);
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