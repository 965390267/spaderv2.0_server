var schedule = require('node-schedule');
var request = require('../utils/request.js');
var analysis = require('../analysis'); //爬虫规则处理
var conf=require('./rule')
function spader() {
console.log('dddd');

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
    schedule.scheduleJob(rule1, function(){  
      console.log(conf);
    });  
  
}

function timer() {

  request('utf-8', 'http://rsj.zunyi.gov.cn/web/14668/index.html').then(res=>{// 事业单位 - 遵义市人力资源和社会保障局
  analysis(res)
  })

}


module.exports = spader;

