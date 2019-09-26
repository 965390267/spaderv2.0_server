var express = require('express');
var analysis=require('./ruleanalysis')//对爬虫输入的规则的参数进行处理，
var request = require('../utils/request.js');//请求库模块
var save_rule=require('../dbmodel/save_spider_rule')
var router = express.Router();
var conf=require('./rule')
/* GET users listing. */
router.get('/submit/spiderrule', function(req, res, next) {//提交全自动爬虫爬取的规则

   let {site,MainSelector,charset,area,remarks}=req.body;
  area=area||'云南'
   conf.push({site,MainSelector,charset,area,remarks})

    save_rule({site,MainSelector,charset,area,remarks},(result,fileds)=>{
    if(result){
        res.json({msg:'提交全自动爬虫规则处理成功',status:'success', code:200, data:{site,MainSelector,charset,remarks,area}})
    }else{
    res.json({msg:'提交全自动爬虫规则处理失败',status:'false', code:400, data:{site,MainSelector,charset,remarks,area}})
    }

    })  

});



router.get('/verification/spiderrule', function(req, res, next) {//验证当前规则是否有效

    let {site,MainSelector,charset,remarks}=req.body;

   request(charset||'utf',site).then(ret=>{  

    analysis(ret,{site,MainSelector,remarks},function(result){

        res.json({msg:'全自动爬虫规则验证成功',status:'success', code:200,data:result,rule:{site,MainSelector,charset,remarks}});

    })
   }).catch(err=>{

    res.json({msg:'全自动爬虫规则请求失败',status:'false', code:400,data:err})

})

});

router.get('/submit/custom/spiderrule', function(req, res, next) {//提交高级匹配爬虫爬取的规则

    let {site,MainSelector,TitleSelector,TimeSelector,area,charset,remarks}=req.body;
    area=area||'云南'
     conf.push({site,MainSelector,TitleSelector,TimeSelector,area,charset,remarks})
     save_rule({site,MainSelector,TitleSelector,TimeSelector,area,charset,remarks},(result,fileds)=>{
        if(result){
            res.json({msg:'提交自定义高级匹配规则成功',status:'success', code:200, data: {site,MainSelector,TitleSelector,TimeSelector,area,charset,remarks}})
        }else{
            res.json({msg:'提交自定义高级匹配规则失败',status:'false', code:400, data: {site,MainSelector,TitleSelector,TimeSelector,area,charset,remarks}})
        }
        }) 
     
 });

 router.get('/verification/custom/spiderrule', function(req, res, next) {//验证高级匹配爬虫爬取的规则是否和预想一样

    let {site,MainSelector,TitleSelector,TimeSelector,area,charset,remarks}=req.body;

   request(charset||'utf',site).then(ret=>{  

    analysis(ret,{site,MainSelector,TitleSelector,TimeSelector,area,charset,remarks},function(result){
        res.json({msg:'验证自定义高级匹配规则成功',status:'success', code:200,rule:{site,MainSelector,TitleSelector,TimeSelector,area,charset,remarks}, data:result})
    })

   }).catch(err=>{
   
       res.json({msg:'验证自定义爬虫规则请求失败',status:'false', code:400,data:err})
   })

});
module.exports = router;

