const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({

    id: { type: Number },
    name: { type: String },
    imageColor: { type: String }

});

const usersModel = mongoose.model("User", usersSchema, "Users");

exports.usersModel = usersModel;