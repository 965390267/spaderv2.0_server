// var models = require('./db.js');mongodb数据库操作方法
var mysql = require('./mysqldb.js'); //mysql数据库操作方法
var sendDD = require('../dingdingsend/index');
function save(content,cb) {
      console.log(content);
      console.log(typeof content.ddtoken);
      
      mysql.query("INSERT INTO spider_rule(site,MainSelector,TitleSelector,TimeSelector,area,charset,submittime,remarks,ddtoken) VALUES(?,?,?,?,?,?,?,?,?)", [content.site, content.MainSelector, content.TitleSelector, content.TimeSelector, content.area,content.charset, +new Date(),content.remarks,content.ddtoken], function (results, fields) {   

            cb&&cb(results,fields)
      });
}
module.exports = save;