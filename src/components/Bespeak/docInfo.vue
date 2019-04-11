<template>
  <div class="besDiv">
    <router-link to='/DocList'>
      <div class="clickBack"></div>
    </router-link>
    <router-link to='/Rule'>
      <div class="clickRule"></div>
    </router-link>
    <router-link to='/RegisterConfirm'>
      <div class="clickRegister"></div>
    </router-link>
    <router-link to='/BespeakConfirm'>
      <div class="clickBespeak"></div>
    </router-link>
    <img class="img" src="../../../static/images/Bespeak/docInfo.png" alt="">
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
  .clickRule {
    height: 35px;
    position: absolute;
    top: 700px;
    left: 50%; // background-color: aqua;
    transform: translateX(-50%);
    width: 370px;
  }
  .clickRegister {
    height: 30px;
    position: absolute;
    top: 292px;
    left: 87%; // background-color: aqua;
    transform: translateX(-50%);
    width: 70px;
  }
  .clickBespeak {
    height: 30px;
    position: absolute;
    top: 470px;
    left: 87%; // background-color: aqua;
    transform: translateX(-50%);
    width: 70px;
  }
</style>

<script>
  export default {
  }
</script>
