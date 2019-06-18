<template>
    <div class="insuredChange">
        <Title :title="'参保信息变更'" :backRouter="'/'"></Title>
        <div class="Content">
            <!-- 基本信息 -->
            <userBaseInfo></userBaseInfo>
            <!-- 变更信息 -->
            <div class="ChangeInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>家庭住址：</span></div>
                    <div class="InfoText"><textarea v-model="form.AAE006" placeholder="请输入家庭住址"></textarea></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>手机号码：</span></div>
                    <div class="InfoText"><input type="number" v-model="form.AAE005" placeholder="请输入手机号码"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>邮政编码：</span></div>
                    <div class="InfoText"><input type="number" v-model="form.AAE007" placeholder="请输入邮政编码"></div>
                </div>
            </div>
            <!-- 提示 -->
            <div class="Hint">
                <div class="HintTitle"><i class="el-icon-warning" style="color:#05AEF0"></i>温馨提示</div>
                <div class="HintText">请依照您的实际变更情况，修改以上内容。</div>
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
                AAE006: '', //家庭住址
                AAE005: '', //手机号码
                AAE007: '', //邮政编码
                BKZ019: '', //经办编号
            },
            canSubmit: false,
        }
    },
    watch:{
        form:{
            handler:function(val){
                if(val.AAE006 != '' && val.AAE005 != '' && val.AAE007 != ''){
                    this.canSubmit = true;
                }else{
                    this.canSubmit = false;
                }
            },
            deep: true
        }
    },
    created(){
        this.form = this.$store.state.SET_INSURED_CHANGE;
        this.form.AAC003 = this.$store.state.SET_NATIVEMSG.name
        this.form.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
        this.form.BKZ019='公共服务-00501-005'
    },
    methods:{
        submit(){
            if(this.form.AAE005){
                if(!this.util.checkPhone(this.form.AAE005)){
                    this.$toast('请填写正确的联系电话');
                    return false;
                }
            }
            if(this.form.AAE007){
                if(!this.util.postOffic(this.form.AAE007)){
                    this.$toast('请填写正确的邮政编码');
                    return false;
                }
            }
            
            if(this.canSubmit == false){
                this.$toast('信息未填写完整');
                return false;
            }else{
                this.$store.dispatch('SET_INSURED_CHANGE', this.form);
                // 封装数据
                let params = this.formatSubmitData();
                // 开始请求
                console.log('parmas------',params)
                this.$axios.post(this.epFn.ApiUrl2()+ '/h5/jy1010/info', params).then((resData) => {
                        console.log('返回成功信息',resData)
                        //   成功   1000
                            if ( resData.enCode == '1000' ) {
                                this.$toast("提交成功");
                                this.$router.push("/changeDetail");
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
            submitForm.AAE005 =  this.form.AAE005;            
            submitForm.AAE006 =  this.form.AAE006;
            submitForm.AAE007 =  this.form.AAE007;
            submitForm.BKZ019 =  this.form.BKZ019;
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
.insuredChange{
    .Content{
        height: 100%;
        margin-bottom: 1.4rem;
        .ChangeInfo{
            height: 4rem;
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
                &:first-child{
                    height: 1.6rem;
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
                &:last-child{
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
