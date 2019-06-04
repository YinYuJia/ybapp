<template>
    <div class="abroadTake">
        <div class="Title">
            <el-row>
                <el-col :span="6">
                    <span class="el-icon-arrow-left" style="color: #ffffff;font-size: .38rem;margin-left: -50px;" @click="backIndex()"></span>
                </el-col>
                <el-col :span="12">
                    <div class="NameTitle">
                        带药备案
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
                        <el-cascader :options="optionList" v-model="form.canbao">
                        </el-cascader>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>出境日期</span></div>
                    <div class="InfoText">
                        <el-date-picker v-model="form.start" type="date" placeholder="请选择" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>拟回国日期</span></div>
                    <div class="InfoText">
                        <el-date-picker v-model="form.end" type="date" placeholder="请选择" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>取药机构</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input type="text" v-model="form.organize" placeholder="请选择"></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>护照号码</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input type="text" v-model="form.passport" placeholder="请输入"></div>
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
                    canbao: [], //参保地
                    start: '', //出境日期
                    end: '', //拟回国日期
                    organize: '',//取药机构
                    passport: '', //护照号码
                },
                optionList: [], //存放城市数据
                canSubmit: false,
            }
        },
        created() {
            this.form = this.$store.state.SET_ABROADTAKE_OPERATION;
            this.$store.dispatch('SET_SELECTARRAY', this.epFn.ChinaJsonDatas());
            this.optionList = this.$store.state.SET_SELECTARRAY;
            this.form.AAC003 = this.$store.state.SET_NATIVEMSG.name
            this.form.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
        },
        watch: {
            form: {
                handler: function(val) {
                    // 判断不为空
                    if (val.canbao != undefined && val.start != '' && val.end != '' && val.organize != '' && val.passport != '') {
                        this.canSubmit = true;
                    } else {
                        this.canSubmit = false;
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
                    this.$store.dispatch('SET_ABROADTAKE_OPERATION', this.form);

                    let submitForm = JSON.parse(JSON.stringify(this.form)); //深拷贝，否则出错
                    submitForm.canbao = submitForm.canbao.join(' '); //省市信息转换为字符串
                    submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name; //用户名
                    submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard; //单子社保卡号
                    console.log('请求信息',submitForm);
                    this.$router.push('/abroadDetail');
                }
            },
        }
    }
</script>

<style lang="less" scoped>
.abroadTake {
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
