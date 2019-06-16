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
            <!-- 列表信息 -->
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>就诊医院：</span></div>
                    <div class="InfoText"><input @click="chooseHospital()" type="text" v-model="form.hospitalName" placeholder="请输入" readonly></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>就诊类型：</span></div>
                    <div class="InfoText">
                        <el-select v-model="form.AKA078" placeholder="请选择">
                            <el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>就诊日期：</span></div>
                    <div class="InfoText"><input @click="openTimePicker()" type="text" v-model="form.AAE030" placeholder="请输入" readonly></div>
                </div>
            </div>
        </div>
        <!-- 按钮 -->
        <Footer :canSubmit="canSubmit" :btnText="'下一步'" @submit="submit()"></Footer>
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
                AKB020: '', //医院编码
                AKA078: '', //就诊类型
                AAE030: '', //就诊日期
            },
            dateVal: new Date(), //默认绑定的时间
            canSubmit: false,
            progress:[
                {step:1,name:'申请报销'},
                {step:2,name:'发票信息'},
                {step:3,name:'信息录入'},
                {step:4,name:'申报完成'}
            ],
            type: [ //就诊类型
                {value: '1',label: '门诊'},
                {value: '3',label: '住院'}
            ],
        }
    },
    watch:{
        form: {
            handler: function(val) {
                // 判断不为空
                if (val.AKB020 != '' && val.AKA078 != '' && val.AAE030 != '') {
                    this.canSubmit = true;
                } else {
                    this.canSubmit = false;
                }
            },
            deep: true
        },
    },
    created() {
        this.form = JSON.parse(JSON.stringify(this.$store.state.SET_SMALL_REIM_1));
    },
    methods: {
        // 选择就诊医院
        chooseHospital(){
            this.$store.dispatch('SET_SMALL_REIM_1', this.form);
            this.$router.push('/searchHospital');
        },
        // 选择就诊日期
        openTimePicker(){
            this.$refs.timePicker.open();
        },
        handleTimeConfirm(val){
            let date = this.util.formatDate(val,'yyyy-MM-dd');
            this.form.AAE030 = date;
        },
        // 提交
        submit(){
            if(!this.canSubmit){
                this.$toast('信息未填写完整');
                return false;
            }else{
                console.log(this.form);
                // 封装数据
                let params = this.formatSubmitData();
                console.log(params);
                this.$axios.post(this.epFn.ApiUrl1() + '/h5/jy1026/getInvoice', params).then((resData) => {
                    console.log('返回成功信息',resData)
                    //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        this.$store.dispatch('SET_SMALL_REIM_2', resData.LS_DS1);
                        this.$router.push("/invoiceInfo");
                    }else if (resData.enCode == 1001 ) {
                    //   失败  1001
                        this.$toast(resData.msg);
                        return;
                    }else{
                        this.$toast('业务出错');
                        return;
                    }
                })
            }
        },
        // 封装提交的数据
        formatSubmitData(){
            let submitForm = JSON.parse(JSON.stringify(this.form)); //深拷贝
            delete submitForm.hospitalName; //删除医院名称
            submitForm.AAE030 = this.util.DateToNumber(submitForm.AAE030).toString(); //改变日期格式
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                submitForm.AAC003 = '胡';
                submitForm.AAE135 = "113344223344536624";
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,1026);
            return params;
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

<style>
    .smallReim .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 160px;
    }
    .smallReim .el-input__prefix,
    .el-input__suffix {
        display: none;
    }
    .smallReim .el-input__inner {
        border: none;
        text-align: right;
        padding-right: 0;
        padding-left: 0;
    }
    .smallReim .el-cascader .el-input .el-input__inner {
        width: 4.5rem;
    }
    .smallReim .el-cascader .el-cascader__label {
        text-align: right;
        padding: 0;
    }
</style>