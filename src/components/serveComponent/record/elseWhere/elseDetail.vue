<template>
    <div class="elseDetail">
        <Title :title="'领取就医凭证'" :backRouter="'/elseWhere'"></Title>
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
                    <div class="InfoName"><span>拟离杭日期:</span></div>
                    <div class="InfoText">{{form.AAE030}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>回杭日期:</span></div>
                    <div class="InfoText">{{form.AAE031}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>省市信息:</span></div>
                    <div class="InfoText">{{form.AAE011}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>详细地址:</span></div>
                    <div class="InfoText"><textarea v-model="form.AAE006" readonly></textarea></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>申请原因:</span></div>
                    <div class="InfoText">{{form.ACK030}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>联系人:</span></div>
                    <div class="InfoText">{{form.AAE004}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>联系电话:</span></div>
                    <div class="InfoText">{{form.AAE005}}</div>
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
                AAE030: '', //离杭日期
                AAE031: '', //回杭日期
                AAE011: '', //申请地市
                AAE006: '', //详细地址 
                ACK030: '', //申请原因
                AAE004: '', //联系人
                AAE005: '', //联系电话
            },
        }
    },
    created(){
        this.form = this.$store.state.SET_ELSEWHERE_OPERATION;
    },
    methods:{
        edit(){
            this.$router.push("/elseWhere");
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
.elseDetail{
    .Content{
        .MailInfo{
            height: 10rem;
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
                &:nth-child(5){
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
