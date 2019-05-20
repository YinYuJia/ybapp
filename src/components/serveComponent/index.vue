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
        <div>
            666
        </div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#F5F5F5" active-text-color='#059BF0' @select="handleSelect">
            <el-menu-item index="1" style="width:25%">办事指南</el-menu-item>
            <el-menu-item index="2" style="width:25%">政策解读</el-menu-item>
            <el-menu-item index="3" style="width:25%">案例分析</el-menu-item>
            <el-menu-item index="4" style="width:25%">常见问题</el-menu-item>
        </el-menu>
        <div v-if="activeIndex == 1">
            <!-- 办事指南 -->
            <BusinessGuide></BusinessGuide>
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
                NameTitle: this.$route.params.name,
                id: null,
            };
        },
        components:{
          'BusinessGuide':BusinessGuide
        },
        created(){
            window.getAndroid = this.getAndroid;
            // this.id = this.GetURL("id");
        },
        methods: {
            //获取URL函数
            GetURL(variable){
                var str = window.location.href;
                var query = str.substring(str.lastIndexOf("?")+1);
                var vars = query.split("&");
                for(var i = 0; i < vars.length; i++){
                    var pair = vars[i].split("=");
                    if(pair[0] == variable){return pair[1];}
                }
                return(false);
            },
            getAndroid(dataStr) {
                this.id = dataStr.pageSize;
            },
            handleSelect(key, keyPath) {
                this.activeIndex = key
            },
            goBackIndex() {
                this.$router.push({
                    name: 'TreatmentReimbursement',
                    params: {
                        id: '3',
                        name: "待遇报销"
                    }
                })
            },
            submit() {
                       this.$router.push({
                    name: 'SubmitReimbursement',
                    params: {
                        name:'待遇报销'
                    }
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


