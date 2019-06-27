<template>
    <div class="getProof">
        <!-- 标题 -->
        <Title :title="'领取就医凭证'" :backRouter="'/'"></Title>
        <!-- MintUI弹出区域 -->
        <SelectCity 
            :type="3"
            ref="cityPicker"
            @confirm="chooseCity"
            >
        </SelectCity>
        <SelectCity 
            :type="1"
            ref="typePicker"
            :propArr="AAC050s"
            @confirm="handleTypeConfirm"
            >
        </SelectCity>
        <SelectCity 
            :type="1"
            ref="wayPicker"
            :propArr="BKA077s"
            @confirm="handleWayConfirm"
            >
        </SelectCity>
        <!-- 弹出区域结束 -->
        <div class="Content">
            <!-- 用户信息 -->
            <UserBaseInfo></UserBaseInfo>
            <!-- 列表信息 -->
            <div class="GetInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>类型：</span></div>
                    <div class="InfoText"><input @click="openTypePicker()" type="text" v-model="AAC050VALUE" placeholder="请选择" readonly></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>领取方式：</span></div>
                    <div class="InfoText"><input @click="openWayPicker()" type="text" v-model="BKA077VALUE" placeholder="请选择" readonly></div>
                </div>
            </div>
            <!-- 邮递信息 -->
            <div class="MailInfo" v-if="showMail">
                <div class="InfoLine">
                    <div class="InfoName"><span>收件人：</span></div>
                    <div class="InfoText"><input type="text" v-model="form.AAE011" placeholder="请输入收件人姓名"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>联系方式：</span></div>
                    <div class="InfoText"><input type="tel" maxlength="11" v-model="form.AAE005" placeholder="请输入"></div>
                </div>
                <!-- <div class="InfoLine">
                    <div class="InfoName"><span>省市信息</span></div>
                    <div class="InfoText">
                         <div class="InfoText"><input @click="openCityPicker" type="text" v-model="form.AAE011" placeholder="请选择" readonly></div>
                    </div>
                </div> -->
                <div class="InfoLine">
                    <div class="InfoName"><span>详细地址</span></div>
                    <div class="InfoText">
                        <textarea v-model="form.AAE006" placeholder="请输入"></textarea>
                    </div>
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
export default {
    data(){
        return{
            form:{
                AAE011: '', //收件人
                AAE005: '', //手机号码
                // AAE011: '', //省市信息
                AAE006: '', //详细地址
                AAC050:'', //变更类型
                BKA077 :'0' ,//领取方式
            },
            AAC050VALUE: '',
            BKA077VALUE: '自取',
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
        // 获取位置
        // let This = this 
        // if(this.$isSdk){
        //     dd.ready({
        //         developer: 'daip@dtdream.com',
        //         usage: [
        //             'dd.device.location.get',
        //         ],
        //         remark: '描述业务场景'
        //         }, function() {
        //         dd.device.location.get ({
        //             onSuccess: function(data) {
        //                 console.log(data,1111)
        //             },
        //             onFail: function(error) {
        //                 This.$toast(error)
        //                 console.log(error,22222)
        //             }
        //         })
        //     })
        // }
        this.getMailInfo(); //自动获取邮寄信息
        this.epFn.setTitle('领取就医凭证');
        // 原生参数添加姓名等信息
        // if(!this.form.AAE011){
            // this.form.AAE011=this.$store.state.SET_NATIVEMSG.name
        // }
        console.log('原生参数-----',this.$store.state.SET_NATIVEMSG)
    },
    methods:{
        // 选择申请地市
        openCityPicker(){
            this.$refs.cityPicker.open();
        },
        // 取消三级联动
        chooseCity(val){
        //     this.form.AAE011 = val;
        //     console.log(val);
        },
        // 选择变更类型
        openTypePicker(){
            this.$refs.typePicker.open();
        },
        handleTypeConfirm(val){
            console.log(val);
            this.form.AAC050 = val.value;
            this.AAC050VALUE = val.label;
        },
        // 选择领取方式
        openWayPicker(){
            this.$refs.wayPicker.open();
        },
        handleWayConfirm(val){
            console.log(val);
            this.form.BKA077 = val.value;
            this.BKA077VALUE = val.label;
        },
        submit(){
            // if(this.showMail == true){
            //     if(!this.util.checkPhone(this.form.AAE005)){
            //         this.$toast('请填写正确的手机号码');
            //         return false;
            //     }
            // }
            if(this.form.AAE005){
                if(!this.util.checkPhone(this.form.AAE005)){
                    this.$toast('请填写正确的手机号');
                    return false;
                }
            }
            if(this.canSubmit == false){
                this.$toast('信息未填写完整');
                return false;
            }else{
                let params = this.formatSubmitData();
                this.$axios.post( this.epFn.ApiUrl() +  '/h5/jy1008/transactionVoucher', params.params)
                .then((resData) => {

                    if(resData.enCode == '1000'){
                        this.$store.dispatch('SET_INSURED_PROOF',params.submitForm);
                        this.$router.push('/getDetail');
                    }else{
                        this.$toast(resData.msg)
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
        openInsuredPicker(){
            this.$refs.insuredPicker.open();
        },
        // 提交信息封装
        formatSubmitData(){
            let submitForm = Object.assign({}, this.form)
            // let submitForm = JSON.parse(JSON.stringify(this.form)); //深拷贝
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                submitForm.AAC003 = "许肖军";
                submitForm.AAE135 = "332625197501010910";
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'1008');
            return {params,submitForm};
        },
        // 获取邮寄信息
        getMailInfo(){
            let submitForm = {}
            // 加入电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                submitForm.AAE135 = "332625197501010910";
            }
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'2002');
            this.$axios.post(this.epFn.ApiUrl() + '/h5/jy2002/getRecord', params).then((resData) => {
                //   成功   1000
                if ( resData.enCode == 1000 ) {
                     this.form.AAE011 = resData.AAE009 //收件人
                     this.form.AAE005 = resData.AAE005  //手机号码
                     this.form.AAE006 = resData.AAE006   //详细地址
                }else if (resData.enCode == 1001 ) {
                //   失败  1001
                    // this.$toast(resData.msg);
                    return;
                }else{
                    this.$toast('业务出错');
                    return;
                }
            })
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
            width: 7.5rem;
            padding: 0 .3rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                position: relative;
                font-size: .28rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName{
                    color: #000000;
                    line-height: 1.2rem;
                    letter-spacing: 0;
                }
                .InfoText {
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    input {
                        width: 4rem;
                        height: .6rem;
                        font-size: .28rem;
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
        .MailInfo{
            width: 7.5rem;
            padding: 0 .28rem;
            margin-top: .27rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                position: relative;
                font-size: .28rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName{
                    line-height: 1.2rem;
                    span{
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText {
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    input {
                        width: 4rem;
                        height: .6rem;
                        font-size: .28rem;
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