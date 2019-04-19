<template>
    <div class="Submit">
        <div class="Title">
            <el-row>
                <el-col :span="6">
                    <div class="grid-content">
                        <span class="el-icon-arrow-left" style="color: #ffffff;font-size: .38rem;margin-left: -50px;" @click="goBack"></span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content NameTitle">
                        {{NameTitle}}
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <!-- <svg-icon icon-class="Index_Message" className="Index_Message1" /> -->
                        <span class="el-icon-bell" style="color: #ffffff;font-size: .50rem;margin-right: -.4rem;margin-top:.15rem"></span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 选择日期 -->
        <div class="ChooseDate">
            <div class="ChooseBox">
                <div class="Name"><span>开始日期:</span></div>
                <el-date-picker class="InputBox" v-model="form.startDate" type="date" clear-icon="" placeholder="请选择开始日期">
                </el-date-picker>
            </div>
            <div class="ChooseBox">
                <div class="Name"><span>结束日期:</span></div>
                <el-date-picker class="InputBox" v-model="form.endDate" format="yyyy-MM-dd" type="date" clear-icon="" placeholder="请选择结束日期">
                </el-date-picker>
            </div>
        </div>
        <!-- 选择就诊 -->
        <div class="ChooseClinic">
            <div class="ChooseBox">
                <div class="Name"><span>就诊类型:</span></div>
                <el-select class="InputBox" v-model="form.TypeOfVisit" placeholder="请选择就诊类型">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="ChooseBox">
                <div class="Name"><span>就诊省份:</span></div>
                <el-select class="InputBox" v-model="form.province" placeholder="请选择就诊省份">
                    <el-option v-for="item in provinceArr" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="ChooseBox">
                <div class="Name"><span>就诊地市:</span></div>
                <el-select class="InputBox" v-model="form.city" placeholder="请选择就诊地市">
                    <el-option v-for="item in cityArr" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="ChooseBox">
                <div class="Name"><span>就诊机构:</span></div>
                <el-select class="InputBox" v-model="form.VisitingInstitution" placeholder="请选择就诊机构">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <!-- 发票 -->
        <div class="Invoice">
            <div class="ChooseBox">
                <div class="Name"><span>发票号码:</span></div>
                <div class="InputBox">
                    <input type="text" placeholder="请输入发票号码" v-model="form.InvoiceNumber">
                </div>
            </div>
            <div class="ChooseBox">
                <div class="Name"><span>总金额:</span></div>
                <div class="InputBox">
                    <input type="number" placeholder="请输入总金额" v-model="form.TotalSum">
                </div>
            </div>
            <div class="ChooseBox">
                <div class="Name"><span>拍照上传:</span></div>
                <div class="InputBox">
                    <input type="text" placeholder="请拍照上传发票">
                </div>
            </div>
        </div>
        <!-- 底端 -->
        <footer class="Footer">
            <div class="IconBox">
                <div class="Icon">
                    <svg-icon icon-class="SubmitReim_service" /></div>
                <div class="Text">客服</div>
            </div>
            <div class="SubmitBtn" @click="Submit"><span>确认提交</span></div>
        </footer>
        <!-- 提示框 -->
        <transition name="el-fade-in-linear">
            <div v-if="tips == true">
                <Tip></Tip>
            </div>
        </transition>
    </div>
</template>

<script>
    import ChinaJson from '../../../../common/js/ChinaArray.js';
    import Tip from '../../TipsTrueComponent.vue'
    export default {
        data() {
            return {
                tips: false,
                form: {
                    // 开始时间
                    startDate: '',
                    // 结束时间
                    endDate: "",
                    // 就诊类型
                    TypeOfVisit: "",
                    // 省
                    province: "",
                    // 市
                    city: "",
                    // 就诊机构
                    VisitingInstitution: "",
                    // 发票号
                    InvoiceNumber: "",
                    // 总金额
                    TotalSum: ""
                },
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
                NameTitle: this.$route.params.name,
                // 省,地级市
                provinceArr: [],
                city: '',
            }
        },
        components: {
            'Tip': Tip
        },
        created() {
            // this.form = this.$store.state.SET_TREATMENT_REIMBURSEMENT
            console.log('this.form', this.form)
            ChinaJson.forEach((item) => {
                let obj = new Object();
                obj.value = item.name;
                obj.label = item.name;
                this.provinceArr.push(obj);
            });
        },
        computed: {
            //地级市数组
            cityArr: function() {
                if (this.form.province != '') {
                    this.city = '';
                    let cities;
                    let arr = [];
                    ChinaJson.some((item) => {
                        if (this.form.province == item.name) {
                            cities = item.city;
                            return true;
                        }
                    });
                    cities.forEach((item) => {
                        let obj = new Object();
                        obj.value = item.name;
                        obj.label = item.name;
                        arr.push(obj);
                    });
                    return arr;
                } else {
                    return [];
                }
            },
        },
        methods: {
            goBack() {
                this.$router.push({
                    name: 'TReimbursement1',
                    params: {
                        name: this.$route.params.name
                    }
                })
            },
            Submit() {
                this.tips = true;
                setTimeout(() => {
                    this.tips = false;
                    console.log(this.form)
                    this.$store.dispatch("SET_TREATMENT_REIMBURSEMENT", this.form)
                    this.$router.push("/first")
                }, 2500)
            }
        }
    }
