// 中国省市县ArrayData
import ChinaJson from './ChinaArray'
export default {
    // 登录方法
    login:function(a){
        console.log(a);
    },
    // 公用请求地址
    ApiUrl:function() {
        return 'https://d0f44a2a-91b0-421c-abb3-9ffab08af413.mock.pstmn.io'
    },
    SaveElseWhereState(data) {
        return data
    },
    IndexList:function() {
         return {
            "cdoe": 1,
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
}