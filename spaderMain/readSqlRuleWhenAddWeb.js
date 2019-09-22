var express = require('express');
var analysis=require('./ruleanalysis')//对爬虫输入的规则的参数进行处理，
var request = require('../utils/request.js');//请求库模块
var SelectorAnalyze=require('../utils/querySelectFormat')
var router = express.Router();
var conf=require('./rule')
/* GET users listing. */
router.get('/submitspiderrule', function(req, res, next) {
   let {site,MainSelector,charset}=req.body||req.query;
    conf.push({site,MainSelector,charset})
    res.json({site,MainSelector})
});

router.get('/testspiderrule', function(req, res, next) {//验证当前规则是否有效
    let {site,MainSelector,charset}=req.query||req.body;
   request(charset||'utf',site).then(ret=>{  
    analysis(ret,{MainSelector},function(result){
        res.json(result)
    })
   })

});
module.exports = router;

