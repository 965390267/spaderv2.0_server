var schedule = require('node-schedule');//定时任务模块
// var fetch=require('./fetch');//所有请求的任务同步返回
//爬虫任务列表，直接从本地内存中取，避免不必要的读取操作数据库，只有提交了爬虫规则的时候才从数据库读出更新任务列表
var analysis = require('./ruleanalysis')//对爬虫输入的规则的参数进行处理，
var request = require('../utils/request.js');//请求库模块
var saveDate = require('../dbmodel/save')
var mysql = require('../dbmodel/mysqldb');
var conf = require('./rule')
 
function spider() {
 
   initDateBase();//初始化数据库
  //  var rule2  = new schedule.RecurrenceRule();  //定时启动爬虫开始抓取
  //Main()//定时启动main函数
  //每分钟的第30秒定时执行一次:
   var rule1 = new schedule.RecurrenceRule();
  // // var times1 = [1, 12, 24, 34, 42, 52, 59];
  // // rule1.second = times1;
    var times2    = [1,10,20,30,40,50,60];  
    rule1.minute  = times2;  
  schedule.scheduleJob(rule1, function(){  
    Main()//定时启动main函数
  });   
} 
function Main(){
  let currentDate=new Date()
  let month=currentDate.getMonth()+1;//当前月份
  let day=currentDate.getDate();//当天日期
let cloneConfObj=conf

  if (cloneConfObj.length > 0) {
   
    for (let index = 0; index < cloneConfObj.length; index++) {
      
      request(cloneConfObj[index].charset || 'utf', cloneConfObj[index].site).then(ret => {
 
        analysis(ret, cloneConfObj[index], function (result) {

          if (result.length>0) {           
            for (var item = 0; item < result.length; item++) {
              let rule_year_month_day=result[item].time.split('-')
                 if(Number(rule_year_month_day[1])==month&&Number(rule_year_month_day[2])==day){     
                  saveDate({
                    title: result[item].title, //获取到标题
                    href: result[item].href,
                    site:result[item].site,
                    MainSelector:result[item].MainSelector,
                    TitleSelector:result[item].TitleSelector,
                    TimeSelector:result[item].TimeSelector,
                    charset:result[item].charset,
                    oid: encodeURI(result[item].href) + result[item].time,
                    time: result[item].time,
                    from: result[item].from,
                    area: result[item].area,
                    ddtoken:result[item].ddtoken
                  });//保存进数据库   
                }                
            }
            
          }
        })
      })
    }
  }
}

function initDateBase(){
  mysql.query("SELECT * from spider_rule", function (results, fields) {
    
    for (let index = 0; index < fields.length; index++) {
     conf.push(Object.assign({},fields[index]))
    }  
    
  })
}
module.exports = spider;

