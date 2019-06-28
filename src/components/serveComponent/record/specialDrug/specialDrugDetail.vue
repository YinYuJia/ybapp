<template>
    <div class="specialDrugDetail">
        <Title :title="'特治特药备案'" :backRouter="'/specialDrug'"></Title>
        <div class="Content">
            <!-- 办事进度 -->
            <WorkProgress :currentStep="currentStep" :progress="arr"></WorkProgress>
            <!-- <WorkProgress :currentStep="3" :progress=arr></WorkProgress> -->
            <!-- 列表信息 -->
            <div class="ListInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地:</span></div>
                    <div class="InfoText">{{AAB301000}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>就诊机构:</span></div>
                    <div class="InfoText">{{form.AKB020VALUE}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>项目类型:</span></div>
                    <div class="InfoText">{{form.BKE253VALUE}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>特治特药类型:</span></div>
                    <div class="InfoText">{{form.BKE228VALUE}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>疾病名称:</span></div>
                    <div class="InfoText">{{form.AKA121}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>用药时期:</span></div>
                    <div class="InfoText">{{form.BKE248VALUE}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>项目名称:</span></div>
                    <div class="InfoText">{{form.AKE002}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>剂量:</span></div>
                    <div class="InfoText">{{form.AKA071}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>数量:</span></div>
                    <div class="InfoText">{{form.AKC226}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>开始日期:</span></div>
                    <div class="InfoText">{{form.AAE030}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>结束日期:</span></div>
                    <div class="InfoText">{{form.AAE031}}</div>
                </div>
                <!-- 进度时间 -->
                <ProgressDate nameWidth="2rem"  :replyDate="form.AAE036"  :progressDate="form.BAE019"></ProgressDate>
            </div>
        </div>
        <Success></Success>
        <!-- 底部 -->
        <Footer :btnType="2" v-if="currentStep==1" @backout="backout()" :handleNumber="handleNumber" @edit="edit()"></Footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form: {
                canbao: "",
                AAS301: "", //参保地
                AAB301: "", //参保地
                AAQ301: "", //参保地
                AKB020: "", //就诊机构
                BKE253: "", //项目类型
                BKE228: "", //特药特治类型
                AKA120: "", //疾病编码
                AKA121: "", //疾病名称
                BKE248: "", //用药时期
                AKE001: "", //项目编码
                AKE002: "", //项目名称
                AKA071: "", //单位剂量
                AKC226: "", //数量
                BKE249: "", //备案剂量
                AKA069: "", //自理比例
                BKE250: "", //累计备案剂量
                BKE251: "", //剩余备案剂量
                BKE252: "", //实际使用量
                AKB063: "", //备案天数
                AAE030: "", //开始日期
                AAE031: "" //结束日期
            },
            AAB301000: "",
            arr: [
                {step:1,name:'申请'},
                {step:2,name:'受理'},
                {step:3,name:'办结'},
                {step:4,name:'送达'}
            ],
            currentStep:1,
            handleNumber:'',
            List:[]
        }
    },
    created(){   
        this.epFn.setTitle('特治特药备案')
        // this.form = this.$store.state.SET_SPECIAL_DRUG;
        this.request();
        this.request1();
        
        /*if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.back, false);//false阻止默认事件
        }*/
    },
    /*destroyed(){
        window.removeEventListener('popstate', this.back, false);//false阻止默认事件
    },*/
    methods:{
        back(){
            // this.$router.push('/')
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
        formatSubmitData(){
            let submitForm = {}
            console.log(submitForm)
                submitForm.AGA002 =  "330800253023";
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
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1009");
            return params;
        },
        request1(){

            let params=this.formatSubmitData1();
            this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1016/info', params).then((resData) => {
                console.log('返回成功信息',resData)
                //   成功   1000
                if ( resData.enCode == 1000 ) {  
                    // this.form={...this.from,...resData.LS_DS_12}
                    let LS=resData.LS_DS_12
                    this.form={...this.form,...LS}
                    console.log("form",this.form)
                    this.AAB301000=this.form.AAS301VALUE+this.form.AAB301VALUE
                    this.form.AAE030=this.util.NumberToDate(this.form.AAE030)
                    this.form.AAE031=this.util.NumberToDate(this.form.AAE031)
                    this.handleNumber = resData.LS_DS_12.BKZ019
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
        formatSubmitData1(){
            let submitForm = {}
                submitForm.AGA002 =  "330800253003";
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
                submitForm.AAC003 = '许肖军';
                submitForm.AAE135 = "332625197501010910";
            }
            
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1016");
            return params;
        }
    }
}
</script>

<style lang="less" scoped>
.specialDrugDetail{
    .Content{
        margin-bottom: 1.4rem;
        .ListInfo{
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
                    width: 2rem;
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