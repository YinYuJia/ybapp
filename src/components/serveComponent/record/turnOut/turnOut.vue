<template>
    <div class="turnOut">
        <div class="Title">
            <el-row>
                <el-col :span="6">
                    <div class="BackIcon" @click="backIndex()">
                        <svg-icon icon-class="serveComponent_back" />
                        <span>返回</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="NameTitle">转外就医备案</div>
                </el-col>
                <el-col :span="6">
                </el-col>
            </el-row>
        </div>
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
                    <div class="InfoText">
                         <div class="InfoText"><input @click="openInsuredPicker" type="text" v-model="form.canbao" placeholder="请选择" readonly></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>开始日期</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input @click="openStartPicker" type="text" v-model="form.start" placeholder="请选择" readonly></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>转往地市</span></div>
                    <div class="InfoText">
                         <div class="InfoText"><input @click="openCityPicker" type="text" v-model="form.AAB301" placeholder="请选择" readonly></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>疾病名称</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input type="text" v-model="form.AKA121" placeholder="请选择"></div>
                    </div>
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
        <footer class="Footer">
            <div class="SubmitBtn" @click="submit" :class="{'active': canSubmit == true}">
                <span>确认提交</span>
            </div>
        </footer>
    </div>
</template>

<script>
import userBaseInfo from '../../common/userBaseInfo'
import selectCity from '../../common/selectCity'
    export default {
        components: {
            'userBaseInfo': userBaseInfo,
            'selectCity': selectCity,
        },
        data() {
            return {
                dddddd: "1111",
                form: {
                    canbao: [], //参保地
                    start: '', //开始日期
                    AAB301: [], //转往地市
                    AKA121: '',//疾病名称
                    BKE255: '', //就诊疗程
                },
                optionList: [], //存放城市数据
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
            backIndex() {
                this.$router.push('/');
            },
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
                if (this.canSubmit == false) {
                    this.$toast('信息未填写完整');
                    return false;
                } else {
                    this.$store.dispatch('SET_TURNOUT_OPERATION', this.form);

                    let submitForm = JSON.parse(JSON.stringify(this.form)); //深拷贝，否则出错
                    submitForm.canbao = submitForm.canbao.join(' '); //省市信息转换为字符串
                    submitForm.city = submitForm.city.join(' '); //省市信息转换为字符串
                    submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name; //用户名
                    submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard; //单子社保卡号
                    console.log('请求信息',submitForm);
                    this.$router.push('/turnDetail');
                }
            },
        }
    }
</script>

<style lang="less" scoped>
.turnOut {
    .Title {
        height: .8rem;
        background-color: white;
        line-height: .8rem;
        .BackIcon{
            display: flex;
            align-items: center;
            color: #1492FF;
            font-size: .32rem;
            .svg-icon{
                height: .5rem;
                width: .5rem;
            }
        }
        .NameTitle {
            color: #000000;
            letter-spacing: 0;
            font-size: .36rem;
        }
    }
    .Content {
        height: 100%;
        .ReportInfo {
            height: 6rem;
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
    .Footer {
        height: 1.31rem;
        width: 7.5rem;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 199;
        display: flex;
        justify-content: center;
        .SubmitBtn {
            height: 1.05rem;
            width: 7.1rem;
            border-radius: .05rem;
            line-height: 1.05rem;
            background: #F2F2F2;;
            font-family: PingFangSC-Regular;
            font-size: .36rem;
            color: #B4B4B4;
            letter-spacing: 0;
            text-align: center;
        }
        .active{
            background: #1492FF;
            color: #FFFFFF;
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