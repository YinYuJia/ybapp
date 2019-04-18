<template>
    <div class="EventDetail">
        <!-- 标题 -->
        <div class="Title">
            <el-row>
                <el-col :span="6">
                    <div class="grid-content">
                        <span class="el-icon-arrow-left" style="color: #ffffff;font-size: .38rem;margin-left: -50px;" @click="goBack"></span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content NameTitle">
                        事件详情
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <span class="el-icon-bell" style="color: #ffffff;font-size: .50rem;margin-right: -.4rem;margin-top:.15rem"></span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 事项名 -->
        <div class="StateBox">
            <el-row>
                <el-col class="NameBox" :span="18">
                    <div class="StateTitle">基本医疗保险参保人员医疗费用零星报销项</div>
                    <div class="RestTime">处理时限：{{time}}</div>
                </el-col>
                <el-col class="BtnBox" :span="6">
                    <div class="Btn Receive"><span>收件</span></div>
                </el-col>
            </el-row>
        </div>
        <!-- 日期 -->
        <div class="StateDate">
            <div class="StateInnerBox">
                <div class="BoxName"><span>开始日期:</span></div>
                <div class="BoxContent"><span>{{form.startDate}}</span></div>
            </div>
            <div class="StateInnerBox">
                <div class="BoxName"><span>结束日期:</span></div>
                <div class="BoxContent"><span>{{form.endDate}}</span></div>
            </div>
        </div>
        <!-- 地区 -->
        <div class="StateSite">
            <div class="StateInnerBox">
                <div class="BoxName"><span>就诊类型:</span></div>
                <div class="BoxContent"><span>{{form.TypeOfVisit}}</span></div>
            </div>
            <div class="StateInnerBox">
                <div class="BoxName"><span>就诊省份:</span></div>
                <div class="BoxContent"><span>{{form.province}}</span></div>
            </div>
            <div class="StateInnerBox">
                <div class="BoxName"><span>就诊城市:</span></div>
                <div class="BoxContent"><span>{{form.city}}</span></div>
            </div>
            <div class="StateInnerBox">
                <div class="BoxName"><span>就诊机构:</span></div>
                <div class="BoxContent"><span>{{form.VisitingInstitution}}</span></div>
            </div>
        </div>
        <!-- 发票 -->
        <div class="Invoice">
            <div class="PhotoBox">
                <img src="" />
            </div>
            <div class="StateInnerBox">
                <div class="BoxName">发票号码:</div>
                <div class="BoxContent">{{form.InvoiceNumber}}</div>
            </div>
            <div class="StateInnerBox">
                <div class="BoxName">总金额:</div>
                <div class="BoxContent">{{form.TotalSum}}</div>
            </div>
        </div>
        <!-- 底部 -->
        <footer class="Footer">
            <div class="IconBox">
                <div class="Icon">
                    <svg-icon icon-class="SubmitReim_service" /></div>
                <div class="Text">客服</div>
            </div>
            <div class="BtnBox">
                <div class="ResetBtn">撤销</div>
                <div class="EditBtn" @click="edit">编辑</div>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: this.$store.getters.SET_TREATMENT_REIMBURSEMENT,
                time: '24:00:00',
                timer:null
            }
        },
        watch: {
            time: {
                deep: true,
                handler: function(newValue, oldValue) {
                    console.log('newValue',newValue)
                    console.log(this.time)
                }
            }
        },
        methods: {
            goBack() {
                this.$router.push({
                    name: 'Work',
                })
            },
            edit() {
                this.$router.push({
                    name: 'SubmitReimbursement',
                    params: {
                        name: "待遇报销"
                    }
                })
            },
            countDown(times) {
                
                this.timer = setInterval(() => {
                    var day = 0,
                        hour = 0,
                        minute = 0,
                        second = 0; //时间默认值
                    if (times > 0) {
                        day = Math.floor(times / (60 * 60 * 24));
                        hour = Math.floor(times / (60 * 60)) - (day * 24);
                        minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
                        second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                    }
                    if (day <= 9) day = '0' + day;
                    if (hour <= 9) hour = '0' + hour;
                    if (minute <= 9) minute = '0' + minute;
                    if (second <= 9) second = '0' + second;
                    //
                    this.time = hour + ':' + minute + ":" + second
                    console.log(this.time)
                    times--;
                }, 1000);
                if (times <= 0) {
                    clearInterval(timer);
                }
            }
        },
        created() {
            this.countDown(18000 * 24 / 5)
        },
            beforeDestroy() {
      clearInterval(this.timer)
    },
    }
</script>

