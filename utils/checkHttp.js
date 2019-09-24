function cheekhttp(http){//检测是否是绝对路径
    let reg=/(http|https):\/\/([\w.]+\/?)\S*/
    return reg.test(http);
}
function splitWebSite(WebSite){/* 返回一个数字，下标0全部，{1}http://协议，{2}：地址 {3}：端口{4}：路径 */
    var parse_url  =/^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i
    return parse_url.exec(WebSite);
}

function replaceRelativeWebSite(Route,WebSite){
    if(cheekhttp(Route)){//如果是绝对路径
        return Route
    }else{
        let leavel1=/^(\.\/|\/|\w)\w/i
        let leavel2=/^(\.\.\/)\w/i;
        let splitWebSiteArr= splitWebSite(WebSite);
       if(leavel1.test(Route)){//是否是当前路径下的
          let ignoreDot=/^(\.|\/)//* 匹配.或者/ */
          let pattenRoute=/\w\?/i
          if(ignoreDot.test(Route)){//如果以.或者/开头则过滤
            return `${splitWebSiteArr[1]}${splitWebSiteArr[2]}${ splitWebSiteArr[3]||''}/${Route.replace(ignoreDot,'')}`
          }else if(pattenRoute.test(Route)){   
                    
            let path=splitWebSiteArr[4];
            let  splitPath=path.split('/')
            splitPath.splice(splitPath.length-1,1)         
            return `${splitWebSiteArr[1]}${splitWebSiteArr[2]}${ splitWebSiteArr[3]||''}${splitPath.join('/')}/${Route}`
          }else{
            return `${splitWebSiteArr[1]}${splitWebSiteArr[2]}${ splitWebSiteArr[3]||''}${Route}`
          } 
       }else if(leavel2.test(Route)){/* 类似../ */
        let path=splitWebSiteArr[4];
        let ignoreTwoDot=  Route.split('../')[1]
       let  splitPath=path.split('/')
       splitPath.splice(splitPath.length-2,2)
        return `${ splitWebSiteArr[1]}${ splitWebSiteArr[2]}${ splitWebSiteArr[3]||''}/${splitPath}${ignoreTwoDot}`
       }else{
        let path=splitWebSiteArr[4];
        let ignoreTwoDot=  Route.split('../../')[1]
       let  splitPath=path.split('/')
       splitPath.splice(splitPath.length-3,3)
        return `${ splitWebSiteArr[1]}${ splitWebSiteArr[2]}${ splitWebSiteArr[3]||''}/${splitPath}${ignoreTwoDot}`
       }
    }
}
module.exports=replaceRelativeWebSite
//replaceRelativeWebSite('article.g?m=detailRenshe&p_id=338644&menuentry=xxgk','http://www.rsj.yuxi.gov.cn/renshe/article.g?m=listRenshe&catecode=100010035')