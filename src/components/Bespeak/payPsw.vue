<template>
  <div class="besDiv">
    <router-link to='/PayDetails'>
      <div class="clickBack"></div>
    </router-link>
    <router-link to='/PayConfirm'>
      <div class="clickComfirm"></div>
    </router-link>
    <img class="img" src="../../../static/images/Bespeak/payPsw.png" alt="">
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
    top: 305px;
    left: 6%; // background-color: aqua;
    transform: translateX(-50%);
    width: 40px;
  }
  .clickComfirm {
    height: 260px;
    position: absolute;
    top: 385px;
    left: 50%; // background-color: aqua;
    transform: translateX(-50%);
    width: 340px;
  }
</style>

<script>
  export default {
  }
</script>
