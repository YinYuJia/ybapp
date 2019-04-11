<template>
    <div class="footer">
        <el-row>
            <el-col :span="4">
                <router-link to="/first">
                    <img src="../../static/images/footer/index.png" v-if="'index' == info.msg" alt="">
                    <img src="../../static/images/footer/index1.png" v-else alt="">
                    <p>首页</p>
                </router-link>
            </el-col>
            <el-col :span="4" :offset='1'>
                <!-- <router-link to="/Work"> -->
                <img src="../../static/images/footer/work.png" v-if="'work' == info.msg" alt="">
                <img src="../../static/images/footer/work1.png" v-else alt="">
                <p>办事</p>
                <!-- </router-link> -->
            </el-col>
            <el-col :span="4" :offset='1'>
                <!-- <router-link to='/YiyaoIndex'> -->
                <img src="../../static/images/footer/medicine.png" v-if="'medicine' == info.msg" alt="">
                <img src="../../static/images/footer/medicine1.png" v-else alt="">
                <p>医药</p>
                <!-- </router-link> -->
            </el-col>
            <el-col :span="4" :offset='1'>
                <!-- <router-link to='/Healthy'> -->
                <img src="../../static/images/footer/healthy.png" v-if="'healthy' == info.msg" alt="">
                <img src="../../static/images/footer/healthy1.png" v-else alt="">
                <p>健康</p>
                <!-- </router-link> -->
            </el-col>
            <el-col :span="4" :offset='1'>
                <!-- <router-link to='/My' > -->
                <img src="../../static/images/footer/my.png" v-if="'my' == info.msg" alt="">
                <img src="../../static/images/footer/my1.png" v-else alt="">
                <p>{{set_select}}</p>
                <!-- </router-link> -->
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import TipsTrueComponent from './commonComponent/TipsTrueComponent'
    export default {
        data() {
            return {
                flage: '',
                set_select: this.$store.state.SET_SELECT
            }
        },
        components: {
            TipsTrueComponent: TipsTrueComponent
        },
        props: {
            info: {
                type: Object,
                default: null
            },
        },
        methods: {
            TipsTrue: function(a) {
                this.$emit('fas', "1234")
            },
        },
        created() {

        },
        // 创建一个方法 储存 vuex数据
        computed: {
            getUserIcons() {
                return this.$store.state.SET_SELECT
            }
        },
        // 监听这个方法当之变化的时候重新赋值
        watch: {
            getUserIcons(val,OldValue) {
                this.set_select = val
            }
        }
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
        z-index: 199;
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



