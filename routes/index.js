var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/viewer', function(req,res,next){
  res.render('viewer',{doc:req.query.pol})
})

module.exports = router;
