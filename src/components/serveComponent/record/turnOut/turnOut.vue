<template>
    <div class="turnOut">
        <div class="Title">
            <el-row>
                <el-col :span="6">
                    <span class="el-icon-arrow-left" style="color: #ffffff;font-size: .38rem;margin-left: -50px;" @click="backIndex()"></span>
                </el-col>
                <el-col :span="12">
                    <div class="NameTitle">
                        转外就医备案
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
                    <div class="InfoName"><span>参保地</span></div>
                    <div class="InfoText">
                        <el-cascader :options="optionList" v-model="form.AAE011">
                        </el-cascader>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>开始日期</span></div>
                    <div class="InfoText">
                        <el-date-picker v-model="form.AAE030" type="date" placeholder="请选择" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>转往地市</span></div>
                    <div class="InfoText">
                        <el-cascader :options="optionList" v-model="form.AAE011">
                        </el-cascader>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>疾病名称</span></div>
                    <div class="InfoText">
                        <el-select v-model="form.ACK030" placeholder="请选择">
                            <el-option v-for="item in reportReason" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>就医疗程</span></div>
                    <div class="InfoText">
                        <el-select v-model="form.treatment" placeholder="请选择">
                            <el-option v-for="item in treatment" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
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
                    treatment: '', //就诊疗程
                },
                optionList: [], //存放城市数据
                canSubmit: false,
                treatment: [
                    {value:'初诊', label:'初诊'},
                    {value:'复诊', value:'复诊'}
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
.turnOut {
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
        .ReportInfo {
            height: 6rem;
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
