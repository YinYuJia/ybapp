<template>
  <div v-loading="loading" class="besDiv">
    <router-link to='/YiyaoIndex'>
      <div class="clickBack"></div>
    </router-link>
    <!--<router-link to='/ChooseDepartment'>-->
      <div class="clickHos" @click="onClickHos"></div>
    <!--</router-link>-->
    <div style="height: 200px;">
      <transition name="el-zoom-in-center">
      <div v-show="show">
        <img class="img" src="../../../static/images/Bespeak/chooseHos.jpg" alt="">
      </div>
      </transition>
    </div>
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
  .clickBack {
     height: 40px;
     position: absolute;
     top: 23px;
     left: 6%; // background-color: aqua;
     transform: translateX(-50%);
     width: 40px;
   }
  .clickHos {
    height: 35px;
    position: absolute;
    top: 120px;
    /*left: 40%; // background-color: aqua;*/
    transform: translateX(-50%);
    width: 740px;
  }
</style>

<script>
  export default {
    data(){
      return {
        loading:false,
        show:false,
      }
    },
    mounted(){
      this.show=true;
    },
    methods:{
      onClickHos(){
        // this.show=false;
        //   setTimeout(()=>{
        //     // alert(1);
          this.$router.push("/ChooseDepartment")
        // },300)
      }
    }
  }
</script>
