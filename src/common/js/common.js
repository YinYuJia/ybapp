// 中国省市县ArrayData
import ChinaJson from './ChinaArray'
import addressList from './address'
import  Vuex from '../../vuex/vuex' 
export default {
    // 登录方法
    login:function(a){
        console.log(a);
    },
    // 公用请求地址

    ApiUrl:function() {
        return 'http://192.168.1.199:13030' // 吴学文
    },
    
    ApiUrl1:function() {
        return 'http://192.168.1.96:13030' // 胡伟
    },

    ApiUrl2:function() {
        return 'http://192.168.1.157:13030' // 魏陈涛
    },
    

    //打包测试地址
    // ApiUrl:function() {
    //     return ''
    // },
    // ApiUrl1:function() {
    //     return ''
    // },
    // ApiUrl2:function() {
    //     return ''
    // },
    SaveNativeData( data ) {
      return data
    },

    // 公共请求参数封装 nativemsg 原生公共报文头 data 我们要穿的参数  tradeCode 交易号码
    commonRequsetData(nativemsg,data , tradeCode) {
          let commonData = {
            tradeCode:tradeCode,
            data:data,
            ...nativemsg
          }
        return commonData
    },
    IndexList:function() {
         return {
            "code": 1,
            "data": [
              {
                "name": "办事指南",
                "id": 1,
                "clist": [
                  {
                    "id": 1,
                    "name": "设立依据"
                  },
                  {
                    "id": 2,
                    "name": "受理条件"
                  },
                  {
                    "id": 3,
                    "name": "申请材料"
                  },
                  {
                    "id": 4,
                    "name": "办理流程"
                  },
                  {
                    "id": 5,
                    "name": "办理时限"
                  },
                  {
                    "id": 6,
                    "name": "资讯电话"
                  }
                ]
              },
              {
                "name": "政策解读",
                "id": 2,
                "clist": [
                    {
                        "id": 1,
                        "name": "政策解读1"
                      },
                      {
                        "id": 2,
                        "name": "政策解读2"
                      },
                      {
                        "id": 3,
                        "name": "政策解读3"
                      },
                      {
                        "id": 4,
                        "name": "政策解读4"
                      },
                      {
                        "id": 5,
                        "name": "政策解读5"
                      },
                      {
                        "id": 6,
                        "name": "政策解读6"
                      }
                ]
              },
              {
                "name": "案例分析",
                "id": 3,
                "clist": [
                  {
                    "id": 1,
                    "name": "案例分析1"
                  },
                  {
                    "id": 2,
                    "name": "案例分析2"
                  },
                  {
                    "id": 3,
                    "name": "案例分析3"
                  },
                  {
                    "id": 4,
                    "name": "案例分析4"
                  },
                  {
                    "id": 5,
                    "name": "案例分析5"
                  },
                  {
                    "id": 6,
                    "name": "案例分析6"
                  }
                ]
              },
              {
                "name": "常见问题",
                "id": 4,
                "clist": [
                  {
                    "id": 1,
                    "name": "常见问题1"
                  },
                  {
                    "id": 2,
                    "name": "常见问题2"
                  },
                  {
                    "id": 3,
                    "name": "常见问题3"
                  },
                  {
                    "id": 4,
                    "name": "常见问题4"
                  },
                  {
                    "id": 5,
                    "name": "常见问题5"
                  },
                  {
                    "id": 6,
                    "name": "常见问题6"
                  }
                ]
              }
            ]
          }
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

    provinceList:function(){
      var name = [];
      var code = [];
      addressList.map((val,index)=>{
        name.push(val.name);
        code.push(val.code);
      });
      var list = [];
      list.push(name);
      list.push(code);
      return list;
    },

    CityList(code){
      var cityList = [];
      addressList.map((val,index)=>{
        if(val.code == code){
          cityList = val.children
        }
      });
      var name = [];
      var code = [];
      cityList.map((val,index)=>{
        name.push(val.name);
        code.push(val.code);
      })
      var list = [];
      list.push(name);
      list.push(code);
      return list;
    }
    


}