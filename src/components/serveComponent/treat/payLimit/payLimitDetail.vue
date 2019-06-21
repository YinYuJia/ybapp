<template>
    <div class="payLimitDetail">
        <Title :title="'缴费年限核定'" :backRouter="'/payLimit'"></Title>
        <div class="Content">
            <!-- 办事进度 -->
            <WorkProgress :currentStep="currentStep"></WorkProgress>
            <!-- 邮递信息 -->
            <div class="MailInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>视作缴费年限:</span></div>
                    <div class="InfoText">{{form.AKC412}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>缴费月数:</span></div>
                    <div class="InfoText">{{form.BAC213}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>退休工资:</span></div>
                    <div class="InfoText">{{form.AAE041}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>提前退休类别:</span></div>
                    <div class="InfoText">{{form.BKE810 | trtireType}}</div>
                </div>
                <!-- 进度时间 -->
                <ProgressDate  :replyDate="form.AAE036"  :progressDate="form.BAE019"></ProgressDate>
            </div>
        </div>
        <!-- 底部 -->
        <Footer :btnType="2" @backout="backout()" :handleNumber="handleNumber" @edit="edit()"></Footer>
    </div>
</template>

<script>
export default {
    data() { 
        return {
            form: {},
            currentStep:1,
            handleNumber:'',
        }
    },
    created () {
        this.request();
        this.request1();

    },
    methods:{
        edit(){
            this.$router.push("/payLimit");
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
                    console.log("resData.LS_DS.length",resData.LS_DS.length)
                    if (resData.LS_DS.length > 0 ) {
                       this.currentStep = Number(resData.LS_DS[0].BOD037) 
                    }else{
                        this.$toast("暂无状态信息")
                    }
                    
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
            this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1016/info', params).then((resData) => {
                console.log('返回成功信息',resData)
                //   成功   1000
                if ( resData.enCode == 1000 ) {
                    this.form={...this.form,...resData.LS_DS_13 } 
                    // console.log(this.List)
                    this.handleNumber = resData.LS_DS_13.BKZ019
                    // this.form={...this.from,...this.List[0]}
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
                submitForm.AGA002 =  "确认-00123-004";
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
                submitForm.AGA002 =  "确认-00123-004";
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
.payLimitDetail{
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
                    width: 2rem;
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
                &:last-child{
                    border-bottom: none;
                }
            }
        }
    }
}
</style>