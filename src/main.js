// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './common/js/rem.js'
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/css/base.css';
import epFn from './common/js/common.js';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// 使用axios请求
import axios from 'axios'
// 使用vuex
import store from './vuex/vuex.js' 
// import Icon from 'vue-svg-icon/Icon.vue';
// Vue.component('icon',Icon);
import './icons';
// main.js
// 引入 c-swipe 主文件
import 'c-swipe/dist/swipe.css';
import { Swipe, SwipeItem } from 'c-swipe';

// 全局注册组件
Vue.component('swipe', Swipe);
Vue.component('swipe-item', SwipeItem);

import '../node_modules/swiper/dist/css/swiper.css'
Vue.use(ElementUI)


Vue.prototype.epFn = epFn
Vue.prototype.$axios = axios
Vue.config.productionTip = false;


// 公共请求模板
// this.$axios.post('url',{parmas}).then(function(resData){
//   cosole.log(resData)
// }).catch(function(error) {
//   console.log(error)
// })


// 调用IOS方法传参              (方法名字)
// window.webkit.messageHandlers.Scan.postMessage(1);
// IOS调用我的方法
// window.setOrderList = this.setOrderList

// vuex 储存数据方法
// this.$store.dispatch('minusPriceAsync', 30); 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})