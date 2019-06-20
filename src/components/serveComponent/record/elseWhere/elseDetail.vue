<template>
    <div class="elseDetail">
        <Title :title="'异地就医备案'" :backRouter="'/elseWhere'"></Title>
        <div class="Content">
            <!-- 办事进度 -->
            <WorkProgress :currentStep="1"></WorkProgress>
            <!-- 邮递信息 -->
            <div class="MailInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地:</span></div>
                    <div class="InfoText">{{form.AAS011000}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>拟离杭日期:</span></div>
                    <div class="InfoText">{{form.AAE030}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>回杭日期:</span></div>
                    <div class="InfoText">{{form.AAE031}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>省市信息:</span></div>
                    <div class="InfoText">{{form.AAB301000}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>详细地址:</span></div>
                    <div class="InfoText"><textarea v-model="form.AAE006" readonly></textarea></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>申请原因:</span></div>
                    <div class="InfoText">{{form.AKC030 | AKC030}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>联系人:</span></div>
                    <div class="InfoText">{{form.AAE004 | tuoMin(0,1)}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>联系电话:</span></div>
                    <div class="InfoText">{{form.AAE005 | tuoMin(3,4)}}</div>
                </div>
                <!-- 进度时间 -->
                <ProgressDate></ProgressDate>
            </div>
        </div>
        <!-- 底部 -->
        <Footer :btnType="2" @backout="backout()" :handleNumber="123" @edit="edit()"></Footer>
    </div>
</template>

<script>
export default {
    data() {
      return {
        form: {
                // AAS011000:"",
                // AAB301000:"",
                // AAE030: '', //离杭日期
                // AAE031: '', //回杭日期
                // AAS011: '', //参保地省
                // AAE011: '', //参保地市
                // AAQ011: '', //参保地区
                // AAE006: '', //详细地址 
                // AKC030: '', //申请原因
                // AAE004: '', //联系人
                // AAE005: '', //联系电话
                // AAS301: '',//申请地省
                // AAB301: '',//申请地市
                // AAQ301: '',//申请地区
                // AGA002:'',
        },
        List:[]
      }
    },
    created(){      
        this.request();
        this.request1();
    },
    computed:{
        // address: function(){
        //     return this.form.AAE011.join(' ');
        // }
    },
    methods:{
        edit(){
            this.$router.push("/elseWhere");
        },
        // 撤销提醒
        backout(){
            this.$messagebox.confirm('确定撤销吗?').then(() => {
                this.$router.push('/Index');
                this.$toast('撤销成功');
            });
        },
        request(){
            let params=this.formatSubmitData();
            this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1009/getRecord', params).then((resData) => {
                console.log('返回成功信息',resData)
                //   成功   1000
                if ( resData.enCode == 1000 ) {  
                    console.log(11111)
                    this.$toast("提交成功");
                }else if (resData.enCode == 1001 ) {
                //   失败  1001
                    this.$toast(resData.msg);
                    return;
                }else{
                    this.$toast('业务出错');
                    return;
                }
            })
        },
        request1(){
            let params=this.formatSubmitData1();
            this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1016/info', params).then((resData) => {
                console.log('返回成功信息',resData)
                //   成功   1000
                if ( resData.enCode == 1000 ) {  
                    this.List=[...this.List,...resData.LS_DS_06]
                    this.form={...this.form,...this.List[0]}
                    this.$toast("提交成功");
                }else if (resData.enCode == 1001 ) {
                //   失败  1001
                    this.$toast(resData.msg);
                    return;
                }else{
                    this.$toast('业务出错');
                    return;
                }
            })
        },
        formatSubmitData(){
            let submitForm = {}
            console.log(submitForm)
                submitForm.AGA002 =  "确认-00253-013";
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
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1009");
            return params;
        },
        formatSubmitData1(){
            let submitForm = {}
            console.log(submitForm)
                submitForm.AGA002 =  "确认-00253-013";
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
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1016");
            return params;
        }
    }
}
</script>


<style lang="less" scoped>
.elseDetail{
    .Content{
        .MailInfo{
            width: 7.5rem;
            padding: 0 .3rem;
            margin-top: .15rem;
            margin-bottom: 1.4rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .3rem;
                display: flex;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName{
                    width: 1.8rem;
                    opacity: 0.45;
                    line-height: 1.2rem;
                    text-align: left;
                    span{
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText{
                    width: 5.1rem;
                    opacity: 0.85;
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                }
                &:nth-child(5){
                    height: 1.6rem;
                    .InfoText{
                        height: 1.6rem;
                        textarea{
                            border: none;
                            opacity: 0.85;
                            width: 5rem;
                            line-height: .45rem;
                        }
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