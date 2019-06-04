// 格式化日期函数
// function dateFormat(date){
//     let year = date.getFullYear();
//     let month;
//     if(date.getMonth()+1 < 10){
//         month = '0' + (date.getMonth()+1);
//     }else{
//         month = date.getMonth()+1;
//     }
//     let day;
//     if(date.getDate() < 10){
//         day = '0' + date.getDate();
//     }else{
//         day = date.getDate();
//     }
//     return year + '-' + month + '-' + day;
// }
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

export default{
    formatDate,
}