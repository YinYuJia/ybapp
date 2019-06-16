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
        <Footer :canSubmit="true" :btnText="'下一步'" @submit="submit()"></Footer>
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
<<<<<<< HEAD
        this.form = this.$store.state.SET_SMALLREIM_OPERATION;
        this.form.AAC003 = this.$store.state.SET_NATIVEMSG.name
        this.form.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
    },
    watch: {
        form: {
            handler: function(val) {
                // 判断不为空
                // && val.number != ''   没字段
                if (val.AAB301 != '' && val.ACK264 != ''  && val.AAE008 != '' && val.AAE009 != '' && val.AAE010 != '') {
                    this.canSubmit = true;
                } else {
                    this.canSubmit = false;
                }
            },
            deep: true
        },
=======
        // 获取选择的就诊医院
        this.form.hospitalName = this.$store.state.SET_SMALL_REIM.hospitalName;
        this.form.hospitalCode = this.$store.state.SET_SMALL_REIM.hospitalCode;
>>>>>>> 78c9aa58d46605d7c3aa5a4f9074caad7a06b79c
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
<<<<<<< HEAD
        submit() {
            
            if (this.canSubmit == false) {
                this.$toast('信息未填写完整');
                return false;
            } else {
                this.$store.dispatch('SET_SMALLREIM_OPERATION', this.form);

                // 封装数据
                let params = this.formatSubmitData();
                // 开始请求
                console.log('parmas------',params)
                this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1012/addRecord', params).then((resData) => {
                    console.log('返回成功信息',resData);
                    this.$router.push('/smallReimDetail')
                }).catch((error) => {
                    console.log(error)
                })
                
            }
        },
        formatSubmitData(){
            let submitForm = JSON.parse(JSON.stringify(this.form)); //深拷贝

            submitForm.AAB301 = this.form.AAB301;//参保地
            submitForm.ACK264 = this.form.ACK264;//发票费用总额
            submitForm.AAE008 = this.form.AAE008;//收款开户行
            submitForm.AAE009 = this.form.AAE009;//收款开户名
            submitForm.AAE010 = this.form.AAE010;//收款银行账号
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                submitForm.AAC003 = '胡';
                submitForm.AAE135 = "113344223344536624";
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,1012);
            return params;
=======
        submit(){
            this.$router.push('/invoiceInfo');
>>>>>>> 78c9aa58d46605d7c3aa5a4f9074caad7a06b79c
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