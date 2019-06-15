<template>
    <div class="smallReim">
        <Title :title="'零星报销'" :backRouter="'/'"></Title>
        <!-- MintUI弹出框区域 -->
        <mt-datetime-picker
            type="date"
            ref="timePicker"
            v-model="dateVal"
            @confirm="handleTimeConfirm">
        </mt-datetime-picker>
        <!-- 弹出框区域结束 -->
        <div class="Content">
            <!-- 填写进度 -->
            <WorkProgress :currentStep="1" :progress="progress"></WorkProgress>
            <!-- 基本信息 -->
            <userBaseInfo style="background:white"></userBaseInfo>
            
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>就诊医院：</span></div>
                    <div class="InfoText"><input @click="chooseHospital()" type="text" v-model="form.hospitalName" placeholder="请输入" readonly></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>就诊类型：</span></div>
                    <div class="InfoText"><input type="text" v-model="form.jiuzhen" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>就诊日期：</span></div>
                    <div class="InfoText"><input @click="openTimePicker()" type="text" v-model="form.jiuzhendate" placeholder="请输入" readonly></div>
                </div>
            </div>
        </div>
        <!-- 按钮 -->
        <Footer :canSubmit='canSubmit' :btnText="'下一步'" @submit="submit()"></Footer>
    </div>
</template>

<script>
import Title from '../../common/Title'
import WorkProgress from '../../common/WorkProgress'
import userBaseInfo from '../../common/userBaseInfo'
import Footer from '../../common/Footer'
export default {
    components: {
        Title,WorkProgress,userBaseInfo,Footer
    },
    data() {
        return {
            // 提交信息
            form: {
                hospitalName: '', //医院名称
                hospitalCode: '', //医院编码
                jiuzhen: '', //就诊类型
                jiuzhendate: '', //就诊日期
            },
            dateVal: new Date(), //默认绑定的时间
            canSubmit: false,
            progress:[
                {step:1,name:'申请报销'},
                {step:2,name:'发票信息'},
                {step:3,name:'信息录入'},
                {step:4,name:'申报完成'}
            ]
        }
    },
    created() {
        // 获取选择的就诊医院
        this.form.hospitalName = this.$store.state.SET_SMALL_REIM.hospitalName;
        this.form.hospitalCode = this.$store.state.SET_SMALL_REIM.hospitalCode;
    },
    methods: {
        // 选择就诊医院
        chooseHospital(){
            this.$router.push('/searchHospital');
        },
        // 选择就诊日期
        openTimePicker(){
            this.$refs.timePicker.open();
        },
        handleTimeConfirm(val){
            let date = this.util.formatDate(val,'yyyy-MM-dd');
            this.form.jiuzhendate = date;
        },
        // 提交
        submit(){
            this.$router.push('/invoiceInfo');
        }
    }
}
</script>

<style lang="less" scoped>
.smallReim {
    .Content {
        height: 100%;
        margin-bottom: 1.4rem;
        .ReportInfo {
            height: 3.6rem;
            width: 7.5rem;
            padding: 0 .3rem;
            margin: .15rem 0 0 0;
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
                &:last-child{
                    border-bottom: none;
                }
            }
        }
    }
}
</style>