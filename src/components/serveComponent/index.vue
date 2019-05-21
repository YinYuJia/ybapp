<template>
    <div>
        <div class="Title">
            <el-row>
                <el-col :span="6">
                    <div class="grid-content">
                        <span class="el-icon-arrow-left" style="color: #ffffff;font-size: .38rem;margin-left: -50px;" @click="goBackIndex"></span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content NameTitle">
                        {{NameTitle}}
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <!-- <svg-icon icon-class="Index_Message" className="Index_Message1" /> -->
                        <span class="el-icon-bell" style="color: #ffffff;font-size: .50rem;margin-right: -.4rem;margin-top:.15rem"></span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="describe">
            {{describe}}
        </div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#F5F5F5" active-text-color='#059BF0' @select="handleSelect">
            <el-menu-item  v-for="item in responseDate"  :key="item.id" index="" style="width:25%">{{item.name}}</el-menu-item>
            <!-- <el-menu-item index="2" style="width:25%">政策解读</el-menu-item>
            <el-menu-item index="3" style="width:25%">案例分析</el-menu-item>
            <el-menu-item index="4" style="width:25%">常见问题</el-menu-item> -->
        </el-menu>
        <div v-if="activeIndex == 1">
            <!-- 办事指南 -->
            <BusinessGuide :info="BusinessGuideInfo"></BusinessGuide>
            {{id}}
        </div>
        <div v-if="activeIndex == 2">
            <!-- 政策解读 -->
            2222
        </div>
        <div v-if="activeIndex == 3">
            <!-- 案例分析 -->
            3333
        </div>
        <div v-if="activeIndex == 4">
            <!-- 常见问题 -->
            4444
        </div>
        <ul>
            <li v-for="item in responseDate"  :key="item.id">{{item.name}}</li>
        </ul>
        <footer class="Footer">
            <div class="IconBox">
                <div class="Icon"><svg-icon icon-class="SubmitReim_service" /></div>
                <div class="Text">客服</div>
            </div>
            <div class="SubmitBtn" @click="submit"><span>我要办事</span></div>
        </footer>
    </div>
</template>

<script>
// SubmitReimbursement
import BusinessGuide from './BusinessGuide'

    export default {
        data() {
            return {
                activeIndex: '1',
                NameTitle: '安卓传过来的标题',
                describe:'title的详细描述内容',
                id: null,
                BusinessGuideInfo:{},
                responseDate:{},
                array:[{a:1},{a:2},{a:3},{a:4}]

            };
        },
        components:{
          'BusinessGuide':BusinessGuide
        },
        created(){
            // 方法暴露给安卓
            window.getAndroid = this.getAndroid;
            this.axiosPost()
            console.log('this.$store.state.SET_TREATMENT_REIMBURSEMENT',this.$store.state.SET_TREATMENT_REIMBURSEMENT)
        },
        methods: {
            //获取URL函数
            click1(a) {
                 console.log(a)
            },
            getAndroid(dataStr) {
                this.id = dataStr;
                this.NameTitle = dataStr.title;
                this.describe = dataStr.describe;
            },
            handleSelect(key, keyPath) {
                this.activeIndex = key
            },
            goBackIndex() {
                // 返回原生界面
                console.log('返回原生界面')
            },
            submit() {
                // this.$router.push({
                //     name: 'SubmitReimbursement',
                //     params: {
                //         name:'待遇报销'
                //     }
                // })
                // 公共请求模板
            },
            axiosPost() {
                this.$axios.post('https://0443a588-b61d-4208-87e8-58e7f61c68d7.mock.pstmn.io/testJson12').then((resData) => {
                console.log(resData.data.data)
                this.responseDate = resData.data.data
              
                }).catch((error) => {
                    console.log(error)
                })
            },
            created() {
                console.log()
            }
        }
    }
</script>

<style lang="less" scoped>
    .Title {
        height: .8rem;
        background-color: #05AEF0;
        font-size: .36rem;
        line-height: .8rem;
        overflow: hidden;
    }
    .NameTitle {
        font-size: .36rem;
        color: #FFFFFF;
        font-family: 'PingFangSC-Regular';
    }
    .describe {
        height: 80px;
        line-height: 80px;
        font-size: 22px;
        text-align: left;
        text-indent: 10px;
        background-color: #fff;
    }
 .Footer{
            height: 1.2rem;
            width: 7.5rem;
            background-color: white;
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 199;
            display: flex;
            align-items: center;
            .IconBox{
                width: .6rem;
                margin-left: .51rem;
                .Icon{
                    height: .6rem;
                    width: .6rem;
                    .svg-icon{
                        display: block;
                        height: 100%;
                        width: 100%;
                    }
                }
                .Text{
                    height: .28rem;
                    width: .6rem;
                    opacity: 0.45;
                    font-family: PingFangSC-Regular;
                    font-size: .2rem;
                    color: #000;
                    letter-spacing: 0;
                    text-align: center;
                }
            }
            .SubmitBtn{
                height: .8rem;
                width: 5.6rem;
                margin-left: .51rem;
                line-height: 0.8rem;
                background-image: linear-gradient(90deg, #35B8FD 0%, #4E8DFF 100%);
                border-radius: .4rem;
                font-family: PingFangSC-Regular;
                font-size: .36rem;
                color: #FFFFFF;
                letter-spacing: 0;
                text-align: center;
            }
        }
</style>

<style>
  .Title .el-message-box {
     width: 24px;
  }
</style>