<style lang="less" scoped>
    .EventDetail {
        width: 7.5rem; // 标题
        .Title {
            height: .8rem;
            background-color: #05AEF0;
            font-size: .36rem;
            line-height: .8rem;
            overflow: hidden;
            .NameTitle {
                font-size: .36rem;
                color: #FFFFFF;
                font-family: 'PingFangSC-Regular';
            }
        } // 事项名
        .StateBox {
            height: 2.4rem;
            width: 7.5rem;
            background: #FFF;
            .el-row {
                height: 2.4rem;
                display: flex;
                align-items: center;
                .NameBox {
                    height: 1.72rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .StateTitle {
                        height: 1rem;
                        width: 4.48rem;
                        margin-left: .3rem;
                        opacity: 0.85;
                        text-align: left;
                        font-family: PingFangSC-Medium;
                        font-size: .32rem;
                        color: #000;
                        letter-spacing: 0;
                        line-height: .5rem;
                    }
                    .RestTime {
                        opacity: 0.45;
                        margin-left: .3rem;
                        text-align: left;
                        font-family: PingFangSC-Regular;
                        font-size: .3rem;
                        color: #000;
                        letter-spacing: 0;
                    }
                }
                .BtnBox {
                    height: 1.34rem;
                    .Btn {
                        height: 1.34rem;
                        width: 1.34rem;
                        margin-right: .4rem;
                        border-radius: 1.34rem/2;
                        line-height: 1.34rem;
                        font-family: PingFangSC-Regular;
                        font-size: .4rem;
                        color: #FFF;
                        text-align: center;
                    }
                    .Receive {
                        background-color: #8BDFFF;
                    }
                }
            }
        } //日期、地区、发票
        .StateDate,
        .StateSite,
        .Invoice {
            background: #FFF;
            margin-top: .15rem;
            .StateInnerBox {
                height: 1.21rem;
                width: 7.5rem;
                display: flex;
                align-items: center;
                position: relative;
                .BoxName {
                    height: .42rem;
                    width: 1.5rem;
                    line-height: 0.42rem;
                    text-align: left;
                    margin-left: .3rem;
                    opacity: 0.45;
                    font-family: PingFangSC-Regular;
                    font-size: .3rem;
                    color: #000000;
                    letter-spacing: 0;
                    span {
                        display: block;
                    }
                    &::before {
                        content: '';
                        height: .02rem;
                        width: 6.9rem;
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        margin-left: -6.9rem/2;
                        background-color: #D5D5D5;
                    }
                }
                .BoxContent {
                    margin-left: .26rem;
                    opacity: 0.85;
                    font-family: PingFangSC-Regular;
                    font-size: .3rem;
                    color: #000000;
                    letter-spacing: 0;
                }
                &:last-child {
                    .BoxName {
                        &::before {
                            background-color: #FFF;
                        }
                    }
                }
            }
        }
        .Invoice {
            position: relative;
            .PhotoBox {
                height: 1.8rem;
                width: 1.8rem;
                background-color: #ddd;
                position: absolute;
                right: .38rem;
                top: .34rem;
                border-radius: .08rem;
            }
            .StateInnerBox {
                .BoxName {
                    &::before {
                        width: 4.6rem;
                    }
                }
            }
        } // 底部
        // 底部
        .Footer {
            height: 1.2rem;
            width: 7.5rem;
            background-color: white;
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 199;
            display: flex;
            align-items: center;
            .IconBox {
                width: .6rem;
                margin-left: .51rem;
                .Icon {
                    height: .6rem;
                    width: .6rem;
                    .svg-icon {
                        display: block;
                        height: 100%;
                        width: 100%;
                    }
                }
                .Text {
                    height: .28rem;
                    width: .6rem;
                    opacity: 0.45;
                    font-family: PingFangSC-Regular;
                    font-size: .2rem;
                    color: #000;
                    letter-spacing: 0;
                    text-align: center;
                }
            }
            .BtnBox {
                height: .8rem;
                width: 5.6rem;
                margin-left: .51rem;
                line-height: 0.8rem;
                background-image: linear-gradient(90deg, #35B8FD 0%, #4E8DFF 100%);
                border-radius: .4rem;
                font-family: PingFangSC-Regular;
                font-size: .36rem;
                color: #FFFFFF;
                letter-spacing: 0;
                display: flex;
                .ResetBtn {
                    width: 2.8rem;
                    background: #B6DEFF;
                    border-top-left-radius: .4rem;
                    border-bottom-left-radius: .4rem;
                }
                .EditBtn {
                    width: 2.8rem;
                }
            }
        }
    }
</style>