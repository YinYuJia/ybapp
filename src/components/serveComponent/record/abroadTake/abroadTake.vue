<template>
    <div class="abroadTake">
        <Title :title="'带药备案'" :backRouter="'/'"></Title>
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
        <mt-datetime-picker
            type="date"
            ref="endPicker"
            v-model="dateVal"
            @confirm="handleEndConfirm">
        </mt-datetime-picker>
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
                    <div class="InfoName"><span>出境日期</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input @click="openStartPicker" type="text" v-model="form.AAE030" placeholder="请选择" readonly></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>拟回国日期</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input @click="openEndPicker" type="text" v-model="form.AAE031" placeholder="请选择" readonly></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>取药机构</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input type="text" v-model="form.AKB020" placeholder="请选择"></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>护照号码</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input type="text" v-model="form.BKE260" placeholder="请输入"></div>
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
        components: {
            Title,userBaseInfo,selectCity,Footer
        },
        data() {
            return {
                form: {
                    AAB301: '', //参保地
                    AAE030: '', //出境日期
                    AAE031: '', //拟回国日期
                    AKB020: '',//取药机构
                    BKE260: '', //护照号码
                },
                dateVal: new Date(), //默认绑定的时间
                canSubmit: false,
            }
        },
        methods: {
            // 选择参保地
            openInsuredPicker(){
                this.$refs.insuredPicker.open();
            },
            chooseInsured(val){
                this.form.AAB301 = val;
            },
            // 选择出境日期
            openStartPicker(){
                this.$refs.startPicker.open();
            },
            handleStartConfirm(val){
                let date = this.util.formatDate(val,'yyyy-MM-dd');
                this.form.AAE030 = date;
            },
            // 选择回国日期
            openEndPicker(){
                this.$refs.endPicker.open();
            },
            handleEndConfirm(val){
                let date = this.util.formatDate(val,'yyyy-MM-dd');
                this.form.AAE031 = date;
            },
            submit() {
                this.$router.push('/abroadDetail');
            },
        }
    }
</script>

<style lang="less" scoped>
.abroadTake {
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
