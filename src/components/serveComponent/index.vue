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
            // console.log(dd)
            // dd.ready({
            //     developer: 'daip@dtdream.com',
            //     usage: [
            //     'dd.biz.navigation.setTitle',
            //     ],
            //     remark: '描述业务场景'
            // }, function() {
            //     dd.biz.navigation.setTitle({
            //         title: '1111111111111111111',
            //         onSuccess: function(data) {},
            //         onFail: function(error) {}
            //     })
            // })
            // dd.biz.navigation.setTitle({
            //         title: '1111111111111111111',
            //         onSuccess: function(data) {},
            //         onFail: function(error) {}
            //     })
            this.$store.dispatch('SET_NATIVEMSG', {
                title: "",
                describe: "",
                type: "",
                typeItem: "",
                name: "张思佳",
                idCard: "330165694569544567",
                PublicHeader: {
                    imei: '',
                    mac: '',
                    phoneModel: '',
                    platform: '',
                    signType: '',
                    sign: '',
                    version: 'v2.0',
                }
            });
        },
        methods: {
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
            changeIndex(index) {
                this.activeIndex = index;
            },
            submit() {
                console.log("路由参数", this.$route.params.info)
                this.$router.push(this.$route.params.info)
            },
        }
    }
</script>

<style lang="less" scoped>
    .Title {
        height: .8rem;
        background-color: white;
        line-height: .8rem;
        .BackIcon {
            display: flex;
            align-items: center;
            color: #1492FF;
            font-size: .32rem;
            .svg-icon {
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
    .IndexMenu {
        height: 1.2rem;
        width: 7.5rem;
        background: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;
        .MenuLine {
            height: .62rem;
            width: 6.9rem;
            background: #FFFFFF;
            border: .01rem solid #1492FF;
            border-radius: .05rem;
            display: flex;
            .MenuCell {
                line-height: .62rem;
                width: 25%;
                color: #1492FF;
                text-align: center;
                letter-spacing: 0;
                font-size: .28rem;
                border-right: .01rem solid #1492FF;
                &:first-child {
                    border-top-left-radius: .05rem;
                    border-bottom-left-radius: .05rem;
                }
                &:last-child {
                    border-top-right-radius: .05rem;
                    border-bottom-right-radius: .05rem;
                    border-right: none;
                }
            }
            .active {
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
            border-radius: .05rem;
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



