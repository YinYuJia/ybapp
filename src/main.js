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

import { MessageBox } from 'mint-ui';

import axios from 'axios'// 使用axios请求
import './utils/axios.js' //拦截器配置

import * as filters from "./utils/filter"


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
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// ### 对象的深拷贝
// this.menuFrom = Object.assign({}, res.data.result.sysFunction)

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

function  paramStr(name){
  var url = window.location.href || window.location.hash
  var after = url.split("?")[1];
  if (after) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = after.match(reg);
    if (r != null) {
      var a = '8afac8196b0b9ab2016b46f1c6e36c4e-ticket#/';
      var str1 = decodeURIComponent(r[2])
          var str = ''
          if (str1.substr(str1.length-2,2) == '#/' ) {
              str = str1.substr(0,str1.length-2)
              return str
          }else{
            return decodeURIComponent(r[2])
          }
    } else {
      return null;
    }
  }
}

console.log(paramStr("userName") === undefined)

sessionStorage.setItem("userName",paramStr("userName") || "张思佳")
sessionStorage.setItem("idCard",paramStr("idCard") || "2305226164449855698")


// router.beforeEach((to, from, next) => {
  
//   const code = 'ybzdpycyysxzsb';
//   const pwd = 'ybzdpycyysxzbpwd';
//       var ticket = paramStr("ticket") || "8afac0cc6ac672af016b4beac17d55f9-ticket";
//        console.log('ticket-------------',ticket)
//        var token = sessionStorage.getItem("getToken")
//        console.log('token-------------',token)
//           if ( token != "" && token != undefined && token != null) {
//             axios.post("/userInfo" , {
//               "token":token
//               }).then(result1=>{
//                     console.log('result1',result1)
//               })
//           }else{
//             if (ticket != "" && ticket != undefined && ticket != null) {
//                      // http://192.168.200.130:80 光耀地址
//                     //  http://192.168.200.130:7777
//                     axios.post("/ticketInfo" , {
//                       "st":ticket
//                     }).then(result0 => {
//                       console.log('result0',result0)
//                       console.log('result-typeof--获取',typeof result0.result)
                     
//                       if ( result0.result == "0") {
//                         sessionStorage.setItem("getToken",result0.token)
//                         console.log(sessionStorage.getItem("getToken"))
//                       }else{
//                         MessageBox.alert(result0.errmsg);
//                         console.log("return前面")
//                         // return;
//                       }
                      
//                       axios.post("/userInfo" , {
//                         "token":result0.token
//                         }).then(result1=>{
                        
//                               console.log('result1',result1)

//                         })
//                     });
//             } else {
//               console.log("授权侵入")
//               window.location.href = "https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode="+ code + "&goto=" + window.location.href;
//             }
//           }
// })
















new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
