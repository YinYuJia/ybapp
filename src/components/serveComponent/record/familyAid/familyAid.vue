<template>
    <div class="familyAid">
        <div class="Title">
            <el-row>
                <el-col :span="6">
                    <span class="el-icon-arrow-left" style="color: #ffffff;font-size: .38rem;margin-left: -50px;" @click="backIndex()"></span>
                </el-col>
                <el-col :span="12">
                    <div class="NameTitle">
                        家庭共济备案
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
                    <div class="InfoName"><span>享受人姓名</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input type="text" v-model="form.name" placeholder="请输入"></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>享受人身份证</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input type="text" v-model="form.idNo" placeholder="请输入"></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>绑定关系</span></div>
                    <div class="InfoText">
                        <el-select v-model="form.relation" placeholder="请选择">
                            <el-option v-for="item in relationList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>开始日期</span></div>
                    <div class="InfoText">
                        <el-date-picker v-model="form.start" type="date" placeholder="请选择" value-format="yyyy-MM-dd" :editable="false">
                        </el-date-picker>
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
                    name: '', //享受人姓名
                    idNo: '', //享受人身份证
                    relation: '',//绑定关系
                    start: '', //开始日期
                },
                optionList: [], //存放城市数据
                canSubmit: false,
                relationList: [{
                        value: '配偶',
                        label: '配偶'
                    },
                    {
                        value: '子女',
                        label: '子女'
                    },
                    {
                        value: '父母',
                        label: '父母'
                    }
                ],
            }
        },
        created() {
            this.form = this.$store.state.SET_FAMILYAID_OPERATION;
            
            // this.$store.dispatch('SET_SELECTARRAY', this.epFn.ChinaJsonDatas());
            this.optionList = this.$store.state.SET_SELECTARRAY;
            this.form.AAC003 = this.$store.state.SET_NATIVEMSG.name
            this.form.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
        },
        watch: {
            form: {
                handler: function(val) {
                    // 判断不为空
                    if (val.canbao != undefined && val.name != '' && val.idNo != '' && val.relation != '' && val.start != '') {
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
                    this.$store.dispatch('SET_FAMILYAID_OPERATION', this.form);

                    let submitForm = JSON.parse(JSON.stringify(this.form)); //深拷贝，否则出错
                    submitForm.canbao = submitForm.canbao.join(' '); //省市信息转换为字符串
                    submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name; //用户名
                    submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard; //单子社保卡号
                    console.log('请求信息',submitForm);
                    this.$router.push('/familyDetail');
                }
            },
        }
    }
</script>

<style lang="less" scoped>
.familyAid {
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
