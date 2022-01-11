
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({
        "test1": "movies Work"
    });

});

module.exports = router;
