<template>
  <div>
    <transition name="el-zoom-in-center">
      <div v-if='msg == 1'>
        <router-link to="/YiyaoIndex">
          <div class="back"></div>
        </router-link>
        <img class="img" src="../../../static/images/Bespeak/chooseHos.jpg" alt="">
        <div class="clickTrun1" @click="Click1"></div>
      </div>
    </transition>
    <div v-if='msg == 2'>
      <div class="back" @click="back2"></div>
      <img class="img" src="../../../static/images/Outpatient/settlement.png" alt="">
      <div class="clickTrun2" @click="Click2"></div>
      <div class="clickTrun2_1" @click="Click2_1"></div>
    </div>
    <div v-if='msg == 3'>
      <div class="back" @click="back3"></div>
      <img class="img" src="../../../static/images/Outpatient/payDetails.png" alt="">
      <div class="clickTrun3" @click="Click3"></div>
    </div>
    <div v-if='msg == 4'>
      <div class="back" @click="back4"></div>
      <div class="back_4" @click="back4"></div>
      <img class="img" src="../../../static/images/Outpatient/payPsw.png" alt="">
      <div class="clickTrun4" @click="Click4"></div>
    </div>
    <div v-if='msg == 5'>
      <div class="back_5" @click="back5"></div>
      <img class="img" src="../../../static/images/Outpatient/payConfirm.png" alt="">
      <div class="clickTrun5" @click="Click5"></div>
    </div>
    <div v-if='msg == 6'>
      <div class="back" @click="back6"></div>
      <img class="img" src="../../../static/images/Outpatient/payDetails.png" alt="">
      <div class="loading"><img class="img1" src="../../../static/images/Bespeak/loading.png" alt=""></div>
      <div class="clickTrun6" @click="Click6"></div>
    </div>
    <div v-if='msg == 7'>
      <div class="back" @click="back7"></div>
      <img class="img" src="../../../static/images/Outpatient/settlementDetails.png" alt="">
    </div>
    <div v-if='msg == 8'>
      <div class="back" @click="back8"></div>
      <img class="img" src="../../../static/images/Outpatient/rule.png" alt="">
    </div>
  </div>
</template>

<style lang="less" scoped>
  .img {
    width: 7.5rem;
  }
  .back {
    height: 50px;
    width: 50px;
    position: absolute;
    top: 30px;
    left: 0; // background-color: aqua;
  }
  .back_4{
    height: 50px;
    width: 50px;
    position: absolute;
    top: 310px;
    left: 0; // background-color: aqua;
  }
  .back_5{
    height: 50px;
    width: 50px;
    position: absolute;
    top: 251px;
    left: 0; // background-color: aqua;
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
  .clickTrun1 {
    height: 50px;
    width: 400px;
    position: absolute;
    top: 112px;
    left: 5px; // background-color: aqua;
  }
  .clickTrun2 {
    height: 40px;
    width: 63px;
    position: absolute;
    top: 210px;
    left: 336px;// background-color: aqua;
  }
  .clickTrun2_1 {
     height: 45px;
     width: 400px;
     position: absolute;
     top: 691px;
     left: 5px; // background-color: aqua;
   }
  .clickTrun3 {
    height: 50px;
    width: 380px;
    position: absolute;
    top: 720px;
    left: 15px; // background-color: aqua;
  }
  .clickTrun4 {
    height: 300px;
    width: 400px;
    position: absolute;
    top: 385px;
    left: 5px; // background-color: red;
  }
  .clickTrun5 {
    height: 50px;
    width: 380px;
    position: absolute;
    top: 673px;
    left: 15px;// background-color: aqua;
  }
  .clickTrun6 {
    height: 50px;
    width: 400px;
    position: absolute;
    top: 720px;
    left: 5px;// background-color: aqua;
  }
</style>

<script>
  export default {
    data() {
      return {
        msg: 1,
        flage: null
      }
    },
    methods: {
      Click1() {
        this.msg = 2
      },
      Click2() {
        this.msg = 3
      },
      Click2_1() {
        this.msg = 8
      },
      Click3() {
        this.msg = 4
      },
      Click4() {
        this.msg = 5
      },
      Click5() {
        this.msg = 6
      },
      Click6() {
        this.msg = 7
      },
      Click7() {
        this.msg = 8
      },
      back2() {
        this.msg = 1
      },
      back3() {
        this.msg = 2
      },
      back4() {
        this.msg = 3
      },
      back5() {
        this.msg = 4
      },
      back6() {
        this.msg = 5
      },
      back7() {
        this.$router.push("YiyaoIndex");
      },
      back8() {
        this.msg = 2
      },
    }
  }
</script>



