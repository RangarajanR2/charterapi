var express = require('express');
var router = express.Router();
var mongo = require('../db/mongo');

/* GET home page. */
router.get('/', function (req, res, next) {
    mongo.add('chartData', { name: 'Hello', uniqId: id() }).then((data) => {
        console.log(data);
        res.render('index', { title: 'Express' });
    })
});

router.get('/chart/:chartId', function (req, res, next) {
    res.render('chart',{chartId:req.params.chartId});
})

router.post('/newChart', function (req, res, next) {
    let chart = req.body.chart;
    let chartType = chart.type;
    let config = chart.config;
    //Do something
    let data = mongo.add('chartData', chart);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data.ops[0].uniqId));
});

router.post('/data/:chartId', function (req, res, next) {
    let uniqId = req.params.chartId;
    mongo.findOne('chartData',{ uniqId: uniqId }).then((doc) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(doc));
    })
})

function id() {
    let possChars = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
    let id = "";
    for (let i = 0; i < 6; i++) {
        id += possChars.charAt(Math.random() * (possChars.length - 1));
    }
    return id;
}


module.exports = router;
