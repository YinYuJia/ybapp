<template>
  <div class="hello">
      <!-- 头部 -->
    <header>
       <Header></Header>
    </header>
    <!-- 导航 -->
    <nav class="nav">
        <Navbar></Navbar>
    </nav>
    <!-- 菜单栏 -->
    <div class="menu_bar">
        <MenuBar></MenuBar>
    </div>
    <!-- 轮播图 -->
    <div class="Rotation_chart">
        <!-- <RotationChart></RotationChart> -->
    </div>
    <Footer :info="info"></Footer>
  </div>
</template>

<script>
  import Header from './commonComponent/Index/Header'
  import Navbar from './commonComponent/Index/Navbar'
  import MenuBar from './commonComponent/IconNav'
  import RotationChart from './lunbotu/RotationChart'
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
      'MenuBar': MenuBar,
      'RotationChart': RotationChart,
      "Footer": Footer
    },
    created() {
       console.log(MenuBar)
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
    * {
        overflow: hidden;
    }
    h1 {
        height: 100px;
        background-color: #99a9bf;
    }
    .nav {
        margin-top: -1px;
        width: 7.5rem;
        overflow: hidden;
    }
    .Rotation_chart {
        margin-top: .15rem;
        height: 2.1rem;
        background-color: #ffffff;
    }
  }
</style>
