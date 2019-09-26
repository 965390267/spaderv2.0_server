// var models = require('./db.js');mongodb数据库操作方法
var mysql = require('./mysqldb.js'); //mysql数据库操作方法
var sendDD = require('../dingdingsend/index');
function save(content,cb) {
      
      mysql.query("INSERT INTO spider_rule(site,MainSelector,TitleSelector,TimeSelector,area,charset,submittime,remarks) VALUES(?,?,?,?,?,?,?,?)", [content.site, content.MainSelector, content.TitleSelector, content.TimeSelector, content.area,content.charset, +new Date(),remarks], function (results, fields) {   

            cb&&cb(results,fields)
      });
}
module.exports = save;