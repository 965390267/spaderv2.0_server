var schedule = require('node-schedule');//定时任务模块
var fetch=require('./fetch');//所有请求的任务同步返回
var conf=require('./rule')//爬虫任务列表，直接从本地内存中取，避免不必要的读取操作数据库，只有提交了爬虫规则的时候才从数据库读出更新任务列表
var analysis=require('./ruleanalysis')//对爬虫输入的规则的参数进行处理，
var request = require('../utils/request.js');//请求库模块
function spader() {
console.log('start');
  //  var rule2  = new schedule.RecurrenceRule();  //定时启动爬虫开始抓取
  // var times2    = [1,10,20,30,40,50,60];  
  // rule2.minute  = times2;  
    //每分钟的第30秒定时执行一次:
    var rule1     = new schedule.RecurrenceRule();  
    var times1    = [1,12,24,34,42,52,59];  
    rule1.second  = times1;  
    // schedule.scheduleJob(rule1, function(){  
      if(conf.length>0){
      // fetch().then((res)=>{
      //     for (let index = 0; index < res.length; index++) {
      //       analysis(res[index],conf[index],function(result){
      //           console.log(result);
      //       })     
      //     }
      // })
      // console.log('-----------------------------');
      for (let index = 0; index < conf.length; index++) {
        request(conf[index].charset||'utf',conf[index].site).then(ret=>{ 
          // console.log(conf[index].site,index);    
          analysis(ret,conf[index],function(result){
                      console.log(result);
                        // if (currentMonth == month && currentDay == day) {  
  //   saveDate({
  //      title:title, //获取到标题
  //     href:'http://rsj.zunyi.gov.cn'+href ,
  //     // oid:'http://www.ynjy.cn'+time,
  //     oid:encodeURI(title.slice(0,15))+time,
  //     time:time2,
  //     from:from});//保存进数据库
  // }
                  })
        })    
      }
    }
    // });   
}


module.exports = spader;

