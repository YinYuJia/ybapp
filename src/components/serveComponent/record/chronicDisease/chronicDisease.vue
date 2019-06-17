<template>
    <div class="chronicDisease">
        <Title :title="'规定病种备案'" :backRouter="'/'"></Title>
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
        <!-- 弹出框区域结束 -->
        <div class="Content">
            <!-- 基本信息 -->
            <userBaseInfo></userBaseInfo>
            <!-- 列表信息 -->
            <div class="ListInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地</span></div>
                    <div class="InfoText">
                        <input @click="openInsuredPicker" type="text" v-model="form.canbao" placeholder="请选择" readonly>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>规定病种</span></div>
                    <div class="InfoText"><input @click="chooseDisease()" type="text" v-model="form.AKA035" placeholder="请输入" readonly></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>疾病1</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>疾病2</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>疾病3</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>开始日期</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>病历提取</span></div>
                    <div class="InfoText"></div>
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
                form: {
                    canbao: '', //参保地
                    AAS301: '', //参保地省编码
                    AAB301: '', //参保地市编码
                    AAQ301: '', //参保地区编码
                    AKA035: '', //规定病种
                    AKA120: '', //疾病编码1
                    AKA121: '', //疾病名称1
                    AKA1201: '', //疾病编码2
                    AKA1211: '', //疾病名称2
                    AKA1202: '', //疾病编码3
                    AKA1212: '', //疾病名称3
                    AAE030: '', //开始日期
                    BKE247: '', //病历本提取方式 1自取，2邮寄
                },
                dateVal: new Date(), //默认绑定的时间
                canSubmit: false,
                hospitalList: [
                    {value: '医院1',label: '医院1'},
                    {value: '医院2',label: '医院2'}
                ],
                typeList: [
                    {value: '类型1',label: '类型1'},
                    {value: '类型2',label: '类型2'}
                ],
                drugList: [
                    {value: '类型1',label: '类型1'},
                    {value: '类型2',label: '类型2'}
                ],
                drugTimeList: [
                    {value: '时期1',label: '时期1'},
                    {value: '时期2',label: '时期2'}
                ]
            }
        },
        methods: {
            // 选择参保地
            openInsuredPicker(){
                this.$refs.insuredPicker.open();
            },
            chooseInsured(val){
                this.form.canbao = val.name;
                this.form.AAS301 = val.code[0];
                this.form.AAB301 = val.code[1];
                this.form.AAQ301 = val.code[2];
            },
            // 选择开始日期
            openStartPicker(){
                this.$refs.startPicker.open();
            },
            handleStartConfirm(val){
                let date = this.util.formatDate(val,'yyyy-MM-dd');
                this.form.AAE030 = date;
            },
            submit() {
                this.$router.push('/');
            },
        }
    }
</script>

<style lang="less" scoped>
.chronicDisease {
    .Content {
        height: 100%;
        margin-bottom: 1.4rem;
        .ListInfo {
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
}
</style>

<style>
.chronicDisease .el-input__prefix,
.el-input__suffix {
    display: none;
}
.chronicDisease .el-input__inner {
    border: none;
    text-align: right;
    padding-right: 0;
    padding-left: 0;
}
</style>