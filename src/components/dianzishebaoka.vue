<template>
    <div>
        <transition name="el-zoom-in-center">
            <div v-if='msg == 1'>
                <router-link to="/IndexComponent">
                    <div class="back"></div>
                </router-link>
                <img class="img" src="../../static/images/dianzishebaoka/IMG_0011.png" alt="">
                <div class="clickTrun1" @click="Click1"></div>
            </div>
        </transition>
        <transition name="el-zoom-in-center">
            <div v-if='msg == 2'>
                <div class="back" @click="back2"></div>
                <img class="img" src="../../static/images/dianzishebaoka/IMG_0012.png" alt="">
                <div class="clickTrun1" @click="Click2"></div>
            </div>
        </transition>
        <div v-if='msg == 3'>
            <div class="back" @click="back3"></div>
            <img class="img" src="../../static/images/dianzishebaoka/IMG_0014.png" alt="">
            <div class="clickTrun1" @click="Click3"></div>
        </div>
        <div v-if='msg == 4'>
            <div class="back" @click="back4"></div>
            <img class="img" src="../../static/images/dianzishebaoka/IMG_0015.png" alt="">
            <div class="clickTrun1" @click="Click4"></div>
        </div>
        <div v-if='msg == 5'>
            <div class="back" @click="back5"></div>
            <img class="img" src="../../static/images/dianzishebaoka/IMG_0016.png" alt="">
            <div class="clickTrun2" @click="Click5"></div>
        </div>
        <div v-if='msg == 6'>
            <div class="back" @click="back6"></div>
            <img class="img" src="../../static/images/dianzishebaoka/IMG_0017.png" alt="">
            <div class="clickTrun1" @click="Click6"></div>
        </div>
        <div v-if='msg == 7'>
            <div class="back" @click="back7"></div>
            <img class="img" src="../../static/images/dianzishebaoka/IMG_0018.png" alt="">
            <div class="clickTrun1" @click="Click7"></div>
        </div>
        <div v-if='msg == 8'>
            <div class="back" @click="back8"></div>
            <img class="img" src="../../static/images/dianzishebaoka/IMG_0019.png" alt="">
            <div class="clickTrun1" @click="Click8"></div>
        </div>
        <div v-if='msg == 9'>
            <div class="back" @click="back9"></div>
            <img class="img" src="../../static/images/dianzishebaoka/IMG_0020.png" alt="">
            <div class="clickTrun5" @click="Click9"></div>
        </div>
        <div v-if='msg == 10'>
            <div class="back" @click="back10"></div>
            <img class="img" src="../../static/images/dianzishebaoka/IMG_0021.png" alt="">
            <div class="clickTrun9" @click="Click10"></div>
        </div>
        <div v-if='msg == 11'>
            <div class="back" @click="back11"></div>
            <img class="img" src="../../static/images/dianzishebaoka/IMG_0022.png" alt="">
            <div class="clickTrun1" @click="Click11"></div>
            <div class="clickTrun4" @click="Click12"></div>
        </div>
        <div v-if='msg == 12'>
            <div class="back" @click="back12"></div>
            <img class="img" src="../../static/images/dianzishebaoka/IMG_0023.png" alt="">
            <div class="clickTrun6" @click="Click13"></div>
        </div>
        <div v-if='msg == 13'>
            <div class="back" @click="back13"></div>
            <img class="img" src="../../static/images/dianzishebaoka/IMG_0024.png" alt="">
            <div class="clickTrun1" @click="Click14"></div>
        </div>
        <div v-if='msg == 14'>
            <div class="back" @click="back14"></div>
            <img class="img" src="../../static/images/dianzishebaoka/IMG_0025.png" alt="">
            <div class="clickTrun7" @click="Click15"></div>
        </div>
        <div v-if='msg == 15'>
            <div class="back" @click="back15"></div>
            <img class="img" src="../../static/images/dianzishebaoka/IMG_0026.png" alt="">
            <div class="clickTrun1" @click="Click16"></div>
            <el-button type="primary" class="backHome" @click="backHome">完成</el-button>
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
        left: 0; 
    }
    .backHome {
      
        position: absolute;
        top: 48px;
        right: 0; 
        // background-color: aqua;
    }
    
    .clickTrun1 {
        height: 80px;
        width: 250px;
        position: absolute;
        top: 554px;
        left: 70px; // background-color: aqua;
    }
    .clickTrun2 {
        height: 50px;
        width: 50px;
        position: absolute;
        top: 154px;
        left: 350px; // background-color: aqua;
    }
    .clickTrun3 {
        height: 50px;
        width: 50px;
        position: absolute;
        top: 154px;
        left: 350px; // background-color: aqua;
    }
    .clickTrun4 {
        height: 80px;
        width: 250px;
        position: absolute;
        top: 654px;
        left: 70px; // background-color: red;
    }
    .clickTrun5 {
        height: 80px;
        width: 250px;
        position: absolute;
        top: 434px;
        left: 70px; // background-color: aqua;
    }
    .clickTrun6 {
        height: 80px;
        width: 250px;
        position: absolute;
        top: 534px;
        left: 70px; // background-color: aqua;
    }
    .clickTrun7 {
        height: 80px;
        width: 250px;
        position: absolute;
        top: 504px;
        left: 70px; // background-color: aqua;
    }
    .clickTrun9 {
        height: 80px;
        width: 250px;
        position: absolute;
        top: 424px;
        left: 70px; // background-color: aqua;
    }
</style>

<script>
    export default {
        data() {
            return {
                msg: 1,
                flage: null
            }
        },
        methods: {
            backHome() {
                this.$router.push('/IndexComponent')
            },
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
            Click5() {
                this.msg = 6
            },
            Click6() {
                this.msg = 7
            },
            Click7() {
                this.msg = 8
            },
            Click8() {
                this.msg = 9
            },
            Click9() {
                this.msg = 10
            },
            Click10() {
                this.msg = 11
            },
            Click11() {
                this.flage = 1
                this.msg = 12
            },
            Click12() {
                this.flage = 2
                this.msg = 15
            },
            Click13() {
                this.msg = 13
            },
            Click14() {
                this.msg = 14
            },
            Click15() {
                this.msg = 15
            },
            Click16() {
                // this.msg = 16
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
            back6() {
                this.msg = 5
            },
            back7() {
                this.msg = 6
            },
            back8() {
                this.msg = 7
            },
            back9() {
                this.msg = 8
            },
            back10() {
                this.msg = 9
            },
            back11() {
                this.msg = 10
            },
            back12(a) {
                this.msg = 11
                if (a == 1) {}
            },
            back13() {
                this.msg = 12
            },
            back14() {
                this.msg = 13
            },
            back15() {
                console.log('this.flage', this.flage)
                if (this.flage == 1) {
                    this.msg = 14
                } else if (this.flage == 2) {
                    this.msg = 11
                }
            },
        }
    }
</script>



