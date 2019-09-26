
function formatTime(time){/* 处理各种可能为时间的字符串，然后转换为标准的日期格式 */

    let reg=/(\d{2,4})(?:[^\d]+)([0-9]{1,2}|0[1-9]|1[0-2])(?:[^\d]+)([0-9]{1,2}|0[1-9]|[1-2][0-9]|3[0-1])/;//匹配年月日

    let noYearReg=/([0-9]{1,2}|0[1-9]|1[0-2])(?:[^\d]+)([0-9]{1,2}|0[1-9]|[1-2][0-9]|3[0-1])/;//匹配只有月份和日期

    let noWhiteSpace=  time.trim();//先踢除前后空格

    if(reg.test(noWhiteSpace)){

     let result=  reg.exec(noWhiteSpace); 
       
    return `${result[1]}-${Number(result[2])<10?'0'+Number(result[2]):result[2]}-${Number(result[3])<10?'0'+Number(result[3]):result[3]}`

    }else if(noYearReg.test(noWhiteSpace)){

    let result=  noYearReg.exec(noWhiteSpace);

    let currentYear=new Date().getFullYear();

    return `${currentYear}-${Number(result[1])<10?'0'+Number(result[1]):result[1]}-${Number(result[2])<10?'0'+Number(result[2]):result[2]}`

    }
     return null;
 }
 module.exports=formatTime
 /* 
 爬虫列表中可能为时间的字符串
 */
 //formatTime('[2019-12-23]')
 