<template>
    <div class="baseInfoChange">
        <div class="Title">
            <el-row>
                <el-col :span="6">
                    <div class="BackIcon" @click="backIndex()">
                        <svg-icon icon-class="serveComponent_back" />
                        <span>返回</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="NameTitle">参保信息变更</div>
                </el-col>
                <el-col :span="6">
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
                    <div class="InfoText"><textarea v-model="form.address" placeholder="请输入家庭住址"></textarea></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>手机号码：</span></div>
                    <div class="InfoText"><input v-model="form.phone" type="text" placeholder="请输入手机号码"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>邮政编码：</span></div>
                    <div class="InfoText"><input v-model="form.code" type="text" placeholder="请输入邮政编码"></div>
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
            <div class="SubmitBtn" @click="submit" :class="{'active': canSubmit == true}">
                <span>确认提交</span>
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
            form:{
                address: '', //家庭地址
                phone: '', //手机号码
                code: '' //邮政编码
            },
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
        this.form = this.$store.state.SET_BASEINFOCHANGE_OPERATION;
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
                this.$store.dispatch('SET_BASEINFOCHANGE_OPERATION', this.form);
                this.$router.push("/baseInfoChangeDetail");
            }
        }
    }
}
</script>

<style lang="less" scoped>
.baseInfoChange{
    .Title {
        height: .8rem;
        background-color: white;
        line-height: .8rem;
        .BackIcon{
            display: flex;
            align-items: center;
            color: #1492FF;
            font-size: .32rem;
            .svg-icon{
                height: .5rem;
                width: .5rem;
            }
        }
        .NameTitle {
            color: #000000;
            letter-spacing: 0;
            font-size: .36rem;
        }
    }
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
