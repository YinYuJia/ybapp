<template>
    <div class="IconNav">
        <el-row class="IconList">
            <el-col :span="6" class="IconBox">
                <div class="IconImg"><embed src="../../../static/images/index/IconNav_card.svg" type=""></div>
                <div class="IconText"><span>电子社保卡</span></div>
            </el-col>
            <el-col :span="6" class="IconBox">
                <div class="IconImg"><embed src="../../../static/images/index/IconNav_registration.svg" type=""></div>
                <div class="IconText"><span>预约挂号</span></div>
            </el-col>
            <el-col :span="6" class="IconBox">
                <div class="IconImg"><embed src="../../../static/images/index/IconNav_TreatReport.svg" type=""></div>
                <div class="IconText"><span>诊疗报告</span></div>
            </el-col>
            <el-col :span="6" class="IconBox">
                <div class="IconImg"><embed src="../../../static/images/index/IconNav_HealthManage.svg" type=""></div>
                <div class="IconText"><span>健康管理</span></div>
            </el-col>
        </el-row>
        <el-row class="IconList">
            <el-col :span="6" class="IconBox">
                <div class="IconImg"><embed src="../../../static/images/index/IconNav_HospitalSearch.svg" type=""></div>
                <div class="IconText"><span>医院查询</span></div>
            </el-col>
            <el-col :span="6" class="IconBox">
                <div class="IconImg"><embed src="../../../static/images/index/IconNav_progress.svg" type=""></div>
                <div class="IconText"><span>办事进度</span></div>
            </el-col>
            <el-col :span="6" class="IconBox">
                <div class="IconImg"><embed src="../../../static/images/index/IconNav_DeliverMedi.svg" type=""></div>
                <div class="IconText"><span>送药上门</span></div>
            </el-col>
            <el-col :span="6" class="IconBox">
                <div class="IconImg"><embed src="../../../static/images/index/IconNav_more.svg" type=""></div>
                <div class="IconText"><span>更多</span></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
    .IconNav{
        width: 7.5rem;
        height: 3.45rem;
        background: #fff;

        .IconList{
            display: flex;
            align-items: center;
            height: 3.45rem/2;
             
            .IconBox{
                .IconImg{
                    height: .8rem;
                    width: .8rem;
                    margin: auto;
                    
                    embed{
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
                .IconText{
                    height: .33rem;
                    margin-top: .1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    span{
                        display: block;
                        opacity: .65;
                        font-family: PingFangSC-Regular;
                        letter-spacing: 0;
                        color: #000;
                        font-size: .24rem;
                    }
                }
            }
         }
    }
</style>