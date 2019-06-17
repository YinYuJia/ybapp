<template>
    <div class="searchFeeResult">
        <Title :title="'个人费用查询'" :backRouter="'/searchFee'"></Title>
        <div class="Content">
            <div class="padContent"  v-for="(item,index) in arr" :key="index">
                <div class="InfoLine">
                    <div class="InfoName">结算日期：</div>
                    <div class="InfoText">{{item.date}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">医疗类别：</div>
                    <div class="InfoText">{{item.type}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">医疗机构：</div>
                    <div class="InfoText">{{item.orgnize}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">总费用：</div>
                    <div class="InfoText">{{item.fee}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">医保支付：</div>
                    <div class="InfoText">{{item.yibao}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">现金支付：</div>
                    <div class="InfoText">{{item.cash}}</div>
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
            arr: [
                {
                    date: '201905', 
                    type: '类别名称信息', 
                    orgnize: '杭州市第一人民医院', 
                    fee: '19830.89',
                    yibao: '10903.92',
                    cash: '93.12'
                },
                {
                    date: '201904', 
                    type: '类别名称信息', 
                    orgnize: '杭州市中医院', 
                    fee: '19830.89',
                    yibao: '10903.92',
                    cash: '93.12'
                },
            ]
        }
    },
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