<template>
    <div class="infoRecord">
        <!-- 标题 -->
        <Title :title="'零星报销'" :backRouter="'/invoiceInfo'"></Title>
        <!-- 填写进度 -->
        <WorkProgress :currentStep="3" :progress="progress"></WorkProgress>
        <!-- 银行信息 -->
        <div class="Content">
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>银行账号：</span></div>
                    <div class="InfoText"><input type="text" v-model="form.account" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>开户行：</span></div>
                    <div class="InfoText"><input type="text" v-model="form.place" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>开户名：</span></div>
                    <div class="InfoText"><input type="text" v-model="form.name" placeholder="请输入" readonly></div>
                </div>
            </div>
            <!-- 提示 -->
            <div class="Hint">
                <div class="HintTitle"><i class="el-icon-warning" style="color:#05AEF0"></i>温馨提示</div>
                <div class="HintText">为保证您能正常领取报销费用，请仔细填写并核对您的收款银行账号信息。</div>
            </div>
        </div>
        <!-- 按钮 -->
        <Footer @submit="submit()" :canSubmit="true"></Footer>
    </div>
</template>

<script>
import Title from '../../common/Title'
import WorkProgress from '../../common/WorkProgress'
import Footer from '../../common/Footer'
export default {
    components:{
        Title,WorkProgress,Footer
    },
    data(){
        return{
            form:{
                account: '', //银行账户
                place: '', //开户行
                name: '', //开户名
            },
            progress:[
                {step:1,name:'申请报销'},
                {step:2,name:'发票信息'},
                {step:3,name:'信息录入'},
                {step:4,name:'申报完成'}
            ],
        }
    },
    methods:{
        submit(){
            this.$router.push('/reportComplete');
        }
    }
}
</script>

<style lang="less" scoped>
.infoRecord{
    .Content {
        height: 100%;
        margin-bottom: 1.4rem;
        .ReportInfo {
            height: 3.6rem;
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
                        height: .6rem;
                        width: 4.5rem;
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
        .Hint{
            margin-top: .45rem;
            padding: 0 .3rem;
            opacity: 0.45;
            font-family: PingFangSC-Regular;
            font-size: .24rem;
            color: #000000;
            text-align: left;
            .HintTitle{
                i{
                    margin-right: .2rem;
                    letter-spacing: 0;
                }
            }
            .HintText{
                margin-top: .28rem;
                letter-spacing: 0;
            }
        }
    }
}
</style>