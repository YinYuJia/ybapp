<template>
    <div class="invoiceInfo">
        <Title :title="'零星报销'" :backRouter="'/smallReim'"></Title>
        <!-- 填写进度 -->
            <WorkProgress :currentStep="2" :progress="progress"></WorkProgress>
        <div class="Content">
            <!-- 发票信息 -->
            <div class="invoiceContent">
                <div class="invoiceHint">请选择您的报销条目</div>
                <div class="invoiceList">
                </div>
                <div class="invoiceList">
                    <svg-icon icon-class="serveComponent_select" />
                    <div class="columnLine"></div>
                    <div class="textBox">
                        <div class="textLine">
                            <span class="textName">发票号</span>
                            <span class="textInfo">9123910023010230120301</span>
                        </div>
                        <div class="textLine">
                            <span class="textName">科室名称</span>
                            <span class="textInfo">骨科</span>
                        </div>
                        <div class="textLine">
                            <span class="textName">总费用</span>
                            <span class="textInfo">10239.03</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Title from '../../common/Title'
import WorkProgress from '../../common/WorkProgress'
export default {
    components: {
        Title,WorkProgress
    },
    data() {
        return {
            // 提交信息
            form: {
                hospitalName: '', //医院名称
                hospitalCode: '', //医院编码
                jiuzhen: '', //就诊类型
                jiuzhendate: '', //就诊日期
            },
            canSubmit: false,
            progress:[
                {step:1,name:'申请报销'},
                {step:2,name:'发票信息'},
                {step:3,name:'信息录入'},
                {step:4,name:'申报完成'}
            ]
        }
    },
    created() {
    },
    methods: {
    }
}
</script>

<style lang="less" scoped>
.invoiceInfo {
    .Content {
        height: 100%;
        margin-bottom: 1.4rem;
        padding: 0 .4rem;
        background: #FFF;
        .invoiceContent{
            .invoiceHint{
                font-size: .28rem;
                color: #000;
                letter-spacing: 0;
                text-align: left;
                padding-top: .4rem;
            }
            .invoiceList{
                height: 3.3rem;
                background: #FFF;
                border-bottom: .02rem solid #D3D3D3;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .svg-icon{
                    height: .4rem;
                    width: .4rem;
                }
                .columnLine{
                    height: 2rem;
                    width: .03rem;
                    background: #D3D3D3;
                }
                .textBox{
                    height: 2rem;
                    width: 5.3rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    .textLine{
                        display: flex;
                        .textName{
                            width: 1.3rem;
                            font-size: .28rem;
                            color: #666666;
                            letter-spacing: 0;
                            text-align: left;
                        }
                        .textInfo{
                            font-size: .28rem;
                            color: #000000;
                            letter-spacing: 0;
                        }
                    }
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
    }
}
</style>