</script>

<style lang="less" scoped>
    .Title {
        height: .8rem;
        background-color: #05AEF0;
        font-size: .36rem;
        line-height: .8rem;
        overflow: hidden;
    }
    .NameTitle {
        font-size: .36rem;
        color: #FFFFFF;
        font-family: 'PingFangSC-Regular';
    }
    .Submit {
        height: auto;
        width: 7.5rem; // 头部
        .Header {
            height: .8rem;
            width: 7.5rem;
            background: #05AEF0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .back_icon {
                margin-left: .1rem;
                font-size: .5rem;
                color: white;
            }
            .Title {
                height: .5rem;
                font-family: PingFangSC-Regular;
                font-size: .36rem;
                color: #FFF;
                letter-spacing: 0;
                text-align: center;
            }
            .ring_icon {
                height: .5rem;
                width: .5rem;
                margin-right: .35rem;
                .svg-icon {
                    display: block;
                    height: 100%;
                    width: 100%;
                }
            }
        } // 选择日期
        .ChooseDate {
            background: #fff;
            .ChooseBox {
                height: 1.21rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;
                .Name {
                    width: 1.5rem;
                    text-align: left;
                    line-height: .42rem;
                    margin-left: .3rem;
                    opacity: 0.85;
                    font-family: PingFangSC-Regular;
                    font-size: .3rem;
                    color: #000;
                    letter-spacing: 0;
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
                .InputBox {
                    width: 4rem;
                }
                &:last-child {
                    .Name {
                        &::before {
                            background-color: #FFF;
                        }
                    }
                }
            }
        } //就诊信息
        .ChooseClinic {
            background: #FFF;
            margin-top: .15rem;
            .ChooseBox {
                height: 1.21rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;
                .Name {
                    width: 1.5rem;
                    text-align: left;
                    line-height: .42rem;
                    margin-left: .3rem;
                    opacity: 0.85;
                    font-family: PingFangSC-Regular;
                    font-size: .3rem;
                    color: #000;
                    letter-spacing: 0;
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
                .InputBox {
                    width: 4rem;
                }
                &:last-child {
                    .Name {
                        &::before {
                            background-color: #FFF;
                        }
                    }
                }
            }
        } // 发票
        .Invoice {
            background: #FFF;
            margin-top: .15rem;
            .ChooseBox {
                height: 1.21rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;
                .Name {
                    width: 1.5rem;
                    text-align: left;
                    line-height: .42rem;
                    margin-left: .3rem;
                    opacity: 0.85;
                    font-family: PingFangSC-Regular;
                    font-size: .3rem;
                    color: #000;
                    letter-spacing: 0;
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
                .InputBox {
                    width: 3rem;
                    height: .8rem;
                    input {
                        border: none;
                        display: block;
                        height: 100%;
                        width: 100%;
                        padding-right: .42rem;
                        font-family: PingFangSC-Regular;
                        font-size: .3rem;
                        color: #000;
                        opacity: 0.8;
                        letter-spacing: 0;
                        text-align: right;
                        &::placeholder {
                            color: #000;
                            opacity: 0.25;
                        }
                    }
                }
                &:last-child {
                    .Name {
                        &::before {
                            background-color: #FFF;
                        }
                    }
                }
            }
        } // 底部
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
            .SubmitBtn {
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
                text-align: center;
            }
        }
    }
</style>
<style>
    .Submit .el-input__inner {
        border: none;
        text-align: right;
        font-size: .3rem;
        color: #000;
        opacity: 0.8;
        padding-right: 1.18rem;
        letter-spacing: 0;
    }
    .Submit .el-input__prefix {
        right: .36rem;
        left: 3.2rem;
        font-size: .36rem;
    }
    .Submit .el-input__inner::placeholder {
        font-size: .3rem;
        color: #000;
        opacity: 0.25;
    }
    .Submit .el-input__suffix {
        right: .36rem;
    }
    .Submit .el-input__suffix .el-input__suffix-inner .el-select__caret {
        font-size: 0.3rem;
    }
</style>
