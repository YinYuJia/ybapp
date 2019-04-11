<template>
    <div class="footer">
        <el-row>
            <el-col :span="4">
                <!-- <router-link to="/IndexComponent"> -->
                    <img src="../../static/images/My/1.png" v-if="'IndexComponent' == info" alt="">
                    <img src="../../static/images/My/11.png" v-else alt="">
                    <p>首页</p>
                <!-- </router-link> -->
            </el-col>
            <el-col :span="4" :offset='1'>
                <!-- <router-link to="/Work"> -->
                    <img src="../../static/images/My/2.png" v-if="'Work' == info" alt="">
                    <img src="../../static/images/My/22.png" v-else alt="">
                    <p>办事</p>
                <!-- </router-link> -->
            </el-col>
            <el-col :span="4" :offset='1'>
                <!-- <router-link to='/YiyaoIndex'> -->
                    <img src="../../static/images/My/3.png" v-if="'YiyaoIndex' == info" alt="">
                    <img src="../../static/images/My/33.png" v-else alt="">
                    <p>医药</p>
                <!-- </router-link> -->
            </el-col>
            <el-col :span="4" :offset='1'>
                <!-- <router-link to='/Healthy'> -->
                    <img src="../../static/images/My/4.png" v-if="'Healthy' == info" alt="">
                    <img src="../../static/images/My/44.png" v-else alt="">
                    <p>健康</p>
                <!-- </router-link> -->
            </el-col>
            <el-col :span="4" :offset='1'>
                <!-- <router-link to='/My' > -->
                <div @click="goto" v-if="flage == 1">
                    <img src="../../static/images/My/5.png" v-if="'My' == info" alt="">
                    <img src="../../static/images/My/55.png" v-else alt="">
                    <p>我的</p>
                </div>
                <div @click="goto2" v-if="flage == 2">
                    <img src="../../static/images/My/5.png" v-if="'My' == info" alt="">
                    <img src="../../static/images/My/55.png" v-else alt="">
                    <p>我的</p>
                </div>
                <!-- </router-link> -->
            </el-col>
        </el-row>
        <!-- <TipsTrueComponent :message = "message" v-on:TipsTrue = 'TipsTrue' v-if="show" ></TipsTrueComponent> -->
    </div>
</template>

<script>
    import TipsTrueComponent from './commonComponent/TipsTrueComponent'
    export default {
        data() {
            return {
                flage: ''
            }
        },
        components: {
            TipsTrueComponent: TipsTrueComponent
        },
        props: {
            info: {
                type: String,
                default: ''
            },
            message: {
                type: String,
                default: ''
            },
            mess: {
                type: String,
                default: ""
            },
            show: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            TipsTrue: function(a) {
                console.log(a)
                this.$emit('fas', "1234")
            },
            goto() {
               this.$router.push("/Login")
               this.$store.dispatch('SET_FLAGE', 2); 
                // this.flage = 2
            },
            goto2() {
               this.$router.push("/My")
            }
        },
        created() {
            console.log(this.$store.state.flage)
            if (this.$store.state.flage == 1) {
                this.flage = 1
            }else{
                this.flage = 2
            }
        },
    }
</script>

<style lang="less" scoped>
    .footer {
        height: 70px;
        width: 100%;
        background-color: white;
        position: fixed;
        bottom: 0;
        left: 0;
    }
    .el-row {
        // margin-bottom: 20px;
        height: 100%;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        // border-radius: 4px;
        height: 100%;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        min-height: 60px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    img {
        //   height: 100%;
        width: 40px;
    }
    p {
        font-size: 14px;
        margin-top: -10px;
    }
</style>



