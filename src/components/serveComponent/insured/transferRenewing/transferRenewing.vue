<template>
    <div class="insuredChange">
        <Title :title="'医保转移接续'" :backRouter="'/'"></Title>
        <!-- MintUI弹出框区域 -->
        <SelectCity 
            :type="3"
            ref="outCityPicker"
            :onlyZJ="true"
            @confirm="chooseOutCity"
            >
        </SelectCity>
        <SelectCity 
            :type="3"
            ref="inCityPicker"
            :onlyZJ="true"
            @confirm="chooseInCity"
            >
        </SelectCity>
        <!-- 弹出框区域结束 -->
        <div class="Content">
            <!-- 基本信息 -->
            <UserBaseInfo></UserBaseInfo>
            <!-- 变更信息 -->
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>转出地</span></div>
                    <div class="InfoText">
                         <div class="InfoText"><input @click="openOutCityPicker" type="text" v-model="form.AAA027000" placeholder="请选择" readonly></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>转入地</span></div>
                    <div class="InfoText">
                         <div class="InfoText"><input @click="openInCityPicker" type="text" v-model="form.AAB301000" placeholder="请选择" readonly></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>手机号码</span></div>
                    <div class="InfoText"><input type="tel" maxlength="11" v-model="form.AAE005" placeholder="请输入"></div>
                </div>
            </div>
            <!-- 提示 -->
            <div class="Hint">
                <div class="HintTitle"><i class="el-icon-warning" style="color:#05AEF0"></i>温馨提示</div>
                <div class="HintText">手机号码将用于您事项办结后的消息通知，请您准确填写。</div>
            </div>
        </div>
        <!-- 按钮 -->
        <Footer :canSubmit='canSubmit' @submit="submit()"></Footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            AAA027000:'',
            form:{
                AAA027000:"",
                AAS027:"", //转出地省code
                AAA027:"",//转出地市
                AAQ027:"",//转入地区

                AAS301:"", //转入地省code                
                AAB301:"",//转入地市
                AAQ301:"",//转入地区
                AAB301000:"",
                // phone: '' //手机号码
                AAE005: '', //手机号码,

                BKZ019:'',//经办编号

            },
            canSubmit: false,
        }
    },
    created () {
        this.epFn.setTitle('医保转移接续')
        let GinsengLandCode = sessionStorage.getItem("GinsengLandCode")
        let GinsengLandName = sessionStorage.getItem("GinsengLandName")

        console.log('GinsengLandCode',GinsengLandCode,'GinsengLandName',GinsengLandName)
        this.form.AAB301000 = GinsengLandName
        this.form.AAB301 = GinsengLandCode
        this.form.AAS301 = GinsengLandCode.substring(0,2) + '0000'
        console.log('aaaaaaaaa',this.form.AAA027000);
        // this.form = this.$store.state.SET_TRANSFERRENEWING_OPERATION;
        // this.form.AAC003 = this.$store.state.SET_NATIVEMSG.name|| "许肖军"
        // this.form.AAE135 = this.$store.state.SET_NATIVEMSG.idCard|| "332625197501010910"
    },
    watch: {
       form:{
            handler: function(val) {
                console.log(val);
                // 判断不为空
                if ( val.AAB301000 != '' && val.AAE005 != '') {
                    this.canSubmit = true;
                } else {
                    this.canSubmit = false;
                }
                // 判断转入转出地
                if (val.AAA027000 != '' && val.AAB301000 != '') {
                    if(val.AAA027000==val.AAB301000){
                        this.$toast('转出地不能与转入地相同');
                        this.form.AAA027000 = '';
                    }
                }
                },

            deep:true
       } 
    },
    methods:{
        // 选择转出地
        openOutCityPicker(){
            this.$refs.outCityPicker.open();
        },
        chooseOutCity(val){
            this.form.AAA027000= val.name;
            this.form.AAS027=val.code[0]
            this.form.AAA027=val.code[1]
            this.form.AAQ027=val.code[2]
            console.log(val.code);
        },
        // 选择转入地
        openInCityPicker(){
            this.$refs.inCityPicker.open();
        },
        chooseInCity(val){
            this.form.AAB301000= val.name;
            this.form.AAS301=val.code[0]
            this.form.AAB301=val.code[1]
            this.form.AAQ301=val.code[2]
            console.log(val.code);
        },
        submit(){
            if(this.form.AAE005){
                if(!this.util.checkPhone(this.form.AAE005)){
                    this.$toast('请填写正确的手机号码');
                    return false;
                }
            }
            if (this.canSubmit == false) {
                this.$toast('信息未填写完整');
                return false;
            } else {
                this.$store.dispatch('SET_TRANSFERRENEWING_OPERATION', this.form);
                // 封装数据
                let params = this.formatSubmitData();
                // 开始请求
                console.log('parmas------',params)
                this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1017/info', params).then((resData) => {
                        console.log('返回成功信息',resData)
                        //   成功   1000
                            if ( resData.enCode == 1000 ) {
                                this.$router.push("/transferDetail");
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
            let submitForm = Object.assign({},this.form);
            // submitForm.debugTest="true"
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                
                this.$toast("未获取到人员基本信息");
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1017");
            return params;
        }
    }
}
</script>

<style lang="less" scoped>
.insuredChange{
    .Content{
        height: 100%;
        margin-bottom: 1.4rem;
        .ReportInfo{
            height: 3.6rem;
            width: 7.5rem;
            padding: 0 .3rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .3rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName{
                    opacity: 0.85;
                    line-height: 1.2rem;
                    span{
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText{
                    opacity: 0.85;
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    input{
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
        .Hint{
            margin-top: .45rem;
            padding: 0 .3rem;
            opacity: 0.45;
            font-family: PingFangSC-Regular;
            font-size: .24rem;
            color: #000000;
            text-align: left;
            .HintTitle{
                i{
                    margin-right: .2rem;
                    letter-spacing: 0;
                }
            }
            .HintText{
                margin-top: .28rem;
                letter-spacing: 0;
            }
        }
    }
}
</style>
