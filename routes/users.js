var express = require('express');
var fs=require('fs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  let {password}=req.body;
  if(password=='123456'){
    const user = {/* jwt生成必须参数 */
      password
    }
    let token = jwt.sign(user, 'secret', {/* 生成token */
      expiresIn: '48h'
    })
    
    res.json({
      msg: '验证通过',
      success: true,
      code: 200,
      data: { token: "Bearer " + token }
    });
  }else{
    res.json({
      msg: '密码输入错误',
      success: false,
      code: 400,
      data: null
    });
  }

});

module.exports = router;
