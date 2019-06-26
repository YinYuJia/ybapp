<template>
    <div class="plusInvoice">
        <!-- MintUI弹出框区域 -->
        <mt-datetime-picker
            type="date"
            ref="timePicker"
            v-model="dateVal"
            :endDate="endDate"
            @confirm="handleTimeConfirm">
        </mt-datetime-picker>
        <!-- 标题 -->
        <Title :title="'零星报销'" :backRouter="'/invoiceInfo'"></Title>
        <!-- 发票信息 -->
        <div class="Content">
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>发票号码：</span></div>
                    <div class="InfoText"><input type="text" v-model="form.BKE100" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>发票金额：</span></div>
                    <div class="InfoText"><input type="text" v-model="form.AAE036" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>发票日期：</span></div>
                    <div class="InfoText"><input @click="openTimePicker()" type="text" v-model="form.AKC264" placeholder="请输入" readonly></div>
                </div>
            </div>
            <!-- 需要补充信息 -->
            <div class="supplementInfo">
                <div class="infoName">上传图片：</div>
                <div class="photoBox">
                    <img :src="form.photoUrl" v-if="form.photoUrl" class="pic">
                    <svg-icon @click="uploadImg" icon-class="serveComponent_upload" />
                </div>
            </div>
        </div>
        <!-- 按钮 -->
        <Footer :canSubmit="canSubmit" :btnText="'添加发票'" @submit="submit()"></Footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            dateVal: new Date(), //默认绑定的时间
            endDate: new Date(), //最晚选择时间
            form:{
                BKE100: '', //发票号码
                AAE036: '', //发票金额
                AKC264: '', //发票日期,
                photoId: '',//图片id
                photoUrl:''//图片URL
            },
            canSubmit: false
        }
    },
    created(){
        this.epFn.setTitle('零星报销')
    },
    watch: {
        form: {
            handler: function(val) {
                // 判断不为空
                if (val.BKE100 != '' && val.AAE036 != '' && val.AKC264 != '') {
                    this.canSubmit = true;
                } else {
                    this.canSubmit = false;
                }
            },
            deep: true
        },
    },
    methods:{
        uploadImg(){
            let This = this
            if(this.$isSdk){
                dd.ready({
                developer: 'daip@dtdream.com',
                usage: [
                    'dd.device.notification.chooseImage',
                ],
                remark: '描述业务场景'
                }, function() {
                    console.log('ready')
                    dd.device.notification.chooseImage ({
                        onSuccess: function(data) {
                            
                            console.log(data.picPath[0],'请求图片成功');
                            if(data.result){
                                // 获取图片
                                This.form.photoUrl = data.picPath[0]
                                alert(This.form.photoUrl)
                                let submitForm = {}; 
                                 // 加入用户名和电子社保卡号
                                if (This.$store.state.SET_NATIVEMSG.name !== undefined ) {
                                    submitForm.AAC003 = This.$store.state.SET_NATIVEMSG.name;
                                    submitForm.AAE135 = This.$store.state.SET_NATIVEMSG.idCard;
                                }else {
                                    submitForm.AAC003 = '许肖军';
                                    submitForm.AAE135 = "332625197501010910";
                                }
                                // 加入子项编码
                                submitForm.AGA002 = '给付-00007-019'
                                submitForm.photoList = data.picPath[0]
                                submitForm.PTX001 = '1'
                                submitForm.BKE100 = this.form.BKE100
                                submitForm.AAE036 = this.form.AAE036
                                submitForm.AKC264 = this.form.AKC264
                                const params = This.epFn.commonRequsetData(This.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'2006');
                                // /h5/jy2006/updPhoto
                                This.$axios.post(This.epFn.ApiUrl() + '/h5/jy2006/updPhoto', params).then((resData) => {
                                    console.log('返回成功信息',resData) 
                                    //   成功   1000
                                    if ( resData.enCode == 1000 ) {
                                        This.form.photoId = resData.photoId
                                    }else if (resData.enCode == 1001 ) {
                                    //   失败  1001
                                        This.$toast(resData.msg);
                                        return;
                                    }else{
                                        This.$toast('业务出错');
                                        return;
                                    }
                                })
                            }
                        },
                        onFail: function(error) {
                            this.$toast(error)
                            console.log("请求图片失败",error);
                            
                        }
                    })
            })
            }
            
        },
        submit(){
            // if(this.canSubmit &&this.form.photoId){
            if(this.canSubmit){
                // 因为接口不对，暂留信息
                let submitForm = JSON.parse(JSON.stringify(this.form));
                let SET_SMALL_REIM_2 = this.$store.state.SET_SMALL_REIM_2
                SET_SMALL_REIM_2.eleInvoices.push(submitForm)
                this.$store.dispatch('SET_SMALL_REIM_2',SET_SMALL_REIM_2)
                this.$router.push('invoiceInfo')
                // 暂留结束
                let params = this.formatSubmitData();
                this.$axios.post(this.epFn.ApiUrl() + '/h5/jy2003/info', params).then((resData) => {
                    console.log('返回成功信息',resData) 
                    //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        // let submitForm = JSON.parse(JSON.stringify(this.form));
                        // let SET_SMALL_REIM_2 = this.$store.state.SET_SMALL_REIM_2
                        // SET_SMALL_REIM_2.eleInvoices.push(submitForm)
                        // this.$store.dispatch('SET_SMALL_REIM_2',SET_SMALL_REIM_2)
                        // this.$router.push('invoiceInfo')
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
        // 封装提交的数据
        formatSubmitData(){
            let submitForm = JSON.parse(JSON.stringify(this.form)); //深拷贝
            submitForm.AKC264 = this.util.DateToNumber(submitForm.AKC264) //改变日期格式
            submitForm.AKB020 = this.$store.state.SET_SMALL_REIM_SUBMIT.AKB020
            // 加入用户名和电子社保卡号
            // if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
            //     submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
            //     submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            // }else {
            //     submitForm.AAC003 = '许肖军';
            //     submitForm.AAE135 = "332625197501010910";
            // }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'2003');
            return params;
        },
        // 选择就诊日期
        openTimePicker(){
            this.$refs.timePicker.open();
        },
        handleTimeConfirm(val){
            let date = this.util.formatDate(val,'yyyy-MM-dd');
            this.form.AKC264 = date;
        }
    }
}
</script>

<style lang="less" scoped>
.plusInvoice{
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
                font-size: .28rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName {
                    line-height: 1.2rem;
                    span {
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
                        height: .6rem;
                        width: 4.5rem;
                        font-family: PingFangSC-Regular;
                        font-size: .3rem;
                        color: #000000;
                        letter-spacing: 0;
                        text-align: right;
                        border: none;
                    }
                }
            }
        }
        // 补充资料
        .supplementInfo{
            background: #FFF;
            font-size: .28rem;
            color: #000000;
            line-height: 38px;
            text-align: left;
            padding: .1rem .3rem;
            .infoName{
                letter-spacing: 0;
            }
            .photoBox{
                text-align: left;
                .svg-icon{
                    height: 1.5rem;
                    width: 1.5rem;
                }
            }
        }
    }
}
.pic{
    width:1.5rem;
    height: 1.5rem;
}
</style>