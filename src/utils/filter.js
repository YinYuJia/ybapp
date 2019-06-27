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

// 是否邮寄
export function isMail(val) {
    let obj = {
      "1": "自取",
      "2": "邮寄"
    }
    return obj[val]
  }

  // 项目类型
export function projectType(val) {
  let obj = {
    "1": "药品",
    "2": "诊疗"
  }
  return obj[val]
}

// 用药时期
export function medicationDate(val) {
  let obj = {
    "0": "其它",
    "1": "治疗期",
    "2": "维护期",
    "3": "住院期",
  }
  return obj[val]
}

// 特药特质类型
export function specialType(val) {
  let obj = {
    "24": "高强度超声聚焦刀治疗",
    "23": "太空仓全身红外热疗",
    "22": "89锶-骨转移治疗",
    "16": "盐酸埃克替尼片",
    "15": "金黄色葡萄球菌滤液制剂",
    "14": "聚肌胞",
    "13": "胸腺肽",
    "28": "特殊康复",
    "12": "聚乙二醇干扰素",
    "21": "催眠治疗"
  }
  return obj[val]
}

// 特药特质类型 AKC030 
export function AKC030 (val) {
  let obj = {
    "1": "退休异地安置",
    "2": "在职驻外工作",
    "3": "异地探亲",
    "4": "异地生育",
    "5": "子女统筹异地学习/抚养"
  }
  return obj[val]
}
// 就诊疗程 BKE255
export function medicaladvice (val) {
  let obj = {
    "1": "就诊",
    "2": "复诊",
  }
  return obj[val]
}

// 报销状态
export function BKE586 (val) {
  let obj = {
    "0": "无记录",
    "1": "有记录未报销",
    "2": "报销中",
    "3": "已报销",
    "9": "已作废",
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