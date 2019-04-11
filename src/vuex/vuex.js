import Vue from 'vue'  //引入vue
import Vuex from 'vuex'  // 引入vuex
Vue.use(Vuex)   // 注册vuex
export default new Vuex.Store({  // 暴露与new vuex
    state:{ 
        products: [
          {name: '鼠标', price: 20},
          {name: '键盘', price: 40},
          {name: '耳机', price: 60},
          {name: '显示屏', price: 80}
        ],
        flage:'1'
      },
      // 计算属性 getters
      getters:{
        Old:(state) => {
          let a = state.products.map( product => {
            return {
              name: product.name,
              price: product.price / 2
            }
          })
          return a;
        }
      },
      // 相当于methods
      mutations:{
        minusPrice (state, payload ) {
          state.products = payload
        },
        SET_FLAGE(state,payload) {
          state.flage = payload
        }
      },

      actions:{ //添加actions
        minusPriceAsync( context, payload ) {
          context.commit( 'minusPrice', payload ); //context提交
        },
        SET_FLAGE(context,payload) {
          context.commit( 'SET_FLAGE', payload );
        }
      }
})