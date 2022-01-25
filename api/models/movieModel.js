const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({

    image: { type: String },
    name: { type: String },
    location: { type: String },
    genre: { type: String }

});

const movieModel = mongoose.model("Movie", movieSchema, "Movies");

exports.movieModel = movieModel;