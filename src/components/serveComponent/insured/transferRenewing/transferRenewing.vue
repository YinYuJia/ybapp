<template>
    <div class="insuredChange">
        <Title :title="'医保转移接续'" :backRouter="'/'"></Title>
        <!-- MintUI弹出框区域 -->
        <selectCity 
            :type="2"
            ref="inCityPicker"
            @confirm="chooseInCity"
            >
        </selectCity>
        <selectCity 
            :type="2"
            ref="outCityPicker"
            @confirm="chooseOutCity"
            >
        </selectCity>
        <!-- 弹出框区域结束 -->
        <div class="Content">
            <!-- 基本信息 -->
            <userBaseInfo></userBaseInfo>
            <!-- 变更信息 -->
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>转出地</span></div>
                    <div class="InfoText">
                         <div class="InfoText"><input @click="openOutCityPicker" type="text" v-model="form.AAA027" placeholder="请选择" readonly></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>转入地</span></div>
                    <div class="InfoText">
                         <div class="InfoText"><input @click="openInCityPicker" type="text" v-model="form.AAB301" placeholder="请选择" readonly></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>手机号码</span></div>
                    <div class="InfoText"><input type="text" v-model="form.phone" placeholder="请输入联系电话"></div>
                </div>
            </div>
            <!-- 提示 -->
            <div class="Hint">
                <div class="HintTitle"><i class="el-icon-warning" style="color:#05AEF0"></i>温馨提示</div>
                <div class="HintText">手机号码将用于您事项办结后的消息通知，请您准确填写。</div>
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
    data(){
        return{
            form:{
                AAA027: '', //转出地
                AAB301: '', //转入地
                phone: '' //手机号码
            },
            canSubmit: false,
        }
    },
    methods:{
        // 选择转出地
        openOutCityPicker(){
            this.$refs.inCityPicker.open();
        },
        chooseInCity(val){
            this.form.AAA027 = val;
        },
        // 选择转入地
        openInCityPicker(){
            this.$refs.outCityPicker.open();
        },
        chooseOutCity(val){
            this.form.AAB301 = val;
        },
        submit(){
            this.$router.push('/transferDetail')
        }
    }
}
</script>

<style lang="less" scoped>
.insuredChange{
    .Content{
        height: 100%;
        margin-bottom: 1.4rem;
        .ReportInfo{
            height: 3.6rem;
            width: 7.5rem;
            padding: 0 .3rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .3rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName{
                    opacity: 0.85;
                    line-height: 1.2rem;
                    span{
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText{
                    opacity: 0.85;
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    input{
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
                &:last-child{
                    border-bottom: none;
                }
            }
        }
        .Hint{
            margin-top: .45rem;
            padding: 0 .3rem;
            opacity: 0.45;
            font-family: PingFangSC-Regular;
            font-size: .24rem;
            color: #000000;
            text-align: left;
            .HintTitle{
                i{
                    margin-right: .2rem;
                    letter-spacing: 0;
                }
            }
            .HintText{
                margin-top: .28rem;
                letter-spacing: 0;
            }
        }
    }
}
</style>
