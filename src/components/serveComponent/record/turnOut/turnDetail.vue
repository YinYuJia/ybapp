<template>
    <div class="turnDetail">
        <Title :title="'转外就医备案'" :backRouter="'/turnOut'"></Title>
        <div class="Content">
            <!-- 办事进度 -->
            <WorkProgress :currentStep="1"></WorkProgress>
            <!-- 邮递信息 -->
            <div class="MailInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地:</span></div>
                    <div class="InfoText">{{form.AAB301}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>开始日期:</span></div>
                    <div class="InfoText">{{form.start}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>结束日期:</span></div>
                    <div class="InfoText">{{form.end}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>转往地市:</span></div>
                    <div class="InfoText">{{form.AAB301}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>疾病名称:</span></div>
                    <div class="InfoText">{{form.AKA121}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>就诊疗程:</span></div>
                    <div class="InfoText">{{form.BKE255}}</div>
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
            start: '', //开始日期
            end: '', //结束日期
            AAB301: '', //转往地市
            AKA121: '',//疾病名称
            BKE255: '', //就诊疗程
        },
      }
    },
    created(){
        this.form = this.$store.state.SET_TURNOUT_OPERATION;
    },
    computed:{
        canbaocity: function(){
            return this.form.canbao.join(' ');
        },
        address: function(){
            return this.form.city.join(' ');
        }
    },
    methods:{
        back(){
            this.$router.push("/turnOut");
        },
        edit(){
            this.$router.push("/turnOut");
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
.turnDetail{
    .Content{
        .MailInfo{
            height: 7.2rem;
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
