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
                <div class="InfoLine">
                    <div class="InfoName"><span>上传图片：</span></div>
                    <div class="UploadPhoto">
                        <div class="SelectPhoto">+</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 按钮 -->
        <Footer :btnText="'添加发票'" @submit="submit()"></Footer>
    </div>
</template>

<script>
import Title from '../../common/Title'
import Footer from '../../common/Footer'
export default {
    components:{
        Title,Footer
    },
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
            height: 7.2rem;
            width: 7.5rem;
            padding: 0 .3rem;
            background: white;
            .InfoLine {
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .3rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName {
                    opacity: 0.85;
                    line-height: 1.2rem;
                    span {
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText {
                    opacity: 0.85;
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    input {
                        height: .6rem;
                        width: 4.5rem;
                        opacity: 0.85;
                        font-family: PingFangSC-Regular;
                        font-size: .3rem;
                        color: #000000;
                        letter-spacing: 0;
                        text-align: right;
                        border: none;
                    }
                }
                &:last-child {
                    border-bottom: none;
                }
            }
        }
    }
}
</style>