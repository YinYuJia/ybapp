<template>
    <div>
        <!-- Index -->
        <div class="IconNav" v-if="'Index_IconNav' == PropsMsg">
            <el-row class="IconList">
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon icon-class="IconNav_card" /></div>
                    <div class="IconText"><span>电子社保卡</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon icon-class="IconNav_registration" /></div>
                    <div class="IconText"><span>预约挂号</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon icon-class="IconNav_TreatReport" /></div>
                    <div class="IconText"><span>诊疗报告</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon icon-class="IconNav_HealthManage" /></div>
                    <div class="IconText"><span>健康管理</span></div>
                </el-col>
            </el-row>
            <el-row class="IconList">
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon icon-class="IconNav_HospitalSearch" /></div>
                    <div class="IconText"><span>医院查询</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon icon-class="IconNav_progress" /></div>
                    <div class="IconText"><span>办事进度</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon icon-class="IconNav_DeliverMedi" /></div>
                    <div class="IconText"><span>送药上门</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon icon-class="IconNav_more" /></div>
                    <div class="IconText"><span>更多</span></div>
                </el-col>
            </el-row>
        </div>
        <!-- work -->
        <div class="IconNav" v-if="'Work_NavList' == PropsMsg">
            <el-row class="IconList">
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon icon-class="Work_NavList_1" /></div>
                    <div class="IconText"><span>参保服务</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon icon-class="Work_NavList_2" /></div>
                    <div class="IconText"><span>备案服务</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon icon-class="Work_NavList_3" /></div>
                    <div class="IconText"><span>待遇报销</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon icon-class="Work_NavList_4" /></div>
                    <div class="IconText"><span>其他服务</span></div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            PropsMsg:{
                type:String,
                default:""
            }
        },
        created() {
            console.log(this.PropsMsg)
        }
    }
</script>

<style lang="less" scoped>
    .IconNav {
        width: 7.5rem;
        background: #fff;
        .IconList {
            display: flex;
            align-items: center;
            height: 3.45rem/2;
            .IconBox {
                .IconImg {
                    height: .8rem;
                    width: .8rem;
                    margin: auto;
                    .svg-icon {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
                .IconText {
                    height: .33rem;
                    margin-top: .1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    span {
                        display: block;
                        opacity: .65;
                        font-family: 'PingFangSC-Regular';
                        letter-spacing: 0;
                        color: #000;
                        font-size: .24rem;
                    }
                }
            }
        }
    }
</style>