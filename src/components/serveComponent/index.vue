<template>
    <div>
        <div class="Title">
            <el-row>
                <el-col :span="6">
                    <div class="BackIcon" @click="goBackIndex()">
                        <svg-icon icon-class="serveComponent_back" />
                        <span>返回</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="NameTitle">{{NameTitle}}</div>
                </el-col>
                <el-col :span="6">
                </el-col>
            </el-row>
        </div>
        <div class="describe">
            {{describe}}
        </div>
        <div class="IndexMenu">
            <div class="MenuLine">
                <div class="MenuCell" @click="changeIndex(1)" :class="{'active': activeIndex == 1}">办事指南</div>
                <div class="MenuCell" @click="changeIndex(2)" :class="{'active': activeIndex == 2}">政策解读</div>
                <div class="MenuCell" @click="changeIndex(3)" :class="{'active': activeIndex == 3}">案例分析</div>
                <div class="MenuCell" @click="changeIndex(4)" :class="{'active': activeIndex == 4}">常见问题</div>
            </div>
        </div>
        <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#F5F5F5" active-text-color='#059BF0' @select="handleSelect">
            <el-menu-item index="1" style="width:25%;font-size:.29rem">办事指南</el-menu-item>
            <el-menu-item index="2" style="width:25%;font-size:.29rem">政策解读</el-menu-item>
            <el-menu-item index="3" style="width:25%;font-size:.29rem">案例分析</el-menu-item>
            <el-menu-item index="4" style="width:25%;font-size:.29rem">常见问题</el-menu-item>
        </el-menu> -->
        <div v-if="activeIndex == 1">
            <!-- 办事指南 -->
            <BusinessGuide info="1"></BusinessGuide>
            <!-- 安卓字段 : {{getAndroidMsg}} -->
        </div>
        <div v-if="activeIndex == 2">
            <!-- 政策解读 -->
            <BusinessGuide info="2"></BusinessGuide>
        </div>
        <div v-if="activeIndex == 3">
            <!-- 案例分析 -->
            <BusinessGuide info="3"></BusinessGuide>
        </div>
        <div v-if="activeIndex == 4">
            <!-- 常见问题 -->
            <BusinessGuide info="4"></BusinessGuide>
        </div>
        <footer class="Footer">
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
                activeIndex: 1,
                NameTitle: '安卓传过来的标题1',
                describe: 'title的详细描述内容',
                getAndroidMsg: null,
            };
        },
        components: {
            'BusinessGuide': BusinessGuide,
        },
        created() {
            // 方法暴露给原生native方法
            window.getAndroid = this.getAndroid
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            console.log(this.$store.getters.SET_NATIVEMSG === null)
            if (this.$store.getters.SET_NATIVEMSG === null) {
                this.getAndroidMsg = this.$store.state.SET_NATIVEMSG
                this.NameTitle = this.getAndroidMsg.title;
                this.describe = this.getAndroidMsg.describe;
            }
            //  测试vuex+ sessionStorage
            this.$store.dispatch('SET_USER_BASEINFO', {
                name: '殷宇佳', //姓名
                idNo: '111000030333', //身份证号
            }, )
            sessionStorage.setItem("a","123")
        },
        methods: {
            //获取URL函数
            click1(a) {
                console.log(a)
            },
            getAndroid(dataStr) {
                console.log('原生msg',dataStr)
                this.getAndroidMsg = dataStr ;
                this.NameTitle = dataStr.title;
                this.describe = dataStr.describe;
                // 储存原生数据
                this.$store.dispatch('SET_NATIVEMSG', dataStr);
            },
            handleSelect(key, keyPath) {
                this.activeIndex = key
            },
            goBackIndex() {
                // 返回原生界面
                console.log('111')
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                this.$toast('是否是Android：' + isAndroid + '是否是iOS：' + isiOS)
                if (isiOS) {
                    window.webkit.messageHandlers.back.postMessage("H5message");
                } else if (isAndroid) {
                    window.dzsb.back('H5message');
                }
            },
            changeIndex(index){
                this.activeIndex = index;
            },
            submit() {
                if ( this.getAndroidMsg === null ) {
                    this.$toast("this.getAmdroidMsg值为-----------null");
                    return;
                }
                if (this.getAndroidMsg.type == 1 && this.getAndroidMsg.typeItem == 1) {
                    // 参保服务------- 参保登记 -------基本医疗保险职工参保登记
                } else if (this.getAndroidMsg.type == 1 && this.getAndroidMsg.typeItem == 2) {
                    // 参保服务------- 就医凭证 -------领取基本医疗保险就医凭证
                    this.$router.push('/getProof');
                } else if (this.getAndroidMsg.type == 1 && this.getAndroidMsg.typeItem == 3) {
                    // 参保服务------- 信息变更 -------基本医疗保险职工参保信息变更登记
                    this.$router.push('/insuredChange');
                } else if (this.getAndroidMsg.type == 1 && this.getAndroidMsg.typeItem == 4) {
                    // 参保服务------- 参保打印 -------参保人员查下你打印社会保险信息
                    this.$router.push('/searchPrint');
                } else if (this.getAndroidMsg.type == 1 && this.getAndroidMsg.typeItem == 5) {
                    // 参保服务------- 关系转移 -------基本医疗保险关系转移
                } else if (this.getAndroidMsg.type == 1 && this.getAndroidMsg.typeItem == 6) {
                    // 参保服务------- 关系接续 -------基本医疗保险关系接续
                } else if (this.getAndroidMsg.type == 2 && this.getAndroidMsg.typeItem == 1) {
                    // 备案服务------- 异地备案 -------基本医疗保险参保人员异地就医备案
                    this.$router.push('/elseWhere');
                } else if (this.getAndroidMsg.type == 2 && this.getAndroidMsg.typeItem == 2) {
                    // 备案服务------- 特药备案 -------基本医疗保险参保人员特制特药备案
                } else if (this.getAndroidMsg.type == 2 && this.getAndroidMsg.typeItem == 3) {
                    // 备案服务------- 慢病备案 -------基本医疗保险参保人员享受规定（特殊慢性）病种待遇备案
                } else if (this.getAndroidMsg.type == 2 && this.getAndroidMsg.typeItem == 4) {
                    // 备案服务------- 转外备案 -------基本医疗保险参保人员赚外就已备案
                    this.$router.push('/turnOut');
                } else if (this.getAndroidMsg.type == 2 && this.getAndroidMsg.typeItem == 5) {
                    // 备案服务------- 出国带药 -------基本医疗保险参保人员出国（境）带要备案
                    this.$router.push('/abroadTake');
                } else if (this.getAndroidMsg.type == 2 && this.getAndroidMsg.typeItem == 6) {
                    // 备案服务------- 家庭共济 -------基本医疗保险参保人员历年账户家庭共济备案
                    this.$router.push('/familyAid');
                } else if (this.getAndroidMsg.type == 3 && this.getAndroidMsg.typeItem == 1) {
                    // 待遇报销------- 缴费年限 -------基本医疗保险视同缴费年限核定
                } else if (this.getAndroidMsg.type == 3 && this.getAndroidMsg.typeItem == 2) {
                    // 待遇报销------- 零星报销 -------基本医疗保险参保人员医疗费用零星报销
                } else if (this.getAndroidMsg.type == 3 && this.getAndroidMsg.typeItem == 3) {
                    // 待遇报销------- 费用审核 -------医疗保险费用审核结算
                } else if (this.getAndroidMsg.type == 3 && this.getAndroidMsg.typeItem == 4) {
                    // 待遇报销------- 平产待遇 -------平产-剖宫产-助娩产待遇核准支付
                } else if (this.getAndroidMsg.type == 3 && this.getAndroidMsg.typeItem == 5) {
                    // 待遇报销------- 流产待遇 -------流产-引产-节育-复通手术待遇核准支付
                } else if (this.getAndroidMsg.type == 3 && this.getAndroidMsg.typeItem == 6) {
                    // 待遇报销------- 未就业待遇 -------未就业配偶医疗待遇核准支付
                } else if (this.getAndroidMsg.type == 4 && this.getAndroidMsg.typeItem == 1) {
                    // 其他服务------- 社保卡 -------社保卡补换
                    this.$router.push('/mendChangeCard');
                } else if (this.getAndroidMsg.type == 4 && this.getAndroidMsg.typeItem == 2) {
                    // 其他服务------- 社保卡 -------社保卡挂失/解挂
                }
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
        background-color: white;
        line-height: .8rem;
        .BackIcon{
            display: flex;
            align-items: center;
            color: #1492FF;
            font-size: .32rem;
            .svg-icon{
                height: .5rem;
                width: .5rem;
            }
        }
        .NameTitle {
            color: #000000;
            letter-spacing: 0;
            font-size: .36rem;
        }
    }
    .describe {
        width: 7.5rem;
        height: .63rem;
        line-height: .63rem;
        background: #FFF;
        font-size: .32rem;
        text-align: center;
        color: #000;
    }
    .IndexMenu{
        height: 1.2rem;
        width: 7.5rem;
        background: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;
        .MenuLine{
            height: .62rem;
            width: 6.9rem;
            background: #FFFFFF;
            border: .01rem solid #1492FF;
            border-radius: .05rem;
            display: flex;
            .MenuCell{
                line-height: .62rem;
                width: 25%;
                color: #1492FF;
                text-align: center;
                letter-spacing: 0;
                font-size: .28rem;
                border-right: .01rem solid #1492FF;
                &:first-child{
                    border-top-left-radius: .05rem;
                    border-bottom-left-radius: .05rem;
                }
                &:last-child{
                    border-top-right-radius: .05rem;
                    border-bottom-right-radius: .05rem;
                    border-right: none;
                }
            }
            .active{
                color: #FFF;
                background: #1492FF;
            }
        }
    }
    .Footer {
        height: 1.31rem;
        width: 7.5rem;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 199;
        display: flex;
        justify-content: center;
        .SubmitBtn {
            height: 1.05rem;
            width: 7.1rem;
            line-height: 1.05rem;
            background: #1492FF;
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



