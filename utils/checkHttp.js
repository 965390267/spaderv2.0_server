function cheekhttp(http){
    let reg=/(http|https):\/\/([\w.]+\/?)\S*/
    return reg.test(http);
}