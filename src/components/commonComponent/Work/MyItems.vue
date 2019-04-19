<template>
    <div class="MyItems">
        <!-- 标题 -->
        <div class="ItemTitle">
            <div class="TitleBtn"></div>
            <div class="TitleText">我的事项</div>
        </div>
        <!-- 图标 -->
        <el-row type="flex" justify="space-around" class="IconContent">
            <el-col :span="4" class="IconBox">
                <div class="Icon">
                    <el-badge :value="12" class="HintDot">
                        <svg-icon icon-class="MyItems_receive" />
                    </el-badge>
                </div>
                <div class="Text"><span>收件</span></div>
            </el-col>
            <el-col :span="4" class="IconBox">
                <div class="Icon">
                    <el-badge :value="null" class="HintDot">
                        <svg-icon icon-class="MyItems_accept" />
                    </el-badge>
                </div>
                <div class="Text"><span>受理</span></div>
            </el-col>
            <el-col :span="4" class="IconBox">
                <div class="Icon">
                    <el-badge :value="3" class="HintDot">
                        <svg-icon icon-class="MyItems_check" />
                    </el-badge>
                </div>
                <div class="Text"><span>审核</span></div>
            </el-col>
            <el-col :span="4" class="IconBox">
                <div class="Icon">
                    <el-badge :value="null" class="HintDot">
                        <svg-icon icon-class="MyItems_done" />
                    </el-badge>
                </div>
                <div class="Text"><span>办结</span></div>
            </el-col>
            <el-col :span="4" class="IconBox">
                <div class="Icon">
                    <el-badge :value="null" class="HintDot">
                        <svg-icon icon-class="MyItems_delivery" />
                    </el-badge>
                </div>
                <div class="Text"><span>送达</span></div>
            </el-col>
        </el-row>
        <!-- 信息 -->
        <router-link to="/EventDetail">
            <div class="ItemMsg">
            <div class="MsgTitle">
                <span>【{{msg_type}}】</span><span>{{msg_title}}</span>
            </div>
            <div class="MsgText"><span>{{msg_text}}</span></div>
        </div>
        </router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg_type: '收件',
            msg_title: '基本医疗保险参保人员医疗费用零星报销',
            msg_text: '预计今天12:34前进入受理环节'
        }
    }
}
</script>

<style lang='less' scoped>
    .MyItems{
        height: 4.2rem;
        width: 7.5rem;
        background: #fff;

        .ItemTitle{
            height: .88rem;
            display: flex;
            align-items: center;
            position: relative;
            &:before{
                content: '';
                height: .02rem;
                width: 6.9rem;
                position: absolute;
                bottom: 0;
                left: 50%;
                margin-left: -6.9rem/2;
                background-color: #E3E3E3;
            }
            .TitleBtn{
                height: .3rem;
                width: .08rem;
                border-radius: .04rem;
                background: #05AEF0;
                margin-left: .3rem;
            }
            .TitleText{
                opacity: 0.65;
                font-family: PingFangSC-Medium;
                font-size: .3rem;
                color: #000;
                letter-spacing: 0;
                margin-left: .22rem;
            }
        }
        .IconContent{
            height: 1.56rem;
            padding: .29rem 0 .24rem 0;
            .IconBox{
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                .Icon{
                    height: .6rem;
                    width: .6rem;
                    .HintDot{
                        display: block;
                        height: 100%;
                        width: 100%;
                        .svg-icon{
                            display: block;
                            height: 100%;
                            width: 100%;
                        }
                    }
                    .svg-icon{
                        display: block;
                        height: 100%;
                        width: 100%;
                    }
                }
                .Text{
                    height: .33rem;
                    opacity: 0.65;
                    font-family: PingFangSC-Regular;
                    font-size: .24rem;
                    color: #000;
                    letter-spacing: 0;
                    text-align: center;
                }
            }
        }
        .ItemMsg{
            height: 1.4rem;
            width: 6.9rem;
            background: #F1F1F1;
            border-radius: .06rem;
            margin: auto;
            text-align: left;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .MsgTitle{
                margin-left: .34rem;
                font-family: PingFangSC-Regular;
                font-size: .24rem;
                color: #000000;
                letter-spacing: 0;
                line-height: .33rem;
                span:first-child{
                    color: #05AEF0;
                }
            }
            .MsgText{
                margin-left: .48rem;
                opacity: 0.45;
                font-family: PingFangSC-Regular;
                font-size: .24rem;
                color: #000000;
                letter-spacing: 0;
            }
        }
    }
</style>