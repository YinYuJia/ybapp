<template>
    <div class="invoiceInfo">
        <Title :title="'零星报销'" :backRouter="'/smallReim'"></Title>
        <!-- 填写进度 -->
        <WorkProgress :currentStep="2" :progress="progress"></WorkProgress>
        <div class="Content">
            <!-- 自动获取发票信息 -->
            <div class="invoiceContent" v-if="hasInvoice">
                <div class="invoiceHint">请选择您的报销条目</div>
                <div class="invoiceList" v-for="item in invoices" :key="item.BKE100">
                    <div class="selectIcon" @click="chooseInvoice(item)">
                        <svg-icon v-if="item.selected" icon-class="serveComponent_select" />
                    </div>
                    <div class="columnLine"></div>
                    <div class="textBox">
                        <div class="textLine">
                            <span class="textName">发票号</span>
                            <span class="textInfo active">{{item.BKE100}}</span>
                        </div>
                        <div class="textLine">
                            <span class="textName">科室名称</span>
                            <span class="textInfo">{{item.BKA104}}</span>
                        </div>
                        <div class="textLine">
                            <span class="textName">总费用</span>
                            <span class="textInfo">{{item.AKC264}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 手动添加发票信息 -->
            <div class="manualContent" v-if="!hasInvoice">
                <div class="invoiceHint">暂无报销条目，请手动填写/上传发票信息</div>
                <div class="invoiceList" v-for="item in invoices" :key="item.BKE100">
                    <div class="invoicePhoto"></div>
                    <div class="textBox">
                        <div class="textLine">
                            <span class="textName">发票号</span>
                            <span class="textInfo">{{item.BKE100}}</span>
                        </div>
                        <div class="textLine">
                            <span class="textName">科室名称</span>
                            <span class="textInfo">{{item.BKA104}}</span>
                        </div>
                        <div class="textLine">
                            <span class="textName">总费用</span>
                            <span class="textInfo">{{item.AKC264}}</span>
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
                    <span class="active">{{invoiceCount.price}}</span>
                    <span>元（{{invoiceCount.count}}张）</span>
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
                
            },
            canSubmit: false, //是否可以提交
            progress:[
                {step:1,name:'申请报销'},
                {step:2,name:'发票信息'},
                {step:3,name:'信息录入'},
                {step:4,name:'申报完成'}
            ],
            hasInvoice: true, //是否有发票信息
            // invoices:[  //发票信息
            //     {BKE100:'9123910023010230120301',BKA104:'骨科',AKC264: 10239.03,selected: false},
            //     {BKE100:'9123910023010230120302',BKA104:'外科',AKC264: 102.88,selected: false},
            // ],
            invoices: [],
            invoiceCount: {price:0,count:0}, // 发票合计
        }
    },
    created() {
        // 获取VUEX信息
        this.invoices = JSON.parse(JSON.stringify(this.$store.state.SET_SMALL_REIM_2));
        // 封装发票
        this.invoices.forEach((val)=>{
            val.selected = false;
        })
        console.log('发票',this.invoices);
    },
    methods: {
        // 选择发票
        chooseInvoice(invoice){
            invoice.selected = !invoice.selected;
            var price = 0;
            var count = 0;
            this.invoices.forEach((val)=>{
                if(val.selected == true){
                    price += val.AKC264;
                    count++;
                }
            });
            this.invoiceCount = {
                price: price,
                count: count
            }
        },
        // 添加新发票
        plusInvoice(){
            this.$router.push('/plusInvoice');
        },
        submit(){
            if(this.invoiceCount.count == 0){
                this.$toast('未选择任何发票');
                return false;
            }else{
                let submitForm = JSON.parse(JSON.stringify(this.$store.state.SET_SMALL_REIM_SUBMIT));
                submitForm.BKC013 = this.invoiceCount.count;
                submitForm.AKC264 = this.invoiceCount.price;
                this.$store.dispatch('SET_SMALL_REIM_SUBMIT', submitForm);
                this.$router.push('/infoRecord');
            }
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
                .selectIcon{
                    height: .4rem;
                    width: .4rem;
                    border-radius: .2rem;
                    background: #D8D8D8;
                    position: relative;
                    .svg-icon{
                        position: absolute;
                        height: .4rem;
                        width: .4rem;
                        top: 0;
                        left: 0;
                    }
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