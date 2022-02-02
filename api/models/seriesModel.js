const mongoose = require("mongoose");

const seiresSchema = new mongoose.Schema({

    image: { type: String },
    name: { type: String },
    location: { type: String },
    genre: { type: Array }

});

const seriesModel = mongoose.model("Series", seiresSchema, "Series");

exports.seriesModel = seriesModel;