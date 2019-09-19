// var models = require('./db.js');mongodb数据库操作方法
var mysql = require('./mysqldb.js'); //mysql数据库操作方法
var sendDD = require('../dingdingsend/index');

function save(content) {

      // mysql.query("INSERT INTO gz_data(title,oid,time,href,address,submittime) VALUES(?,?,?,?,?,?)", [content.title, content.oid, content.time, content.href, content.from, +new Date()], function (results, fields) {
      //   if (results) {
      //     sendDD({
      //       "text": content.title + content.from,
      //       "title": content.time+" "+"所有信息总览地址http://39.105.130.42:3002/",
      //       "messageUrl": content.href
      //     }); //发送到钉钉
         
      //   }
    
      // });

  //   mysql.query("SELECT * from spader WHERE oid=" + content.oid, function (err,results, fields) {
  // console.log(err);
  //     if (typeof fields == 'undefined') {

  //   }
  // });
  // models.spader.find({oid:content.oid},function(err,data){//先查询是否存在，存在就不重复存储
  //    if(err){
  //     console.log('err');  
  //    }    
  //     if(!data.length){
  //       var newAccount = new models.spader(content);     
  //       // 保存数据newAccount数据进mongoDB
  //       newAccount.save((err, res) => {
  //           if (err) {
  //             console.log(err);  
  //           } 
  //           if(res) {

  //             sendDD({
  //                 "text": content.title+content.from,
  //                 "title": content.time,
  //                 "messageUrl": content.href
  //               });//发送到钉钉

  //           }
  //       });
  //     }

  // })

}
module.exports = save;