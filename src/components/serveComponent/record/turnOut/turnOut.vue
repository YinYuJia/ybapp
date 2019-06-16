<template>
    <div class="turnOut">
        <Title :title="'转外就医备案'" :backRouter="'/'"></Title>
        <!-- MintUI弹出框区域 -->
        <selectCity 
            :type="2"
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
                    <div class="InfoText"><input @click="openInsuredPicker" type="text" v-model="form.AAB301" placeholder="请选择" readonly></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>开始日期</span></div>
                    <div class="InfoText"><input @click="openStartPicker" type="text" v-model="form.start" placeholder="请选择" readonly></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>结束日期</span></div>
                    <div class="InfoText"><input type="text" v-model="form.end" placeholder="请选择" readonly></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>转往地市</span></div>
                    <div class="InfoText"><input @click="openCityPicker" type="text" v-model="form.AAB301" placeholder="请选择" readonly></div>
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
                    AAB301: [], //参保地
                    start: '', //开始日期
                    end: '', //结束日期
                    AAB301: [], //转往地市
                    AKA121: '',//疾病名称
                    BKE255: '', //就诊疗程
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
            // this.form = this.$store.state.SET_TURNOUT_OPERATION;
            this.form.AAC003 = this.$store.state.SET_NATIVEMSG.name
            this.form.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
        },
        watch: {
            form: {
                handler: function(val) {
                    // 判断不为空
                    if (val.canbao != undefined && val.start != '' && val.city != undefined && val.treatName != '' && val.treatment != '') {
                        this.canSubmit = true;
                    } else {
                        this.canSubmit = false;
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
                this.form.canbao = val;
            },
            // 选择开始日期
            openStartPicker(){
                this.$refs.startPicker.open();
            },
            handleStartConfirm(val){
                let date = this.util.formatDate(val,'yyyy-MM-dd');
                this.form.start = date;
                // 计算结束日期
                this.getEndDate(date);
            },
            getEndDate(date){
                let startYear = parseInt(date.substr(0,4));
                let startMonth = parseInt(date.substr(5,2));
                let endDay = date.substr(8,2)
                let endMonth,endYear;
                if(startMonth + 3 > 12){
                    endMonth = startMonth + 3 - 12;
                    endYear = startYear + 1;
                }else{
                    endMonth = startMonth + 3;
                    endYear = startYear;
                }
                if(endMonth<10){
                    endMonth = '0' + endMonth;
                }
                let end = endYear + '-' + endMonth + '-' + endDay;
                this.form.end = end;
            },
            // 选择转往地市
            openCityPicker(){
                this.$refs.cityPicker.open();
            },
            chooseCity(val){
                this.form.AAB301 = val;
                console.log(val);
            },
            submit() {
                this.$router.push('/turnDetail');
            },
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