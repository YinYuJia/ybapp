<template>
    <div class="payLimitDetail">
        <Title :title="'领取就医凭证'" :backRouter="'/elseWhere'"></Title>
        <div class="Content">
            <!-- 办事进度 -->
            <WorkProgress :currentStep="1"></WorkProgress>
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
                    <div class="InfoText">{{form.BKE810}}</div>
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
                AKC412: '', //视作缴费年限
                BAC213: '', //缴费月数
                AAE041: '', //退休工资
                BKE810: '', //提前退休类别
            },
        }
    },
    methods:{
        edit(){
            this.$router.push("/payLimit");
        },
        // 撤销提醒
        backout(){
            this.$messagebox.confirm('确定撤销吗?').then(() => {
                this.$toast("撤销请求");
            });
        },
    }
}
</script>


<style lang="less" scoped>
.payLimitDetail{
    .Content{
        .MailInfo{
            height: 4.8rem;
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