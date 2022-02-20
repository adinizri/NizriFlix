const mongoose = require("mongoose");

const episodeSchema = new mongoose.Schema({

    location: { type: String },
    seriesName: { type: String },
    episodeName: { type: String },
    episodeTitle: { type: String },
    seriesLocation: { type: String },
    episode: { type: String },
    season: { type: String },


});

const episodeModel = mongoose.model("Episode", episodeSchema, "Episodes");

exports.episodeModel = episodeModel;