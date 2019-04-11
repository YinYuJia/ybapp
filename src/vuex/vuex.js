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
      },

      actions:{ //添加actions
        SET_PRODUCTS( context, payload ) {
          context.commit( 'SET_PRODUCTS', payload ); //context提交
        },
      }
})