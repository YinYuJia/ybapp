<template>
    <div class="smallReimDetial">
        <!-- 标题 -->
        <Title :title="'零星报销'" :backRouter="'/reportComplete'"></Title>
        <div class="secondTitle">基本医疗保险参保人员医疗费用零星报销</div>
        <!-- 办事进度 -->
        <WorkProgress :currentStep="1"></WorkProgress>
        
        <div class="Content">
            <!-- 列表 -->
            <div class="ListInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>发票总额:</span></div>
                    <div class="InfoText"><span>19940.13</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>发票张数:</span></div>
                    <div class="InfoText"><span>10</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>申请时间:</span></div>
                    <div class="InfoText"><span>2019-01-02 13:13:41</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>进度时间:</span></div>
                    <div class="InfoText"><span>2019-01-12 15:11:23</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>收款开户行:</span></div>
                    <div class="InfoText"><span>中国工商银行</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>收款开户名:</span></div>
                    <div class="InfoText"><span>**某</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>收款银行账号:</span></div>
                    <div class="InfoText"><span>6222 90** **** ***2 412</span></div>
                </div>
            </div>
            <!-- 发票信息 -->
            <div class="invoiceContent" v-if="!invoiceComplete">
                <div class="invoiceHint">报销明细</div>
                <!-- 报销中状态 -->
                <div class="invoiceList" v-for="item in invoices" :key="item.code">
                    <div class="textLine">
                        <span class="textName">发票号</span>
                        <span class="textInfo">{{item.code}}</span>
                    </div>
                    <div class="textLine">
                        <span class="textName">发票金额</span>
                        <span class="textInfo">{{item.cost}}</span>
                    </div>
                    <div class="textLine">
                        <span class="textName">状态</span>
                        <span class="textInfo warn">{{item.state}}</span>
                    </div>
                </div>
            </div>
            <div class="invoiceContent" v-if="invoiceComplete">
                <div class="invoiceHint">报销明细</div>
                <!-- 报销完成状态 -->
                <div class="invoiceList2" v-for="item in invoices" :key="item.code">
                    <div class="textLine">
                        <div class="textHeader" @click="showInvoiceDetail()">
                            <span>医保报销金额：</span>
                            <span class="active">￥1000.31</span>
                            <svg-icon icon-class="serveComponent_arrowRight" />
                        </div>
                        <div class="textInfo">已报销</div>
                    </div>
                    <div class="textLine">
                        <span class="textName">发票金额</span>
                        <span class="textInfo">{{item.code}}</span>
                    </div>
                    <div class="textLine">
                        <span class="textName">发票金额</span>
                        <span class="textInfo">{{item.cost}}</span>
                    </div>
                    <div class="textLine">
                        <span class="textName">说明</span>
                        <span class="textInfo">{{item.state}}</span>
                    </div>
                </div>
            </div>
            <!-- 病例资料 -->
            <div class="caseInfo">
                <div class="infoName">病例资料（如出院小结、用药清单、医嘱等）</div>
                <div class="photoBox">
                    <svg-icon icon-class="serveComponent_photo" />
                </div>
            </div>
            <!-- 需要补充信息 -->
            <div class="supplementInfo" v-if="needMoreInfo">
                <div class="infoName">根据业务需要，需要您补充提交以下资料</div>
                <div class="infoList">1、所需资料1</div>
                <div class="infoList">2、所需资料2</div>
                <div class="infoList">3、所需资料3</div>
                <div class="photoBox">
                    <svg-icon icon-class="serveComponent_upload" />
                </div>
            </div>
        </div>
        <!-- 按钮 -->
        <Footer :btnType="2" @backout="backout()" @edit="edit()"></Footer>
    </div>
</template>

<script>
export default {
    created(){
        let params = this.formatSubmitForm();
        console.log(params);
    },
    data(){
        return{
            invoiceComplete: true,
            invoices:[
                {code:'9123910023010230120301',state:'报销中',cost:'10239.03'},
                {code:'9123910023010230120302',state:'报销中',cost:'102.88'},
                {code:'9123910023010230120303',state:'报销中',cost:'2019.28'},
            ],
            needMoreInfo: true,
        }
    },
    methods:{
        edit(){
            this.$router.push("/smallReim");
        },
        // 撤销提醒
        backout(){
            this.$messagebox.confirm('确定撤销吗?').then(() => {
                this.$router.push('/Index');
                this.$toast('撤销成功');
            });
        },
        showInvoiceDetail(){
            this.$router.push('/invoiceDetail')
        },
        // 封装提交参数
        formatSubmitForm(){
            let submitForm = {
                AGA002: '给付-00007-019',
                AAC003: this.$store.state.SET_NATIVEMSG.names,
                AAE135: this.$store.state.SET_NATIVEMSG.idCard
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,1009);
            return params;
        }
    }
}
</script>

<style lang="less" scoped>
.smallReimDetial{
    .secondTitle{
        height: .8rem;
        width: 7.5rem;
        padding-top: .1rem;
        background: #FFF;
        font-size: .32rem;
        color: #000000;
        letter-spacing: 0;
        text-align: center;
    }
    .Content{
        margin-bottom: 1.6rem;
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
                    width: 2.2rem;
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
        // 发票信息
        .invoiceContent{
            background: #FFF;
            margin-top: .3rem;
            padding: 0 .4rem;
            .invoiceHint{
                height: .8rem;
                padding-top: .4rem;
                font-size: .28rem;
                color: #000;
                letter-spacing: 0;
                text-align: left;
            }
            // 报销中状态
            .invoiceList{
                height: 2.8rem;
                padding: .6rem 0;
                border-bottom: .01rem solid #D5D5D5;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .textLine{
                    display: flex;
                    font-size: .28rem;
                    .textName{
                        width: 1.4rem;
                        text-align: left;
                        color: #666666;
                        letter-spacing: 0;
                    }
                    .textInfo{
                        color: #000000;
                        letter-spacing: 0;
                    }
                    .warn{
                        color: #FFA007;
                    }
                }
                &:last-child{
                    border-bottom: none;
                }
            }
            // 报销完成状态
            .invoiceList2{
                height: 3.3rem;
                padding: .42rem 0 .58rem 0;
                border-bottom: .01rem solid #D5D5D5;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .textLine{
                    display: flex;
                    font-size: .28rem;
                    &:first-child{
                        justify-content: space-between;
                        .textInfo{
                            color: #007CEA;
                        }
                    }
                    .textHeader{
                        width: 4.1rem;
                        display: flex;
                        justify-content: space-between;
                        font-size: .28rem;
                        .active{
                            color: #007CEA;
                        }
                    }
                    .textName{
                        width: 1.4rem;
                        text-align: left;
                        color: #666666;
                        letter-spacing: 0;
                    }
                    .textInfo{
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
        // 病例资料
        .caseInfo{
            height: 3rem;
            background: #FFF;
            padding: 0 .3rem;
            margin-top: .3rem;
            .infoName{
                height: 1.07rem;
                line-height: 1.07rem;
                text-align: left;
                font-size: .28rem;
                color: #000000;
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
        // 补充资料
        .supplementInfo{
            background: #FFF;
            font-size: .28rem;
            color: #000000;
            line-height: 38px;
            text-align: left;
            padding: .1rem .3rem;
            margin-top: .3rem;
            .infoName{
                letter-spacing: 0;
            }
            .infoList{
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