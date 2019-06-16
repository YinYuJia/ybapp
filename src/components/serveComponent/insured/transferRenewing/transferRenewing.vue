<template>
    <div class="insuredChange">
        <Title :title="'医保转移接续'" :backRouter="'/'"></Title>
        <!-- MintUI弹出框区域 -->
        <selectCity 
            :type="2"
            ref="inCityPicker"
            @confirm="chooseInCity"
            >
        </selectCity>
        <selectCity 
            :type="2"
            ref="outCityPicker"
            @confirm="chooseOutCity"
            >
        </selectCity>
        <!-- 弹出框区域结束 -->
        <div class="Content">
            <!-- 基本信息 -->
            <userBaseInfo></userBaseInfo>
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
                    <div class="InfoText"><input type="number" v-model="form.AAE005" placeholder="请输入联系电话"></div>
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
import Title from '../../common/Title'
import userBaseInfo from '../../common/userBaseInfo'
import selectCity from '../../common/selectCity'
import Footer from '../../common/Footer'
export default {
    components:{
        Title,userBaseInfo,selectCity,Footer
    },
    data(){
        return{
            form:{
                AAA027000:"",
                AAS027:"", //转出地省code
                AAS301:"", //转入地省code
                AAB301000:"",
                // phone: '' //手机号码
                AAE005: '', //手机号码,
                AAA027:"",//转出地市
                AAB301:"",//转入地市
                BKZ019:''//经办编号
            },
            canSubmit: false,
        }
    },
    created () {
        this.form = this.$store.state.SET_TRANSFERRENEWING_OPERATION;
        this.form.AAC003 = this.$store.state.SET_NATIVEMSG.name|| "胡"
        this.form.AAE135 = this.$store.state.SET_NATIVEMSG.idCard|| "113344223344536624"
    },
    watch: {
       form:{
            handler: function(val) {
                // 判断不为空
                if (val.AAA027000 != '' && val.AAB301000 != '' && val.AAE005 != '') {
                    this.canSubmit = true;
                } else {
                    this.canSubmit = false;
                }
            },
            deep:true
       } 
    },
    methods:{
        // 选择转出地
        openOutCityPicker(){
            this.$refs.inCityPicker.open();
        },
        chooseInCity(val){
            this.form.AAA027000= val.name;
            this.form.AAS027=val.code[0]
            this.form.AAA027=val.code[1]
            console.log(val.code);
        },
        // 选择转入地
        openInCityPicker(){
            this.$refs.outCityPicker.open();
        },
        chooseOutCity(val){
            this.form.AAB301000= val.name;
            this.form.AAS301=val.code[0]
            this.form.AAB301=val.code[1]
            console.log(val.code);
        },
        submit(){
            this.$router.push("/transferDetail");
            console.log(this.form)
            if (this.canSubmit == false) {
                this.$toast('信息未填写完整');
                return false;
            } else {
                this.$store.dispatch('SET_TRANSFERRENEWING_OPERATION', this.form);
                // 封装数据
                let params = this.formatSubmitData();
                // 开始请求
                console.log('parmas------',params)
                this.$axios.post(this.epFn.ApiUrl2() + '/h5/jy1017/info', params).then((resData) => {
                        console.log('返回成功信息',resData)
                        //   成功   1000
                            if ( resData.enCode == 1000 ) {
                                this.$toast("提交成功");
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
            let submitForm = JSON.parse(JSON.stringify(this.form)); //深拷贝
            submitForm.AAS027 =  this.form.AAS027;
            submitForm.AAS301 =  this.form.AAS301;
            submitForm.AAA027 =  this.form.AAA027;
            submitForm.AAB301 =  this.form.AAB301;
            submitForm.AAE005 =  this.form.AAE005;
            submitForm.BKZ019 =  this.form.BKZ019;

            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                submitForm.AAC003 = '胡';
                submitForm.AAE135 = "113344223344536624";
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
