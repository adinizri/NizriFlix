const mongoose = require("mongoose");

const episodesSchema = new mongoose.Schema({

    location: { type: String },
    seriesName: { type: String },
    episodeName: { type: String },
    episode: { type: Number },
    season: { type: Number },


});

const episodesSchema = mongoose.model("episodes", episodesSchema, "Episodes");

exports.episodesSchema = episodesSchema;