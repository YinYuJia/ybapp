<template>
    <div class="turnOut">
        <Title :title="'转外就医备案'" :backRouter="'/'"></Title>
        <!-- MintUI弹出框区域 -->
        <selectCity 
            :type="3"
            ref="insuredPicker"
            @confirm="chooseInsured"
            >
        </selectCity>
        <mt-datetime-picker
            type="date"
            ref="startPicker"
            v-model="dateVal"
            @confirm="handleStartConfirm">
        </mt-datetime-picker>
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
                    <div class="InfoText"><input @click="openInsuredPicker" type="text" v-model="form.AAA301000" placeholder="请选择" readonly></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>开始日期</span></div>
                    <div class="InfoText"><input @click="openStartPicker" type="text" v-model="form.AAE030" placeholder="请选择" readonly></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>结束日期</span></div>
                    <div class="InfoText"><input type="text" v-model="form.AAE031" placeholder="请选择" readonly></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>转往地市</span></div>
                    <div class="InfoText"><input @click="openCityPicker" type="text" v-model="form.AAB301000" placeholder="请选择" readonly></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>疾病名称</span></div>
                    <div class="InfoText"><input type="text" v-model="form.AKA121" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>就医疗程</span></div>
                    <div class="InfoText">
                        <el-select v-model="form.BKE255" placeholder="请选择">
                            <el-option v-for="item in treatment" :key="item.value" :label="item.label" :value="item.value">
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
import selectCity from '../../common/selectCity'
import Footer from '../../common/Footer'
    export default {
        components: {
            Title,userBaseInfo,selectCity,Footer
        },
        data() {
            return {
                dddddd: "1111",
                form: {
                    AAA301000:"",//参保地
                    AAB301000: "",//转往地市
                    AAE030: '', //开始日期
                    AAE031: '', //结束日期
                    AAS301: "", //转往地省
                    AAB301: "", //转往地市
                    AAQ301: "", //转往地区
                    AKA121: '',//疾病名称
                    BKE255: '', //就诊疗程
                    photoIdList:[],//照片ID数组
                    BKZ019:""
                },
                canSubmit: false,
                dateVal: new Date(), //默认绑定的时间
                treatment: [
                    {value:'初诊', label:'初诊'},
                    {value:'复诊', value:'复诊'}
                ],
            }
        },
        created() {
            console.log('form',this.form);
            this.form = this.$store.state.SET_TURNOUT_OPERATION;
            this.form.AAC003 = this.$store.state.SET_NATIVEMSG.name
            this.form.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
        },
        watch: {
            form: {
                handler: function(val) {
                    // 判断不为空
                    if (val.AAA027000 != '' && val.AAB301000 != '' && val.AAE030 != '' && val.AAE031 != '' && val.AKA121 != '' && val.BKE255 != '' ) {
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
                    if (gap <= 0) {
                        this.$toast('开始日期需大于结束日期');
                        this.form.AAE031 = '';
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
                this.form.AAA301000=val.name
            },
            // 选择开始日期
            openStartPicker(){
                this.$refs.startPicker.open();
            },
            handleStartConfirm(val){
                this.getEndDate(val);
                let date = this.util.formatDate(val,'yyyy-MM-dd');
                this.form.AAE030 = date;
            },
            // 计算三个月后日期
            getEndDate(val){
                let year = val.getFullYear();
                let month = val.getMonth()+1;
                let day = val.getDate();
                console.log(month);
                
                if(month + 3 > 12){
                    year ++;
                    month = month + 3 - 12;
                }else{
                    month += 3;
                }
                if(month < 10){
                    month = '0' + month;
                }
                this.form.AAE031 = year + '-' + month + '-' + day;
            },
            // 选择转往地市
            openCityPicker(){
                this.$refs.cityPicker.open();
            },
            chooseCity(val){
                this.form.AAB301000= val.name;
                this.form.AAS301=val.code[0]
                this.form.AAB301=val.code[1]
                this.form.AAQ301=val.code[2]
            },
            submit() {
                
            if (this.canSubmit == false) {
                this.$toast('信息未填写完整');
                return false;
            } else {
                this.$store.dispatch('SET_TURNOUT_OPERATION', this.form);

                // 封装数据
                let params = this.formatSubmitData();
                // 开始请求
                console.log('parmas------',params)
                this.$axios.post(this.epFn.ApiUrl2()+ '/h5/jy1020/info', params).then((resData) => {
                        console.log('返回成功信息',resData)
                        //   成功   1000
                            if ( resData.enCode == 1000 ) {
                                this.$toast("提交成功");
                                this.$router.push('/turnDetail');
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
                let submitForm = {};
                // 日期传换成Number
                console.log(this.form);
                submitForm.AAE030 = this.util.DateToNumber(this.form.AAE030);
                submitForm.AAE031 = this.util.DateToNumber(this.form.AAE031);
                
                submitForm.AAS301 =  this.form.AAS301;//参保地省
                submitForm.AAB301 =  this.form.AAB301;//参保地市
                submitForm.AAQ301 =  this.form.AAQ301;//参保地区
                submitForm.AKA121 =  this.form.AKA121;//疾病名称
                submitForm.BKE255 =  this.form.BKE255;//就诊疗程
                submitForm.photoIdList =  this.form.photoIdList;//照片ID数组
                submitForm.BKZ019 =  this.form.BKZ019;//经办编号
                // submitForm.debugTest=  "true";
                // submitForm.dibuger =  "true";
                // 加入用户名和电子社保卡号
                if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                    submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                    submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
                }else {
                    submitForm.AAC003 = '胡';
                    submitForm.AAE135 = "113344223344536624";
                }
                // 请求参数封装
                const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1020");
                return params;
            }
        }
    }
</script>

<style lang="less" scoped>
.turnOut {
    .Content {
        height: 100%;
        .ReportInfo {
            height: 7.2rem;
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
    }
}
</style>

<style>
.turnOut .el-input__prefix,
.el-input__suffix {
    display: none;
}
.turnOut .el-input__inner {
    border: none;
    text-align: right;
    padding-right: 0;
    padding-left: 0;
}
</style>