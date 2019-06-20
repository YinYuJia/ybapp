<template>
    <div class="invoiceDetail">
        <Title :title="'零星报销'" :backRouter="'/smallReimDetail'"></Title>
        <div class="ListInfo">
            <div class="InfoLine">
                <div class="InfoName"><span>发票号码:</span></div>
                <div class="InfoText"><span>918239123001023012312</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>报销日期:</span></div>
                <div class="InfoText"><span>2019-01-03</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>总费用:</span></div>
                <div class="InfoText"><span>8193.23</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>医保支付合计:</span></div>
                <div class="InfoText"><span>1490.92</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>自理费用:</span></div>
                <div class="InfoText"><span>813.09</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>自费费用:</span></div>
                <div class="InfoText"><span>813.09</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>统筹基金支付:</span></div>
                <div class="InfoText"><span>13.90</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>大病基金支付:</span></div>
                <div class="InfoText"><span>13.90</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>公补基金支付:</span></div>
                <div class="InfoText"><span>13.90</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>离休基金支付:</span></div>
                <div class="InfoText"><span>13.90</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>其他基金支付:</span></div>
                <div class="InfoText"><span>13.90</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>当年账户支付:</span></div>
                <div class="InfoText"><span>13.90</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>历年账户支付:</span></div>
                <div class="InfoText"><span>13.90</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>历年近亲属账户支付:</span></div>
                <div class="InfoText"><span>13.90</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>现金支付:</span></div>
                <div class="InfoText"><span>13.90</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>报销状态:</span></div>
                <div class="InfoText"><span>已报销</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>报销说明:</span></div>
                <div class="InfoText"><span>这里显示说明内容</span></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
.invoiceDetail{
    .ListInfo{
        width: 7.5rem;
        padding: 0 .3rem;
        margin-top: .15rem;
        background: white;
        .InfoLine{
            height: 1.2rem;
            position: relative;
            display: flex;
            font-size: .28rem;
            border-bottom: .01rem solid #D5D5D5;
            .InfoName{
                width: 3.5rem;
                line-height: 1.2rem;
                text-align: left;
                span{
                    height: .6rem;
                    line-height: .6rem;
                    color: #666;
                    letter-spacing: 0;
                }
            }
            .InfoText{
                width: 5rem;
                line-height: 1.2rem;
                letter-spacing: 0;
                display: flex;
                position: relative;
                align-items: center;
                span{
                    height: .6rem;
                    line-height: .6rem;
                    color: #000;
                    letter-spacing: 0;
                }
            }
            .active{
                font-size: .36rem;
                color: #1492FF;
                display: flex;
                justify-content: space-between;
                .detailBtn{
                    height: .54rem;
                    width: 1.58rem;
                    line-height: .54rem;
                    border: .01rem solid #1492FF;
                    border-radius: .05rem;
                    font-size: .28rem;
                    color: #1492FF;
                    letter-spacing: 0;
                }
            }
            &:last-child{
                border-bottom: none;
            }
        }
    }
}
</style>