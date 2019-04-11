<template>
  <div class="besDiv">
    <router-link to='/ChooseHos'>
      <div class="clickBack"></div>
    </router-link>
    <router-link to='/DocList'>
      <div class="clickDepartment"></div>
    </router-link>
    <div style="height: 200px;">
      <transition name="el-zoom-in-center">
        <div v-show="show">
          <img class="img" src="../../../static/images/Bespeak/chooseDepartment.png" alt="">
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
  .clickDepartment {
    height: 35px;
    position: absolute;
    top: 87px;
    left: 75%; // background-color: aqua;
    transform: translateX(-50%);
    width: 170px;
  }
</style>

<script>
  export default {
    data(){
      return {
        show:false
      }
    },
    mounted(){
      this.show=true
    }
  }
</script>
