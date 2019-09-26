var cheerio = require('cheerio');
var SelectorAnalyze = require('../utils/querySelectFormat')
let replaceRelativeWebSite=require('../utils/checkHttp')
let formatTime=require('../utils/timeFormat.js')
let filterTimeAndTitleSelector=require('../utils/filterTimeAndTitleSelector')

function analysy(sres, conf, cb) {

  var $ = cheerio.load(sres.text, {
    ignoreWhitespace: true, // 是否忽略空白符
  }); //用cheerio解析页面数据
  var from = $('title').text();

  let ingoreTag = SelectorAnalyze(conf.MainSelector)

 let resultArr=[]//经过各种数据处理后得到的标准的格式后存在在数组中返回
 $(ingoreTag).each((index,ele)=>{

   if(!conf.TimeSelector||!conf.TitleSelector){//如果没有输入时间的选择器进行精确高级匹配则依赖程序自动匹配可能为时间的字符串{系统自动匹配}

    let {site,MainSelector,TitleSelector,TimeSelector,area,charset}=conf

    let obj={from,site,MainSelector,TitleSelector,TimeSelector,area,charset,remarks}

    let result = deepTree($(ele),$,conf.site,obj)

    resultArr.push(result)

  }else{//对输入的title选择器和时间选择器列表选择器处理后执行{用户自行输入详细标签进行匹配}
    let {site,MainSelector,TitleSelector,TimeSelector,area,charset,remarks}=conf

   let titleTagSelector= filterTimeAndTitleSelector(conf.MainSelector,conf.TitleSelector)//列表title选择器{包括href}

   let timeTagSelector= filterTimeAndTitleSelector(conf.MainSelector,conf.TimeSelector)//time选择器

  let time=$(ele).find(timeTagSelector).text().trim()
      time= formatTime(time);
  let title=$(ele).find(titleTagSelector).text();

  let href=$(ele).find(titleTagSelector).attr('href');//取到各种奇怪的路径

  let completeHref= replaceRelativeWebSite(href,site)//对各种奇怪的路劲进行处理，拼接成完整的路径

  let obj={from,site,MainSelector,TitleSelector,TimeSelector,area,charset,time,title,completeHref,remarks}

  resultArr.push(obj)
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
function deepTree(root, $,site,obj) {//深度优先搜索去搜索节点中可能为时间和网址的

     let child=$(root).contents()

  if (child!=null) {

     let tagNode = root 

    if (tagNode.name == 'a') {
      let title = $(tagNode).text()

      let href = $(tagNode).attr('href') 

     let absoluteHref=  replaceRelativeWebSite(href,site)

      obj.title = title;

      obj.href = absoluteHref;
    }

    let tagText=$(tagNode).text().trim();

     if (tagNode.nodeType === 3&& chkstrlen(tagText)< 22) {

      if (formatTime(tagText)) {
        obj.time = formatTime(tagText);
      }
    } 
    for (let index = 0; index <child.length; index++) {
      deepTree(child[index], $,site,obj)
    }
  }
  return obj;
}

module.exports = analysy;