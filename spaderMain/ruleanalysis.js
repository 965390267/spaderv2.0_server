var cheerio = require('cheerio');
var saveDate = require('../dbmodel/save')
var SelectorAnalyze = require('../utils/querySelectFormat')

var arr=[]
function analysy(sres, conf, cb) {
  var currentDay = new Date().getDate();
  var currentMonth = (new Date().getMonth()) + 1;
  var $ = cheerio.load(sres.text, {
    ignoreWhitespace: true, // 是否忽略空白符
  }); //用cheerio解析页面数据
  var from = $('title').text();
  console.log('----------------------------------------------------------');
  let ingoreTag = SelectorAnalyze(conf.MainSelector)
 // console.log(conf.MainSelector);
  let result = deepTree($(ingoreTag),$)
console.log(result);

  // console.log($(ele).find(conf.HrefSelector).text()+'-------'+$(ele).find(conf.TimeSelector).text());

  // cb && cb(arr)
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


function deepTree(root, $) {
  var obj = {};
  let child=$(root).contents()
  if (child!=null) {
 
    var tagNode = root 
   
    if (tagNode.name == 'a') {
      let title = $(tagNode).text()
      let href = $(tagNode).attr('href')
      obj.title = title;
      obj.href = href;
      console.log(title,href);      
    }
    let tagNodeText =$(tagNode).text().trim()
     if (tagNode.nodeType === 3 && tagNodeText.length < 25) {
      let reg = /\d{2,}/ig;
      if (reg.test(tagNodeText)) {
        obj.time = tagNodeText;
         console.log(tagNodeText,'ddd');
      }
    } 
   // arr.push(obj)
    for (let index = 0; index <child.length; index++) {
      deepTree(child[index], $)
    }
  }
  return obj;
}

module.exports = analysy;