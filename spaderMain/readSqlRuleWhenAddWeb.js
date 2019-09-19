var express = require('express');
var fs=require('fs');
var path=require('path');
var router = express.Router();
var conf=require('./rule')
/* GET users listing. */
var index=1;
router.get('/testread', function(req, res, next) {
    index++
    console.log(conf);
    conf.push({'name':Math.random(),age:index})
//   const html = fs.readFileSync('../index.html', 'utf-8')
  res.send();
});


module.exports = router;
