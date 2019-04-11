<template>
    <div>
        <transition name="el-zoom-in-center">
            <div v-if='msg == 1'>
                <router-link to="/Work">
                    <div class="back"></div>
                </router-link>
                <img class="img" src="../../../static/images/Work/16.jpg" alt="">
                <div class="clickTrun1" @click="Click1"></div>
            </div>
        </transition>
        <transition name="el-zoom-in-center">
            <div v-if='msg == 2'>
                <div class="back" @click="back2"></div>
                <img class="img" src="../../../static/images/Work/2.jpg" alt="">
                <div class="clickTrun2" @click="Click2"></div>
            </div>
        </transition>
        <div v-if='msg == 3'>
            <div class="back" @click="back3"></div>
            <img class="img" src="../../../static/images/Work/3.jpg" alt="">
            <div class="clickTrun3" @click="Click3"></div>
        </div>
        <div v-if='msg == 4'>
            <div class="back" @click="back4"></div>
            <img class="img" src="../../../static/images/Work/18.jpg" alt="">
        </div>
        <div v-if='msg == 5'>
            <div class="back" @click="back5"></div>
            <img class="img" src="../../../static/images/Work/faf.jpg" alt="">
            <div class="clickTrun4" @click="open"></div>
        </div>
        <TipsTrueComponent :message = "message" v-on:TipsTrue = 'TipsTrue' v-if="show" ></TipsTrueComponent>
    </div>

</template>

<script>
import TipsTrueComponent from '../commonComponent/TipsTrueComponent'
    export default {
        data() {
            return {
                msg: 1,
                flage: null,
                mmm:0,
                show:false,
                message:"成功"
            }
        },
        components:{
            TipsTrueComponent:TipsTrueComponent
        },
        methods: {
            TipsTrue() {
                this.show = false
                this.$router.push("/Work")
            },
            Click1() {
                this.msg = 2
            },
            Click2() {
                this.msg = 3
            },
            Click3() {
                this.msg = 4
                setTimeout(()=>{
                    this.msg = 5
                },2000)
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
      open() {
        this.$router.push("/Work")
      }
        }
    }
</script>

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
    .clickTrun1 {
        height: 60px;
        width: 360px;
        position: absolute;
        top: 134px;
        left: 20px; //  background-color: aqua;
        opacity: .5;
    }
    .mask {
        height: 160px;
        width: 360px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 25;
        //   background-color: aqua;
        opacity: .5;
    }
    .clickTrun2 {
        height: 60px;
        width: 360px;
        position: absolute;
        top: 834px;
        left: 20px;
        // background-color: aqua;
        opacity: .5;
    }
    .clickTrun3 {
        height: 60px;
        width: 360px;
        position: absolute;
        top: 764px;
        left: 20px; 
        // background-color: aqua;
        opacity: .5;
    }
    .clickTrun4 {
        height: 60px;
        width: 60px;
        position: absolute;
        top: 20px;
        left: 360px;
        //  background-color: aqua;
        opacity: .5;
    }
</style>



