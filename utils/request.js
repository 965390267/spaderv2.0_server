var superagent = require('superagent');
const charset = require('superagent-charset');
var req= charset(superagent);

function request(charset,URl) {
    var charset=charset||'utf-8';
  return  new  Promise((resolve,reject)=>{
    if(charset=='gbk'){
        req.get(URl).charset('gbk') //请求页面地址
        .end(function (err, sres) { //页面获取到的数据
            if (err) reject(err);   
            resolve(sres)
        })
    }else{
        superagent.get(URl) //请求页面地址
        .end(function (err, sres) { //页面获取到的数据
            if (err) reject(err);        
            resolve(sres)
        })
    }
    })
}
module.exports = request;