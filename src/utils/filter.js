export function tuoMin(str, front, back) {
    if (typeof str == 'string') { //参数为字符串类型
        if (str.length == 3) {
            let t = "************************"
            let ruten = str.substr(front, (str.length - front - back)); //提取字符串下标之间的字符。
            console.log('ruten',ruten)
            return str.replace(ruten, t.substr(0,  1 ))
        }
        if ( str.length == 2) {
            let t = "************************"
            let ruten = str.substr(0,1); //提取字符串下标之间的字符。
            console.log('ruten2',ruten)
            return str.replace(ruten, t.substr(0, ruten.length < 3 ? 1 : ruten.length))
        }
        let t = "************************"
        let ruten = str.substr(front, (str.length - front - back)); //提取字符串下标之间的字符。
        return str.replace(ruten, t.substr(0, ruten.length < 3 ? 3 : ruten.length)); //字符串中用字符替换另外字符，或替换一个与正则表达式匹配的子串。
    }
    return str;
}

// 绑定关系
export function relationship(val) {
    let obj = {
      "1": "配偶",
      "2": "子女",
      "5": "父母"
    }
    return obj[val]
  }