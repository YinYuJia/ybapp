<template>
    <div>
        <transition name="el-zoom-in-center">
            <div v-if='msg == 1'>
                <router-link to="/Work">
                    <div class="back"></div>
                </router-link>
                <img class="img" src="../../../static/images/Work/123.jpg" alt="">
            </div>
        </transition>
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
                // this.msg = 4
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
      open() {
        this.show = true
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
          background-color: aqua;
        opacity: .5;
    }
    .clickTrun2 {
        height: 60px;
        width: 360px;
        position: absolute;
        top: 674px;
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
        width: 360px;
        position: absolute;
        top: 320px;
        left: 20px; // background-color: aqua;
        opacity: .5;
    }
</style>



