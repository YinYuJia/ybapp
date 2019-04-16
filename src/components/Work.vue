<template>
  <div class="hello">
      <!-- 头部 -->
    <header class="header">
       <Header></Header>
    </header>
     
    <nav class="nav">
         <Navbar PropMsg="WorkNav"></Navbar>
    </nav>

    <Footer :info="info"></Footer>
  </div>
</template>

<script>
  import Header from './commonComponent/Work/Header'
  import Navbar from './commonComponent/Index/NavBar.vue'

  import Footer from './Footer.vue'
  
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        imgHieight: '',
        info: {
          msg:"work"
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

      "Footer": Footer,

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
    width: 7.5rem;
    .header {
        overflow: hidden;
    }
    .nav {
        padding-left: 1rem;
        padding-right: 1rem;
        background-color: #ffffff;
    }
  }
</style>
