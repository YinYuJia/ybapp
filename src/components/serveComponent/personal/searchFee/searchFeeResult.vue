<template>
    <div class="searchFeeResult">
        <Title :title="'个人费用查询'" :backRouter="'/searchFee'"></Title>
        <div class="Content">
            <div class="padContent"  v-for="(item,index) in List" :key="index">
                <div class="InfoLine">
                    <div class="InfoName">结算日期：</div>
                    <div class="InfoText">{{item.AKE010}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">医疗类别：</div>
                    <div class="InfoText">{{item.AKA130}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">医疗机构：</div>
                    <div class="InfoText">{{item.AKB021 | tooLong}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">总费用：</div>
                    <div class="InfoText">{{item.AKC264}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">医保支付：</div>
                    <div class="InfoText">{{item.BKE450}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">现金支付：</div>
                    <div class="InfoText">{{item.BKE452}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    //.parseFloat(a.toFixed(2))保留两位小数
    data(){
        return{
            // arr: [
            //     {
            //         date: '201905', 
            //         type: '类别名称信息', 
            //         orgnize: '杭州市第一人民医院', 
            //         fee: '19830.89',
            //         yibao: '10903.92',
            //         cash: '93.12'
            //     },
            // ],
            form:{
            },
            List:[
                // AKE010:"",//结算日期
                // AKA130:"",//医疗类别
                // AKB021:"",//医疗机构名称
                // AKC264:"",//医疗总费用
                // BKE450:"",//医保支付
                // BKE452:""//现金支付
              
            ]
        }
    },
    filters:{
        tooLong(val){
            return val.slice(0,13) + '...';
        }
    },
    created () {
        this.epFn.setTitle('个人费用查询')
        this.form= this.$store.state.SET_SEARCHFEE_OPERATION
        // 封装数据
        let params = this.formatSubmitData();
        // 开始请求
        console.log('parmas------',params)
        this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1027/getRecord', params).then((resData) => {
                console.log('返回成功信息',resData)
                //   成功   1000
                if ( resData.enCode == 1000 ) {
                    this.List = [...this.List, ...resData.LS_DS];
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
            // 日期传换成Number
            submitForm.AAE030 = this.util.DateToNumber(this.form.AAE030).toString();
            submitForm.AAE031 = this.util.DateToNumber(this.form.AAE031).toString();
            // submitForm.debugTest=  "true";
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                submitForm.AAC003 = '殷宇佳';

                submitForm.AAE135 = "330622197407215513";
            }
            // 请求参数封装
            console.log('submitForm',submitForm)
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1027");
            return params;
        }
    }
}
</script>

<style lang="less" scoped>
.searchFeeResult{
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
                    color: #666;
                    text-align: left;
                    letter-spacing: 0;
                }
                .InfoText{
                    width: 100%;
                    color: #000;
                    letter-spacing: 0;
                    text-align: left;
                }
            }
        }
    }
}
</style>