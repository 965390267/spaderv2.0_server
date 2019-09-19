var express = require('express');
var fs=require('fs');
var path=require('path');
var router = express.Router();

/* GET users listing. */
router.get('/api', function(req, res, next) {
  const html = fs.readFileSync('../index.html', 'utf-8')
  res.send();
});

module.exports = router;
