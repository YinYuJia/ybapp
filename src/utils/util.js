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
    return parseInt(dateNum);
}

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
function passPort(value){
    if(value && (!(/^1[45][0-9]{7}$|(^[P|p|S|s]\d{7}$)|(^[S|s|G|g|E|e]\d{8}$)|(^[Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8}$)|(^[H|h|M|m]\d{8,10}$)/).test(value))){
        return false
    }else{
        return true
    }
} 



export default{
    formatDate,
    DateToNumber,
    checkPhone,
    idCard,
    postOffic,
    passPort
}