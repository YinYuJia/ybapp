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
        SET_TREATMENT_REIMBURSEMENT:{}
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

      }
})