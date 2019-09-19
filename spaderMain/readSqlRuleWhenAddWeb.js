var express = require('express');
var fs=require('fs');
var path=require('path');
var router = express.Router();
var conf=require('./rule')
/* GET users listing. */
var index=1;
router.get('/submitspiderrule', function(req, res, next) {
    // index++
   let {site,selector,title,time,href}=req.body||req.query;
    conf.push({'site':site,selector:selector,title:title,time:time,href:href})
   console.log(conf);
    res.json(req.body)
});


module.exports = router;
