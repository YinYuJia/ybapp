<template>
    <div class="familyDetail">
        <Title :title="'家庭共济备案'" :backRouter="'/familyAid'"></Title>
        <div class="Content">
            <!-- 事项进度 -->
            <WorkProgress :currentStep="currentStep" :progress="arr"></WorkProgress>
            <!-- 邮递信息 -->
            <div class="MailInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地:</span></div>
                    <div class="InfoText">{{form.AAB301000}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>被授权人姓名:</span></div>
                    <div class="InfoText">{{form.BAC003 | tuoMin(0,1)}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>被授权人身份证:</span></div>
                    <div class="InfoText">{{form.BAC002 | tuoMin(1,1)}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>绑定关系:</span></div>
                    <div class="InfoText">{{form.AAE144 | relationship}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>开始日期:</span></div>
                    <div class="InfoText">{{form.AAE030}}</div>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <Footer :btnType="2" @backout="backout()" @edit="edit()"></Footer>
    </div>
</template>

<script>
import Title from '../../common/Title'
import WorkProgress from '../../common/WorkProgress'
import Footer from '../../common/Footer'
export default {
    components:{
        Title,WorkProgress,Footer
    },
    data() {
      return {
        form: {
            BAC003: '', //被授权人姓名
            BAC002: '', //被授权人身份证
            AAE144: '',//绑定关系
            AAE030: '', //开始日期
            AAB301000:'',
            AAS301:"",//参保地省
            AAB301:"",//参保地市
            AAQ301:"",//参保地区
            BKZ019:""//经办编号
        },
        List:[],
        currentStep:1,
        arr: [
            {step:1,name:'申请'},
            {step:2,name:'受理'},
            {step:3,name:'办结'},
            {step:4,name:'送达'}
        ],
      }
    },
    created(){
        this.request();
        this.request1();
    },
    methods:{
        edit(){
            this.$router.push("/familyAid");
        },
        // 撤销提醒
        backout(){
            this.$messagebox.confirm('确定撤销吗?').then(() => {
                this.$router.push('/');
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
        formatSubmitData(){
            let submitForm = {}
            console.log(submitForm)
                submitForm.AGA002 =  "确认-00253-023";
                // submitForm.debugTest=  "true";

            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                submitForm.AAC003 = '胡';
                submitForm.AAE135 = "113344223344536624";
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
                    this.List=[...this.List,...resData.LS_DS_11]
                    this.form={...this.from,...this.List[0]}
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
        formatSubmitData1(){
            let submitForm = {}
            console.log(submitForm)
                submitForm.AGA002 =  "确认-00253-023";
                // submitForm.debugTest=  "true";

            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                submitForm.AAC003 = '胡';
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
.familyDetail{
    .Content{
        .MailInfo{
            height: 6rem;
            width: 7.5rem;
            padding: 0 .3rem;
            margin-top: .15rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .3rem;
                display: flex;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName{
                    width: 2.5rem;
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