let conf = [{ site: 'http://www.cxrs.gov.cn/cxnew/list-60.html', MainSelector: 'body > div.mbd > div > div.pleft > ul > li', TimeSelector: 'div', HrefSelector: 'a', charset: 'utf' },
{ site: 'http://www.rsj.yuxi.gov.cn/renshe/article.g?m=listRenshe&catecode=100010035', MainSelector: 'body > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > div > ul', TimeSelector: 'li > span > span > font', HrefSelector: 'li > a', charset: 'gbk' }
]
/* 爬虫规则组，每间隔一段时间从这里取规则，只需在每次添加规则的时候在重新读取数据库的爬虫规则到这儿，避免多次操作数据库 */
let time = 5;
module.exports = conf
//body > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > div > ul:nth-child(1)
//body > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > div > ul:nth-child(1) > li > a
//body > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > div > ul:nth-child(1) > li > span > span > font