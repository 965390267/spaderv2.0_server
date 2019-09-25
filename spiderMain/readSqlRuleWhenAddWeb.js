var express = require('express');
var analysis=require('./ruleanalysis')//对爬虫输入的规则的参数进行处理，
var request = require('../utils/request.js');//请求库模块
var save_rule=require('../dbmodel/save_spider_rule')
var router = express.Router();
var conf=require('./rule')
/* GET users listing. */
router.get('/submit/spiderrule', function(req, res, next) {//提交爬虫爬取的规则

   let {site,MainSelector,charset}=req.body;

    conf.push({site,MainSelector,charset})
    
    res.json({msg:'提交成功',status:'success', code:200, data:{site,MainSelector,charset}})
});



router.get('/verification/spiderrule', function(req, res, next) {//验证当前规则是否有效

    let {site,MainSelector,charset}=req.body;

   request(charset||'utf',site).then(ret=>{  

    analysis(ret,{site,MainSelector},function(result){

        save_rule({site,MainSelector,charset})
        res.json({msg:'验证成功',status:'success', code:200,data:result,rule:{site,MainSelector,charset}});

    })
   }).catch(err=>{

    res.json({msg:'请求失败',status:'false', code:400,data:null})

})

});

router.get('/submit/custom/spiderrule', function(req, res, next) {//提交高级匹配爬虫爬取的规则

    let {site,MainSelector,TitleSelector,TimeSelector,area,charset}=req.body;

     conf.push({site,MainSelector,TitleSelector,TimeSelector,area,charset})

     res.json({msg:'提交自定义高级匹配规则成功',status:'success', code:200, data: {site,MainSelector,TitleSelector,TimeSelector,area,charset}})
 });

 router.get('/verification/custom/spiderrule', function(req, res, next) {//验证高级匹配爬虫爬取的规则是否和预想一样

    let {site,MainSelector,TitleSelector,TimeSelector,area,charset}=req.body;

   request(charset||'utf',site).then(ret=>{  

    analysis(ret,{site,MainSelector,TitleSelector,TimeSelector,area,charset},function(result){
        res.json({msg:'验证自定义高级匹配规则成功',status:'success', code:200,rule:{site,MainSelector,TitleSelector,TimeSelector,area,charset}, data:result})
    })

   }).catch(err=>{
       console.log(err);
       
       res.json({msg:'请求失败',status:'false', code:400,data:null})
   })

});
module.exports = router;

