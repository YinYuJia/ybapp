<template>
    <div class="searchInsuredResult">
        <Title :title="'个人参保信息'" :backRouter="'/searchInsuredInfo'"></Title>
        <div class="Content">
            <div class="padContent"  v-for="(item,index) in List" :key="index">
                <div class="InfoLine">
                    <div class="InfoName">年月：</div>
                    <div class="InfoText">{{item.AAE003}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">缴费基数：</div>
                    <div class="InfoText">{{item.AAE180}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">个人缴费：</div>
                    <div class="InfoText">{{item.AAE180}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">到账情况：</div>
                    <div class="InfoText">{{item.AAE078}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Title from '../../common/Title'
export default {
    components:{
        Title
    },
    data(){
        return{
            // arr: [
            //     {date: '201905', base: '9000', pay: '99.00', text: '未到账'},
            //     {date: '201904', base: '8300', pay: '80.00', text: '未到账'},
            //     {date: '201904', base: '7200', pay: '70.00', text: '已到账'},
            //     {date: '201903', base: '8000', pay: '80.00', text: '未到账'}
            // ],
            form:{},
            List:[]
        }
    },
    created () {
        this.form = this.$store.state.SET_SEARCHINSUREDINFO_OPERATION;
        // 封装数据
        let params = this.formatSubmitData();
        // 开始请求
        this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1014/getInfo', params).then((resData) => {
                console.log('返回成功信息',resData)
                //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        this.List=[...this.List,...this.resData.LS_DS]
                        this.$toast("请求成功");
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
    methods: {
        formatSubmitData(){
                let submitForm ={};
                submitForm.AAS301 = this.form.AAS301//申请地省
                submitForm.AAB301 = this.form.AAB301//申请地市
                submitForm.AAQ301 = this.form.AAQ301//申请地区
                submitForm.AAE091 = this.form.AAE091//缴费月数
                // submitForm.debugTest=  "true";
                // 加入用户名和电子社保卡号
                if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                    submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                    submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
                }else {
                    submitForm.AAC003 = '殷宇佳';
                    submitForm.AAE135 = "113344223344536624";
                }
                // 请求参数封装
                console.log('submitForm',submitForm)
                const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1014");
                return params;
            }
    }
}
</script>

<style lang="less" scoped>
.searchInsuredResult{
    .Content{
        padding: 0 .28rem;
        .padContent{
            width: 100%;
            margin-top: .28rem;
            background: #FFF;
            box-shadow: 1px 2px 3px #DDD;
            padding: 0 .28rem;
            .InfoLine{
                height: .8rem;
                line-height: .8rem;
                font-size: .28rem;
                display: flex;
                .InfoName{
                    width: 3rem;
                    text-align: left;
                    letter-spacing: 0;
                }
                .InfoText{
                    width: 100%;
                    letter-spacing: 0;
                    text-align: left;
                }
            }
        }
    }
}
</style>