<template>
  <div class="besDiv">
    <!-- <router-link to='/first'>
                <div class="clickTrun"></div>
              </router-link> -->
    <router-link to='/ChooseHos'>
      <div class="clickTrun" @click="Click"></div>
    </router-link>
    <router-link to='/dianzishebaoka'>
      <div class="clickTrun1" @click="Click1"></div>
    </router-link>
    <div class="clickTrun2" @click="Click2"></div>
    <!-- 轮播图 -->
    <!-- <router-link to='/lunbotuTest'>
      <div class="clickTrun3" @click="Click3"></div>
    </router-link> -->
    <img class="img" src="../../static/images/index/index.jpg" alt="">
    <v-Foter :info='info'></v-Foter>
    <div></div>
  </div>
</template>

<style lang='less' scoped>
  .besDiv {
    height: 100%;
    img {
      width: 7.5rem;
    }
  }
  .clickTrun {
    height: 70px;
    width: 100px;
    position: absolute;
    top: 174px;
    left: 40%; // background-color: aqua;
    transform: translateX(-50%);
    width: 80px;
  }
  .clickTrun1 {
    height: 70px;
    width: 100px;
    position: absolute;
    top: 174px;
    left: 10px; // background-color: aqua;
    width: 80px;
  }
  .clickTrun2 {
    height: 80px;
    width: 100px;
    position: absolute;
    top: 94px; // background-color: aqua;
    left: 30px;
    width: 80px;
  }
  .clickTrun3 {
    height: 80px;
    width: 100px;
    position: absolute;
    top: 154px; // background-color: red;
    left: 200px;
    width: 80px;
  }
</style>

<script>
  import Foter from './Footer';
  export default {
    // 数据集合
    data() {
      return {
        imgUrl: "../../static/images/index/index.jpg",
        mess: "1",
        StoreMst: this.$store.state.products,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        info: "IndexComponent"
      }
    },
    components: {
      'v-Foter': Foter
    },
    // 生命周期发送请求
    created() {
      console.log(this.$store.state.products)
      this.$store.dispatch('minusPriceAsync', 30); //分发actions中的minusPriceAsync这个异步函数
    },
    beforeDestroy() {},
    // 计算属性
    computed: {
      // 计算属性的 getter
      reversedMessage: function() {
        // `this` 指向 vm 实例
        return this.form.name.split('').reverse().join('')
      }
    },
    // 监听数据
    watch: {
      // msg 要监听的值变化
    },
    mounted() {
      let a = {
        a: 0,
        b: 1,
        c: 2
      };
      let b = {
        a: 0,
        b: 1,
        c: 2
      };
      let c = {
        a: 1,
        b: 1,
        c: 2
      };
      let x = JSON.stringify(a) == JSON.stringify(b);
      let y = JSON.stringify(a) == JSON.stringify(c);
      console.log(x);
      console.log(y)
    },
    // 方法集合
    methods: {
      Click() {
        // 设置vuex里面储存的数据
        console.log(this.$store.state.products)
        // 不固定跳转
        // this.$router.push("/")
      },
      Click1() {
        // 设置vuex里面储存的数据
        console.log(this.epFn.ApiUrl())
        console.log(this.$store.state.products)
      },
      Click2() {
        window.webkit.messageHandlers.Scan.postMessage(1);
        // let arrData = {
        //     id:1, 
        //   }
        //  window.location.href = '/index:id=1' ;
        // 设置vuex里面储存的数据
        console.log(this.epFn.ApiUrl())
        console.log(this.$store.state.products)
      },
      Click3() {
      },
    }
  }
</script>


