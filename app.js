var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var SPADER_START=require('./spaderMain/spader.js');//爬虫启动入口

// var proxyMiddleWare = require("http-proxy-middleware");
// var proxyPath = "http://api.zhuishushenqi.com/cats/lv2/statistics";//目标后端服务地址(公司同事电脑地址)
// var proxyOption ={target:proxyPath,changeOrigin:true, pathRewrite: {
//   // '^/api' : '/',     
 
// }};
var indexRouter = require('./routes/index');
 var usersRouter = require('./spaderMain/readSqlRuleWhenAddWeb');

var app = express();
app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
      res.send(200);  //让options尝试请求快速结束
  else
      next();
})


  SPADER_START();//启动爬虫程序入口
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.use("/test",proxyMiddleWare(proxyOption))//这里要注意"/discern" 是匹配的路由,它会将匹配的路由进行转发，没匹配到的就不会转发。('/discern'完全可以写成'/'就是说所有路由都可以访问)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
 app.use('/submit', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/* GET home page. */
// router.get('/', function(req, res, next) {
//   const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
//   res.send(html)
//   // res.json({ title: 'Express' });
// });
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
