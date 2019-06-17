<template>
    <div class="specialDrug">
        <Title :title="'特治特药备案'" :backRouter="'/'"></Title>
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
                        <input @click="openInsuredPicker" type="text" v-model="form.AAB301" placeholder="请选择" readonly>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>就诊机构</span></div>
                    <div class="InfoText">
                        <el-select v-model="form.AKB020" placeholder="请选择">
                            <el-option v-for="item in hospitalList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>项目类型</span></div>
                    <div class="InfoText">
                        <el-select v-model="form.BKE253" placeholder="请选择">
                            <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>特治特药类型</span></div>
                    <div class="InfoText">
                        <el-select v-model="form.BKE228" placeholder="请选择">
                            <el-option v-for="item in drugList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>疾病名称</span></div>
                    <div class="InfoText">
                        <input type="text" v-model="form.AKA121" placeholder="请选择">
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>用药时期</span></div>
                    <div class="InfoText">
                        <el-select v-model="form.BKE248" placeholder="请选择">
                            <el-option v-for="item in drugTimeList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>项目名称</span></div>
                    <div class="InfoText">
                        <input type="text" v-model="form.AKE002" placeholder="请选择">
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>剂量</span></div>
                    <div class="InfoText">
                        <input type="number" v-model="form.AAE030" placeholder="请选择">
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>单位</span></div>
                    <div class="InfoText">
                        <input type="text" v-model="form.AKA071" placeholder="请选择" readonly>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>数量</span></div>
                    <div class="InfoText">
                        <input type="number" v-model="form.AKC226" placeholder="请选择">
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>备案剂量</span></div>
                    <div class="InfoText">
                        <input type="text" v-model="form.BKE249" placeholder="请选择" readonly>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>自理比例</span></div>
                    <div class="InfoText">
                        <input type="text" v-model="form.AKA069" placeholder="请选择" readonly>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>累计备案剂量</span></div>
                    <div class="InfoText">
                        <input type="text" v-model="form.BKE250" placeholder="请选择" readonly>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>剩余备案剂量</span></div>
                    <div class="InfoText">
                        <input type="text" v-model="form.BKE251" placeholder="请选择" readonly>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>实际使用量</span></div>
                    <div class="InfoText">
                        <input type="text" v-model="form.BKE252" placeholder="请选择" readonly>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>备案天数</span></div>
                    <div class="InfoText">
                        <input type="text" v-model="form.AKB063" placeholder="请选择" readonly>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>开始日期</span></div>
                    <div class="InfoText">
                        <input @click="openStartPicker" type="text" v-model="form.AAE030" placeholder="请选择" readonly>
                    </div>
                </div>
            </div>
        </div>
        <!-- 按钮 -->
        <Footer :canSubmit='canSubmit' @submit="submit()"></Footer>
    </div>
</template>

<script>
import Title from '../../common/Title'
import userBaseInfo from '../../common/userBaseInfo'
import selectCity from '../../common/selectCity'
import Footer from '../../common/Footer'
    export default {
        components:{
        Title,userBaseInfo,selectCity,Footer
    },
        data() {
            return {
                dddddd: "1111",
                form: {
                    AAB301: '', //参保地
                    AKB020: '', //就诊机构
                    BKE253: '', //项目类型
                    BKE228: '',//特药特治类型
                    AKA120: '', //疾病编码
                    AKA121: '', //疾病名称
                    BKE248: '', //用药时期
                    AKE001: '', //项目编码
                    AKE002: '', //项目名称
                    AKA071: '', //单位剂量
                    AKC226: '', //数量
                    BKE249: '', //备案剂量
                    AKA069: '', //自理比例
                    BKE250: '', //累计备案剂量
                    BKE251: '', //剩余备案剂量
                    BKE252: '', //实际使用量
                    AKB063: '', //备案天数
                    AAE030: '', //开始日期
                },
                dateVal: new Date(), //默认绑定的时间
                canSubmit: false,
                hospitalList: [
                    {value: '医院1',label: '医院1'},
                    {value: '医院2',label: '医院2'}
                ],
                typeList: [
                    {value: '类型1',label: '类型1'},
                    {value: '类型2',label: '类型2'}
                ],
                drugList: [
                    {value: '类型1',label: '类型1'},
                    {value: '类型2',label: '类型2'}
                ],
                drugTimeList: [
                    {value: '时期1',label: '时期1'},
                    {value: '时期2',label: '时期2'}
                ]
            }
        },
        created() {
            // this.form = this.$store.state.SET_FAMILYAID_OPERATION;
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
                this.form.AAE030 = date;
            },
            submit() {
                this.$router.push('/');
            },
        }
    }
</script>

<style lang="less" scoped>
.specialDrug {
    .Content {
        height: 100%;
        margin-bottom: 1.4rem;
        .ReportInfo {
            height: 20.4rem;
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
}
</style>

<style>
.specialDrug .el-input__prefix,
.el-input__suffix {
    display: none;
}
.specialDrug .el-input__inner {
    border: none;
    text-align: right;
    padding-right: 0;
    padding-left: 0;
}
</style>