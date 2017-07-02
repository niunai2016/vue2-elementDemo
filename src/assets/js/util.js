/**
 * Created by KING on 2017/7/2.
 *
 * 解析url 参数  反回Object {key:value}
 *
 */

let a = function urlParse() {
    let url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]/g;
    let arr = url.match(reg);
    if(arr){
        arr.forEach((item)=>{
            let tempArr = item.substring(1).split('=');
            let key = decodeURIComponent(tempArr[0]);
            let val = decodeURIComponent(tempArr[1]);
            
            obj[key] = val;
        });
    }
    return obj;
}


export default a;
