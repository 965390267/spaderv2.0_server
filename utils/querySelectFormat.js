
function MainSelector(selector){//输入浏览器获取的列表单元的选择器，自动过滤出li的列表

  let ingoreSpace=selector.trim()

    let ignoreExtraSelector=''

    let patt=/>/ig;

    if(patt.test(ingoreSpace)){//如果传入的选择器可分割

    let  userInputSelectorArr=ingoreSpace.split('>')

    let lastSelector= userInputSelectorArr.pop();//取出选择器的最后一个选择器进行过滤

    let filterLastSelectorReg=/(\.)|(\#)|(:)/gi;

    let lastSelectorArr=  lastSelector.split(filterLastSelectorReg)

       ignoreExtraSelector=userInputSelectorArr.join('>')+'>'+lastSelectorArr[0]

    }else{

      ignoreExtraSelector=ingoreSpace
      
    }
  return  ignoreExtraSelector
  }
  module.exports=MainSelector