// var models = require('./db.js');mongodb数据库操作方法
var mysql = require('./mysqldb.js'); //mysql数据库操作方法
var sendDD = require('../dingdingsend/index');
function save(content) {
      mysql.query("INSERT INTO spader(title,oid,site,MainSelector,TitleSelector,TimeSelector,time,charset,href,address,area,submittime,ddtoken) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)", [content.title, content.oid, content.site,content.MainSelector,content.TitleSelector,content.TimeSelector,content.time,content.charset, content.href, content.from,content.area, +new Date(),content.ddtoken], function (results, fields) {
        if (results) {
          sendDD({
            "text": content.title + content.from,
            "title": content.time+" "+"所有信息总览地址http://spider.91yunshi.com/list.html?area="+decodeURIComponent( content.area),
            "messageUrl": content.href
          },content.ddtoken); //发送到钉钉         
        } 
      });
}
module.exports = save;