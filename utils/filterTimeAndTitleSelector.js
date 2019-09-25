
function filterTag(mainselector,selector){//如果高级用户输入精确匹配的时候启用改函数进行子标签选择器和主标签选择器进行匹配过滤，比主选择器多的选择器就是子选择器
  let mainSele=mainselector.replace(/\s+/g, "");
   let curSele=selector.replace(/\s+/g, "");
   let temp=''
   if(mainSele.length<curSele.length){
       temp=mainSele;
       mainSele=curSele
       curSele=temp
   }
   let str='';
   for (let index = 0; index < mainSele.length; index++) {
     if(mainSele.charAt(index)!=curSele.charAt(index)){
       str+=mainSele.charAt(index)
     }
   }
  if(/^>/.test(str)) {//去除>,子代选择器
    return str.replace(/^>/,'');
  }
  return null
}
module.exports=filterTag
//body > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > div > ul:nth-child(1)
//body > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > div > ul:nth-child(1) > li > a
//body > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > div > ul:nth-child(1) > li > span > span > font