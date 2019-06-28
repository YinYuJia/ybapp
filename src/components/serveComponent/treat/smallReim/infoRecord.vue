<template>
    <div class="infoRecord">
        <!-- 标题 -->
        <Title :title="'零星报销'" :backRouter="'/invoiceInfo'"></Title>
        <!-- 填写进度 -->
        <WorkProgress :currentStep="3" :progress="progress"></WorkProgress>
        <!-- 银行信息 -->
        <div class="Content">
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>银行账号：</span></div>
                    <div class="InfoText"><input type="tel" maxlength="23" v-model="form.AAE010" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>开户行：</span></div>
                    <div class="InfoText"><input type="text" v-model="form.AAE008" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>开户名：</span></div>
                    <div class="InfoText"><input type="text" v-model="form.AAE009" placeholder="请输入" readonly></div>
                </div>
            </div>
            <!-- 提示 -->
            <div class="Hint">
                <div class="HintTitle"><i class="el-icon-warning" style="color:#05AEF0"></i>温馨提示</div>
                <div class="HintText">为保证您能正常领取报销费用，请仔细填写并核对您的收款银行账号信息。</div>
            </div>
        </div>
        <!-- 按钮 -->
        <Footer @submit="submit()" :canSubmit="canSubmit"></Footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{
                AAE010: '', //银行账户
                AAE008: '', //开户行
                AAE009: '', //开户名
                LS_DS1:[],
            },
            canSubmit: false,
            progress:[
                {step:1,name:'申请报销'},
                {step:2,name:'发票信息'},
                {step:3,name:'信息录入'},
                {step:4,name:'申报完成'}
            ],
        }
    },
    created(){
        this.form = Object.assign({}, this.$store.state.SET_SMALL_REIM_SUBMIT )
        this.epFn.setTitle('零星报销')
        console.log('submitForm',this.$store.state.SET_SMALL_REIM_SUBMIT);
        console.log("SET_SMALL_REIM_2",this.$store.state.SET_SMALL_REIM_2)
        this.getUserInfo();
        this.form.AAE009 = this.$store.state.SET_NATIVEMSG.name || "许肖军"
    },
    watch:{
        form: {
            handler: function(val) {
                // 判断不为空
                if (val.AAE010 != '' && val.AAE008 != '' && val.AAE009 != '') {
                    this.canSubmit = true;
                } else {
                    this.canSubmit = false;
                }
            },
            deep: true
        },
        'form.AAE010': function(val){
            this.$nextTick(()=>{
                if(val.length != 0){
                    this.form.AAE010 = val.replace(/\D/g,'').replace(/....(?!$)/g,'$& ');
                }
            })
        }
    },
    methods:{
        submit(){
            if(!this.canSubmit){
                this.$toast("未填写完整");
                return false;
            }else{
                let params = this.formatSubmitForm();
                console.log(params);
                this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1019/info', params).then((resData) => {
                    console.log('返回成功信息',resData)
                    //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        this.$router.push("/smallReimDetail");
                    }else if (resData.enCode == 1001 ) {
                    //   失败  1001
                        this.$toast(resData.msg);
                        return;
                    }else{
                        this.$toast('业务出错');
                        return;
                    }
                })
            }
        },
        formatSubmitForm(){
            let submitForm = JSON.parse(JSON.stringify(this.$store.state.SET_SMALL_REIM_SUBMIT));
            let submitForm1 = JSON.parse(JSON.stringify(this.$store.state.SET_SMALL_REIM_1));
            let submitForm2 = JSON.parse(JSON.stringify(this.$store.state.SET_SMALL_REIM_2));
            console.log(this.$store.state.SET_SMALL_REIM_SUBMIT,'this.$store.state.SET_SMALL_REIM_SUBMIT');
            console.log(this.$store.state.SET_SMALL_REIM_1,'this.$store.state.SET_SMALL_REIM_1');
            console.log(this.$store.state.SET_SMALL_REIM_2,'this.$store.state.SET_SMALL_REIM_2');
            
            submitForm.AAE010 = this.form.AAE010.replace(/\s+/g,'');
            submitForm.AAE008 = this.form.AAE008;
            submitForm.AAE009 = this.form.AAE009;
           
            
            // submitForm.LS_DS2 = [] 
            // 有电子发票
            if(this.$store.state.IS_INVOICE){
                submitForm.photoIdList = JSON.parse(JSON.stringify(this.$store.state.SET_SMALL_REIM_2.invoicesImg));
                submitForm.photoIdList = submitForm.photoIdList.join(',')
                console.log('submitForm.photoIdList',submitForm.photoIdList);
                
                submitForm.LS_DS1 = JSON.parse(JSON.stringify(this.$store.state.SET_SMALL_REIM_2.eleInvoices))
                for(let i=0;i<submitForm.LS_DS1.length;i++){
                    if(!submitForm.LS_DS1[i].selected){
                        submitForm.LS_DS1.splice(i,1)
                        i--
                        // delete submitForm.LS_DS1[i]
                    }
                }
            }else{

                // eleInvoices: [], //电子发票信息
                //   invoicesImg: [], //附件信息信息  图片id
                // 手动添加发票
                console.log('SET_SMALL_REIM_2',this.$store.state.SET_SMALL_REIM_2);
                
                submitForm.LS_DS1 = []
                // let invoiceList = []
                let eleInvoicesArr = []
                let eleInvoices = JSON.parse(JSON.stringify(this.$store.state.SET_SMALL_REIM_2.eleInvoices));
                for(let i=0;i<eleInvoices.length;i++){
                    eleInvoicesArr.push(eleInvoices[i].photoId)
                }
                eleInvoicesArr = eleInvoicesArr.join(',')
                let invoicesImgArr = JSON.parse(JSON.stringify(this.$store.state.SET_SMALL_REIM_2.invoicesImg));
                invoicesImgArr = invoicesImgArr.join(',')
                submitForm.photoIdList = eleInvoicesArr + ',' + invoicesImgArr
            }
            // this.$store.dispatch('SET_SMALL_REIM_SUBMIT', submitForm);
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                
                this.$toast("未获取到人员基本信息");
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'1019');
            return params;
        },
        getUserInfo(){
            let submitForm = {}
            // 加入电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                this.$toast("未获取到人员基本信息");
            }
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'2002');
             this.$axios.post(this.epFn.ApiUrl() + '/h5/jy2002/getRecord', params).then((resData) => {
                //   成功   1000
                if ( resData.enCode == 1000 ) {
                     this.form.AAE010 = resData.AAE010 //银行账户
                     this.form.AAE008 = resData.AAE008  //开户行
                    //  this.form.AAE009 = resData.AAE009   //开户名
                }else if (resData.enCode == 1001 ) {
                //   失败  1001
                    this.$toast(resData.msg);
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
.infoRecord{
    .Content {
        height: 100%;
        margin-bottom: 1.4rem;
        .ReportInfo {
            height: 3.6rem;
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
                        width: 4.5rem;
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