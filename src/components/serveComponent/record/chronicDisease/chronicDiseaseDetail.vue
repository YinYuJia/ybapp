<template>
    <div class="chronicDiseaseDetail">
        <Title :title="'规定病种备案'" :backRouter="'/chronicDisease'"></Title>
        <div class="Content">
            <!-- 办事进度 -->
            <WorkProgress :currentStep="currentStep"></WorkProgress>
            <!-- <WorkProgress :currentStep="3" :progress=arr></WorkProgress> -->
            <!-- 列表信息 -->
            <div class="ListInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地:</span></div>
                    <div class="InfoText">{{AAB301000}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>规定病种:</span></div>
                    <div class="InfoText">{{form.AKA035VALUE}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>疾病1:</span></div>
                    <div class="InfoText">{{form.AKA121}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>疾病2:</span></div>
                    <div class="InfoText">{{form.AKA1211}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>疾病3:</span></div>
                    <div class="InfoText">{{form.AKA1212}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>开始日期:</span></div>
                    <div class="InfoText">{{form.AAE030}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>提取方式:</span></div>
                    <div class="InfoText">{{form.BKE247 | isMail}}</div>
                </div>
                <ProgressDate  :replyDate="form.AAE036"  :progressDate="form.BAE019"></ProgressDate>
            </div>
            <div class="MailInfo" v-if="form.BKE247 == '2'">
                <div class="InfoLine">
                    <div class="InfoName"><span>收件人:</span></div>
                    <div class="InfoText">{{form.AAE011 | tuoMin(1,0)}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>手机号码:</span></div>
                    <div class="InfoText">{{form.AAE005 | tuoMin(3,4)}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>详细地址:</span></div>
                    <div class="InfoText"><textarea v-model="form.AAE006" readonly></textarea></div>
                </div>
            </div>
            <div class="searchPlace" v-if="form.BKE247 == '1'">
                <div class="searchBtn">点击查看附近领取网点</div>
            </div>
            
            <!-- 回显图片 -->
            <div class="PhotoInfo">
                <!-- <div class="infoName">1、规定病种待遇备案表（医院盖章）</div> -->
                <div class="photoBox">
                    <div class="picWrap">
                        <div class="uploadBtn" v-for="(item,index) in picList" :key="index">
                            <img :src="item" class="pic" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Success :flag="successFlag"></Success>
        <!-- 底部 -->
        <Footer :btnType="2" v-if="currentStep==1" @backout="backout()" :handleNumber="handleNumber" @edit="edit()"></Footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            AAB301000: '', //参保地
            form: {
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
                AAE011: '', //收件人
                AAE005: '', //手机号码
                AAE006: '', //详细地址
            },
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
            picList: [],
        }
    },
    created(){
        if(this.$route.query.param){
            this.successFlag = 2;
        }
        this.epFn.setTitle('规定病种备案')
        // this.form = this.$store.state.SET_CHRONIC_DISEASE;
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
        //
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
                    let LS=resData.LS_DS_14
                    this.form={...this.form,...LS}
                    console.log("form",this.form)
                    this.AAB301000=this.form.AAS301VALUE+this.form.AAB301VALUE
                    this.form.AAE030=this.util.NumberToDate(this.form.AAE030)
                    this.handleNumber = resData.LS_DS_14.BKZ019
                    this.picList = []
                    
                    for(let i=0;i<resData.LS_DS_14.photoList.length;i++){
                        this.picList.push(resData.LS_DS_14.photoList[i].PUL002)
                        
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
            let submitForm ={}
            submitForm.AGA002 =  "330800253004";
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
                submitForm.AGA002 =  "330800253004";
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
.chronicDiseaseDetail{
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
                    .InfoText{
                        height: 1.6rem;
                        textarea{
                            border: none;
                            width: 5rem;
                            line-height: .45rem;
                            color: #000;
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
                width: 7.1rem;
                margin: auto;
                margin-top: .18rem;
                border-radius: .05rem;
                line-height: .8rem;
                background: #FFF;;
                font-family: PingFangSC-Regular;
                font-size: .26rem;
                color: #666;
                letter-spacing: 0;
                text-align: center;
                border: .01rem solid #C9C9C9;
            }
        }
        // 回显图片
        .PhotoInfo{
            background: #FFF;
            padding: 0 .3rem;
            margin-top: .3rem;
            .infoName{
                padding: .1rem 0;
                text-align: left;
                font-size: .28rem;
                color: #000000;
                letter-spacing: 0;
            }
            .photoBox{
                text-align: left;
                .picWrap{
                    display: flex;
                    flex-wrap: wrap;
                    padding: .3rem 0;
                    .uploadBtn{
                        position: relative;
                        height: 1.5rem;
                        width: 1.5rem;
                        margin: .1rem;
                        img{
                            height: 100%;
                            width: 100%;
                        }
                        .svg-icon{
                            position: absolute;
                            height: .4rem;
                            width: .4rem;
                            top: -0.2rem;
                            right: -0.2rem;
                        }
                    }
                    .svg-icon{
                        margin: .1rem .15rem 0 0;
                        height: 1.5rem;
                        width: 1.5rem;
                    }
                }
                .svg-icon{
                    height: 1.5rem;
                    width: 1.5rem;
                }
            }
        }
    }
}
</style>