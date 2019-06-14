<template>
    <div class="familyDetail">
        <Title :title="'家庭共济备案'" :backRouter="'/familyAid'"></Title>
        <div class="Content">
            <!-- 事项名称 -->
            <WorkProgress :currentStep="1"></WorkProgress>
            <!-- 邮递信息 -->
            <div class="MailInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地:</span></div>
                    <div class="InfoText">{{form.AAB301}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>被授权人姓名:</span></div>
                    <div class="InfoText">{{form.BAC003}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>被授权人身份证:</span></div>
                    <div class="InfoText">{{form.BAC002}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>绑定关系:</span></div>
                    <div class="InfoText">{{form.AAE144}}</div>
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
            AAB301: '', //参保地
            BAC003: '', //被授权人姓名
            BAC002: '', //被授权人身份证
            AAE144: '',//绑定关系
            AAE030: '', //开始日期
        },
      }
    },
    created(){
        this.form = this.$store.state.SET_FAMILYAID_OPERATION;
    },
    methods:{
        edit(){
            this.$router.push("/familyAid");
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