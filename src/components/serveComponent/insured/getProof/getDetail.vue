<template>
    <div class="getDetail">
        <Title :title="'领取就医凭证'" :backRouter="'/getProof'"></Title>
        <div class="Content">
            <!-- 办事进度 -->
            <WorkProgress :currentStep="currentStep"></WorkProgress>
            <!-- <WorkProgress :currentStep="3" :progress=arr></WorkProgress> -->
            <!-- 信息 -->
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>类型:</span></div>
                    <div class="InfoText">{{type}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>领取方式:</span></div>
                    <div class="InfoText">{{mailType}}</div>
                </div>
                <!-- 进度时间 -->
                <ProgressDate  :replyDate="form.AAE036"  :progressDate="form.BAE019"></ProgressDate>
            </div>
            <div class="MailInfo" v-if="form.BKA077 == '1'">
                <div class="InfoLine">
                    <div class="InfoName"><span>收件人:</span></div>
                    <div class="InfoText">{{form.AAE011 | tuoMin(0,2)}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>联系方式:</span></div>
                    <div class="InfoText">{{form.AAE005 | tuoMin(3,4)}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>详细地址:</span></div>
                    <div class="InfoText"><textarea v-model="form.AAE006" readonly></textarea></div>
                </div>
            </div>
            <div class="searchPlace" v-if="form.BKA077 == '0'">
                <div class="searchBtn" @click="openHospital">点击查看附近可领取的医院网点</div>
                <div class="searchBtn" v-if="form.AAC050 == '1'">点击查看附近可领取的银行网点</div>
            </div>
        </div>
        <Success :flag="successFlag"></Success>
        <!-- 就诊机构 -->
        <SearchInfoPage ref="org" @childrenClick="orgClick"></SearchInfoPage>
        <!-- 底部 -->
        <Footer :btnType="2" v-if="currentStep==1" @backout="backout()"  @edit="edit()" :handleNumber="handleNumber"></Footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form: {},
            arr: [
                {step:1,name:'收件1'},
                {step:2,name:'受理2'},
                {step:3,name:'审核3'},
                {step:4,name:'办结4'},
                {step:5,name:'办结5'},
                {step:6,name:'办结6'},
            ],
            currentStep:1,
            handleNumber:'',
            List:[],
            successFlag: 1,
        }
    },
    created(){
        if(this.$route.query.param){
            this.successFlag = 2;
        }
        this.epFn.setTitle('领取就医凭证')
        /*if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.back, false);//false阻止默认事件
        }*/
        // 请求参数封装
        // this.form = this.$store.state.SET_INSURED_PROOF
        // let submitForm = {};
        //  // 加入用户名和电子社保卡号
        // if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
        //     submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
        //     submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
        // }else {
        //     
        //     this.$toast("未获取到人员基本信息");
        // }
        // submitForm.AGA002= '330800122043'
        // const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'1009');
        // this.$axios.post( this.epFn.ApiUrl() +  '/h5/jy1009/getRecord', params)
        // .then((resData) => {
        //     if(resData.enCode==1000){
        //         this.currentStep = Number(resData.LS_DS[0].BOD037)
        //     }
        // })
        this.request();
        this.request1();
    },
    computed:{
        type(){
            if(this.form.AAC050 == '1'){
                return '变更';
            }else if(this.form.AAC050 == '2'){
                return '补办';
            }
        },
        mailType(){
            if(this.form.BKA077 == '0'){
                return '自取';
            }else if(this.form.BKA077 == '1'){
                return '邮寄';
            }
        }
    },
    /*destroyed(){
        window.removeEventListener('popstate', this.back, false);//false阻止默认事件
    },*/
    methods:{
        back(){
            // this.$router.push('/')
        },
        edit(){
            this.$router.push("/getProof");
        },
        // 撤销提醒
        // backout(){
        //     this.$messagebox.confirm('确定撤销吗?').then(() => {
        //         this.$router.push('/Index');
        //         this.$toast('撤销成功');
        //     });
        // },
        // 打开医院列表
        openHospital(){
            this.$refs.org.open();
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
                    this.form={...this.form,...resData.LS_DS_04}
                    let LS=resData.LS_DS_04
                    this.form={...this.form,...LS}
                    console.log("form",this.form)
                    this.handleNumber = resData.LS_DS_04.BKZ019
                    // this.$toast("提交成功");
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
            submitForm.AGA002 =  "330800122043";
            // submitForm.debugTest =  "true";

            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                
                this.$toast("未获取到人员基本信息");
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1009");
            return params;
        },
        formatSubmitData1(){
            let submitForm = {}
                submitForm.AGA002 =  "330800122043";
                
                // submitForm.debugTest=  "true";
                //从进度查询页面进入接收传参
                if(this.$route.query.param){
                    submitForm.lx="1";
                    submitForm.BKZ019=this.$route.query.param
                }else{
                    submitForm.lx="2";
                    submitForm.BKZ019="";
                }
                
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                
                this.$toast("未获取到人员基本信息");
            }
            
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1016");
            return params;
        },
    }
}
</script>

<style lang="less" scoped>
.getDetail{
    .Content{
        margin-bottom: 1.4rem;
        .ReportInfo{
            width: 7.5rem;
            padding: 0 .3rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
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
        .MailInfo{
            height: 4rem;
            width: 7.5rem;
            padding: 0 .3rem;
            margin-top: .15rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
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
                        color: #000;
                    }
                }
                .InfoText{
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    color: #333;
                }
                &:last-child{
                    border-bottom: none;
                    .InfoText{
                        height: 1.6rem;
                        textarea{
                            border: none;
                            width: 5rem;
                            line-height: .45rem;
                            color: #333;
                            padding: 0;
                        }
                    }
                }
            }
        }
        .searchPlace{
            width: 7.5rem;
            .searchBtn{
                height: .8rem;
                width: 7rem;
                margin: auto;
                margin-top: .16rem;
                line-height: .8rem;
                font-size: .32rem;
                background: #CCC;
                border-radius: .1rem;
            }
        }
    }
}
</style>
