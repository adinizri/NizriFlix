const { json } = require('express');
var express = require('express');
var fs = require('fs');
const path = require('path');
var readimage = require("readimage");

var router = express.Router();
const { movieModel } = require("../models/movieModel");



router.get("/moviesData", async (req, res) => {
    let moviesData = []; //movies data array
    let data = await movieModel.find({});//gets the data from db
    data.forEach((obj) => {
        let bitImg = fs.readFileSync(obj.location + '/' + obj.image);//gets the image data in binery
        objImg = new Buffer.from(bitImg).toString("base64");//convert tthe image from base 2 to base 64

        dataJson = {
            location: obj.location, //the data location 
            image: objImg,//img in base 64
            name: obj.name //movie name
        };
        moviesData.push(dataJson);
    });
    res.json(moviesData);//sending response
});
module.exports = router;


router.get("/movie/:location", async (req, res) => {
    // const path = 'G:/Movies&Series/Movies/all/Black Panther/Black Panther.mp4';
    let path = req.params.location;
    path = path.replace("location=", "");
    path = path.replaceAll("+", " ");
    // let data = await movieModel.find({ name: moveiName });
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