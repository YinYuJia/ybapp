<template>
  <div class="hello">
    <v-RotationChart></v-RotationChart>
    <router-link to='/first'>
      <div class="clickTrun"></div>
    </router-link>
    <!-- <router-link to='/first'>go go go！！！</router-link> -->
    <Footer :info="info"></Footer>
  </div>
</template>

<script>
  import RotationChart from '../components/lunbotu/RotationChart.vue';
  import Footer from './Footer.vue'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        imgHieight: '',
        info:"My"
      }
    },
    components: {
      'v-RotationChart': RotationChart,
      "Footer":Footer
    },
    created() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .hello {
    height: 100%;
    img {
      width: 7.5rem;
      height: 100%;
    }
    ;
    .clickTrun {
      position: absolute;
      top: 694px;
      height: 40px;
      width: 180px;
      left: 50%;
      transform: translateX(-50%);
      background-color: aqua;
      z-index: 1000;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
</style>
