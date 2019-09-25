// var request = require('../utils/request.js');//请求库模块
// var conf=require('./rule')
// function fetch(){
//     let promiseAll=[]
//         for (let index = 0; index < conf.length; index++) {//循环爬取所有的任务列表，因为是基于事件循环机制，所以不会导致线程阻塞     
//             promiseAll.push(request(conf[index].charset, conf[index].site))
//            }       
//     return Promise.all(promiseAll)
// }
// module.exports=fetch;