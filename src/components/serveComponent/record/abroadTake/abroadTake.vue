<template>
    <div class="abroadTake">
        <Title :title="'出国带药备案'" :backRouter="'/'"></Title>
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
        <mt-datetime-picker
            type="date"
            ref="endPicker"
            v-model="dateVal"
            @confirm="handleEndConfirm">
        </mt-datetime-picker>
        <div class="Content">
            <!-- 基本信息 -->
            <userBaseInfo></userBaseInfo>
            <!-- 申报信息 -->
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地</span></div>
                    <div class="InfoText">
                         <div class="InfoText"><input @click="openInsuredPicker" type="text" v-model="form.AAB30100" placeholder="请选择" readonly></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>出境日期</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input @click="openStartPicker" type="text" v-model="form.AAE030" placeholder="请选择" readonly></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>拟回国日期</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input @click="openEndPicker" type="text" v-model="form.AAE031" placeholder="请选择" readonly></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>取药机构</span></div>
                    <div class="InfoText">
                        <!-- @click="gotoTakeDrug()" -->
                        <div class="InfoText"><input type="text" v-model="form.AKB020" placeholder="请选择"   ></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>护照号码</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input type="text" v-model="form.BKE260" placeholder="请输入"></div>
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
                form: {
                    AAB30100: '', //参保地
                    AAS301: '', //参保地省
                    AAB301: '', //参保地市
                    AAQ301: '', //参保地区
                    AKB020: '',//取药机构
                    AAE030: '', //出境日期
                    AAE031: '', //拟回国日期
                    BKE260: '', //护照号码
                    AAA100:"",//参数类别
                    BKZ019:"",//经办编号
                },
                dateVal: new Date(), //默认绑定的时间
                canSubmit: false,
            }
        },
        created () {
                this.form = this.$store.state.SET_ABROADTAKE_OPERATION;
                this.form.AAC003 = this.$store.state.SET_NATIVEMSG.name
                this.form.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;  
        },
        watch: {
            form: {
                handler: function(val) {
                    // 判断不为空
                    if (val.AAB301 != '' && val.AAE030 != '' && val.AAE031 != '' && val.AKB020 != '' && val.BKE260 != '' ) {
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
                        this.$toast('回国日期需大于出境日期');
                        this.form.AAE031 = '';
                    }
                }
                },
                deep: true
            },
        },
        methods: {
            gotoTakeDrug(){
                this.$router.push('/searchTakeDrug')
            },
            // 选择参保地
            openInsuredPicker(){
                this.$refs.insuredPicker.open();
            },
            chooseInsured(val){
                this.form.AAB30100=val.name;
                this.form.AAS301=val.code[0]
                this.form.AAB301=val.code[1]
                this.form.AAQ301=val.code[2]
                this.$store.dispatch('SET_ABROADTAKE_OPERATION', this.form);
            },
            // 选择出境日期
            openStartPicker(){
                this.$refs.startPicker.open();
            },
            handleStartConfirm(val){
                let date = this.util.formatDate(val,'yyyy-MM-dd');
                this.form.AAE030 = date;
            },
            // 选择回国日期
            openEndPicker(){
                this.$refs.endPicker.open();
            },
            handleEndConfirm(val){
                let date = this.util.formatDate(val,'yyyy-MM-dd');
                this.form.AAE031 = date;
            },
            submit() {
            if (this.canSubmit == false) {
                this.$toast('信息未填写完整');
                return false;
            } else {
                this.$store.dispatch('SET_ABROADTAKE_OPERATION', this.form);

                // 封装数据
                let params = this.formatSubmitData();
                // 开始请求
                console.log('parmas------',params)
                this.$axios.post(this.epFn.ApiUrl1() + '/h5/jy1021/info', params).then((resData) => {
                        console.log('返回成功信息',resData)
                        //   成功   1000
                            if ( resData.enCode == 1000 ) {
                                this.$toast("提交成功");
                                this.$router.push("/abroadDetail");
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

            submitForm.AAE030 = this.util.DateToNumber(this.form.AAE030).toString();
            submitForm.AAE031 = this.util.DateToNumber(this.form.AAE031).toString();
            console.log(typeof submitForm.AAE030)
            submitForm.AAS301 =  this.form.AAS301;//参保地省
            submitForm.AAB301 =  this.form.AAB301;//参保地市
            submitForm.AAQ301 =  this.form.AAQ301;//参保地区
            submitForm.AKB020 =  this.form.AKB020;//取药机构
            submitForm.BKE260 =  this.form.BKE260;//护照号码
            submitForm.BKZ019 =  this.form.BKZ019;//护照号码
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                submitForm.AAC003 = '胡';
                submitForm.AAE135 = "113344223344536624";
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1021");
            return params;
        }
        }
    }
</script>

<style lang="less" scoped>
.abroadTake {
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
        height: 1.2rem;
        width: 7.5rem;
        background: white;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 199;
        display: flex;
        justify-content: center;
        align-items: center;
        .Btn {
            height: .8rem;
            width: 6.9rem;
            background-image: linear-gradient(-90deg, rgb(142, 214, 253) 0%, rgb(173, 201, 255) 100%);
            border-radius: 40px;
            text-align: center;
            line-height: 0.8rem;
            font-family: PingFangSC-Regular;
            font-size: .36rem;
            color: #FFFFFF;
            letter-spacing: 0;
        }
        .active {
            background-image: linear-gradient(-90deg, #35B8FD 0%, #4E8DFF 100%);
        }
    }
}
</style>
