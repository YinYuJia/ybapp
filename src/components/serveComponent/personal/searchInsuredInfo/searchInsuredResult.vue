<template>
    <div class="searchInsuredResult">
        <Title :title="'个人参保信息'" :backRouter="'/searchInsuredInfo'"></Title>
        <div class="Content">
            <div class="padContent"  v-for="(item,index) in arr" :key="index">
                <div class="InfoLine">
                    <div class="InfoName">年月：</div>
                    <div class="InfoText">{{item.date}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">缴费基数：</div>
                    <div class="InfoText">{{item.base}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">个人缴费：</div>
                    <div class="InfoText">{{item.pay}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">到账情况：</div>
                    <div class="InfoText">{{item.text}}</div>
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
                {date: '201905', base: '9000', pay: '99.00', text: '未到账'},
                {date: '201904', base: '8300', pay: '80.00', text: '未到账'},
                {date: '201904', base: '7200', pay: '70.00', text: '已到账'},
                {date: '201903', base: '8000', pay: '80.00', text: '未到账'}
            ]
        }
    },
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