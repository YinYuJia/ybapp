<template>
    <div class="changeDetail">
        <Title :title="'医保转移接续'" :backRouter="'/transferRenewing'"></Title>
        <div class="Content">
            <!-- 办事进度 -->
            <WorkProgress :currentStep="currentStep" :progress=arr ></WorkProgress>
            <!-- 邮递信息 -->
            <div class="MailInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>转出地:</span></div>
                    <div class="InfoText">{{form.AAA027000}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>转入地:</span></div>
                    <div class="InfoText">{{form.AAB301000}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>手机号码:</span></div>
                    <div class="InfoText">{{form.AAE005 | tuoMin(3,4)}}</div>
                </div>
                <!-- 进度时间 -->
                <ProgressDate  :replyDate="form.AAE036"  :progressDate="form.BAE019"></ProgressDate>
            </div>
        </div>
        <!-- 底部 -->
        <Footer :btnType="2" @backout="backout()" @edit="edit()" :handleNumber="handleNumber"></Footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{
                AAA027000: '', //转出地
                AAB301000: '', //转入地
                AAE005: '' //手机号码
            },
            arr:[
                {step:1,name:'收件'},
                {step:2,name:'转移'},
                {step:3,name:'接续'},
                {step:4,name:'办结'},
            ],
            currentStep:1,
            handleNumber:'',
            List:[]
        }
    },
    created(){
        // this.form = this.$store.state.SET_TRANSFERRENEWING_OPERATION;
        this.request();
        this.request1();
    },
    methods:{
        edit(){
            this.$router.push('/transferRenewing');
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
            this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1016/info', params).then((resData) => {
                console.log('返回成功信息',resData)
                //   成功   1000
                if ( resData.enCode == 1000 ) {  
                    this.form={...this.form,...resData.LS_DS_07}
                    this.handleNumber = resData.LS_DS_07.BKZ019
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
            let submitForm ={}
            submitForm.AGA002 =  "公共服务-00512-001";
            // submitForm.debugTest =  "true";

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
                submitForm.AGA002 =  "公共服务-00512-001";
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
        },
    }
}
</script>

<style lang="less" scoped>
.changeDetail{
    .Content{
        margin-bottom: 1.4rem;
        .MailInfo{
            width: 7.5rem;
            padding: 0 .3rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                position: relative;
                font-size: .28rem;
                display: flex;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName{
                    width: 1.5rem;
                    line-height: 1.2rem;
                    text-align: left;
                    span{
                        height: .6rem;
                        line-height: .6rem;
                        letter-spacing: 0;
                        color: #666;
                    }
                }
                .InfoText{
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    color: #000;
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
    }
}
</style>
