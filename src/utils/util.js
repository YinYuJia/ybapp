// 格式化日期函数
function formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
        }
    }
    return fmt
}
function padLeftZero (str) {
    return ('00' + str).substr(str.length)
}

// 日期转换为Number
function DateToNumber(date){
    let dateNum = date.replace(/-/g,'');
    return dateNum
}

// Number转换为日期
function NumberToDate(number){
    // (typeof (number) =="number")
        let num = number.toString();
        let result = num.slice(0,4) + '-' + num.slice(4,6) + '-' + num.slice(6,8);
        return result;

}
//手机号校验
function checkPhone(phoneStr){ 
    var phone = phoneStr
    if(!(/^1[3456789]\d{9}$/.test(phone))){ 
        return false; 
    }
    return true;
  }
/**
 * 身份证号码校验
 */
function idCard(value) {
if (value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
    return false; 
} else {
    return true; 
}
}
//邮政编码校验
function postOffic(value){
    if(value && (!(/[1-9][0-9]{5}/).test(value))){  
        return false
    }else{
        return true
    }
  
} 

//护照号校验
// function passPort(value){
//     // if(value && (!(/^1[45][0-9]{7}$|(^[P|p|S|s]\d{7}$)|(^[S|s|G|g|E|e]\d{8}$)|(^[Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8}$)|(^[H|h|M|m]\d{8,10}$)/).test(value))){
//     //     return false
//     // }else{
//     //     return true
//     // }
//     if(value && (!(/^[A-Z]\d{8}$/).test(value))){
//         console.log("失败")
//         return false;
//     }else{
//         console.log("成功");
//         return true;
//     }
// }
function passPort(value){
    if(value && (!/^((1[45]\d{7})|(G\d{8})|(P\d{7})|(S\d{7,8})|(DE\d{7}))?$/.test(value))){
        console.log("失败")
        return false;
    }else{
        console.log("成功")
        return true;
    }
}
function decimalPoint(num){  
    num += '';  
    num = num.replace(/[^0-9|\.]/g, ''); //清除字符串中的非数字非.字符  
    
    if(/^0+/) //清除字符串开头的0  
        num = num.replace(/^0+/, '');  
    if(!/\./.test(num)) //为整数字符串在末尾添加.00  
        num += '.00';  
    if(/^\./.test(num)) //字符以.开头时,在开头添加0  
        num = '0' + num;  
    num += '00';        //在字符串末尾补零  
    num = num.match(/\d+\.\d{2}/)[0];  
};  



export default{
    formatDate,
    DateToNumber,
    NumberToDate,
    checkPhone,
    idCard,
    postOffic,
    passPort,
}