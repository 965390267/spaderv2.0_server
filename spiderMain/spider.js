var schedule = require('node-schedule');//定时任务模块
// var fetch=require('./fetch');//所有请求的任务同步返回
//爬虫任务列表，直接从本地内存中取，避免不必要的读取操作数据库，只有提交了爬虫规则的时候才从数据库读出更新任务列表
var analysis = require('./ruleanalysis')//对爬虫输入的规则的参数进行处理，
var request = require('../utils/request.js');//请求库模块
var saveDate = require('../dbmodel/save')
var mysql = require('../dbmodel/mysqldb');
var conf = require('./rule')
function spider() {
  console.log('start');
   initDateBase();//初始化数据库
  //  var rule2  = new schedule.RecurrenceRule();  //定时启动爬虫开始抓取
  // var times2    = [1,10,20,30,40,50,60];  
  // rule2.minute  = times2;  
  //每分钟的第30秒定时执行一次:
  var rule1 = new schedule.RecurrenceRule();
  var times1 = [1, 12, 24, 34, 42, 52, 59];
  rule1.second = times1;
  schedule.scheduleJob(rule1, function(){  
    Main()//定时启动main函数
  });   
}
function Main(){
let cloneConfObj=Object.assign({},conf)
  if (cloneConfObj.length > 0) {
    for (let index = 0; index < cloneConfObj.length; index++) {
      request(cloneConfObj[index].charset || 'utf', cloneConfObj[index].site).then(ret => {
 
        analysis(ret, cloneConfObj[index], function (result) {
          // console.log(result);
          // if (currentMonth == month && currentDay == day) {
          //   saveDate({
          //     title: title, //获取到标题
          //     href: 'http://rsj.zunyi.gov.cn' + href,
          //     // oid:'http://www.ynjy.cn'+time,
          //     oid: encodeURI(title.slice(0, 15)) + time,
          //     time: time2,
          //     from: from,
          //     area: area
          //   });//保存进数据库
          // }
        })
      })
    }
  }
}

function initDateBase(){
  mysql.query("SELECT * from spider_rule", function (results, fields) {
   
    for (let index = 0; index < fields.length; index++) {
     conf.push(fields[index])
    }
    // res.json({ data: fields, count: count ,code:200,msg:'查询成功',status:'success'});
  })
}
module.exports = spider;

