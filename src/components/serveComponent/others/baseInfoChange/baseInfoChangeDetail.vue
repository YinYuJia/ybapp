<template>
    <div class="baseInfoChange">
        <Title :title="'人员基本信息变更'" :backRouter="'/baseInfoChange'"></Title>
        <div class="Content">
            <!-- 办事进度 -->
            <WorkProgress :currentStep="currentStep"></WorkProgress>
            <!-- 信息 -->
            <div class="MailInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>家庭住址:</span></div>
                    <div class="InfoText"><textarea v-model="form.AAE006" readonly></textarea></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>手机号码:</span></div>
                    <div class="InfoText">{{form.AAE005 | tuoMin(3,4)}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>邮政编码:</span></div>
                    <div class="InfoText">{{form.AAE007}}</div>
                </div>
                <!-- 进度时间 -->
                <ProgressDate></ProgressDate>
            </div>
        </div>
        <!-- 底部 -->
        <Footer :btnType="2" v-if="currentStep==1" @backout="backout()" @edit="edit()"></Footer>
    </div>
</template>

<script>
export default {
    data() {
      return {
        form: {
                // AAE006: '', //家庭住址
                // AAE005: '', //手机号码
                // AAE007: '', //邮政编码
                // BKZ019: '', //经办编号
        },
        currentStep:1,
        handleNumber:""
      }
    },
    created(){
        this.epFn.setTitle('人员基本信息变更')
        // this.form = this.$store.state.SET_BASEINFOCHANGE_OPERATION;
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
    methods:{
        edit(){
            this.$router.push("/baseInfoChange");
        },
        // 撤销提醒
        backout(){
            this.$messagebox.confirm('确定撤销吗?').then(() => {
                this.$router.push('/Index');
                this.$toast('撤销成功');
            });
        },
        formatSubmitData(){  
            let submitForm ={}
            submitForm.AGA002 =  "331400501005";
            // submitForm.debugTest =  "true";

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
        }
    }
}
</script>


<style lang="less" scoped>
.baseInfoChange{
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
                &:first-child{
                    height: 1.6rem;
                    .InfoText{
                        height: 1.6rem;
                        textarea{
                            color: #000;
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

<style>
</style>
