<template>
    <div class="abroadDetail">
        <Title :title="'出国带药备案'" :backRouter="'/abroadTake'"></Title>
        <div class="Content">
            <!-- 办事进度 -->
            <WorkProgress :currentStep="currentStep"></WorkProgress>
            <!-- 列表信息 -->
            <div class="MailInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地:</span></div>
                    <div class="InfoText">{{AAB301000}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>出境日期:</span></div>
                    <div class="InfoText">{{form.AAE030}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>拟回国日期:</span></div>
                    <div class="InfoText">{{form.AAE031}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>取药机构:</span></div>
                    <div class="InfoText">{{form.AKB020}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>护照号码:</span></div>
                    <div class="InfoText">{{form.BKE260 | tuoMin(3,3)}}</div>
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
        AKB02000:"",
        AAB301000:"",
        form: {
            // AAB301000: '', //参保地
            // AKB020: '',//取药机构
            // AAE030: '', //出境日期
            // AAE031: '', //拟回国日期
            // BKE260: '', //护照号码
        },
        currentStep:1,
        handleNumber:'',
        List:[]
      }
    },
    created(){
        this.epFn.setTitle('出国带药备案')
        this.request();
        this.request1();
        // this.form = this.$store.state.SET_ABROADTAKE_OPERATION;
    },
    // computed:{
    //     canbaocity: function(){
    //         return this.form.canbao.join(' ');
    //     },
    // },
    methods:{
        edit(){
            this.$router.push("/abroadTake");
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
                    let LS=resData.LS_DS_10
                    this.form={...this.form,...LS}
                    console.log("form",this.form)
                    this.AAB301000=this.from.AAS301VALUE+this.form.AAB301VALUE+this.form.AAQ301VALUE
                    this.handleNumber = resData.LS_DS_10.BKZ019
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
            console.log(submitForm)
                submitForm.AGA002 =  "确认-00253-001";
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
                submitForm.AGA002 =  "确认-00253-001";
                submitForm.lx="2";
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
.abroadDetail{
    .Content{
        margin-bottom: 1.4rem;
        .MailInfo{
            width: 7.5rem;
            padding: 0 .3rem;
            margin-top: .15rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                position: relative;
                font-size: .28rem;
                display: flex;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName{
                    width: 1.8rem;
                    line-height: 1.2rem;
                    text-align: left;
                    span{
                        height: .6rem;
                        line-height: .6rem;
                        color: #666;
                        letter-spacing: 0;
                    }
                }
                .InfoText{
                    width: 5.1rem;
                    color: #000;
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