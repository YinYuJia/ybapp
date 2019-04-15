<template>
  <div class="hello">
    <header>
       <Header></Header>
    </header>
    <nav class="nav">
        <Navbar></Navbar>
    </nav>
    <Footer :info="info"></Footer>
  </div>
</template>

<script>
  import Header from './commonComponent/Index/Header'
  import Navbar from './commonComponent/Index/Navbar'
  import Footer from './Footer.vue'
  
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        imgHieight: '',
        info: {
          msg:"index"
        }
      }
    },
    methods: {
      click() {
        console.log('this.$store.state.SET_PRODUCTS', this.$store.state.SET_PRODUCTS)
      }
    },
    components: {
      'Header': Header,
      'Navbar': Navbar,
      "Footer": Footer
    },
    created() {
      console.log('this.$store.state.SET_PRODUCTS', this.$store.state.SET_PRODUCTS)
      console.log('this.$store.getters.SET_PRODUCTS', this.$store.getters.SET_PRODUCTS)
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
    .nav {
        margin-top: -1px;
    }
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
