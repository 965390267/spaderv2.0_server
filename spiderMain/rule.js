
const conf = []
//临时保存的爬虫规则，所有爬虫规则都经过这个存储，并且和数据库保持同步
/* 爬虫规则组，每间隔一段时间从这里取规则，只需在每次添加规则的时候在重新读取数据库的爬虫规则到这儿，避免多次操作数据库 */
module.exports = conf


