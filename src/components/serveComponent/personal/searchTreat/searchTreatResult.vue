<template>
    <div class="searchTreatResult">
        <Title :title="'就诊信息查询'" :backRouter="'/searchTreat'"></Title>
        <div class="Content">
            <div class="padContent"  v-for="(item,index) in arr" :key="index">
                <div class="InfoLine">
                    <div class="InfoName">序列号：</div>
                    <div class="InfoText">{{item.order}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">状态：</div>
                    <div class="InfoText">{{item.state}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">入院日期：</div>
                    <div class="InfoText">{{item.date}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">就诊方式：</div>
                    <div class="InfoText">{{item.type}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">总费用：</div>
                    <div class="InfoText">{{item.fee}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">出院原因：</div>
                    <div class="InfoText">{{item.reason}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName">疾病名称：</div>
                    <div class="InfoText">{{item.name}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            arr: [
                {
                    order: '20190203', 
                    state: '正常', 
                    date: '2019-03-03', 
                    type: '门诊',
                    fee: '10903.92',
                    reason: '治愈',
                    name: '疾病名称'
                },
                {
                    order: '20190101', 
                    state: '退费', 
                    date: '2019-03-03', 
                    type: '住院',
                    fee: '10903.92',
                    reason: '治愈',
                    name: '疾病名称'
                },
            ]
        }
    },
    created(){
        this.epFn.setTitle('就诊信息查询')
    }
}
</script>

<style lang="less" scoped>
.searchTreatResult{
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