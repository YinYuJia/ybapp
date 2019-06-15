<template>
    <div class="smallReim">
        <Title :title="'零星报销'" :backRouter="'/'"></Title>
        <!-- MintUI弹出框区域 -->
        <selectCity 
            :type="2"
            ref="insuredPicker"
            @confirm="chooseInsured"
            >
        </selectCity>
        <!-- 弹出框区域结束 -->
        <div class="Content">
            <!-- 填写进度 -->
            <WorkProgress :currentStep="1" :progress="progress"></WorkProgress>
            <!-- 基本信息 -->
            <userBaseInfo style="background:white"></userBaseInfo>
            
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>就诊医院：</span></div>
                    <div class="InfoText"><input type="number" v-model="form.ACK264" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>就诊类型：</span></div>
                    <div class="InfoText"><input type="number" v-model="form.ACK264" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>就诊日期：</span></div>
                    <div class="InfoText"><input type="number" v-model="form.ACK264" placeholder="请输入"></div>
                </div>
                <!-- <div class="InfoLine">
                    <div class="InfoName"><span>发票附件上传：</span></div>
                    <div class="UploadPhoto">
                        <div class="SelectPhoto" @click="chooseImg()">+</div>
                    </div>
                    <form id="img-form">
                        <input @change="uploadImg()" style="display:none" id="img-file" name="file" type="file" accept="image/*">
                    </form>
                </div> -->
            </div>
        </div>
        <!-- 按钮 -->
        <Footer :canSubmit='canSubmit' @submit="submit()"></Footer>
    </div>
</template>

<script>
import Title from '../../common/Title'
import WorkProgress from '../../common/WorkProgress'
import userBaseInfo from '../../common/userBaseInfo'
import selectCity from '../../common/selectCity'
import Footer from '../../common/Footer'
export default {
    components: {
        Title,WorkProgress,userBaseInfo,selectCity,Footer
    },
    data() {
        return {
            // 提交信息
            form: {
                AAB301: '', //参保地
                ACK264: '', //发票费用总额
                number: '', //发票张数
                AAE008: '', //收款开户行
                AAE009: '', //收款开户名
                AAE010: '', //收款银行账号
            },
            canSubmit: false,
            progress:[
                {step:1,name:'申请报销'},
                {step:2,name:'发票信息'},
                {step:3,name:'信息录入'},
                {step:4,name:'申报完成'}
            ]
        }
    },
    created() {
        this.form = this.$store.state.SET_ELSEWHERE_OPERATION;
        this.$store.dispatch('SET_SELECTARRAY', this.epFn.ChinaJsonDatas());
        this.optionList = this.$store.state.SET_SELECTARRAY;
        console.log('11111---publicHeader---', this.$store.state.SET_NATIVEMSG.PublicHeader)
        this.form.AAC003 = this.$store.state.SET_NATIVEMSG.name
        this.form.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
    },
    watch: {
        form: {
            handler: function(val) {
                // 判断不为空
                if (val.AAB301 != '' && val.ACK264 != '' && val.number != '' && val.AAE008 != '' && val.AAE009 != '' && val.AAE010 != '') {
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
        // 选择照片
        chooseImg(){
            document.getElementById('img-file').click();
        },
        // 自动上传
        uploadImg: function(){
            var data = document.getElementById("img-form");
            var imgInput = document.getElementById("img-file");
            if(imgInput.value == '' || imgInput.value == null){
                return false;
            }
            var formData = new FormData(data);
            console.log(data);
            // 上传的函数
            // axios.post('/apis/mdse/uploadPhoto/'+this.barCode,formData)
            //     .then((res)=>{
            //     }).catch((err) => {
            //         this.$toast("上传失败，请联系管理员","warning",2000);
            //     });
        },
        // 提交
        submit() {
            if (this.canSubmit == false) {
                this.$toast('信息未填写完整');
                return false;
            } else {
                this.$store.dispatch('SET_ELSEWHERE_OPERATION', this.form);

                // 封装数据
                let params = this.formatSubmitData();
                // 开始请求
                console.log('parmas------',params)
                this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1012/addRecord', params).then((resData) => {
                    console.log('返回成功信息',resData);
                }).catch((error) => {
                    console.log(error)
                })
                
            }
        },
        formatSubmitData(){
            let submitForm = JSON.parse(JSON.stringify(this.form)); //深拷贝
            // 日期传换成Number
            submitForm.AAE030 = this.util.DateToNumber(submitForm.AAE030);
            submitForm.AAE031 = this.util.DateToNumber(submitForm.AAE031);
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                submitForm.AAC003 = '殷宇佳';
                submitForm.AAE135 = "113344223344536624";
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,1012);
            return params;
        }
    }
}
</script>

<style lang="less" scoped>
.smallReim {
    .Content {
        height: 100%;
        margin-bottom: 1.4rem;
        .ReportInfo {
            height: 3.6rem;
            width: 7.5rem;
            padding: 0 .3rem;
            margin: .15rem 0 1.4rem 0;
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
                        width: 4rem;
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
                // &:last-child {
                //     border-bottom: none;
                //     display: block;
                //     text-align: left;
                //     .UploadPhoto{
                //         display: flex;
                //         .SelectPhoto{
                //             height: 1.4rem;
                //             width: 1.4rem;
                //             background: #EFEFEF;
                //             margin-right: .3rem;
                //             font-size: .6rem;
                //             text-align: center;
                //             line-height: 1.4rem;
                //             color: #999;
                //         }
                //     }
                // }
            }
        }
    }
}
</style>

<style>
    .elseWhere .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 160px;
    }
    .elseWhere .el-input__prefix,
    .el-input__suffix {
        display: none;
    }
    .elseWhere .el-input__inner {
        border: none;
        text-align: right;
        padding-right: 0;
        padding-left: 0;
    }
    .elseWhere .el-cascader .el-input .el-input__inner {
        width: 4.5rem;
    }
    .elseWhere .el-cascader .el-cascader__label {
        text-align: right;
        padding: 0;
    }
</style>