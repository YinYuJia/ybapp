<template>
    <div class="elseWhere">
        <div class="Title">
            <el-row>
                <el-col :span="6">
                    <span class="el-icon-arrow-left" style="color: #ffffff;font-size: .38rem;margin-left: -50px;" @click="backIndex()"></span>
                </el-col>
                <el-col :span="12">
                    <div class="NameTitle">
                        异地就医备案
                    </div>
                </el-col>
                <el-col :span="6">
                    <span class="el-icon-bell" style="color: #ffffff;font-size: .50rem;margin-right: -.4rem;margin-top:.35rem"></span>
                </el-col>
            </el-row>
        </div>
        <div class="Content">
            <!-- 基本信息 -->
            <userBaseInfo></userBaseInfo>
            <!-- 申报信息 -->
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>拟离杭日期</span></div>
                    <div class="InfoText">
                        <el-date-picker v-model="form.AAE030" type="date" placeholder="请选择" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>回杭日期</span></div>
                    <div class="InfoText">
                        <el-date-picker v-model="form.AAE031" type="date" placeholder="请选择" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>省市信息</span></div>
                    <div class="InfoText">
                        <el-cascader :options="optionList" v-model="form.AAE011">
                        </el-cascader>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>详细地址</span></div>
                    <div class="InfoText">
                        <textarea v-model="form.AAE006" placeholder="请输入详细地址"></textarea>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>申请原因</span></div>
                    <div class="InfoText">
                        <el-select v-model="form.ACK030" placeholder="请选择">
                            <el-option v-for="item in reportReason" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>联系人</span></div>
                    <div class="InfoText"><input type="text" v-model="form.AAE004" placeholder="请输入联系人"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>联系电话</span></div>
                    <div class="InfoText"><input type="text" v-model="form.AAE005" placeholder="请输入联系电话"></div>
                </div>
            </div>
        </div>
        <!-- 按钮 -->
        <footer class="Footer">
            <div class="Btn" @click="submit()" :class="{'active': canSubmit == true}">
                确认提交
            </div>
        </footer>
    </div>
</template>

<script>
    import userBaseInfo from '../../common/userBaseInfo'
    export default {
        components: {
            'userBaseInfo': userBaseInfo
        },
        data() {
            return {
                dddddd: "1111",
                form: {
                    AAE030: '', //离杭日期
                    AAE031: '', //回杭日期
                    AAE011: [], //省市信息，提交时需要转成String
                    AAE006: '', //详细地址 
                    ACK030: '', //申请原因
                    AAE004: '', //联系人
                    AAE005: '', //联系电话
                },
                optionList: [], //存放城市数据
                canSubmit: false,
                reportReason: [{
                        value: '退休异地安置',
                        label: '退休异地安置'
                    },
                    {
                        value: '在职驻外工作学习',
                        label: '在职驻外工作学习'
                    },
                    {
                        value: '异地探亲',
                        label: '异地探亲'
                    },
                    {
                        value: '异地生育',
                        label: '异地生育'
                    },
                    {
                        value: '子女统筹异地学习/抚养',
                        label: '子女统筹异地学习/抚养'
                    },
                ],
            }
        },
        created() {
            this.form = this.$store.state.SET_ELSEWHERE_OPERATION;
            this.$store.dispatch('SET_SELECTARRAY', this.epFn.ChinaJsonDatas());
            this.optionList = this.$store.state.SET_SELECTARRAY;
            console.log('11111------', this.$store.state.SET_NATIVEMSG)
            this.form.AAC003 = this.$store.state.SET_NATIVEMSG.name
            this.form.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
        },
        watch: {
            form: {
                handler: function(val) {
                    // 判断不为空
                    if (val.AAE030 != '' && val.AAE031 != '' && val.AAE011 != undefined && val.AAE006 != '' && val.ACK030 != '' && val.AAE004 != '' && val.AAE005 != '') {
                        this.canSubmit = true;
                    } else {
                        this.canSubmit = false;
                    }
                    // 判断时间间隔
                    if (val.AAE030 != '' && val.AAE031 != '') {
                        let AAE030 = new Date(val.AAE030);
                        let AAE031 = new Date(val.AAE031);
                        let month = 24 * 3600 * 1000 * 30;
                        let gap = AAE031 - AAE030;
                        if (gap < month) {
                            this.$toast('备案时间至少一个月');
                            this.form.AAE031 = '';
                        }
                    }
                },
                deep: true
            },
        },
        methods: {
            backIndex() {
                this.$router.push('/');
            },
            submit() {
                if (this.canSubmit == false) {
                    this.$toast('信息未填写完整');
                    return false;
                } else {
                    this.$store.dispatch('SET_ELSEWHERE_OPERATION', this.form);

                    let submitForm = JSON.parse(JSON.stringify(this.form)); //深拷贝，否则出错
                    submitForm.AAE011 = submitForm.AAE011.join(' '); //省市信息转换为字符串
                    submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name; //用户名
                    submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard; //单子社保卡号
                    console.log('请求信息',submitForm);
                    // 开始请求
                    this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1012/addRecord', {
                        data: submitForm
                    }).then((resData) => {
                           console.log('返回成功信息',resData.data.data)
                          if (resData.data.code == 0 ) {
                            //   成功   1000
                              if ( resData.data.data.enCode == 1000 ) {
                                  this.$toast(resData.data.data.msg);
                                  this.epFn.SaveElseWhereState(resData.data.data.msg)
                                  this.$router.push("/elseDetail");
                              }else if (resData.data.data.enCode == 1001 ) {
                                //   失败  1001
                                  this.$toast(resData.data.data.msg);
                                  return;
                              }
                        }else if(resData.data.code == -1 ){
                            // 系统异常
                            this.$toast("系统异常");
                            return;
                        }else if (resData.data.code == 1 ) {
                            // 业务异常
                            if ( resData.data.data.enCode !== 1000 ) {
                               this.$toast(resData.data.data.msg);
                            }
                            return;
                        }
                    }).catch((error) => {
                        console.log(error)
                    })
                    
                }
            },
        }
    }
