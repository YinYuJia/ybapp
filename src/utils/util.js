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

export default{
    formatDate,
    DateToNumber,
    checkPhone,
}