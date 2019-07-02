// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import vuex from './vuex/vuex.js';
import store from './vuex/vuex.js' // 使用vuex
import './common/js/rem.js'
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/css/base.css';
import epFn from './common/js/common.js';

import ep from './common/js/epsdk'
Vue.prototype.$ep = ep

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



// Vue.use(vConsole)

// 全局注册组件
Vue.component('swipe', Swipe);
Vue.component('swipe-item', SwipeItem);
// 全局组件
import GlobalComponent from './common/js/globalComponents'
Vue.use(GlobalComponent);

import '../node_modules/swiper/dist/css/swiper.css'
import { nextTick } from 'q';
Vue.use(ElementUI)



Vue.prototype.epFn = epFn
Vue.prototype.$axios = axios
Vue.config.productionTip = false;
 if(process.env.NODE_ENV == 'development') {
  Vue.prototype.$isSdk = true
}else{
  Vue.prototype.$isSdk = true

}

Object.keys(filters).forEach(key => { //过滤器
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

function ApiUrl() {
  // return 'http://10.85.159.203:13030' // 吴学文
  console.log('process.env.NODE_ENV',process.env.NODE_ENV)
  if(process.env.NODE_ENV == 'development') {
    return 'http://47.98.48.185:8000/api/api'  //服务器
    // return 'http://192.168.1.189:13030' //吴学文
  }else{
    return ''
  }
}

console.log('欢迎进入医保专区首页main.js')

import Vconsole from 'vconsole';
var vConsole = new Vconsole()
export default vConsole;

// 1  网新恩普包  2  浙理办包
Vue.prototype.$build = "1"

const isShow = false

if (isShow ) {
  router.beforeEach((to, from, next) => {
  
    const code = 'yibaozs';
    console.log()
    // var ticket = paramStr("ticket") || "8afac0cc6b84c4aa016b8e7fb4662798-ticket";
    var ticket = paramStr("ticket");
     console.log('ticket-------------',ticket)
     var token = sessionStorage.getItem("getToken")
     console.log('token-------------',token)
     //59.202.42.147:23030
        if ( token != "" && token != undefined && token != null) {
          axios.post(ApiUrl()+"/H5/jy2005/info" , {
            "token":token,
            "tradeCode":"2005"
            }).then(result2=>{
                  console.log('result2-----------------',result2)
                    if ( result2.result == "0") {
                      sessionStorage.setItem("userName",result2.username)
                      sessionStorage.setItem("idCard",result2.idnum)
                      
                      console.log('userName',result2.username)
                      console.log('idCard',result2.idnum)
                      next()
                    }else{
                      MessageBox.alert(result2.errmsg);
                      return;
                    }
            })
        }else{
          if (ticket != "" && ticket != undefined && ticket != null) {

            console.log(11111111111111111111111111111111111111111111111)
                  axios.post(ApiUrl()+"/H5/jy2004/info" , {
                    "st":ticket,
                    "tradeCode":"2004"
                  }).then(result0 => {
                    console.log('result0----------------------',result0)

                    if ( result0.result == "0") {
                      sessionStorage.setItem("getToken",result0.token)
                    }else{
                      MessageBox.alert(result0.errmsg);
                      return;
                      // return;
                    }
                    
                    axios.post(ApiUrl()+"/H5/jy2005/info" , {
                      "token":result0.token,
                      "tradeCode":"2005"
                      }).then(result1=>{
                          console.log('result1------------------',result1)
                             if ( result1.result == "0") {
                              sessionStorage.setItem("userName",result1.username)
                               sessionStorage.setItem("idCard",result1.idnum)

                               console.log('userName',result1.username)
                               console.log('idCard',result1.idnum)
                               next()
                             }else{
                              MessageBox.alert(result1.errmsg);
                             }
                      })
                  });
          } else {
            console.log("授权侵入")
            window.location.href = "https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode="+ code + "&goto=" + window.location.href;
          }
        }
})
}

















new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
