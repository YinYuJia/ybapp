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
                <div class="Icon"><svg-icon icon-class="MyItems_receive" /></div>
                <div class="Text"><span>收件</span></div>
            </el-col>
            <el-col :span="4" class="IconBox">
                <div class="Icon"><svg-icon icon-class="MyItems_accept" /></div>
                <div class="Text"><span>受理</span></div>
            </el-col>
            <el-col :span="4" class="IconBox">
                <div class="Icon"><svg-icon icon-class="MyItems_check" /></div>
                <div class="Text"><span>审核</span></div>
            </el-col>
            <el-col :span="4" class="IconBox">
                <div class="Icon"><svg-icon icon-class="MyItems_done" /></div>
                <div class="Text"><span>办结</span></div>
            </el-col>
            <el-col :span="4" class="IconBox">
                <div class="Icon"><svg-icon icon-class="MyItems_delivery" /></div>
                <div class="Text"><span>送达</span></div>
            </el-col>
        </el-row>
        <!-- 信息 -->
    </div>
</template>

<script>
export default {
    
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
    }
</style>