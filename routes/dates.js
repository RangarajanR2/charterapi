var express = require('express');
var router = express.Router();
var mongo = require('../db/mongo');

/* GET home page. */
router.get('/', function (req, res, next) {
    // console.log({param:req});
    res.render('date',{param:req.query});
});

module.exports = router;
