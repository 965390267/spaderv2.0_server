// // Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
// //这儿创建链接数据库的方法以及定义数据库的模型，模式
// const mongoose = require('mongoose');
// // 连接数据库 如果不自己创建 默认test数据库会自动生成
// // var dbOptions = {'user':'zangzhihong','pass':'zang2238668'};
// // mongoose.connect('mongodb://123.56.216.109:27017/blog',dbOptions);
// // mongoose.connect('mongodb://localhost:27017/blog');

// // mongoose.connect('mongodb://123.56.216.109:27017/blog', {useNewUrlParser: true});
// mongoose.connect('mongodb://47.97.123.194:27017/blog', {useNewUrlParser: true});
// // 为这次连接绑定事件
// const db = mongoose.connection; //链接事件
// db.once('error', () => console.log('Mongo connection error'));
// db.once('open', () => console.log('Mongo connection successed'));
// /************** 定义模式loginSchema **************/

// const articleschema = new mongoose.Schema({
//     id: Number,
//     oid:String,
//     title:String,
//     time:String,
//     href: String,
//     tag: String,
//     from: String,
//     submittime:{ type:Number, default:Date.now},
// }, {
//     collection: "spader"
// })



// const Models = {
  
//     spader: mongoose.model('spader', articleschema),
// }


// module.exports = Models