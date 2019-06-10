// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import store from './vuex/vuex.js' // 使用vuex
import './common/js/rem.js'
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/css/base.css';
import epFn from './common/js/common.js';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios'// 使用axios请求
import './utils/axios.js' //拦截器配置


// import Icon from 'vue-svg-icon/Icon.vue';
// Vue.component('icon',Icon);
import './icons';
// main.js

import 'c-swipe/dist/swipe.css';// 引入 c-swipe 主文件
import { Swipe, SwipeItem } from 'c-swipe';

// 引入mintUI
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

// 使用utils
import Util from './utils/util'
Vue.prototype.util = Util;

import Vconsole from 'vconsole';

let vConsole = new Vconsole()

export default vConsole;

// Vue.use(vConsole)

// 全局注册组件
Vue.component('swipe', Swipe);
Vue.component('swipe-item', SwipeItem);

import '../node_modules/swiper/dist/css/swiper.css'
Vue.use(ElementUI)


Vue.prototype.epFn = epFn
Vue.prototype.$axios = axios
Vue.config.productionTip = false;

// 获取Android参数
// created(){
//   window.getAndroid = this.getAndroid;
// },
// methods:{
//   getAndroid(dataStr) {
//     this.id = dataStr.pageSize;
//   },
// }


// 公共请求模板
// this.$axios.post('url',{parmas}).then((resData) => {
//   cosole.log(resData)
// }).catch((error) => {
//   console.log(error)
// })

// 调用IOS方法传参              (方法名字)
// window.webkit.messageHandlers.Scan.postMessage(1);
// 调用安卓方法
// window.dzsb.back('H5message');

// 原生调用我的方法
// window.setOrderList = this.setOrderList

// vuex 储存数据方法
// this.$store.dispatch('minusPriceAsync', 30); 

// Svg 图片
{/* <svg-icon icon-class="1"  className = "Svg" /> */}
/* eslint-disable no-new */


// 路由传参
// this.$router.push({
//   name: 'TreatmentReimbursement',
//   params: {
//       id: 1
//   }
// })
// 子组件过去参数
// this.$route.params.id

// 判断终端
// var u = navigator.userAgent;
// var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
// var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
