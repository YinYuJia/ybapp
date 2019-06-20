<template>
    <div class="getProof">
        <Title :title="'社保卡补卡换卡'" :backRouter="'/'"></Title>
        <div class="Content">
            <!-- 用户信息 -->
            <userBaseInfo></userBaseInfo>
            <!-- 领取信息 -->
            <div class="GetInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>类型：</span></div>
                    <div class="InfoText">
                        <el-select v-model="form.AAC050" placeholder="请选择">
                            <el-option
                            v-for="item in AAC050s"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <i class="el-icon-arrow-right" style="font-size:0.4rem; margin-left:0.23rem"></i>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>领取方式：</span></div>
                    <div class="InfoText">
                        <el-select v-model="form.BKA077" placeholder="请选择">
                            <el-option
                            v-for="item in BKA077s"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <i class="el-icon-arrow-right" style="font-size:0.4rem; margin-left:0.23rem"></i>
                    </div>
                </div>
            </div>
            <!-- 邮递信息 -->
            <div class="MailInfo" v-if="showMail">
                <div class="InfoLine">
                    <div class="InfoName"><span>收件人：</span></div>
                    <div class="InfoText"><input type="text" v-model="form.AAE011" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>联系电话：</span></div>
                    <div class="InfoText"><input type="tel" maxlength="11" v-model="form.AAE005" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>详细地址：</span></div>
                    <div class="InfoText"><textarea type="text" v-model="form.AAE006"></textarea></div>
                </div>
            </div>
            <!-- 提示 -->
            <div class="Hint" v-if="showMail">
                <div class="HintTitle"><i class="el-icon-warning" style="color:#05AEF0"></i>温馨提示</div>
                <div class="HintText">为保证您的正常领取，请务必填写正确、完整的邮递信息。具体送达时间以实际邮递情况为准。</div>
            </div>
        </div>
        <!-- 按钮 -->
        <Footer :canSubmit='canSubmit' @submit="submit()"></Footer>
    </div>
</template>

<script>
import Title from '../../common/Title'
import userBaseInfo from '../../common/userBaseInfo'
import Footer from '../../common/Footer'
export default {
    components:{
        Title,userBaseInfo,Footer
    },
    data(){
        return{
            form:{
                AAE011: '', //收件人
                AAE005: '', //联系电话
                AAE006: '', //地址
                AAC050: '', //变更类型
                BKA077 :'' ,//领取方式
            },
            canSubmit: false,
            optionList: [], //所有地区
            AAC050s: [
                {value: '1',label: '原因1'},
                {value: '2',label: '原因2'},
                {value: '3',label: '原因3'}
            ], 
            BKA077s: [
                {value: '0',label: '自取'},
                {value: '1',label: '邮寄'}
            ], 
            getInfo:{
                AAC050: '', //领取类型
                BKA077: '' //领取方式
            },
            showMail: false,
        };
    },
    watch:{
        // 监听领取信息
        form:{
            handler:function(val){
                if(val.AAC050 == '' && val.BKA077 == '0'){
                    this.canSubmit = false;
                    this.showMail = false;
                }else if(val.AAC050 == '' && val.BKA077 == '1'){
                    this.canSubmit = false;
                    this.showMail = true;
                }else if(val.AAC050 != '' && val.BKA077 == '0'){
                    this.canSubmit = true;
                    this.showMail = false;
                }else if(val.AAC050 != '' && val.BKA077 == '1'){
                    this.canSubmit = false;
                    this.showMail = true;
                }
                // 如果需要邮寄
                if(this.showMail == true){
                    if ( val.AAE011 != '' && val.AAE005 != '' && val.AAE006 != '' && val.AAC050 != '' && val.BKA077 != '') {
                        this.canSubmit = true
                    }else {
                        this.canSubmit = false
                    }
                }
            },
            deep: true
        },
    },
    created(){
        // this.form = this.$store.state.SET_INSURED_PROOF;
    },
    methods:{

    }
}
</script>

<style lang="less" scoped>
.getProof{
    .Content{
        height: 100%;
        margin-bottom: 1.4rem;
        .GetInfo{
            height: 2.4rem;
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
                .InfoName{
                    color: #000000;
                    opacity: 0.85;
                    line-height: 1.2rem;
                    letter-spacing: 0;
                }
                .InfoText{
                    opacity: 0.85;
                    line-height: 1.2rem;
                    display: flex;
                    align-items: center;
                }
            }
        }
        .MailInfo{
            height: 5.2rem;
            width: 7.5rem;
            padding: 0 .3rem;
            margin-top: .27rem;
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
                    height: 1.6rem;
                    border-bottom: none;
                    .InfoText{
                        display: flex;
                        align-items: center;
                    }
                    textarea{
                        height: .84rem;
                        font-size: .3rem;
                        opacity: 0.85;
                        color: #000000;
                        line-height: .42rem;
                        text-align: right;
                    }
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

<style>
.getProof .el-cascader .el-input__inner{
    padding-right: 0;
    text-align: right;
    border: none;
}
.getProof .el-cascader .el-input__suffix{
    display: none;
}
.getProof .el-cascader .el-cascader__label{
    text-align: right;
    padding-right: 0;
}
.getProof .el-select .el-input__inner{
    padding-right: 0;
    text-align: right;
    border: none;
}
.getProof .el-select .el-input__suffix .el-input__suffix-inner{
    display: none;
}
</style>