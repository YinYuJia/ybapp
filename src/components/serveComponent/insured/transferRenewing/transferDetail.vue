<template>
    <div class="changeDetail">
        <Title :title="'医保转移接续'" :backRouter="'/transferRenewing'"></Title>
        <div class="Content">
            <!-- 办事进度 -->
            <WorkProgress :currentStep="1"></WorkProgress>
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
    data(){
        return{
            form:{
                AAA027000: '', //转出地
                AAB301000: '', //转入地
                AAE005: '' //手机号码
            },
        }
    },
    created(){
        this.form = this.$store.state.SET_TRANSFERRENEWING_OPERATION;

        let params=this.formatSubmitData();
        console.log(params);
        this.$axios.post(this.epFn.ApiUrl2() + '/h5/jy1016/info', params).then((resData) => {
            console.log('返回成功信息',resData)
            //   成功   1000
            if ( resData.enCode == 1000 ) {  
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
    methods:{
        edit(){
            this.$router.push('/transferRenewing');
        },
        backout(){
            this.$messagebox.confirm('确定撤销吗?').then(() => {
                this.form.AAA027000="";
                this.form.AAB301000="";
                this.form.AAE005="";

                this.$router.push('/transferRenewing')
                this.$toast("撤销成功");
            });
        },
        formatSubmitData(){
            let submitForm = {};
            submitForm.AGA002 =  "公共服务-00512-001";
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                submitForm.AAC003 = '张三';
                submitForm.AAE135 = "3302811";
            }
            
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1016");
            return params;
        }
    }
}
</script>

<style lang="less" scoped>
.changeDetail{
    .Content{
        margin-bottom: 1.4rem;
        .MailInfo{
            height: 3.6rem;
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
                }
            }
        }
    }
}
</style>
