export function tuoMin(str, front, back) {
    if (typeof str == 'string') { //参数为字符串类型
        if (str.length == 3) {
            let t = "************************"
            let ruten = str.substr(front, (str.length - front - back)); //提取字符串下标之间的字符。
            console.log('ruten',ruten)
            return str.replace(ruten, t.substr(0,  2 ))
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

// 是否邮寄
export function isMail(val) {
    let obj = {
      "1": "自取",
      "2": "邮寄"
    }
    return obj[val]
  }

/*退休类别过滤*/
export function trtireType(value) {
  let str = "";
  switch (parseInt(value)) {
    case 0:
      str = "否";
      break;  

    case 1:
      str = "因病";
      break;

    case 3:
      str = "特殊工种";
      break;

    case 4:
      str = "符合浙委办[2009]14号";
      break;

    case 5:
      str = "其他";
      break;

    case 6:
      str = "浙政发[2015]37号";
      break;

      
    default:
      break;
  }
  return str;
}