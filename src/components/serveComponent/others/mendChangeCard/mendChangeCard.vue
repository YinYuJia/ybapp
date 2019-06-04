<template>
    <div class="mendChangeCard">
        <div class="Title">
            <el-row>
                <el-col :span="6">
                    <span class="el-icon-arrow-left" style="color: #ffffff;font-size: .38rem;margin-left: -50px;" @click="backIndex()"></span>
                </el-col>
                <el-col :span="12">
                    <div class="NameTitle">
                        社保卡补换
                    </div>
                </el-col>
                <el-col :span="6">
                    <span class="el-icon-bell" style="color: #ffffff;font-size: .50rem;margin-right: -.4rem;margin-top:.35rem"></span>
                </el-col>
            </el-row>
        </div>
        <div class="Content">
            <!-- 用户信息 -->
            <userBaseInfo></userBaseInfo>
            <!-- 领取信息 -->
            <div class="GetInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>补换原因：</span></div>
                    <div class="InfoText">
                        <el-select v-model="getInfo.getType" placeholder="请选择">
                            <el-option
                            v-for="item in getTypes"
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
                        <el-select v-model="getInfo.getWay" placeholder="请选择">
                            <el-option
                            v-for="item in getWays"
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
                    <div class="InfoText"><input type="text" v-model="form.name" placeholder="请输入收件人姓名"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>联系电话：</span></div>
                    <div class="InfoText"><input type="text" v-model="form.phone" placeholder="请输入联系人电话号码"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>所在地区：</span></div>
                    <div class="InfoText">
                        <el-cascader
                            :options="optionList"
                            v-model="form.address1">
                        </el-cascader>
                        <i class="el-icon-arrow-right" style="font-size:0.4rem; margin-left:0.23rem"></i>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>详细地址：</span></div>
                    <div class="InfoText"><textarea v-model="form.address2"></textarea></div>
                </div>
            </div>
            <!-- 提示 -->
            <div class="Hint" v-if="showMail">
                <div class="HintTitle"><i class="el-icon-warning" style="color:#05AEF0"></i>温馨提示</div>
                <div class="HintText">为保证您的正常领取，请务必填写正确、完整的邮递信息。具体送达时间以实际邮递情况为准。</div>
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
    components:{
        'userBaseInfo': userBaseInfo
    },
    data(){
        return{
            form:{
                AAE011: '', //收件人
                AAE005: '', //联系电话
                address1: [],
                address2: ''
            },
            canSubmit: false,
            optionList: [], //所有地区
            getTypes: [
                {value: 'change',label: '变更'},
                {value: 'reapply',label: '补办'}
            ], 
            getWays: [
                {value: 'self',label: '自取'},
                {value: 'mail',label: '邮寄'}
            ], 
            getInfo:{
                getType: '', //领取类型
                getWay: '' //领取方式
            },
            showMail: false,
        };
    },
    watch:{
        // 监听领取信息
        getInfo:{
            handler:function(val){
                if(val.getType != '' && val.getWay == 'self'){
                    this.canSubmit = true;
                    this.showMail = false;
                }else if(val.getType != '' && val.getWay == 'mail'){
                    this.canSubmit = false;
                    this.showMail = true;
                }else if(val.getType == '' && val.getWay == 'self'){
                    this.showMail = false;
                }else if(val.getType == '' && val.getWay == 'mail'){
                    this.showMail = true;
                }else{
                    this.canSubmit = false;
                    this.showMail = false;
                }
            },
            deep: true
        },
        // 监听邮递信息
        form:{
            handler:function(val){
                if(val.name != '' && val.phone != '' && val.address1 != undefined && val.address2 != ''){
                    this.canSubmit = true;
                }else{
                    this.canSubmit = false;
                }
            },
            deep: true
        },
    },
    created(){
        this.form = this.$store.state.SET_INSURED_PROOF;
        this.$store.dispatch('SET_SELECTARRAY', this.epFn.ChinaJsonDatas());
        this.optionList = this.$store.state.SET_SELECTARRAY;
    },
    methods:{
        backIndex(){
            this.$router.push('/');
        },
        submit(){
            if(this.canSubmit == false){
                this.$toast('信息未填写完整');
                return false;
            }else{
                this.$store.dispatch('SET_INSURED_PROOF', this.form);
                this.$router.push("/getDetail");
            }
        },
    }
}
</script>

<style lang="less" scoped>
.mendChangeCard{
    .Title {
        height: 1.2rem;
        background-color: #05AEF0;
        font-size: .36rem;
        line-height: 1.2rem;
        overflow: hidden;
        .NameTitle{
            color: white;
        }
    }
    .Content{
        height: 100%;
        .GetInfo{
            height: 2.4rem;
            width: 7.5rem;
            padding: 0 .3rem;
            margin-top: .67rem;
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
    .Footer{
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
        .Btn{
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
        .active{
            background-image: linear-gradient(-90deg, #35B8FD 0%, #4E8DFF 100%);
        }
    }
}
</style>

<style>
.mendChangeCard .el-cascader .el-input__inner{
    padding-right: 0;
    text-align: right;
    border: none;
}
.mendChangeCard .el-cascader .el-input__suffix{
    display: none;
}
.mendChangeCard .el-cascader .el-cascader__label{
    text-align: right;
    padding-right: 0;
}
.mendChangeCard .el-select .el-input__inner{
    padding-right: 0;
    text-align: right;
    border: none;
}
.mendChangeCard .el-select .el-input__suffix .el-input__suffix-inner{
    display: none;
}
</style>