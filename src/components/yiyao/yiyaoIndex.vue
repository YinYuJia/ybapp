<template>
    <div>
        <img src="../../../static/images/yiyao/1.jpg" class="img" alt="">
        <router-link to="/ChooseHos">
            <div class="clickTrun" @click="Click"></div>
        </router-link>
        <router-link to="/Paiduijiaohao">
            <div class="clickTrun1" @click="Click1"></div>
        <router-link to="/jianchabaogao">
            <div class="clickTrun2" @click="Click2"></div>
        </router-link>
            <div class="clickTrun3" @click="Click3"></div>
        </router-link>
      <router-link to="/Outpatient">
      <div class="clickTrun3" @click="Click3"></div>
      </router-link>
            <div class="clickTrun4" @click="Click4"></div>
        <v-Foter :info="info"></v-Foter>
    </div>
</template>

<style lang="less" scoped>
    .img {
        width: 7.5rem;
    }
    .clickTrun {
        height: 60px;
        width: 60px;
        position: absolute;
        top: 104px;
        left: 20px;
        // background-color: aqua;
    }
    .clickTrun1 {
        height: 60px;
        width: 60px;
        position: absolute;
        top: 104px;
        left: 100px;
        opacity: .5;
        // background-color: red;
    }
    .clickTrun2 {
        height: 60px;
        width: 60px;
        position: absolute;
        top: 104px;
        left: 180px;
        // background-color: yellow;
        opacity: .5;
    }
    .clickTrun3 {
        height: 60px;
        width: 60px;
        position: absolute;
        top: 104px;
        left: 330px;
        // background-color: #0f0;
        opacity: .5;
    }
</style>

<script>
    import Foter from '../Footer';
    export default {
        data() {
            return {
                info: 'YiyaoIndex'
            }
        },
        components: {
            'v-Foter': Foter
        },
        methods: {
            Click() {
            },
            Click1() {
            },
            Click2() {
                console.log(11111)
            },
            Click3() {
            },
            Click4() {
            },
        }
    }
</script>



