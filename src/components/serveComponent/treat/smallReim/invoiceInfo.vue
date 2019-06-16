<template>
    <div class="invoiceInfo">
        <Title :title="'零星报销'" :backRouter="'/smallReim'"></Title>
        <!-- 填写进度 -->
        <WorkProgress :currentStep="2" :progress="progress"></WorkProgress>
        <div class="Content">
            <!-- 自动获取发票信息 -->
            <div class="invoiceContent" v-if="hasInvoice">
                <div class="invoiceHint">请选择您的报销条目</div>
                <div class="invoiceList" v-for="item in invoices" :key="item.code">
                    <svg-icon icon-class="serveComponent_select" />
                    <div class="columnLine"></div>
                    <div class="textBox">
                        <div class="textLine">
                            <span class="textName">发票号</span>
                            <span class="textInfo active">{{item.code}}</span>
                        </div>
                        <div class="textLine">
                            <span class="textName">科室名称</span>
                            <span class="textInfo">{{item.name}}</span>
                        </div>
                        <div class="textLine">
                            <span class="textName">总费用</span>
                            <span class="textInfo">{{item.cost}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 手动添加发票信息 -->
            <div class="manualContent" v-if="!hasInvoice">
                <div class="invoiceHint">暂无报销条目，请手动填写/上传发票信息</div>
                <div class="invoiceList" v-for="item in invoices" :key="item.code">
                    <div class="invoicePhoto"></div>
                    <div class="textBox">
                        <div class="textLine">
                            <span class="textName">发票号</span>
                            <span class="textInfo">{{item.code}}</span>
                        </div>
                        <div class="textLine">
                            <span class="textName">科室名称</span>
                            <span class="textInfo">{{item.name}}</span>
                        </div>
                        <div class="textLine">
                            <span class="textName">总费用</span>
                            <span class="textInfo">{{item.cost}}</span>
                        </div>
                    </div>
                </div>
                <div class="plusInvoice" @click="plusInvoice()">+ 添加发票信息</div>
            </div>
        </div>
        <!-- 资料上传 -->
        <div class="dataUpload">
            <div class="uploadHint">病例资料（如出院小结、用药清单、医嘱等）</div>
            <div class="uploadBtn"><i class="el-icon-plus"></i></div>
        </div>
        <!-- 按钮 -->
        <footer class="Footer">
            <div class="Btn">
                <div class="CountBtn">
                    <span>合计:</span>
                    <span class="active">10341.91</span>
                    <span>元（5张）</span>
                </div>
                <div class="SubmitBtn" @click="submit()">下一步</div>
            </div>
        </footer>
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
            ],
            hasInvoice: false, //是否有发票信息
            invoices:[
                {code:'9123910023010230120301',name:'骨科',cost:'10239.03'},
                {code:'9123910023010230120302',name:'外科',cost:'102.88'},
            ]
        }
    },
    created() {
    },
    methods: {
        // 添加新发票
        plusInvoice(){
            this.$router.push('/plusInvoice');
        },
        submit(){
            this.$router.push('/infoRecord');
        },
    }
}
</script>

<style lang="less" scoped>
.invoiceInfo {
    .Content {
        height: 100%;
        padding: 0 .4rem;
        background: #FFF;
        // 自动获取发票信息
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
                justify-content: space-around;
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
                    width: 5rem;
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
                        .active{
                            color: #1492FF;
                        }
                    }
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
        // 手动上传发票信息
        .manualContent{
            .invoiceHint{
                font-size: .28rem;
                color: #000;
                letter-spacing: 0;
                text-align: left;
                padding-top: .4rem;
            }
            .invoiceList{
                height: 2.95rem;
                border-bottom: .02rem solid #D3D3D3;
                display: flex;
                align-items: center;
                .invoicePhoto{
                    height: 1.5rem;
                    width: 1.5rem;
                    background: #D8D8D8;
                }
                .textBox{
                    height: 1.5rem;
                    width: 5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .textLine{
                        display: flex;
                        margin-left: .28rem;
                        .textName{
                            width: 1.4rem;
                            font-size: .28rem;
                            text-align: left;
                            color: #666666;
                            letter-spacing: 0;
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
            .plusInvoice{
                height: .85rem;
                margin-bottom: .56rem;
                border: .01rem solid #1492FF;
                border-radius: .05rem;
                font-size: .28rem;
                color: #1492FF;
                letter-spacing: 0;
                line-height: .85rem;
            }
        }
    }
    // 资料上传
    .dataUpload{
        height: 2.8rem;
        background: #FFF;
        margin: .16rem 0 1.4rem 0;
        padding: .37rem .4rem;
        .uploadHint{
            font-size: .28rem;
            color: #000000;
            letter-spacing: 0;
            text-align: left;
        }
        .uploadBtn{
            height: 1.5rem;
            width: 1.5rem;
            margin-top: .32rem;
            background:  #EFEFEF;
            color: #999;
            font-size: .32rem;
            line-height: 1.5rem;
        }
    }
    // 底部
    .Footer {
        height: 1.31rem;
        width: 7.5rem;
        padding: 0 .2rem;
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 199;
        .Btn{
            width: 100%;
            display: flex;
            .CountBtn {
                height: 1.05rem;
                width: 4.5rem;
                border-top-left-radius: .05rem;
                border-bottom-left-radius: .05rem;
                line-height: 1.05rem;
                background: #E5E5E5;
                font-size: .36rem;
                color: #666;
                letter-spacing: 0;
                text-align: center;
                span{
                    font-size: .28rem;
                }
                .active{
                    font-size: .36rem;
                    color: #1492FF;
                }
            }
            .SubmitBtn{
                height: 1.05rem;
                width: 2.6rem;
                border-top-right-radius: .05rem;
                border-bottom-right-radius: .05rem;
                line-height: 1.05rem;
                background: #F2F2F2;;
                font-family: PingFangSC-Regular;
                font-size: .36rem;
                background: #1492FF;
                color: #FFF;
                letter-spacing: 0;
                text-align: center;
            }
        }
    }
}
</style>