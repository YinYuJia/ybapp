<template>
  <div class="hello">
    <v-RotationChart></v-RotationChart>
    <router-link to='/IndexComponent'>
      <div class="clickTrun"><img src="../../static/images/StartupPage/start.png" alt=""></div>
    </router-link>
    <!-- <router-link to='/first'>go go go！！！</router-link> -->
  </div>
</template>

<script>
  import RotationChart from '../components/lunbotu/RotationChart.vue';
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        imgHieight: ''
      }
    },
    components: {
      'v-RotationChart': RotationChart
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
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
</style>
