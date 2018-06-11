var express = require('express');
var router = express.Router();
var mongo = require('../db/mongo');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('date',{options:req.params});
});

module.exports = router;
