<template>
    <div class="plusInvoice">
        <!-- 标题 -->
        <Title :title="'零星报销'" :backRouter="'/invoiceInfo'"></Title>
        <!-- 发票信息 -->
        <div class="Content">
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>发票号码：</span></div>
                    <div class="InfoText"><input type="text" v-model="form.invoiceCode" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>发票金额：</span></div>
                    <div class="InfoText"><input type="text" v-model="form.invoicePrice" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>发票日期：</span></div>
                    <div class="InfoText"><input type="text" v-model="form.invoiceDate" placeholder="请输入" readonly></div>
                </div>
            </div>
            <!-- 需要补充信息 -->
            <div class="supplementInfo">
                <div class="infoName">上传图片：</div>
                <div class="photoBox">
                    <svg-icon icon-class="serveComponent_upload" />
                </div>
            </div>
        </div>
        <!-- 按钮 -->
        <Footer :btnText="'添加发票'" @submit="submit()"></Footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{
                invoiceCode: '', //发票号码
                invoicePrice: '', //发票金额
                invoiceDate: '', //发票日期
            }
        }
    },
    methods:{
        submit(){

        }
    }
}
</script>

<style lang="less" scoped>
.plusInvoice{
    .Content {
        height: 100%;
        margin-bottom: 1.4rem;
        .ReportInfo {
            height: 3.6rem;
            width: 7.5rem;
            padding: 0 .3rem;
            background: white;
            .InfoLine {
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .28rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName {
                    line-height: 1.2rem;
                    span {
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText {
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    input {
                        height: .6rem;
                        width: 4.5rem;
                        font-family: PingFangSC-Regular;
                        font-size: .3rem;
                        color: #000000;
                        letter-spacing: 0;
                        text-align: right;
                        border: none;
                    }
                }
            }
        }
        // 补充资料
        .supplementInfo{
            background: #FFF;
            font-size: .28rem;
            color: #000000;
            line-height: 38px;
            text-align: left;
            padding: .1rem .3rem;
            .infoName{
                letter-spacing: 0;
            }
            .photoBox{
                text-align: left;
                .svg-icon{
                    height: 1.5rem;
                    width: 1.5rem;
                }
            }
        }
    }
}
</style>