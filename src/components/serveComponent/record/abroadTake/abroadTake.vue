<template>
    <div class="abroadTake">
        <Title :title="'出国带药备案'" :backRouter="'/'"></Title>
        <!-- MintUI弹出框区域 -->
        <SelectCity 
            :type="2"
            ref="insuredPicker"
            @confirm="chooseInsured"
            >
        </SelectCity>
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
            <UserBaseInfo></UserBaseInfo>
            <!-- 申报信息 -->
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地</span></div>
                    <div class="InfoText">
                         <div class="InfoText"><input @click="openInsuredPicker" type="text" v-model="AAB301000" placeholder="请选择" readonly></div>
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
                        <div class="InfoText"><input type="text" @click="chooseHospital" v-model="form.AKB020Name" placeholder="请选择" readonly></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>护照号码</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input type="text" v-model="form.BKE260" placeholder="请输入"></div>
                    </div>
                </div>
            </div>
            <!-- 附件上传 -->
            <div class="supplementInfo">
                <div class="infoName">附件上传，请选择下述其中一项附件内容进行上传</div>
                <div class="infoList">
                    1、出国带药备案表（医院盖章）
                </div>
                <div class="photoBox">
                    <svg-icon icon-class="serveComponent_upload" />
                </div>
            </div>
        </div>
        <!-- 按钮 -->
        <Footer :canSubmit='canSubmit' @submit="submit()"></Footer>
    <SearchInfoPage ref="hospita" @childrenClick="hospitaClick" title="取药机构"></SearchInfoPage>

    </div>
</template>

<script>
    export default {
        data() {
            return {           
                AAB301000: '', //参保地
                form: {
                    AAS301: '', //参保地省
                    AAB301: '', //参保地市
                    AAQ301: '', //参保地区
                    AKB020: '',//取药机构
                    AKB020Name: '',//取药机构
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
            this.epFn.setTitle('出国带药备案')
            // this.form = this.$store.state.SET_ABROADTAKE_OPERATION;
            // this.form.AAC003 = this.$store.state.SET_NATIVEMSG.name
            // this.form.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;  
            // this.form.AAB301000 = this.$store.state.SET_USER_DETAILINFO.regionName
            // this.form.AAB301 = this.$store.state.SET_USER_DETAILINFO.AAB301
        },
        watch: {
            form: {
                handler: function(val) {
                    // 判断不为空
                    if (val.AAB301000 != '' && val.AAE030 != '' && val.AAE031 != '' && val.AKB020 != '' && val.BKE260 != '' ) {
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
             // 选择取药机构
            chooseHospital(){
                this.$refs.hospita.open();
                // this.$store.dispatch('SET_SMALL_REIM_1', this.form);
                // this.$router.push('/searchHospital');
            },
            hospitaClick(code,name){
                this.form.AKB020Name = name
                this.form.AKB020 = code
            },
            // 选择参保地
            openInsuredPicker(){
                this.$refs.insuredPicker.open();
            },
            chooseInsured(val){
                this.AAB301000=val.name;
                this.form.AAS301=val.code[0]
                this.form.AAB301=val.code[1]
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
                
            // if(this.form.BKE260){
            //     if(!this.util.passPort(this.form.BKE260)){
            //         this.$toast('请填写正确的护照号(第一位英文字母+8个数字)');
            //         return false;
            //     }
            // }
            if (this.canSubmit == false) {
                this.$toast('信息未填写完整');
                return false;
            } else {
                this.$store.dispatch('SET_ABROADTAKE_OPERATION', this.form);

                // 封装数据
                let params = this.formatSubmitData();
                // 开始请求
                console.log('parmas------',params)
                this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1021/info', params).then((resData) => {
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

            submitForm.AAE030 = this.util.DateToNumber(this.form.AAE030);
            submitForm.AAE031 = this.util.DateToNumber(this.form.AAE031);
            submitForm.AAS301 =  this.form.AAS301;//参保地省
            submitForm.AAB301 =  this.form.AAB301;//参保地市
            submitForm.AAQ301 =  this.form.AAQ301;//参保地区
            submitForm.AKB020 =  this.form.AKB020;//取药机构
            submitForm.BKE260 =  this.form.BKE260;//护照号码
            submitForm.BKZ019 =  this.form.BKZ019;//护照号码
            // submitForm.debugTest=  "true";
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                submitForm.AAC003 = '许肖军';
                submitForm.AAE135 = "332625197501010910";
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
        margin-bottom: 1.4rem;
        .ReportInfo {
            height: 6rem;
            width: 7.5rem;
            padding: 0 .3rem;
            background: white;
            .InfoLine {
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .28rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName {
                    line-height: 1.2rem;
                    span {
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText {
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    input {
                        height: .6rem;
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
        // 补充资料
        .supplementInfo{
            background: #FFF;
            font-size: .28rem;
            color: #000000;
            line-height: 38px;
            text-align: left;
            padding: .1rem .3rem;
            margin-top: .3rem;
            .infoName{
                letter-spacing: 0;
            }
            .infoList{
                letter-spacing: 0;
            }
            .photoBox{
                text-align: left;
                .svg-icon{
                    height: 1.5rem;
                    width: 1.5rem;
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
