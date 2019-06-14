<template>
    <div class="payLimit">
        <!-- 标题 -->
        <Title :title="'缴费年限核定'" :backRouter="'/'"></Title>
        <div class="Content">
            <!-- 基本信息 -->
            <userBaseInfo></userBaseInfo>
            <!-- 列表信息 -->
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>视作缴费年限</span></div>
                    <div class="InfoText"><input type="number" v-model="form.AKC412" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>缴费月数</span></div>
                    <div class="InfoText"><input type="number" v-model="form.BAC213" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>退休工资</span></div>
                    <div class="InfoText"><input type="number" v-model="form.AAE041" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>提前退休类别</span></div>
                    <div class="InfoText">
                        <el-select v-model="form.BKE810" placeholder="请选择">
                            <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
        </div>
        <!-- 按钮 -->
        <Footer :canSubmit='canSubmit' @submit="submit()"></Footer>
    </div>
</template>

<script>
import Title from '../../common/Title'
import userBaseInfo from '../../common/userBaseInfo'
import Footer from '../../common/Footer'
export default {
    components:{
        Title,userBaseInfo,Footer
    },
    data() {
        return {
            // 提交信息
            form: {
                AKC412: '', //视作缴费年限
                BAC213: '', //缴费月数
                AAE041: '', //退休工资
                BKE810: '', //提前退休类别
            },
            canSubmit: false,
            types: [{
                    value: '类别1',
                    label: '类别1'
                },
                {
                    value: '类别2',
                    label: '类别2'
                },
                {
                    value: '类别3',
                    label: '类别3'
                }
            ],
        }
    },
    methods:{
        submit(){
            this.$router.push('/payLimitDetail')
        }
    }
}
</script>

<style lang="less" scoped>
.payLimit {
    .Content {
        height: 100%;
        margin-bottom: 1.4rem;
        .ReportInfo {
            height: 4.8rem;
            width: 7.5rem;
            padding: 0 .3rem;
            background: white;
            .InfoLine {
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .3rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName {
                    opacity: 0.85;
                    line-height: 1.2rem;
                    span {
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText {
                    opacity: 0.85;
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    input {
                        width: 4rem;
                        height: .6rem;
                        opacity: 0.85;
                        font-family: PingFangSC-Regular;
                        font-size: .3rem;
                        color: #000000;
                        letter-spacing: 0;
                        text-align: right;
                        border: none;
                    }
                }
                &:last-child {
                    border-bottom: none;
                }
            }
        }
    }
}
</style>

<style>
    .payLimit .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 160px;
    }
    .payLimit .el-input__prefix,
    .el-input__suffix {
        display: none;
    }
    .payLimit .el-input__inner {
        border: none;
        text-align: right;
        padding-right: 0;
        padding-left: 0;
    }
</style>