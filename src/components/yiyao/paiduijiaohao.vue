<template>
    <div>
        <transition name="el-zoom-in-center">
            <div v-if='msg == 1'>
                <router-link to="/YiyaoIndex">
                    <div class="back"></div>
                </router-link>
                <img class="img" src="../../../static/images/yiyao/paiduijiaohao/1.png" alt="">
                <div class="clickTrun1" @click="Click1"></div>
            </div>
        </transition>
        <transition name="el-zoom-in-center">
            <div v-if='msg == 2'>
                <div class="back" @click="back2"></div>
                <img class="img" src="../../../static/images/yiyao/paiduijiaohao/chooseHos.jpg" alt="">
                <div class="clickTrun2" @click="Click2"></div>
            </div>
        </transition>
        <div v-if='msg == 3'>
            <div class="back" @click="back3"></div>
            <img class="img" src="../../../static/images/yiyao/paiduijiaohao/3.png" alt="">
            <div class="clickTrun3" @click="Click3"></div>
        </div>
        <div v-if='msg == 4'>
            <div class="back" @click="back4"></div>
            <img class="img" src="../../../static/images/yiyao/paiduijiaohao/4.png" alt="">
            <div class="clickTrun4" @click="Click4"></div>
        </div>
        <div v-if='msg == 5'>
            <div class="back" @click="back5"></div>
            <img class="img" src="../../../static/images/yiyao/paiduijiaohao/5.png" alt="">
            <!-- <div class="clickTrun4" @click="Click5"></div> -->
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
    .clickTrun1 {
        height: 80px;
        width: 360px;
        position: absolute;
        top: 304px;
        left: 20px; // background-color: aqua;
        opacity: .5;
    }
    .clickTrun2 {
        height: 60px;
        width: 360px;
        position: absolute;
        top: 104px;
        left: 20px; // background-color: aqua;
        opacity: .5;
    }
    .clickTrun3 {
        height: 60px;
        width: 360px;
        position: absolute;
        top: 164px;
        left: 20px; // background-color: aqua;
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

<script>
    export default {
        data() {
            return {
                msg: 1,
                flage: null,
            }
        },
        methods: {
            Click1() {
                this.msg = 2
            },
            Click2() {
                this.msg = 3
            },
            Click3() {
                this.msg = 4
            },
            Click4() {
                this.msg = 5
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
        }
    }
</script>



