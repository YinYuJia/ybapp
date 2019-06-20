<template>
    <div class="searchTreat">
        <Title :title="'就诊信息查询'" :backRouter="'/'"></Title>
        <!-- 弹出区域 -->
        <mt-datetime-picker
            type="date"
            ref="startPicker"
            v-model="dateVal"
            @confirm="handleStartConfirm">
        </mt-datetime-picker>
        <mt-datetime-picker
            type="date"
            ref="endPicker"
            v-model="dateVal"
            @confirm="handleEndConfirm">
        </mt-datetime-picker>
        <div class="Content">
            <!-- 基本信息 -->
            <UserBaseInfo></UserBaseInfo>
            <!-- 变更信息 -->
            <div class="ListInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>开始日期：</span></div>
                    <div class="InfoText">
                        <input @click="openStartPicker" type="text" v-model="form.AAE030" placeholder="请选择" readonly>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>结束日期：</span></div>
                    <div class="InfoText">
                        <input @click="openEndPicker" type="text" v-model="form.AAE031" placeholder="请选择" readonly>
                    </div>
                </div>
            </div>
        </div>
        <!-- 按钮 -->
        <Footer :canSubmit='canSubmit' :btnText="'立即查询'" @submit="submit()"></Footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{
                AAE030: '', //开始日期
                AAE031: '', //结束日期
            },
            dateVal: new Date(), //默认绑定的时间
            canSubmit: false,
        }
    },
    watch: {
        form: {
            handler: function(val) {
                // 判断不为空
                if (val.AAE030 != '' && val.AAE031 != '') {
                    this.canSubmit = true;
                } else {
                    this.canSubmit = false;
                }
                // 判断时间间隔
                if (val.AAE030 != '' && val.AAE031 != '') {
                    let AAE030 = new Date(val.AAE030);
                    let AAE031 = new Date(val.AAE031);
                    let month = 24 * 3600 * 1000 * 30;
                    let gap = AAE031 - AAE030;
                    if (gap <=0) {
                        this.$toast('结束日期必须大于开始日期');
                        this.form.AAE031 = '';
                    }
                }
            },
            deep: true
        },
    },
    methods:{
        // 选择开始日期
        openStartPicker(){
            this.$refs.startPicker.open();
        },
        handleStartConfirm(val){
            let date = this.util.formatDate(val,'yyyy-MM-dd');
            this.form.AAE030 = date;
        },
        // 选择结束日期
        openEndPicker(){
            this.$refs.endPicker.open();
        },
        handleEndConfirm(val){
            let date = this.util.formatDate(val,'yyyy-MM-dd');
            this.form.AAE031 = date;
        },
        submit(){
            if(this.canSubmit == false){
                this.$toast('信息未填写完整');
                return false;
            }else{
                // 封装数据
                let params = this.formatSubmitData();
                // 开始请求
                console.log('parmas------',params)
                this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1010/info', params).then((resData) => {
                        console.log('返回成功信息',resData)
                        //   成功   1000
                            if ( resData.enCode == '1000' ) {
                                this.$toast("提交成功");
                                this.$router.push("/searchTreatResult");
                            }else if (resData.enCode == '1001' ) {
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
        formatSubmitData(){
            let submitForm = {}
            // 日期传换成Number
            submitForm.AAE030 = this.util.DateToNumber(this.form.AAE030);
            submitForm.AAE031 = this.util.DateToNumber(this.form.AAE031);
            // submitForm.debugTest ="true"
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                submitForm.AAC003 = '胡';
                submitForm.AAE135 = "113344223344536624";
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1010");
            return params;
        }
    }
}
</script>

<style lang="less" scoped>
.searchTreat{
    .Content{
        .ListInfo{
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
    }
}
</style>