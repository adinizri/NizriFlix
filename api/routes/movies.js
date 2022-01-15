const { json } = require('express');
var express = require('express');
var fs = require('fs');
var readimage = require("readimage");

var router = express.Router();
const { movieModel } = require("../models/movieModel");



router.get("/", async (req, res) => {
    let filedata = [];
    let data = await movieModel.find({});
    console.log(data);
    // obje = JSON.parse(data);
    data.forEach((obj) => {
        let bitImg = fs.readFileSync(obj.location + '/' + obj.image);
        objImg = new Buffer.from(bitImg).toString("base64");
        filedata.push(objImg);
        // readimage(img, function (err, image) {
        //     if (err) {
        //         console.log("failed to parse the image");
        //         console.log(err);
        //     }
        //     console.log(image);
        //     filedata.push(image);
        // });

    });


    // filedata.forEach(fImage => {
    //     readimage(fImage, function (err, image) {
    //         if (err) {
    //             console.log("failed to parse the image");
    //             console.log(err);
    //         }
    //         console.log(image);
    //     });


    // });


    console.log(filedata);

    res.json(filedata);


});
module.exports = router;