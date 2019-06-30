<template>
    <div class="searchPrint">
        <!-- 弹出框内容 -->
        <SelectCity 
            :type="2"
            ref="insuredPicker"
            @confirm="chooseInsured"
            >
        </SelectCity>
        <SelectCity 
            :type="1"
            ref="monthPicker"
            :propArr="options"
            @confirm="handleMonthConfirm"
            >
        </SelectCity>
        <!-- 弹出框结束 -->
        <Title :title="'打印参保证明'" :backRouter="'/'"></Title>
        <div class="Content">
            <!-- 基本信息 -->
            <UserBaseInfo></UserBaseInfo>
            <!-- 查询月数 -->
            <div class="SearchInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地</span></div>
                    <div class="InfoText">
                         <div class="InfoText"><input type="text" v-model="AAB301000" placeholder="请选择" readonly></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>查询月数：</span></div>
                    <div class="InfoText">
                        <input @click="openMonthPicker()" type="text" v-model="AAE011VALUE" placeholder="请选择" readonly>
                    </div>
                </div>
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
            AAB301000:"",
            form:{
                AAS301:'', //参保地
                AAB301:'', //参保地
                AAQ301:'', //参保地
                AAE011: '24' //缴费月数
            },
            canbao:"",
            AAE011VALUE: '24',
            options:[
                {value: '12', label: '12'},
                {value: '24', label: '24'},
                {value: '36', label: '36'},
                // {value: '48', label: '48'},
            ],
            canSubmit: false,
        }
    },
    watch:{
        form:{
            handler:function(val){
                if(val.AAB301 != '' && val.AAE011 != ''){
                    this.canSubmit = true;
                }else{
                    this.canSubmit = false;
                }
            },
            deep: true
        }
    },
    created () {
        this.epFn.setTitle('打印参保证明')
        this.form = this.$store.state.SET_SEARCH_PRINT;
        this.form.canbao = this.$store.state.SET_USER_DETAILINFO.regionName
        this.form.AAB301 = this.$store.state.SET_USER_DETAILINFO.AAB301

        let GinsengLandCode = sessionStorage.getItem("GinsengLandCode")
        let GinsengLandName = sessionStorage.getItem("GinsengLandName")

        console.log('GinsengLandCode',GinsengLandCode,'GinsengLandName',GinsengLandName)
        this.AAB301000 = GinsengLandName
        console.log(this.AAB301000=="")
        this.form.AAB301 = GinsengLandCode
        this.form.AAS301 = GinsengLandCode.substring(0,2) + '0000'
        // this.form.AAC003 = this.$store.state.SET_NATIVEMSG.name
        // this.form.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
    },
    methods:{
        // 选择参保地
        openInsuredPicker(){
            this.$refs.insuredPicker.open();
        },
        chooseInsured(val){
            console.log(val);
            this.canbao = val.name;
            this.form.AAS301 = val.code[0]
            this.form.AAB301 = val.code[1]
            this.form.AAQ301 = val.code[2]
        },
        // 选择月数
        openMonthPicker(){
            this.$refs.monthPicker.open();
        },
        handleMonthConfirm(val){
            console.log(val);
            this.form.AAE011 = val.value;
            this.AAE011VALUE = val.label;
        },
        submit(){
            if(this.canSubmit == false){
                this.$toast('信息未填写完整');
                return false;
            }else{
                let submitForm = JSON.parse(JSON.stringify(this.form)); //深拷贝
                // 加入用户名和电子社保卡号
                if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                    submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                    submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
                }else {
                    // 
                    this.$toast("未获取到人员基本信息");
                }
                // 暂时删除参保地
                // delete submitForm.AAB301
                
                const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'1011');
                console.log('submitForm--------------',params)
                this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1011/QueryInsurance', params)
                    .then((resData) => {
                        console.log(resData);

                        sessionStorage.setItem("searchPrintData",JSON.stringify(resData))
                        
                        if(resData.enCode==1000){
                            
                            this.$router.push('/insuredDownload');
                        }else if(resData.enCode==1001){
                            thsi.$toast(resData.meg)
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        },
    }
}
</script>

<style lang="less" scoped>
.searchPrint{
    .Content{
        height: 100%;
        margin-bottom: 1.4rem;
        .SearchInfo{
            height:2.4rem;
            width: 7.5rem;
            background: white;
            padding: 0 .3rem;
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
                        // input {
                        //     width: 4rem;
                        //     height: .6rem;
                        //     opacity: 0.85;
                        //     font-family: PingFangSC-Regular;
                        //     font-size: .3rem;
                        //     color: #000000;
                        //     letter-spacing: 0;
                        //     text-align: right;
                        //     border: none;
                        //     background: #ffffff;
                        // }
                        input {
                        height: .6rem;
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
.searchPrint .el-select .el-input__inner{
    padding-right: 0;
    text-align: right;
    border: none;
}
.searchPrint .el-select .el-input__suffix .el-input__suffix-inner{
    display: none;
}
</style>