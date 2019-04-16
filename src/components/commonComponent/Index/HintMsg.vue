<template>
    <div class="Hint">
        <el-row class="HintContent">
            <el-col :span="8" class="Left"><div class="LeftLine"></div></el-col>
            <el-col :span="8">
                <div class="text">大家都在搜这些</div>
            </el-col>
            <el-col :span="8" class="Right"><div class="RightLine"></div></el-col>
        </el-row>
        <div class="BtnContent">
            <div v-for="(msg,index) in btn_msg" :key="index" class="HintBtn">
                <div class="HintMsg">
                    {{msg}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            btn_msg: ['医疗保险', '心脏病防治', '报销进度']
        }
    }
}
</script>

<style lang="less" scoped>
    .Hint{
        padding-top: .2rem;
        padding-bottom: .34rem;
        .HintContent{
            height: .33rem;
            .Left{
                height: .33rem;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                .LeftLine{
                    height: .02rem;
                    width: 1.2rem;
                    opacity: 0.2;
                    border: 1px solid #000000;
                }
            }
            .text{
                height: .33rem;
                width: 1.68rem;
                margin: auto;
                line-height: 0.33rem;
                opacity: 0.45;
                font-family: PingFangSC-Regular;
                font-size: .24rem;
                color: #000000;
                letter-spacing: 0;
                text-align: center;
            }
            .Right{
                height: .33rem;
                display: flex;
                align-items: center;
                .RightLine{
                    height: .02rem;
                    width: 1.2rem;
                    opacity: 0.2;
                    border: 1px solid #000000;
                }
            }
        }

        .BtnContent{
            margin-top: .19rem;
            display: flex;
            justify-content: center;
            
            .HintBtn{
                height: .4rem;
                width: auto;
                background: #EAEAEA;
                border-radius: .2rem;
                padding: .06rem .2rem;
                &:first-child{
                    margin-right: .4rem;
                }
                &:last-child{
                    margin-left: .4rem;
                }

                .HintMsg{
                    height: .28rem;
                    opacity: 0.25;
                    font-family: PingFangSC-Regular;
                    font-size: .2rem;
                    color: #000000;
                    letter-spacing: 0;
                    text-align: center;
                }
            }
        }
    }
</style>