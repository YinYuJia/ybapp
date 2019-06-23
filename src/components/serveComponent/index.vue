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
        <div class="Content">
            <div class="ListInfo">
                <div class="InfoLine" @click="changeIndex(1)">
                    <div class="InfoName">办事指南</div>
                    <svg-icon v-if="activeIndex == 1" icon-class="serveComponent_arrowUp" />
                    <svg-icon v-if="activeIndex != 1" icon-class="serveComponent_arrowDown" />
                </div>
                <div class="SecondInfo" v-show="activeIndex == 1">
                    <div class="SecondLine">
                        <div class="InfoName">设立依据</div>
                    </div>
                    <div class="SecondLine">
                        <div class="InfoName">受理条件</div>
                    </div>
                    <div class="SecondLine">
                        <div class="InfoName">申请材料</div>
                    </div>
                    <div class="SecondLine">
                        <div class="InfoName">办理流程</div>
                    </div>
                    <div class="SecondLine">
                        <div class="InfoName">办理时限</div>
                    </div>
                    <div class="SecondLine">
                        <div class="InfoName">咨询电话</div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">政策解读</div>
                    <svg-icon icon-class="serveComponent_arrowDown" />
                </div>
                <div class="InfoLine">
                    <div class="InfoName">案例分析</div>
                    <svg-icon icon-class="serveComponent_arrowDown" />
                </div>
                <div class="InfoLine">
                    <div class="InfoName">常见问题</div>
                    <svg-icon icon-class="serveComponent_arrowDown" />
                </div>
            </div>
        </div>
        <!-- 按钮 -->
        <Footer :canSubmit="true" :btnText="'我要办事'" @submit="submit()"></Footer>
    </div>
</template>

<script>
    // SubmitReimbursement
    import BusinessGuide from './BusinessGuide'
    import Footer from './common/Footer'
    export default {
        data() {
            return {
                activeIndex: 0,
                itemUrl: '',
                NameTitle: '安卓传过来的标题1',
                describe: 'title的详细描述内容',
                getAndroidMsg: null,
            };
        },
        components: {
            'BusinessGuide': BusinessGuide,
            'Footer': Footer
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
            this.itemUrl = sessionStorage.getItem('itemUrl');
            this.NameTitle = sessionStorage.getItem("item")
            this.describe = sessionStorage.getItem("itemInfo")
            
        },
        methods: {
            handleSelect(key, keyPath) {
                this.activeIndex = key
            },
            goBackIndex() {
                // 返回首页
                this.$router.push('/')
            },
            changeIndex(index) {
                if(this.activeIndex == index){
                    this.activeIndex = 0;
                }else{
                    this.activeIndex = index;
                }
            },
            submit() {
                console.log("路由参数", this.itemUrl)
                this.$router.push(this.itemUrl)
            },
        }
    }
</script>

<style lang="less" scoped>
    .Title {
        display: none;
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
    .Content {
        height: 100%;
        margin-bottom: 1.4rem;
        .ListInfo {
            width: 7.5rem;
            margin: .15rem 0 0 0;
            .InfoLine {
                height: 1.2rem;
                padding: 0 .3rem 0 .38rem;
                position: relative;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: .01rem solid #D3D3D3;
                background: white;
                .InfoName {
                    font-family: PingFangSC-Regular;
                    font-size: .32rem;
                    height: 1.2rem;
                    line-height: 1.2rem;
                    color: #000000;
                    letter-spacing: 0;
                }
                .svg-icon{
                    height: .3rem;
                    width: .3rem;
                }
                &:last-child{
                    border-bottom: none;
                }
            }
            .SecondInfo{
                margin-bottom: .15rem;
                background: white;
                padding-left: .67rem;
                .SecondLine{
                    height: 1.2rem;
                    border-bottom: .01rem solid #D3D3D3;
                    .InfoName {
                        font-family: PingFangSC-Regular;
                        font-size: .28rem;
                        text-align: left;
                        height: 1.2rem;
                        line-height: 1.2rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                    &:last-child{
                        border-bottom: none;
                    }
                }
            }
        }
    }
</style>