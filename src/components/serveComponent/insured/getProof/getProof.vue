<template>
    <div class="getProof">
        <selectCity 
            :type="3"
            ref="insuredPicker"
            @confirm="chooseInsured"
            >
        </selectCity>
        <Title :title="'领取就医凭证'" :backRouter="'/'"></Title>
        <div class="Content">
            <!-- 用户信息 -->
            <userBaseInfo></userBaseInfo>
            <!-- 领取信息 -->
            <div class="GetInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>类型：</span></div>
                    <div class="InfoText">
                        <el-select v-model="form.AAC050" placeholder="请选择类型">
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
                        <el-select v-model="form.BKA077" placeholder="请选择领取方式">
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
                    <div class="InfoText"><input type="text" v-model="form.AAE011" placeholder="请输入收件人姓名"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>联系电话：</span></div>
                    <div class="InfoText"><input type="text" v-model="form.AAE005" placeholder="请输入联系人电话号码"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>详细地址：</span></div>
                    <div class="InfoText"><input @click="openInsuredPicker" type="text" v-model="address" placeholder="请选择地址" readonly></div>
                </div>
                <div class="InfoLine InfoLineAdress" style="" >
                    <!-- <div class="InfoName"><span></span></div> -->
                    <textarea v-model="form.AAE006"></textarea>
                    <!-- <div class="InfoText"></div> -->
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
    components:{
        'Title': Title,
        'userBaseInfo': userBaseInfo,
        'selectCity': selectCity,
    },
    data(){
        return{
            form:{
                'AAE011': '', //收件人
                'AAE005': '', //联系电话
                'AAE006': '', //地址
                'AAC050':'', //变更类型
                'BKA077' :'' ,//领取方式
            },
            address:"",
            canSubmit: false,
            optionList: [], //所有地区
            AAC050s: [
                {value: '1',label: '变更'},
                {value: '2',label: '补办'}
            ], 
            BKA077s: [
                {value: '0',label: '自取'},
                {value: '1',label: '邮寄'}
            ],
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
                    if ( val.AAE011 != '' && val.AAE005 != '' && val.AAE006 != '' && this.address!='' && val.AAC050 != '' && val.BKA077 != '') {
                        this.canSubmit = true
                    }else {
                        this.canSubmit = false
                    }
                }
            },
            deep: true
        },
        address(){
            // 如果需要邮寄

            if(this.showMail == true){
                if ( this.form.AAE011 != '' && this.form.AAE005 != '' && this.form.AAE006 != '' && this.address!='' && this.form.AAC050 != '' && this.form.BKA077 != '') {
                    this.canSubmit = true
                }else {
                    this.canSubmit = false
                }
            }
        }
    },
    created(){
        this.form = this.$store.state.SET_INSURED_PROOF;
        if(!this.form.AAE011){
            this.form.AAE011=this.$store.state.SET_NATIVEMSG.name
        }
        console.log('原生参数-----',this.$store.state.SET_NATIVEMSG)
    },
    methods:{
        submit(){
            if(this.canSubmit == false){
                this.$toast('信息未填写完整');
                return false;
            }else{
                let params = this.formatSubmitData();
                console.log(params,'1111111111111');
                this.$store.dispatch('SET_INSURED_PROOF',params.submitForm);
                console.log(this.$store.state.SET_INSURED_PROOF,"请求接口");
                this.$router.push('/getDetail');
                // console.log('parmas------',this.epFn.ApiUrl1())
                this.$axios.post( this.epFn.ApiUrl1() +  '/h5/jy1008/transactionVoucher', params.params)
                .then((resData) => {
                    console.log('返回成功信息',resData)
                    if(resData.enCode == '1000'){
                        this.$store.dispatch('SET_INSURED_PROOF',params.submitForm);
                        this.$router.push('/getDetail');
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
        chooseInsured(val){
            this.address = val
        },
        openInsuredPicker(){
            this.$refs.insuredPicker.open();
        },
        // 提交信息封装
        formatSubmitData(){
            let submitForm = Object.assign({}, this.form)
            // let submitForm = JSON.parse(JSON.stringify(this.form)); //深拷贝
            // 拼接地址
            submitForm.AAE006 = this.address + submitForm.AAE006
            console.log(this.form,'this.form');
            console.log(submitForm,'submitForm');
            
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                submitForm.AAC003 = '鲁伟兴';
                submitForm.AAE135 = "330622197407215513";
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'1008');
            return {params,submitForm};
        }
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
            .InfoLineAdress{
                border:1px solid #ccc;
                width:100%;
                margin-top:-1px;
                textarea{
                    width: 100%;
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
            .InfoLineAdress{
                border:1px solid #ccc;
                border-bottom:1px solid #ccc!important;
                width:100%;
                margin-top:-1px;
                textarea{
                    width: 100%;
                    text-align: left !important;
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