var cheerio = require('cheerio');
var SelectorAnalyze = require('../utils/querySelectFormat')
let replaceRelativeWebSite = require('../utils/checkHttp')
let formatTime = require('../utils/timeFormat.js')
let filterTimeAndTitleSelector = require('../utils/filterTimeAndTitleSelector')

function analysy(sres, conf, cb) {

  var $ = cheerio.load(sres.text, {
    ignoreWhitespace: true, // 是否忽略空白符
  }); //用cheerio解析页面数据
  var from = $('title').text();

  let ingoreTag = SelectorAnalyze(conf.MainSelector)

  let resultArr = [] //经过各种数据处理后得到的标准的格式后存在在数组中返回

  $(ingoreTag.toString()).each((index, ele) => {

    if (!conf.TimeSelector || !conf.TitleSelector) { //如果没有输入时间的选择器进行精确高级匹配则依赖程序自动匹配可能为时间的字符串{系统自动匹配}
    
      //let {site,MainSelector,TitleSelector,TimeSelector,area,charset,remarks}=conf
      let obj = {
        from,
        ...conf
      }
      let result = deepTree(ele, $, conf.site, obj)
      if (result.time) { //避免主选择器里选择到空的但又满足智能匹配的规则的标签
        resultArr.push(result)
      }
    } else { //对输入的title选择器和时间选择器列表选择器处理后执行{用户自行输入详细标签进行匹配}
      // let {site,MainSelector,TitleSelector,TimeSelector,area,charset,remarks}=conf

      let titleTagSelector = filterTimeAndTitleSelector(conf.MainSelector, conf.TitleSelector) //列表title选择器{包括href}

      let timeTagSelector = filterTimeAndTitleSelector(conf.MainSelector, conf.TimeSelector) //time选择器
  
      let time = $(ele).find(timeTagSelector).text().trim()
      time = formatTime(time);
      let title = $(ele).find(titleTagSelector).text();
      let href = $(ele).find(titleTagSelector).attr('href'); //取到各种奇怪的路径

      href = replaceRelativeWebSite(href, conf.site) //对各种奇怪的路劲进行处理，拼接成完整的路径
      let obj = {
        from,
        time,
        title,
        href,
        ...conf
      }
      if (obj.time) { //避免主选择器里选择到空的但又满足智能匹配的规则的标签
        resultArr.push(obj)
      }

    }
  })
  cb && cb(resultArr)
}

function chkstrlen(str) { //检查中文字符个数
  var strlen = 0;
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 255) //如果是汉字，则字符串长度加2
      strlen += 2;
    else
      strlen++;
  }
  return strlen;
}
var reg = new RegExp("[\\u4E00-\\u9FFF]+$", "g"); //匹配是否全为中文
function deepTree(root, $, site, obj) { //深度优先搜索去搜索节点中可能为时间和网址的
  //root代表选择到的节点
  //  let child=$(root).contents()//节点的文本内容
  // console.log(child.length);

  // if (child.children!=null) {
  //    let tagText=$(root).text().trim();

  //   if (root.name == 'a'&&chkstrlen(tagText)>8) {
  //     // console.log(chkstrlen(tagText));
  //     let title = $(root).text()
  //     let href = $(root).attr('href') 
  //     let absoluteHref=  replaceRelativeWebSite(href,site)
  //     obj.title = title;
  //     obj.href = absoluteHref;
  //   }
  //    if (root.nodeType === 3&& chkstrlen(tagText)< 22) {


  //     if (formatTime(tagText)) {
  //       obj.time = formatTime(tagText);
  //     }
  //   } 
  //   // for (let index = 0; index <child.length; index++) {
  //   //   deepTree(child[index], $,site,obj)
  //   // }
  // }
  // return obj

  if ($(root).contents().length === 0) {
    return obj
  }
  let queue = [root]
  while (queue.length) {
    var current = queue.shift();
    let tagText = $(current).text().trim();
    if (current.name == 'a' && (chkstrlen(tagText) > 8 || reg.test(tagText))) {
      let title = $(current).text()
      let href = $(current).attr('href')
      let absoluteHref = replaceRelativeWebSite(href.toString(), site.toString())
      obj.title = title;
      obj.href = absoluteHref;
    }
    if (current.nodeType === 3 && chkstrlen(tagText) < 22) {
      if (formatTime(tagText)) {
        obj.time = formatTime(tagText);
      }
    }
    if ($(current).contents().length) {
      for (let index = 0; index < $(current).contents().length; index++) {
        queue.push($(current).contents()[index])
      }
    }
  }
  return obj;
}

module.exports = analysy;