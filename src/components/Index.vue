<template>
  <div class="hello">
      <!-- 头部 -->
    <header class="header">
       <Header></Header>
    </header>
    <!-- 导航 -->
    <nav class="nav">
        <Navbar PropMsg = 'IndexNav'></Navbar>
    </nav>
    <!-- 菜单栏 -->
    <div class="menu_bar">
        <MenuBar></MenuBar>
        <WorkProgress></WorkProgress>
    </div>
    <!-- 轮播图 -->
    <div class="Rotation_chart">
        <RotationChart Propmsg = "Healthy"></RotationChart>
    </div>
    <!-- 机构、医师、药店分类 -->
    <div class="Classified_nav">
        <ClassifiedNav Types = "index"></ClassifiedNav>
    </div>
    <!-- 科室列表 -->
    <div class="departments_list">
        <RotationChart Propmsg = "DepartmentsList"></RotationChart>
    </div>
    <!-- 预防轮播图 -->
    <div class="Rotation_chart2">
        <RotationChart Propmsg = "Rotation_chart2"></RotationChart>
    </div>
    <!-- 底部提示信息 -->
    <div class="bottom">
        <HintMsg></HintMsg>
    </div>
    <Footer :info="info"></Footer>
  </div>
</template>

<script>
  import Header from './commonComponent/Index/Header'
  import Navbar from './commonComponent/Index/Navbar'
  import WorkProgress from './commonComponent/Index/WorkProgress'
  import MenuBar from './commonComponent/Index/IconNav'
  import ClassifiedNav from './commonComponent/Index/Classified'
  import HintMsg from './commonComponent/Index/HintMsg'
  import RotationChart from './commonComponent/Index/RotationChart'
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
      'RotationChart':RotationChart,
      "Footer": Footer,
      "WorkProgress": WorkProgress,
      "ClassifiedNav": ClassifiedNav,
      "HintMsg": HintMsg
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
    .header {
        overflow: hidden;
    }
    .nav {
        margin-top: -1px;
        width: 7.5rem;
        overflow: hidden;
    }
    .menu_bar {
        overflow: hidden;
    }
    .Rotation_chart {
        margin-top: .15rem;
        overflow: hidden;
        // height: 2.1rem;
        // background-color: #ffffff;
    }
  .Classified_nav {
    margin-top: .15rem;
  }
    .departments_list {
        overflow: hidden;
        margin-top: .15rem;
        background-color: #ffffff;
        padding-left: .28rem;
    }
      .Rotation_chart2 {
        margin-top: .15rem;
        overflow: hidden;
        height: 2.8rem;
        background-color: white;        // height: 2.1rem;
        // background-color: #ffffff;
    }
    .bottom {
      margin-bottom: 70px;
    }
  }
</style>
