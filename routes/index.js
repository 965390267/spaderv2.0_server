var express = require('express');
var router = express.Router();
// var models = require('../dbmodel/db.js');
var mysql = require('../dbmodel/mysqldb.js');

router.all('/api', function (req, res, next) {//获取各个网站爬取的数据
  var pageSize = req.body.pageSize || 20; //一页多少条
  var currentPage = req.body.currentPage || 1;  //当前第几页
  var skipnum = (currentPage - 1) * pageSize;   //跳过数
  // "SELECT * from spader order by submittime desc  limit "+ skipnum+","+pageSize
  mysql.query("SELECT COUNT(*) FROM gz_data", function (results, fields) {
    var count = fields[0]['COUNT(*)'];
    mysql.query("SELECT * from gz_data order by submittime desc  limit " + skipnum + "," + pageSize, function (results, fields) {
      res.send({ data: fields, count: count });
    })
  })
});

router.all('/submit/web/rule', function (req, res, next) {//获取各个网站爬取的数据
  var pageSize = req.body.pageSize || 20; //一页多少条
  var currentPage = req.body.currentPage || 1;  //当前第几页
  var skipnum = (currentPage - 1) * pageSize;   //跳过数
  // "SELECT * from spader order by submittime desc  limit "+ skipnum+","+pageSize
  mysql.query("SELECT COUNT(*) FROM gz_data", function (results, fields) {
    var count = fields[0]['COUNT(*)'];
    mysql.query("SELECT * from gz_data order by submittime desc  limit " + skipnum + "," + pageSize, function (results, fields) {
      res.send({ data: fields, count: count });
    })
  })
});




module.exports = router;
