<template>
    <div class="insuredChange">
        <div class="Title">
            <el-row>
                <el-col :span="6">
                    <span class="el-icon-arrow-left" style="color: #ffffff;font-size: .38rem;margin-left: -50px;" @click="backIndex()"></span>
                </el-col>
                <el-col :span="12">
                    <div class="NameTitle">
                        参保信息变更
                    </div>
                </el-col>
                <el-col :span="6">
                    <span class="el-icon-bell" style="color: #ffffff;font-size: .50rem;margin-right: -.4rem;margin-top:.35rem"></span>
                </el-col>
            </el-row>
        </div>
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
                    <div class="InfoText"><input type="text" v-model="form.AAE005" placeholder="请输入手机号码"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>邮政编码：</span></div>
                    <div class="InfoText"><input type="text" v-model="form.AAE007" placeholder="请输入邮政编码"></div>
                </div>
            </div>
            <!-- 提示 -->
            <div class="Hint">
                <div class="HintTitle"><i class="el-icon-warning" style="color:#05AEF0"></i>温馨提示</div>
                <div class="HintText">请依照您的实际变更情况，修改以上内容。</div>
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
            form:this.$store.state.SET_INSURED_CHANGE,
            canSubmit: false,
        }
    },
    watch:{
        form:{
            handler:function(val){
                if(val.address != '' && val.phone != '' && val.code != ''){
                    this.canSubmit = true;
                }else{
                    this.canSubmit = false;
                }
            },
            deep: true
        }
    },
    created(){
                
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
                if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                    this.form.AAC003 = this.$store.state.SET_NATIVEMSG.name  //用户名
                    this.form.AAE135 = this.$store.state.SET_NATIVEMSG.idCard //单子社保卡号
                }else {
                    this.form.AAC003 = '殷宇佳'; //用户名
                    this.form.AAE135 = "113344223344536624"; //单子社保卡号
                }
                const parmas = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,this.form,'1010')
                    console.log('parmas------',typeof parmas)



                    // this.$axios.post( this.epFn.ApiUrl1() +  '/h5/jy1008/transactionVoucher', parmas).then((resData) => {
                    //        console.log('返回成功信息',resData.data.data)
                    //       if (resData.data.code == 0 ) {
                    //         //   成功   1000
                    //           if ( resData.data.data.enCode == 1000 ) {
                    //               this.$toast("提交成功");
                    //                     this.$store.dispatch('SET_INSURED_CHANGE', this.form);
                    //                    this.$router.push("/changeDetail");
                    //           }else if (resData.data.data.enCode == 1001 ) {
                    //             //   失败  1001
                    //               this.$toast(resData.data.data.msg);
                    //               return;
                    //           }else{
                    //               this.$toast('业务出错');
                    //               return;
                    //           }
                    //     }else if(resData.data.code == -1 ){
                    //         // 系统异常
                    //         this.$toast("系统异常");
                    //         return;
                    //     }else if (resData.data.code == 1 ) {
                    //         // 业务异常
                    //         if ( resData.data.data.enCode !== 1000 ) {
                    //            this.$toast(resData.data.data.msg);
                    //         }
                    //         return;
                    //     }
                    // }).catch((error) => {
                    //     console.log(error)
                    // })

            }
        }
    }
}
</script>

<style lang="less" scoped>
.insuredChange{
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
        .ChangeInfo{
            height: 4rem;
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
