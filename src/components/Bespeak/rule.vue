<template>
  <div class="besDiv">
    <router-link to='/DocInfo'>
      <div class="clickBack"></div>
    </router-link>
    <img class="img" src="../../../static/images/Bespeak/rule.png" alt="">
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
</style>

<script>
  export default {

  }
</script>
