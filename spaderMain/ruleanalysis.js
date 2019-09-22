var cheerio = require('cheerio');
var saveDate=require('../dbmodel/save')
function analysy(sres,conf,cb) {
  var currentDay = new Date().getDate();
  var currentMonth = (new Date().getMonth()) + 1;
  var $ = cheerio.load(sres.text); //用cheerio解析页面数据
   var from=$('title').text();
//#center > div.xinxi > div.xinxizhong > div:nth-child(3) > div > ul > li:nth-child(5) > a   +$(ele).find('span').text()
//#center > div.xinxi > div.xinxizhong > div:nth-child(3) > div > ul > li:nth-child(5) > span
console.log('----------------------------------------------------------');
let arr=[]
$(conf.MainSelector).each((index,ele)=>{
  deepTree(ele)  
 // console.log($(ele).find(conf.HrefSelector).text()+'-------'+$(ele).find(conf.TimeSelector).text());
})
cb&&cb(arr)
// if (currentMonth == month && currentDay == day) {  
//   saveDate({
//      title:title, //获取到标题
//     href:'http://rsj.zunyi.gov.cn'+href ,
//     // oid:'http://www.ynjy.cn'+time,
//     oid:encodeURI(title.slice(0,15))+time,
//     time:time2,
//     from:from});//保存进数据库
// }
}
function deepTree(ele){
  if(!$(ele)){ 
    arr.push($(conf.MainSelector).html())
  }else{
    
    arr.push($(ele).html())
   
  }
}
module.exports=analysy;