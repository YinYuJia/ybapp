// 中国省市县ArrayData
import ChinaJson from './ChinaArray'
export default {
    // 登录方法
    login:function(a){
        console.log(a);
    },
    // 公用请求地址
    ApiUrl:function() {
        return 'http://192.168.101.62:8001'
    },
    // 中国省市县json转换
    ChinaJsonDatas:function() {
        const dataArray = []
        // 中国省市县json数据
        ChinaJson.map((item,index) => {
           const dataArray2 = []
           item.city.map((item2,index2) => {
             const dataArray3 = []
             item2.area.map((item3,index3) =>{
                 dataArray3.push({
                   label:item3,
                   value:item3
                 })
             })
             dataArray2.push({
               label:item2.name,
               value:item2.name,
               children:dataArray3
             })
           })
           dataArray.push({
             label:item.name,
             value:item.name,
             children:dataArray2
           })
        })
        return dataArray
    },  
}