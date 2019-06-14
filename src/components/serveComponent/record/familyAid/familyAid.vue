<template>
    <div class="familyAid">
        <Title :title="'家庭共济备案'" :backRouter="'/'"></Title>
        <!-- MintUI弹出框区域 -->
        <selectCity 
            :type="2"
            ref="insuredPicker"
            @confirm="chooseInsured"
            >
        </selectCity>
        <mt-datetime-picker
            type="date"
            ref="startPicker"
            v-model="dateVal"
            @confirm="handleStartConfirm">
        </mt-datetime-picker>
        <!-- 弹出框区域结束 -->
        <div class="Content">
            <!-- 基本信息 -->
            <userBaseInfo></userBaseInfo>
            <!-- 申报信息 -->
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地</span></div>
                    <div class="InfoText">
                         <div class="InfoText"><input @click="openInsuredPicker" type="text" v-model="form.AAB301" placeholder="请选择" readonly></div>
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
                        <div class="InfoText"><input @click="openStartPicker" type="text" v-model="form.start" placeholder="请选择" readonly></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 按钮 -->
        <footer class="Footer">
            <div class="SubmitBtn" @click="submit" :class="{'active': canSubmit == true}">
                <span>确认提交</span>
            </div>
        </footer>
    </div>
</template>

<script>
import Title from '../../common/Title'
import userBaseInfo from '../../common/userBaseInfo'
import selectCity from '../../common/selectCity'
    export default {
        components: {
            'Title': Title,
            'userBaseInfo': userBaseInfo,
            'selectCity': selectCity,
        },
        data() {
            return {
                dddddd: "1111",
                form: {
                    AAB301: '', //参保地
                    name: '', //享受人姓名
                    idNo: '', //享受人身份证
                    relation: '',//绑定关系
                    start: '', //开始日期
                },
                optionList: [], //存放城市数据
                dateVal: new Date(), //默认绑定的时间
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
            // 选择参保地
            openInsuredPicker(){
                this.$refs.insuredPicker.open();
            },
            chooseInsured(val){
                this.form.AAB301 = val;
            },
            // 选择开始日期
            openStartPicker(){
                this.$refs.startPicker.open();
            },
            handleStartConfirm(val){
                let date = this.util.formatDate(val,'yyyy-MM-dd');
                this.form.start = date;
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
    .Content {
        height: 100%;
        .ReportInfo {
            height: 6rem;
            width: 7.5rem;
            padding: 0 .3rem;
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
        height: 1.31rem;
        width: 7.5rem;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 199;
        display: flex;
        justify-content: center;
        .SubmitBtn {
            height: 1.05rem;
            width: 7.1rem;
            border-radius: .05rem;
            line-height: 1.05rem;
            background: #F2F2F2;;
            font-family: PingFangSC-Regular;
            font-size: .36rem;
            color: #B4B4B4;
            letter-spacing: 0;
            text-align: center;
        }
        .active{
            background: #1492FF;
            color: #FFFFFF;
        }
    }
}
</style>

<style>
.familyAid .el-input__prefix,
.el-input__suffix {
    display: none;
}
.familyAid .el-input__inner {
    border: none;
    text-align: right;
    padding-right: 0;
    padding-left: 0;
}
</style>