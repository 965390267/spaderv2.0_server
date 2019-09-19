var mysql = require('mysql');
var conf = {
    host: 'rm-2ze092927t0v6r2w4bo.mysql.rds.aliyuncs.com',
    user: 'product',
    password: 'Jkm9j%cunvW@*',
    database: 'spider_guizhou'
};
// var connection = mysql.createConnection({
//   host     : 'rm-2ze092927t0v6r2w4bo.mysql.rds.aliyuncs.com',
//   user     : 'product',
//   password : 'Jkm9j%cunvW@*',
//   database : 'jiaoyu'
// });

// connection.connect();

// var  addSql = 'INSERT INTO spader(title,href,tag,submittime) VALUES(?,?,?,?)';
// var  addSqlParams = ['dfsdff', 'https://c.runoob.com','23453', '235565'];
// //增
// connection.query(addSql,addSqlParams,function (err, result) {
//         if(err){
//          console.log('[INSERT ERROR] - ',err.message);
//          return;
//         }        

//        console.log('--------------------------INSERT----------------------------');
//        //console.log('INSERT ID:',result.insertId);        
//        console.log('INSERT ID:',result);        
//        console.log('-----------------------------------------------------------------\n\n');  
// });

// connection.end();
//向外暴露方法
module.exports = {
    query: function (sql, params, callback) {
        //每次使用的时候需要创建链接，数据操作完成之后要关闭连接
        var connection = mysql.createConnection(conf);
        connection.connect(function (err) {
            if (err) {
                console.log('数据库链接失败');
                throw err;
            }
            //开始数据操作
            connection.query(sql, params, function (err, results, fields) {
                if (err) {
                    console.log('数据操作失败');
                    //  console.log(err);

                }
                //将查询出来的数据返回给回调函数，这个时候就没有必要使用错误前置的思想了，因为我们在这个文件中已经对错误进行了处理，如果数据检索报错，直接就会阻塞到这个文件中
                callback && callback(results, fields);
                //results作为数据操作后的结果，fields作为数据库连接的一些字段，大家可以打印到控制台观察一下
                //停止链接数据库，必须再查询语句后，要不然一调用这个方法，就直接停止链接，数据操作就会失败
                connection.end(function (err) {
                    if (err) {
                        console.log('关闭数据库连接失败！');
                        throw err;
                    }
                });
            });
        });
    }
};