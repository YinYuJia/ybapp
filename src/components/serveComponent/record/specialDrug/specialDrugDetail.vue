<template>
    <div class="specialDrugDetail">
        <Title :title="'特治特药备案'" :backRouter="'/chronicDisease'"></Title>
        <div class="Content">
            <!-- 办事进度 -->
            <WorkProgress :currentStep="currentStep" :progress="arr"></WorkProgress>
            <!-- <WorkProgress :currentStep="3" :progress=arr></WorkProgress> -->
            <!-- 列表信息 -->
            <div class="ListInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地:</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>就诊机构:</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>项目类型:</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>特治特药类型:</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>疾病名称:</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>用药时期:</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>项目名称:</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>剂量:</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>数量:</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>开始日期:</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>结束日期:</span></div>
                    <div class="InfoText"></div>
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
            form: {
                canbao: '', //参保地
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
                BKE247: '1', //病历本提取方式 1自取，2邮寄
                AAE011: '', //收件人
                AAE005: '', //联系电话
                AAE006: '', //详细地址
            },
            arr: [
                {step:1,name:'申请'},
                {step:2,name:'受理'},
                {step:3,name:'办结'},
                {step:4,name:'送达'}
            ],
            currentStep:1
        }
    },
    created(){
        this.form = this.$store.state.SET_CHRONIC_DISEASE;
    },
    methods:{
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
.specialDrugDetail{
    .Content{
        margin-bottom: 1.4rem;
        .ListInfo{
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
                    width: 2rem;
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