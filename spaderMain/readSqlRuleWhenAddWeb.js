var express = require('express');

var router = express.Router();
var conf=require('./rule')
/* GET users listing. */
router.get('/submitspiderrule', function(req, res, next) {
    // index++
   let {site,selector,title,time,href}=req.body||req.query;
    conf.push({'site':site,selector:selector,title:title,time:time,href:href})
    res.json(req.body)
});


module.exports = router;

