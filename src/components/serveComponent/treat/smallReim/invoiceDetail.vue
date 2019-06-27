<template>
    <div class="invoiceDetail">
        <Title :title="'零星报销'" :backRouter="'/smallReimDetail'"></Title>
        <div class="ListInfo">
            <div class="InfoLine">
                <div class="InfoName"><span>发票号码:</span></div>
                <div class="InfoText"><span>{{form.BKE100}}</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>报销日期:</span></div>
                <div class="InfoText"><span>{{form.AKE010}}</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>总费用:</span></div>
                <div class="InfoText"><span>{{form.AKC264}}</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>医保支付合计:</span></div>
                <div class="InfoText"><span>{{form.BKE450}}</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>自理费用:</span></div>
                <div class="InfoText"><span>{{form.BKE404}}</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>自费费用:</span></div>
                <div class="InfoText"><span>{{form.BKE400}}</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>统筹基金支付:</span></div>
                <div class="InfoText"><span>{{form.AKE039}}</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>大病基金支付:</span></div>
                <div class="InfoText"><span>{{form.AKE029}}</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>公补基金支付:</span></div>
                <div class="InfoText"><span>{{form.AKE035}}</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>离休基金支付:</span></div>
                <div class="InfoText"><span>{{form.AKE043}}</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>其他基金支付:</span></div>
                <div class="InfoText"><span>{{form.BKE444}}</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>当年账户支付:</span></div>
                <div class="InfoText"><span>{{form.BKE441}}</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>历年账户支付:</span></div>
                <div class="InfoText"><span>{{form.BKE442}}</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>历年近亲属账户支付:</span></div>
                <div class="InfoText"><span>{{form.BKE443}}</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>现金支付:</span></div>
                <div class="InfoText"><span>{{form.BKE452}}</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>报销状态:</span></div>
                <div class="InfoText"><span>{{form.BKE586 | BKE586}}</span></div>
            </div>
            <div class="InfoLine">
                <div class="InfoName"><span>报销说明:</span></div>
                <div class="InfoText"><span>{{form.AAE013}}</span></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
    data(){
        return{
            form:{}
        }
    },
    created(){
        this.form = Object.assign({}, this.$store.state.SET_INVOICEDETAIL)
        this.epFn.setTitle('零星报销')
    }
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