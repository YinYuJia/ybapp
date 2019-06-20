<template>
    <div class="payLimit">
        <!-- 标题 -->
        <Title :title="'缴费年限核定'" :backRouter="'/'"></Title>
        <div class="Content">
            <!-- 基本信息 -->
            <userBaseInfo></userBaseInfo>
            <!-- 列表信息 -->
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>视作缴费年限</span></div>
                    <div class="InfoText"><input type="tel" v-model="form.AKC412" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>缴费月数</span></div>
                    <div class="InfoText"><input type="tel" v-model="form.BAC213" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>退休工资</span></div>
                    <div class="InfoText"><input type="tel" v-model="form.AAE041" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>提前退休类别</span></div>
                    <div class="InfoText">
                        <el-select v-model="form.BKE810" placeholder="请选择">
                            <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
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
import Footer from '../../common/Footer'
export default {
    components:{
        Title,userBaseInfo,Footer
    },
    data() {
        return {
            // 提交信息
            form: {
                AKC412: '', //视作缴费年限
                BAC213: '', //缴费月数
                AAE041: '', //退休工资
                BKE810: '', //提前退休类别
            },
            canSubmit: false,
            types: [
                {
                    value: '0',
                    label: '否'
                },
                {
                    value: '1',
                    label: '因病'
                },
                {
                    value: '3',
                    label: '特殊工种'
                },
                {
                    value: '4',
                    label: '符合浙委办[2009]14号'
                },
                {
                    value: '5',
                    label: '其他'
                },
                {
                    value: '6',
                    label: '浙政发[2015]37号'
                }
            ],
        }
    },
    watch:{
        form:{
            handler:function(val){
                if(val.AKC412 != '' && val.BAC213 != '' && val.AAE041 != '' && val.BKE810 != ''){
                    this.canSubmit = true;
                }else{
                    this.canSubmit = false;
                }
            },
            deep: true
        }
    },
    created(){
        // this.form = this.$store.state.SET_PAYLIMIT_OPERATION;
        this.form.AAC003 = this.$store.state.SET_NATIVEMSG.name
        this.form.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
        // window.onload = function() {
        // console.log(dd)
        // dd.ready({
        //     developer: 'daip@dtdream.com',
        //     usage: [
        //     'dd.device.location.get',
        //     ],
        //     remark: '描述业务场景'
        // }, function() {
        //     dd.device.location.get ({
        //     onSuccess: function(data) {
        //         console.log("data",data)
        //     },
        //     onFail: function(error) {}
        //     })
        // });
        // }
    },
    methods:{
        submit(){
            if(this.canSubmit == false){
                this.$toast('信息未填写完整');
                return false;
            }else{
                this.$store.dispatch('SET_PAYLIMIT_OPERATION', this.form);     
                // 封装数据
                let params = this.formatSubmitData();
                // 开始请求
                console.log('parmas------',params)
                this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1025/addRecord', params).then((resData) => {
                        console.log('返回成功信息',resData)
                        //   成功   1000
                            if ( resData.enCode == 1000 ) {
                                this.$toast("提交成功");
                                this.$router.push("/payLimitDetail");
                            }else if (resData.enCode == 1001 ) {
                            //   失败  1001
                                this.$toast(resData.msg);
                                return;
                            }else{
                                this.$toast('业务出错');
                                return;
                            }
                    
                })
                // let params = this.formatSubmitData();
                // // 开始请求
                // console.log('parmas------',params)
                // this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1014/addRecord', params).then((resData) => {
                //         console.log('返回成功信息',resData)
                //         //   成功   1000
                //             if ( resData.enCode == 1000 ) {
                //                 this.$toast("提交成功");
                //                 this.$router.push("/payLimitDetail");
                //             }else if (resData.enCode == 1001 ) {
                //             //   失败  1001
                //                 this.$toast(resData.msg);
                //                 return;
                //             }else{
                //                 this.$toast('业务出错');
                //                 return;
                //             }
                    
                // })


            }
        },
        formatSubmitData(){
            let submitForm = JSON.parse(JSON.stringify(this.form)); //深拷贝
            
            submitForm.AKC412 =  this.form.AKC412;
            submitForm.BAC213 =  this.form.BAC213;
            submitForm.AAE041 =  this.form.AAE041;
            submitForm.BKE810 =  this.form.BKE810;
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                submitForm.AAC003 = '殷宇佳';
                submitForm.AAE135 = "113344223344536624";
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1025");
            return params;

            // submitForm.AAE091 =  "12";
            // // 加入用户名和电子社保卡号
            // if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
            //     submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
            //     submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            // }else {
            //     submitForm.AAC003 = '殷宇佳';
            //     submitForm.AAE135 = "113344223344536624";
            // }
            // // 请求参数封装
            // const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1014");
            // return params;
        }
    }
}
</script>

<style lang="less" scoped>
.payLimit {
    .Content {
        height: 100%;
        margin-bottom: 1.4rem;
        .ReportInfo {
            height: 4.8rem;
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
                &:last-child {
                    border-bottom: none;
                }
            }
        }
    }
}
</style>

<style>
    .payLimit .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 160px;
    }
    .payLimit .el-input__prefix,
    .el-input__suffix {
        display: none;
    }
    .payLimit .el-input__inner {
        border: none;
        text-align: right;
        padding-right: 0;
        padding-left: 0;
    }
</style>