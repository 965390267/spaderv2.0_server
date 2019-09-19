
function MainSelector(selector){
    let reg=/:nth-child\(\d\)$/g
    return selector.trim().replace(reg,' ')
  }