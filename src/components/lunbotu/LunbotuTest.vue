<template>
  <div class="swiper-container bestDiv">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in 10" :key="'Sli'+item">Slide {{item}}</div>
    </div>
    <!-- Add Pagination -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<style lang='less' scoped>
  .bestDiv {
    height: 100px;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
</style>

<script>
  import Swiper from 'swiper';
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
    },
    mounted() {
      new Swiper('.swiper-container', {
        slidesPerView: 5,
        spaceBetween: 20,
        autoplay: true,
        //   pagination: {
        //     el: '.swiper-pagination',
        //     clickable: true,
        //   },
      });
    }
  }
</script>


