<template>
    <div class="smallReimDetial">
        <!-- 标题 -->
        <Title :title="'零星报销'" :backRouter="'/reportComplete'"></Title>
        <div class="secondTitle">基本医疗保险参保人员医疗费用零星报销</div>
        <!-- 办事进度 -->
        <WorkProgress :currentStep="1"></WorkProgress>
        
        <div class="Content">
            <!-- 列表 -->
            <div class="MailInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>报销总额:</span></div>
                    <div class="InfoText">19940.13</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>报销张数:</span></div>
                    <div class="InfoText">10</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>医保报销金额:</span></div>
                    <div class="InfoText active">
                        <span>1000.12</span>
                        <div class="detailBtn">查看明细</div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>申请时间:</span></div>
                    <div class="InfoText">2019-01-02 13:13:41</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>进度时间:</span></div>
                    <div class="InfoText">2019-01-12 15:11:23</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>收款开户行:</span></div>
                    <div class="InfoText">中国工商银行</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>收款开户名:</span></div>
                    <div class="InfoText">王某某</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>收款银行账号:</span></div>
                    <div class="InfoText">6222 9090 1391 0012 412</div>
                </div>
            </div>
            <!-- 发票信息 -->
            <div class="invoiceContent">
                <div class="invoiceHint">发票附件:</div>
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
            invoices:[
                {code:'9123910023010230120301',name:'骨科',cost:'10239.03'},
                {code:'9123910023010230120302',name:'外科',cost:'102.88'},
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
        .MailInfo{
            height: 9.6rem;
            width: 7.5rem;
            padding: 0 .3rem;
            margin-top: .15rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .28rem;
                display: flex;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName{
                    width: 2.2rem;
                    line-height: 1.2rem;
                    text-align: left;
                    span{
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText{
                    width: 5rem;
                    opacity: 0.85;
                    line-height: 1.2rem;
                    letter-spacing: 0;
                    display: flex;
                    position: relative;
                    align-items: center;
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
            }
        }
        // 发票信息
        .invoiceContent{
            background: #FFF;
            padding: 0 .3rem;
            .invoiceHint{
                font-size: .28rem;
                color: #000;
                letter-spacing: 0;
                text-align: left;
                padding-top: .4rem;
            }
            .invoiceList{
                height: 2.83rem;
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
            }
        }
        // 病例资料
        .caseInfo{
            height: 3rem;
            background: #FFF;
            padding: 0 .3rem;
            border-bottom: .02rem solid #D3D3D3;
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