</script>

<style lang="less" scoped>
    .elseWhere {
        .Title {
            height: 1.2rem;
            background-color: #05AEF0;
            font-size: .36rem;
            line-height: 1.2rem;
            overflow: hidden;
            .NameTitle {
                color: white;
            }
        }
        .Content {
            height: 100%;
            .BaseInfo {
                width: 7.5rem;
                height: 2.35rem;
                background: #05AEF0;
                position: relative;
                .InfoPad {
                    height: 2.3rem;
                    width: 6.9rem;
                    position: absolute;
                    margin-top: .42rem;
                    left: 50%;
                    margin-left: -6.9rem/2;
                    background: white;
                    border-radius: .08rem;
                    border-bottom: .1rem solid #C4EEFF;
                    .UserPhoto {
                        height: 1.2rem;
                        width: 1.2rem;
                        position: relative;
                        left: 50%;
                        margin-left: -.6rem;
                        margin-top: -.44rem;
                        border-radius: .6rem;
                        background: #DDD;
                    }
                    .UserInfo {
                        .UserName {
                            margin-top: .18rem;
                            font-family: PingFangSC-Regular;
                            font-size: .36rem;
                            color: #000000;
                            letter-spacing: 0;
                        }
                        .UserId {
                            margin-top: 12px;
                            opacity: .65;
                            font-family: PingFangSC-Regular;
                            font-size: .26rem;
                            color: #000000;
                            letter-spacing: 0;
                        }
                    }
                }
            }
            .ReportInfo {
                height: 8.8rem;
                width: 7.5rem;
                padding: 0 .3rem;
                margin-top: .67rem;
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
                            opacity: 0.85;
                            font-family: PingFangSC-Regular;
                            font-size: .3rem;
                            color: #000000;
                            letter-spacing: 0;
                            text-align: right;
                            border: none;
                        }
                    }
                    &:nth-child(4) {
                        height: 1.6rem;
                        textarea {
                            height: .84rem;
                            font-size: .3rem;
                            opacity: 0.85;
                            color: #000000;
                            line-height: .42rem;
                            text-align: right;
                        }
                    }
                    &:last-child {
                        border-bottom: none;
                    }
                }
            }
        }
        .Footer {
            height: 1.2rem;
            width: 7.5rem;
            background: white;
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 199;
            display: flex;
            justify-content: center;
            align-items: center;
            .Btn {
                height: .8rem;
                width: 6.9rem;
                background-image: linear-gradient(-90deg, rgb(142, 214, 253) 0%, rgb(173, 201, 255) 100%);
                border-radius: 40px;
                text-align: center;
                line-height: 0.8rem;
                font-family: PingFangSC-Regular;
                font-size: .36rem;
                color: #FFFFFF;
                letter-spacing: 0;
            }
            .active {
                background-image: linear-gradient(-90deg, #35B8FD 0%, #4E8DFF 100%);
            }
        }
    }
</style>

<style>
    .elseWhere .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 160px;
    }
    .elseWhere .el-input__prefix,
    .el-input__suffix {
        display: none;
    }
    .elseWhere .el-input__inner {
        border: none;
        text-align: right;
        padding-right: 0;
        padding-left: 0;
    }
    .elseWhere .el-cascader .el-input .el-input__inner {
        width: 4.5rem;
    }
    .elseWhere .el-cascader .el-cascader__label {
        text-align: right;
        padding: 0;
    }
</style>