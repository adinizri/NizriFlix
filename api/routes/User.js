const { json } = require('express');
var express = require('express');
const User = require('../controllers/MoviesGenre');

var router = express.Router();
const { userModel } = require("../models/userModel");

