<template>
  <div class="hello">
      <!-- 头部 -->
    <header class="header">
       <Header></Header>
    </header>
     <!-- 导航 -->
    <nav class="nav">
         <Navbar PropMsg="WorkNav"></Navbar>
    </nav>
    <!-- 菜单栏 -->
    <div class="nav_list">
         <!-- Work_NavList -->
         <NavList PropsMsg = "Work_NavList"></NavList>
    </div>
    <!-- 我的事项 -->
    <div class="my_items">
      <MyItems></MyItems>
    </div>
    <!-- 客服、指南 -->
    <div class="service_guide">
      <Service></Service>
    </div>
    <!-- 药店分类 -->
    <div class="classified_nav">
      <ClassifiedNav Types = "work"></ClassifiedNav>
    </div>
     <!-- 新闻资讯 -->
    <div class="News">
      <News PropsFlage = "1"></News>
    </div>

    <div class="News">
      <News  PropsFlage = "2"></News>
    </div>
    <div class="last">

    </div>
    <Footer :info="info"></Footer>
  </div>
</template>

<script>
  import Header from './commonComponent/Work/Header'
  import Navbar from './commonComponent/Index/Navbar.vue'
  import MyItems from './commonComponent/Work/MyItems'
  import NavList from './commonComponent/Index/IconNav.vue'
  import Service from './commonComponent/Work/Service'
  import ClassifiedNav from './commonComponent/Index/Classified';
  import News from './commonComponent/Work/News.vue'

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
      'MyItems': MyItems,
      'NavList': NavList,
      'Service': Service,
      'ClassifiedNav': ClassifiedNav,
      'News' : News,
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
        height: 1.2rem;
    }
    .nav {
        padding-left: 1rem;
        padding-right: 1rem;
        background-color: #ffffff;
    }
    .my_items{
      margin-top: .15rem;
    }
    .nav_list {
        margin-top: .15rem;
    }
    .service_guide{
        margin-top: .15rem;
    }
    .classified_nav{
      margin-top: .15rem;
    }
    .News {
      margin-top: .15rem;
    }
    .last {
      height: 1.62rem;
    }
  }
</style>
