var cheerio = require('cheerio');
var saveDate = require('../dbmodel/save')
var SelectorAnalyze = require('../utils/querySelectFormat')
let replaceRelativeWebSite=require('../utils/checkHttp')
let formatTime=require('../utils/timeFormat.js')

function analysy(sres, conf, cb) {
  var $ = cheerio.load(sres.text, {
    ignoreWhitespace: true, // 是否忽略空白符
  }); //用cheerio解析页面数据
  var from = $('title').text();
  console.log('----------------------------------------------------------');
  
  let ingoreTag = SelectorAnalyze(conf.MainSelector)
 let resultArr=[]
 $(ingoreTag).each((index,ele)=>{
   if(!conf.time){//如果没有输入时间的选择器进行精确高级匹配则依赖程序自动匹配可能为时间的字符串
    let obj={}
    let result = deepTree($(ele),$,conf.site,obj)
    resultArr.push(result)
  }else{//对输入的title选择器和时间选择器列表选择器处理后执行
    
  }
 })
   cb && cb(resultArr)
}

function chkstrlen(str){//检查中文字符个数
  　　　　var strlen = 0;
  　　　　for(var i = 0;i < str.length; i++){
  　　　　　　if(str.charCodeAt(i) > 255) //如果是汉字，则字符串长度加2
  　　　　　　　　strlen += 2;
  　　　　　　else  
  　　　　　　　　strlen++;
  　　　　}
  　　　　return   strlen;
  　　}
function deepTree(root, $,site,obj) {
  let child=$(root).contents()
  if (child!=null) {
    var tagNode = root 
    if (tagNode.name == 'a') {
      let title = $(tagNode).text()
      let href = $(tagNode).attr('href')   
     let absoluteHref=  replaceRelativeWebSite(href,site)
      obj.title = title;
      obj.href = absoluteHref;
      //console.log(title,href);  
    }

    let tagText=$(tagNode).text().trim();
 //console.log(chkstrlen(tagText));
     if (tagNode.nodeType === 3&& tagText.length< 15) {
      if (formatTime(tagText)) {
        obj.time = formatTime(tagText);
       let time=  tagText
        //console.log(time,'ddd');
      }
    } 
    for (let index = 0; index <child.length; index++) {
      deepTree(child[index], $,site,obj)
    }
  }
  return obj;
}

module.exports = analysy;