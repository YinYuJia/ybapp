<template>
    <div class="elseDetail">
        <Title :title="'领取就医凭证'" :backRouter="'/elseWhere'"></Title>
        <div class="Content">
            <!-- 事项名称 -->
            <div class="ItemInfo">
                <div class="name">基本医疗保险参保人员异地就医备案</div>
                <div class="icon">收件</div>
            </div>
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
                    <div class="InfoText">{{form.AKC030}}</div>
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
        <footer class="Footer">
            <div class="Btn">
                <div class="ResetBtn" @click="backout()">撤销</div>
                <div class="EditBtn" @click="edit()">编辑</div>
            </div>
        </footer>
    </div>
</template>

<script>
import Title from '../../common/Title'
export default {
    components:{
        'Title': Title,
    },
    data() {
      return {
        form: {
            // AAE030: '', //离杭日期
            // AAE031: '', //回杭日期
            // AAE011: [], //省市信息，提交时需要转成String
            // AAE006: '', //详细地址 
            // AKC030: '', //申请原因
            // AAE004: '', //联系人
            // AAE005: '', //联系电话
            AGA002:'',
        },
      }
    },
    created(){
        
        // this.form = this.$store.state.SET_ELSEWHERE_OPERATION;
        let params=this.formatSubmitData();
        this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1009/getRecord', params).then((resData) => {
                
                console.log('返回成功信息',resData)
                //   成功   1000
                    if ( resData.enCode == 1000 ) {  
                        console.log(11111)
                        this.$toast("提交成功");
                        this.$router.push("/elseDetail");
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
    computed:{
        // address: function(){
        //     return this.form.AAE011.join(' ');
        // }
    },
    methods:{
        edit(){
            this.$router.push("/elseWhere");
        },
            formatSubmitData(){
                let submitForm = JSON.parse(JSON.stringify(this.form)); //深拷贝
                console.log(submitForm)
                // 日期传换成Number
                // submitForm.AAE030 = this.util.DateToNumber(submitForm.AAE030);
                // submitForm.AAE031 = this.util.DateToNumber(submitForm.AAE031);
                // submitForm.AAE011 =  "460400";
                // submitForm.AAE004 =  this.form.AAE004;
                // submitForm.AKC030 =  this.form.AKC030;
                // submitForm.AAE006 =  this.form.AAE006;
                // submitForm.AAE005 =  this.form.AAE005;
                // submitForm.AAB301 =  "460400";
                submitForm.AGA002 =  "确认-00253-013";




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
.elseDetail{
    .Content{
        .ItemInfo{
            height: 2.4rem;
            width: 7.5rem;
            background: white;
            padding: 0 .4rem 0 .3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .name{
                opacity: 0.85;
                font-family: PingFangSC-Medium;
                font-size: .32rem;
                color: #000000;
                letter-spacing: 0;
            }
            .icon{
                height: 1.34rem;
                width: 1.34rem;
                background:  #8BDFFF;
                border-radius: 1.34rem/2;
                text-align: center;
                line-height: 1.34rem;
                font-family: PingFangSC-Regular;
                font-size: .4rem;
                color: #FFFFFF;
                letter-spacing: 0;
                text-align: center;
            }
        }
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
    // 底部
    .Footer {
        height: 1.31rem;
        width: 7.5rem;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 199;
        .Btn{
            display: flex;
            justify-content: space-around;
            .ResetBtn {
                height: 1.05rem;
                width: 3.45rem;
                border-radius: .05rem;
                line-height: 1.05rem;
                background: #F2F2F2;;
                font-family: PingFangSC-Regular;
                font-size: .36rem;
                color: #B4B4B4;
                letter-spacing: 0;
                text-align: center;
            }
            .EditBtn{
                height: 1.05rem;
                width: 3.45rem;
                border-radius: .05rem;
                line-height: 1.05rem;
                background: #F2F2F2;;
                font-family: PingFangSC-Regular;
                font-size: .36rem;
                background: #1492FF;
                color: #FFF;
                letter-spacing: 0;
                text-align: center;
            }
        }
    }
}
</style>

<style>
</style>
