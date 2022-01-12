var express = require('express');
var router = express.Router();
const { movieModel } = require("../models/movieModel");



router.get("/", async (req, res) => {

    let data = await movieModel.find({});
    console.log(data);
    res.json(data);
});
module.exports = router;