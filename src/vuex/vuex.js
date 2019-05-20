import Vue from 'vue'  //引入vue
import Vuex from 'vuex'  // 引入vuex
Vue.use(Vuex)   // 注册vuex
export default new Vuex.Store({  // 暴露与new vuex
    state:{ 
        SET_PRODUCTS: [
          {name: '鼠标', price: 20},
          {name: '键盘', price: 40},
          {name: '耳机', price: 60},
          {name: '显示屏', price: 80}
        ],
        SET_SELECT:'选项1',
        SET_SELECTARRAY:[],
        // 待遇报销表单
        SET_TREATMENT_REIMBURSEMENT: {
          // 开始时间
          startDate: '',
          // 结束时间
          endDate:"",
          // 就诊类型
          TypeOfVisit:"",
          // 省
          province:"",
          // 市
          city:"",
          // 就诊机构
          VisitingInstitution:"",
          // 发票号
          InvoiceNumber:"",
          // 总金额
          TotalSum:""
        },
        SET_ELSEWHERE_OPERATION:{
          name: '',
          //联系人
          phone:"",
          //联系电话
          reason: '',
          //申请原因
          leave: '',
          //离杭时间
          back: '',
          //回杭时间
          delivery: false,
          address:""
          //详细地址
        }
      },
      // 计算属性 getters
      getters:{
        SET_PRODUCTS:(state) => {
          let a = state.SET_PRODUCTS.map( product => {
            return {
              name: product.name,
              price: product.price / 2,
              name2:product.name + (Number(product.price) + 1)
            }
          })
          return a;
        },
        SET_ELSEWHERE_OPERATION:(state) => {
          
          let a = state.SET_ELSEWHERE_OPERATION
          if (a.selectedOptions.length != 0 ) {
            console.log('a.operation',a.selectedOptions[3])
            a.selectedOptions = a.selectedOptions[3]
          }
          
          return a;
        },
        SET_TREATMENT_REIMBURSEMENT:(state) => {
          state.SET_TREATMENT_REIMBURSEMENT.startDate = state.SET_TREATMENT_REIMBURSEMENT.startDate.valueOf()
          state.SET_TREATMENT_REIMBURSEMENT.endDate = state.SET_TREATMENT_REIMBURSEMENT.endDate.valueOf()
          let a = new Date(state.SET_TREATMENT_REIMBURSEMENT.startDate)
          let b = new Date(state.SET_TREATMENT_REIMBURSEMENT.endDate)
          
           state.SET_TREATMENT_REIMBURSEMENT.startDate = a.toLocaleDateString().replace(/\//g, "-") 
           state.SET_TREATMENT_REIMBURSEMENT.endDate =  b.toLocaleDateString().replace(/\//g, "-") 
          return state.SET_TREATMENT_REIMBURSEMENT;
        },

      },
      // 相当于methods
      mutations:{
        SET_PRODUCTS (state, payload ) {
          state.SET_PRODUCTS = payload
        },
        SET_SELECT (state,payload) {
          state.SET_SELECT = payload
        },
        SET_SELECTARRAY (state,payload) {
          state.SET_SELECTARRAY = payload
        },
        SET_TREATMENT_REIMBURSEMENT (state,payload) {
          state.SET_TREATMENT_REIMBURSEMENT = payload
        },
        SET_ELSEWHERE_OPERATION(state,payload){
          state.SET_ELSEWHERE_OPERATION = payload
        }
      },

      actions:{ //添加actions
        SET_PRODUCTS( context, payload ) {
          context.commit( 'SET_PRODUCTS', payload ); //context提交
        },
        SET_SELECT( context, payload ) {
          context.commit( 'SET_SELECT', payload ); //context提交
        },
        SET_SELECTARRAY( context, payload ) {
          context.commit( 'SET_SELECTARRAY', payload ); //context提交
        },
        SET_TREATMENT_REIMBURSEMENT( context, payload ) {
          context.commit( 'SET_TREATMENT_REIMBURSEMENT', payload ); //context提交
        },
        SET_ELSEWHERE_OPERATION( context, payload ) {
          console.log('payload',payload)
          context.commit( 'SET_ELSEWHERE_OPERATION', payload ); //context提交
        }
      }
})