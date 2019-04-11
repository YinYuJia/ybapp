<template>
    <div>
        <img src="../../../static/images/Work/work.jpg" class="img" alt="">
        <router-link to="/daiyubaoxiao">
            <div class="clickTrun" @click="Click"></div>
        </router-link>

        <router-link to="/canbaofuwu">
            <div class="clickTrun1" @click="Click"></div>
        </router-link>

        <router-link to="/beianfuwu">
            <div class="clickTrun2" @click="Click"></div>
        </router-link>
        <router-link to="/Qita">
            <div class="clickTrun3" @click="Click"></div>
        </router-link>
        
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
        top: 204px;
        left: 220px;
        // background-color: aqua;
    }
    .clickTrun1 {
        height: 60px;
        width: 60px;
        position: absolute;
        top: 204px;
        left: 40px;
        // background-color: aqua;
    }
    .clickTrun2 {
        height: 60px;
        width: 60px;
        position: absolute;
        top: 204px;
        left: 130px;
        // background-color: aqua;
    }
    .clickTrun3 {
        height: 60px;
        width: 60px;
        position: absolute;
        top: 204px;
        right: 40px;
        // background-color: aqua;
    }
    
</style>

<script>
    import Foter from '../Footer';
    export default {
        data() {
            return {
                info: 'Work'
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



