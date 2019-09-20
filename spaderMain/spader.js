var schedule = require('node-schedule');//定时任务模块
var request = require('../utils/request.js');//请求库模块
var conf=require('./rule')//爬虫任务列表，直接从本地内存中取，避免不必要的读取操作数据库，只有提交了爬虫规则的时候才从数据库读出更新任务列表
var analysis=require('./ruleanalysis')//对爬虫输入的规则的参数进行处理，
function spader() {
console.log('start');

  //  var rule2  = new schedule.RecurrenceRule();  //定时启动爬虫开始抓取
  // var times2    = [1,10,20,30,40,50,60];  
  // rule2.minute  = times2;  
  //  schedule.scheduleJob(rule2, function(){   
  //   console.log(conf);
  //  }); 
    //每分钟的第30秒定时执行一次:
    var rule1     = new schedule.RecurrenceRule();  
    var times1    = [1,12,24,34,42,52,59];  
    rule1.second  = times1;  
    // schedule.scheduleJob(rule1, function(){  
      let promiseAll=[]
      for (let index = 0; index < conf.length; index++) {//循环爬取所有的任务列表，因为是基于事件循环机制，所以不会导致线程阻塞     
       promiseAll.push(request(conf[index].charset, conf[index].site))
      }
      Promise.all(promiseAll).then(res=>{
        for (let index = 0; index < res.length; index++) {
          analysis(res[index],conf[index])        
        }
      })
    // });  
  
}



// request('gbk', 'http://www.ynqjrs.cn/index.asp?Twzbh=1', function (sres) {

//   spader2(sres)
// })
// request('gbk', 'http://www.rsj.yuxi.gov.cn/renshe/article.g?m=listRenshe&catecode=100010035', function (sres) {

//   spader3(sres)
// })

module.exports = spader;

