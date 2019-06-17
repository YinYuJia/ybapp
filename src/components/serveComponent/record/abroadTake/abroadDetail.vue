<template>
    <div class="abroadDetail">
        <Title :title="'出国带药备案'" :backRouter="'/abroadTake'"></Title>
        <div class="Content">
            <!-- 办事进度 -->
            <WorkProgress :currentStep="1"></WorkProgress>
            <!-- 列表信息 -->
            <div class="MailInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地:</span></div>
                    <div class="InfoText">{{form.AAB301000}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>出境日期:</span></div>
                    <div class="InfoText">{{form.AAE030}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>拟回国日期:</span></div>
                    <div class="InfoText">{{form.AAE031}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>取药机构:</span></div>
                    <div class="InfoText">{{form.AKB020}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>护照号码:</span></div>
                    <div class="InfoText">{{form.BKE260 | tuoMin(3,3)}}</div>
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
            AAB301000: '', //参保地
            AKB020: '',//取药机构
            AAE030: '', //出境日期
            AAE031: '', //拟回国日期
            BKE260: '', //护照号码
        },
      }
    },
    created(){
        
        this.form = this.$store.state.SET_ABROADTAKE_OPERATION;

        let params=this.formatSubmitData();
        this.$axios.post("http://192.168.1.8:13030"+ '/h5/jy1009/getRecord', params).then((resData) => {
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
    // computed:{
    //     canbaocity: function(){
    //         return this.form.canbao.join(' ');
    //     },
    // },
    methods:{
        edit(){
            this.$router.push("/abroadTake");
        },
        // 撤销提醒
        backout(){
            this.$messagebox.confirm('确定撤销吗?').then(() => {
                this.form.AAB301000= '', //参保地
                this.form.AKB020= '',//取药机构
                this.form.AAE030= '', //出境日期
                this.form.AAE031= '', //拟回国日期
                this.form.BKE260= '', //护照号码
                this.$toast("撤销请求");
                this.$router.push("/abroadTake");
            });
        },
        formatSubmitData(){
            let submitForm ={}
            console.log(submitForm)
                submitForm.AGA002 =  "确认-00253-001";
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
        }

    }
}
</script>


<style lang="less" scoped>
.abroadDetail{
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