var cheerio = require('cheerio');
var saveDate=require('../dbmodel/save')

function rule1(sres) {
  var currentDay = new Date().getDate();
  var currentMonth = (new Date().getMonth()) + 1;
  var $ = cheerio.load(sres.text); //用cheerio解析页面数据

  var from=$('title').text();

$('body > div.box > div.i_center > div.e_cen > div.e_right > div > div.etext > ul.list > li').each((index,ele)=>{
  console.log($(ele).find('span').text());
  
})


//   $(".list li").each(function (index, element) { //下面类似于jquery的操作，前端的小伙伴们肯定很熟悉啦

//     var time = $(element).find('span').text().trim();
   
//     var time2=time; 
//     // var year= time.slice(0,4);
//     var month = time.slice(1,3);
//     var day = time.slice(4,6);
// var title = $(element).find('a').text().trim();
// var href = $(element).find('a').attr('href')

// if (currentMonth == month && currentDay == day) {  
//   saveDate({
//      title:title, //获取到标题
//     href:'http://rsj.zunyi.gov.cn'+href ,
//     // oid:'http://www.ynjy.cn'+time,
//     oid:encodeURI(title.slice(0,15))+time,
//     time:time2,
//     from:from});//保存进数据库

// }



//   });

  // console.log(arr);
  

// request('gbk', 'http://www.ynqjrs.cn/index.asp?Twzbh=1', function (sres) {

//   spader2(sres)
// })
// request('gbk', 'http://www.rsj.yuxi.gov.cn/renshe/article.g?m=listRenshe&catecode=100010035', function (sres) {

//   spader3(sres)
// })
}
module.exports=rule1;