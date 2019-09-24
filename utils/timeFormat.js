
function formatTime(time){/* 处理各种可能为时间的字符串，然后转换为标准的日期格式 */
  let reg=/(\d{4})(?:[^\d]+)([0-9]{1,2}|0[1-9]|1[0-2])(?:[^\d]+)([0-9]{1,2}|0[1-9]|[1-2][0-9]|3[0-1])/;//匹配年月日
  let noYearReg=/([0-9]{1,2}|0[1-9]|1[0-2])(?:[^\d]+)([0-9]{1,2}|0[1-9]|[1-2][0-9]|3[0-1])/;//匹配只有月份和日期
  var noWhiteSpace=  time.trim();//先踢除前后空格
    if(reg.test(noWhiteSpace)){
     let result=  reg.exec(noWhiteSpace);   
    return `${result[1]}-${result[2]}-${result[3]}`
    }else if(noYearReg.test(noWhiteSpace)){
  let result=  noYearReg.exec(noWhiteSpace);
  let currentYear=new Date().getFullYear();
    return `${currentYear}-${result[1]}-${result[2]}`
    }
     return null;
 }
 module.exports=formatTime
 //formatTime('[2019-12-23]')
 