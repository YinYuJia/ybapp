<template>
  <div class="besDiv">
    <div class="loading"><img class="img1" src="../../../static/images/Bespeak/loading.png" alt=""></div>
    <img class="img" src="../../../static/images/Bespeak/paySuccess.png" alt="">
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
  .loading {
    .img1{
      width: 3.3rem;
    }
    height: 40px;
    position: absolute;
    top: 365px;
    left: 50%; // background-color: aqua;
    transform: translateX(-50%);
    width: 340px;
  }
</style>

<script>
  export default {
    mounted(){
      setTimeout(()=>{
        this.$router.push("RegisterDetails");
      },1000);
    }
  }
</script>
