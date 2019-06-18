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
                    <div class="InfoText">{{form.canbao}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>就诊机构:</span></div>
                    <div class="InfoText">{{form.AKB020}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>项目类型:</span></div>
                    <div class="InfoText">{{form.BKE253}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>特治特药类型:</span></div>
                    <div class="InfoText">{{form.BKE228}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>疾病名称:</span></div>
                    <div class="InfoText">{{form.AKA121}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>用药时期:</span></div>
                    <div class="InfoText">{{form.BKE248}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>项目名称:</span></div>
                    <div class="InfoText">{{form.AKE002}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>剂量:</span></div>
                    <div class="InfoText">{{form.AKA071}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>数量:</span></div>
                    <div class="InfoText">{{form.AKC226}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>开始日期:</span></div>
                    <div class="InfoText">{{form.AAE030}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>结束日期:</span></div>
                    <div class="InfoText">{{form.AAE031}}</div>
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
                canbao: "",
                AAS301: "", //参保地
                AAB301: "", //参保地
                AAQ301: "", //参保地
                AKB020: "", //就诊机构
                BKE253: "", //项目类型
                BKE228: "", //特药特治类型
                AKA120: "", //疾病编码
                AKA121: "", //疾病名称
                BKE248: "", //用药时期
                AKE001: "", //项目编码
                AKE002: "", //项目名称
                AKA071: "", //单位剂量
                AKC226: "", //数量
                BKE249: "", //备案剂量
                AKA069: "", //自理比例
                BKE250: "", //累计备案剂量
                BKE251: "", //剩余备案剂量
                BKE252: "", //实际使用量
                AKB063: "", //备案天数
                AAE030: "", //开始日期
                AAE031: "" //结束日期
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
        console.log();
        
        this.form = this.$store.state.SET_SPECIAL_DRUG;

        let submitForm = {};
         // 加入用户名和电子社保卡号
        if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
            submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
            submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
        }else {
            submitForm.AAC003 = '胡';
            submitForm.AAE135 = "113344223344536624";
        }
        submitForm.AGA002= '确认-00253-003'
        const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'1009');
        this.$axios.post( this.epFn.ApiUrl1() +  '/h5/jy1009/getRecord', params)
        .then((resData) => {
            if(resData.encode==1000){
                this.currentStep = Number(resData.LS_DS.BOD037)
            }
        })
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