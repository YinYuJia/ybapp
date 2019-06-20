<template>
    <div class="elseWhere">
        <Title :title="'异地就医备案'" :backRouter="'/'"></Title>
        <!-- MintUI弹出框区域 -->
        <mt-datetime-picker
            type="date"
            ref="startPicker"
            v-model="dateVal"
            @confirm="handleStartConfirm">
        </mt-datetime-picker>
        <mt-datetime-picker
            type="date"
            ref="endPicker"
            v-model="dateVal"
            @confirm="handleEndConfirm">
        </mt-datetime-picker>
        <selectCity 
            :type="3"
            ref="insuredPicker"
            @confirm="chooseInsured"
            >
        </selectCity>
        <selectCity 
            :type="3"
            ref="cityPicker"
            @confirm="chooseCity"
            >
        </selectCity>
        <!-- 弹出框区域结束 -->
        <div class="Content">
            <!-- 基本信息 -->
            <userBaseInfo></userBaseInfo>
            <!-- 申报信息 -->
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地</span></div>
                    <div class="InfoText">
                        <input @click="openInsuredPicker" type="text" v-model="form.AAS011000" placeholder="请选择" readonly>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>拟离杭日期</span></div>
                    <div class="InfoText">
                        <input @click="openStartPicker" type="text" v-model="form.AAE030" placeholder="请选择" readonly>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>回杭日期</span></div>
                    <div class="InfoText">
                        <input @click="openEndPicker" type="text" v-model="form.AAE031" placeholder="请选择" readonly>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>申请地市</span></div>
                    <div class="InfoText">
                        <input @click="openCityPicker" type="text" v-model="form.AAB301000" placeholder="请选择" readonly>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>详细地址</span></div>
                    <div class="InfoText">
                        <textarea v-model="form.AAE006" placeholder="请输入详细地址"></textarea>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>申请原因</span></div>
                    <div class="InfoText">
                        <el-select v-model="form.AKC030" placeholder="请选择">
                            <el-option v-for="item in reportReason" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>联系人</span></div>
                    <div class="InfoText"><input type="text" v-model="form.AAE004" placeholder="请输入联系人"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>联系电话</span></div>
                    <div class="InfoText"><input type="tel" maxlength="11" v-model="form.AAE005" placeholder="请输入联系电话"></div>
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
import selectCity from '../../common/selectCity'
import Footer from '../../common/Footer'
export default {
    components:{
        Title,userBaseInfo,selectCity,Footer
    },
    data() {
        return {
            // 提交信息
            form: {
                AAB301000:"",
                AAS011000:"",
                AAE030: '', //离杭日期
                AAE031: '', //回杭日期
                AAS011: '', //参保地省
                AAE011: '', //参保地市
                AAQ011: '', //参保地区
                AAE006: '', //详细地址 
                AKC030: '', //申请原因
                AAE004: '', //联系人
                AAE005: '', //联系电话
                AAS301: '',//申请地省
                AAB301: '',//申请地市
                AAQ301: '',//申请地区
            },
            optionList: [], //存放城市数据
            canSubmit: false,
            dateVal: new Date(), //默认绑定的时间
            reportReason: [{
                    value: '1',
                    label: '退休异地安置'
                },
                {
                    value: '2',
                    label: '在职驻外工作学习'
                },
                {
                    value: '3',
                    label: '异地探亲'
                },
                {
                    value: '4',
                    label: '异地生育'
                },
                {
                    value: '5',
                    label: '子女统筹异地学习/抚养'
                },
            ],
        }
    },
    created() {
        this.form = this.$store.state.SET_ELSEWHERE_OPERATION;
        this.$store.dispatch('SET_SELECTARRAY', this.epFn.ChinaJsonDatas());
        this.optionList = this.$store.state.SET_SELECTARRAY;
        console.log('11111---publicHeader---', this.$store.state.SET_NATIVEMSG.PublicHeader)
        this.form.AAC003 = this.$store.state.SET_NATIVEMSG.name
        this.form.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
    },
    watch: {
        form: {
            handler: function(val) {
                // 判断不为空
                if (val.AAS011000 != '' && val.AAE030 != '' && val.AAE031 != '' && val.AAE011 != '' && val.AAE006 != '' && val.AKC030 != '' && val.AAE004 != '' && val.AAE005 != '' && val.AAB301000 != '') {
                    this.canSubmit = true;
                } else {
                    this.canSubmit = false;
                }
                // 判断时间间隔
                if (val.AAE030 != '' && val.AAE031 != '') {
                    let AAE030 = new Date(val.AAE030);
                    let AAE031 = new Date(val.AAE031);
                    let month = 24 * 3600 * 1000 * 30;
                    let gap = AAE031 - AAE030;
                    if (gap < month) {
                        this.$toast('备案时间至少一个月');
                        this.form.AAE031 = '';
                    }
                }
                if(val.AAE005.length>11){
                    this.$toast('手机号码不能超过11位');
                }
                // 判断转入转出地
                if (val.AAS011000 != '' && val.AAB301000 != '') {
                    if(val.AAS011000==val.AAB301000){
                        this.$toast('参保地不能与申请地市相同');
                        this.form.AAB301000 = '';
                    }
                }
            },
            deep: true
        },
    },
    methods: {
        // 选择参保地
        openInsuredPicker(){
            this.$refs.insuredPicker.open();
        },
        chooseInsured(val){
            this.form.AAS011000 =val.name, //参保地省
            this.form.AAS011 =val.code[0], //参保地省
            this.form.AAE011 =val.code[1], //参保地市
            this.form.AAQ011 =val.code[2]  //参保地区
        },
        // 选择离开日期
        openStartPicker(){
            this.$refs.startPicker.open();
        },
        handleStartConfirm(val){
            let date = this.util.formatDate(val,'yyyy-MM-dd');
            console.log("data",date)
            this.form.AAE030 = date;
        },
        // 选择回杭日期
        openEndPicker(){
            this.$refs.endPicker.open();
        },
        handleEndConfirm(val){
            let date = this.util.formatDate(val,'yyyy-MM-dd');
            this.form.AAE031 = date;
        },
        // 选择申请地市
        openCityPicker(){
            this.$refs.cityPicker.open();
        },
        chooseCity(val){
            this.form.AAB301000= val.name;
            this.form.AAS301=val.code[0]
            this.form.AAB301=val.code[1]
            this.form.AAQ301=val.code[2]
        },
        // 提交
        submit() {
            console.log(this.form.AAE030)
            console.log(this.form.AAE031)
            if(this.form.AAE005){
                if(!this.util.checkPhone(this.form.AAE005)){
                    this.$toast('请填写正确的联系电话');
                    return false;
                }
            }
            if (this.canSubmit == false) {
                this.$toast('信息未填写完整');
                return false;
            } else {
                this.$store.dispatch('SET_ELSEWHERE_OPERATION', this.form);

                // 封装数据
                let params = this.formatSubmitData();
                // 开始请求
                console.log('parmas------',params)
                this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1012/addRecord', params).then((resData) => {
                        console.log('返回成功信息',resData)
                        //   成功   1000
                            if ( resData.enCode == 1000 ) {
                                this.$toast("提交成功");
                                this.$router.push("/elseDetail");
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
        formatSubmitData(){
            let submitForm ={};
            // 日期传换成Number
            submitForm.AAE030 = this.util.DateToNumber(this.form.AAE030).toString();
            submitForm.AAE031 = this.util.DateToNumber(this.form.AAE031).toString();
            submitForm.AAS301 = this.form.AAS301//申请地省
            submitForm.AAB301 = this.form.AAB301//申请地市
            submitForm.AAQ301 = this.form.AAQ301//申请地区
            submitForm.AAS011=  this.form.AAS011 //参保地省
            submitForm.AAE011=  this.form.AAE011 //参保地市
            submitForm.AAQ011=  this.form.AAQ011 //参保地区
            submitForm.AAE006=  this.form.AAE006 //详细地址 
            submitForm.AKC030=  this.form.AKC030 //申请原因
            submitForm.AAE004=  this.form.AAE004 //联系人
            submitForm.AAE005=  this.form.AAE005 //联系电话
            // submitForm.debugTest=  "true";
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                submitForm.AAC003 = '殷宇佳';
                submitForm.AAE135 = "113344223344536624";
            }
            // 请求参数封装
            console.log('submitForm',submitForm)
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1012");
            console.log("params444444444444444444444",params)
            return params;
        }
    }
}
</script>

<style lang="less" scoped>
.elseWhere {
    .Content {
        height: 100%;
        margin-bottom: 1.4rem;
        .ReportInfo {
            height: 10rem;
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
                &:nth-child(5) {
                    height: 1.6rem;
                    textarea {
                        height: .84rem;
                        width: 4rem;
                        padding: 0;
                        font-size: .3rem;
                        opacity: 0.85;
                        color: #000000;
                        line-height: .42rem;
                        text-align: right;
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
    .elseWhere .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 160px;
    }
    .elseWhere .el-input__prefix,
    .el-input__suffix {
        display: none;
    }
    .elseWhere .el-input__inner {
        border: none;
        text-align: right;
        padding-right: 0;
        padding-left: 0;
    }
    .elseWhere .el-cascader .el-input .el-input__inner {
        width: 4.5rem;
    }
    .elseWhere .el-cascader .el-cascader__label {
        text-align: right;
        padding: 0;
    }
</style>