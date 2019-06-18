<template>
    <div class="baseInfoChange">
        <Title :title="'人员基本信息变更'" :backRouter="'/baseInfoChange'"></Title>
        <div class="Content">
            <!-- 办事进度 -->
            <WorkProgress :currentStep="1"></WorkProgress>
            <!-- 信息 -->
            <div class="MailInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>家庭住址:</span></div>
                    <div class="InfoText"><textarea v-model="form.address" readonly></textarea></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>手机号码:</span></div>
                    <div class="InfoText">{{form.phone}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>邮政编码:</span></div>
                    <div class="InfoText">{{form.code}}</div>
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
            address: '', //家庭地址
            phone: '', //手机号码
            code: '' //邮政编码
        },
      }
    },
    created(){
        this.form = this.$store.state.SET_BASEINFOCHANGE_OPERATION;
    },
    methods:{
        edit(){
            this.$router.push("/baseInfoChange");
        },
        // 撤销提醒
        backout(){
            this.$messagebox.confirm('确定撤销吗?').then(() => {
                this.$router.push('/');
                this.$toast('撤销成功');
            });
        },
    }
}
</script>


<style lang="less" scoped>
.baseInfoChange{
    .Content{
        margin-bottom: 1.4rem;
        .MailInfo{
            height: 4rem;
            width: 7.5rem;
            padding: 0 .3rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .3rem;
                display: flex;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName{
                    width: 1.8rem;
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
                &:first-child{
                    height: 1.6rem;
                    .InfoText{
                        height: 1.6rem;
                        textarea{
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
