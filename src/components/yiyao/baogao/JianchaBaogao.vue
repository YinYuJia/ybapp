<template>
    <div>
        <div v-if='msg == 1'>
            <div class="back" @click="back1"></div>
            <div class="clickTrun1" @click="hosSuccess"></div>
            <div class="clickTrun2" @click="hosFail"></div>
            <img class="img" src="../../../../static/images/Bespeak/chooseHos.jpg" alt="">
        </div>
        <!-- 失败 -->
        <div v-if='msg == 2'>
            <div class="back" @click="back2"></div>
            <img class="img" src="../../../../static/images/yiyao/jianchabaogao/wode2.png" alt="">
        </div>
        <!-- 成功 -->
        <div v-if='msg == 3'>
            <div class="back" @click="back2"></div>
            <div class="clickTrun3" @click="xiaoguo"></div>
            <div class="clickTrun4" @click="jiancha"></div>
            <div class="clickTrun5" @click="jianyan"></div>
            <img class="img" src="../../../../static/images/yiyao/jianchabaogao/wode1.png" alt="">
        </div>

        <div v-if='msg == 4'>
            <div class="back" @click="back3"></div>
            <div class="back2" @click="back3"></div>
            <img class="img" src="../../../../static/images/yiyao/jianchabaogao/xiaoguo.png" alt="">
        </div>
        <div v-if='msg == 5'>
            <div class="back" @click="back4"></div>
            <img class="img" src="../../../../static/images/yiyao/jianchabaogao/jianchabaogao.png" alt="">
        </div>
        <div v-if='msg == 6'>
            <div class="back" @click="back4"></div>
            <img class="img" src="../../../../static/images/yiyao/jianchabaogao/jianyanbaogao.png" alt="">
        </div>
    </div>
</template>

<style lang="less" scoped>
    .img {
        width: 7.5rem;
    }
    .back {
        height: 40px;
        width: 50px;
        position: absolute;
        top: 30px;
        left: 0;
    }
    .back2 {
        height: 40px;
        width: 7.5rem;
        position: absolute;
        top: 120px;
    }
    .clickTrun1 {
        height: 50px;
        width: 7.5rem;
        position: absolute;
        top: 110px;
    }
    .clickTrun2 {
        height: 50px;
        width: 7.5rem;
        position: absolute;
        top: 170px;
    }
    .clickTrun3 {
        height: 50px;
        width: 180px;
        position: absolute;
        top: 70px;
        left: 30px;
    }
    .clickTrun4 {
        height: 130px;
        width: 7.5rem;
        position: absolute;
        top: 250px;
    }
    .clickTrun5 {
        height: 130px;
        width: 7.5rem;
        position: absolute;
        top: 380px;
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
            back1(){
                this.$router.push("/YiyaoIndex")
            },
            hosSuccess(){
                this.msg = 3;
            },
            hosFail(){
                this.msg = 2;
            },
            back2(){
                this.msg = 1;
            },
            back3(){
                this.msg = 3;
            },
            back4(){
                this.msg = 3;
            },
            xiaoguo(){
                this.msg = 4;
            },
            jiancha(){
                this.msg = 5;
            },
            jianyan(){
                this.msg = 6;
            }
        }
    }
</script>



