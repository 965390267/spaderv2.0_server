var express = require('express');
var router = express.Router();
// var models = require('../dbmodel/db.js');
var mysql = require('../dbmodel/mysqldb.js');
let conf=require('../spiderMain/rule')
/* *********************************爬虫规则列表的获取，删除，修改操作***************************************** */
router.all('/getlist/rule_list', function (req, res, next) {//获取网站爬取中的数据

  var pageSize = req.body.pageSize || 20; //一页多少条

  var currentPage = req.body.currentPage || 1;  //当前第几页

  var skipnum = (currentPage - 1) * pageSize;   //跳过数

  let newArr=conf.slice(skipnum,skipnum+pageSize);

if(conf.length<pageSize){
  newArr=conf
}
  res.json({ data: newArr, count: newArr.length ,code:200,msg:'查询成功',status:'success'});
});

router.all('/deletelist/rule_list', function (req, res, next) {//根据id删除网站爬虫列表

  let id = req.body.id; //id
    mysql.query("DELETE  from spider_rule where id="+id, function (results, fields) {
      if(fields){
       for (let index = 0; index < conf.length; index++) {
        if(conf[index].id==id){
            conf.splice(index,1)
        }
       }
      res.json({ data: null ,code:200,msg:'删除成功',status:'success'});
     }else{
      res.json({ data: null ,code:400,msg:'删除失败',status:'false'});
     }
    })

});
router.all('/editlist/rule_list', function (req, res, next) {//编辑网站爬虫列表
  let {id,update} = req.body; //id
  let str=''
  let updateParse=JSON.parse(update)
    for (const key in updateParse) {//需要删除的字段，提交之后变成字符串
      str+=key+'='+'\''+updateParse[key]+'\''+','
    }
    str=str.replace(/,$/,'')
    mysql.query(`update  spider_rule set ${str} where id=${id}`, function (results, fields) {
      if(fields){
        for (let index = 0; index < conf.length; index++) {
          if(conf[index].id==id){
              Object.assign(conf[index],updateParse)
          }
         }
      res.json({ data: conf ,code:200,msg:'编辑成功',status:'success'});
     }else{
      res.json({ data: null ,code:400,msg:'编辑失败',status:'false'});
     }
    })
});
/* *********************************爬虫规则列表的获取，删除，修改操作***************************************** */
/* 

*/
/* *********************************爬虫列表的获取，删除，修改操作***************************************** */
router.all('/getlist/spider_list', function (req, res, next) {//获取各个网站爬虫列表

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
 
router.all('/deletelist/spider_list', function (req, res, next) {//根据id删除网站爬虫列表

  let id = req.body.id; //id
    mysql.query("DELETE  from spader where id="+id, function (results, fields) {
      if(fields){
      res.json({ data: null ,code:200,msg:'修改成功',status:'success'});
     }else{
      res.json({ data: null ,code:400,msg:'修改失败',status:'false'});
     }
    })

});
router.all('/editlist/spider_list', function (req, res, next) {//编辑网站爬虫列表
  let {id,update} = req.body; //id
  let str=''
  let updateParse=JSON.parse(update)
    for (const key in updateParse) {//需要删除的字段，提交之后变成字符串
      str+=key+'='+'\''+updateParse[key]+'\''+','
    }
    str=str.replace(/,$/,'')
    mysql.query(`update  spader set ${str} where id=${id}`, function (results, fields) {
      if(fields){
      res.json({ data: null ,code:200,msg:'删除成功',status:'success'});
     }else{
      res.json({ data: null ,code:400,msg:'删除失败',status:'false'});
     }
    })
});

module.exports = router;
