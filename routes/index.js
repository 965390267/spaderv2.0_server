var express = require('express');
var router = express.Router();
// var models = require('../dbmodel/db.js');
var mysql = require('../dbmodel/mysqldb.js');



router.all('/getlist/rule_list', function (req, res, next) {//获取各个网站爬取的数据
  var pageSize = req.body.pageSize || 20; //一页多少条
  var currentPage = req.body.currentPage || 1;  //当前第几页
  var skipnum = (currentPage - 1) * pageSize;   //跳过数
  // "SELECT * from spader order by submittime desc  limit "+ skipnum+","+pageSize
  mysql.query("SELECT COUNT(*) FROM spader", function (results, fields) {
    var count = fields[0]['COUNT(*)'];
    mysql.query("SELECT * from spader order by submittime desc  limit " + skipnum + "," + pageSize, function (results, fields) {
      res.json({ data: fields, count: count ,code:200,msg:'查询成功',status:'success'});
    })
  })
});


router.all('/getlist/spider_rule', function (req, res, next) {//获取各个网站爬取的规则
  var pageSize = req.body.pageSize || 20; //一页多少条
  var currentPage = req.body.currentPage || 1;  //当前第几页
  var skipnum = (currentPage - 1) * pageSize;   //跳过数
  // "SELECT * from spader order by submittime desc  limit "+ skipnum+","+pageSize
  mysql.query("SELECT COUNT(*) FROM spider_rule", function (results, fields) {
    var count = fields[0]['COUNT(*)'];
    mysql.query("SELECT * from spider_rule order by submittime desc  limit " + skipnum + "," + pageSize, function (results, fields) {
      res.json({ data: fields, count: count ,code:200,msg:'查询成功',status:'success'});
    })
  })
});


module.exports = router;
