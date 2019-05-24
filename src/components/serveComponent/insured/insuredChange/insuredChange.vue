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
                
            </div>
            <!-- 提示 -->
            <!-- <div class="Hint">
                <div class="HintTitle"><i class="el-icon-warning" style="color:#05AEF0"></i>温馨提示</div>
                <div class="HintText">请依照您的实际变更情况，修改以上内容。</div>
            </div> -->
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
            form:{
                address: '',
                phone: '',
                code: ''
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
        this.form = this.$store.state.SET_INSURED_CHANGE;
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
                this.$store.dispatch('SET_INSURED_CHANGE', this.form);
                this.$router.push("/changeDetail");
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
        .BaseInfo{
            width: 7.5rem;
            height: 2.35rem;
            background: #05AEF0;
            position: relative;
            .InfoPad{
                height: 2.3rem;
                width: 6.9rem;
                position: absolute;
                margin-top: .42rem;
                left: 50%;
                margin-left: -6.9rem/2;
                background: white;
                border-radius: .08rem;
                border-bottom: .1rem solid #C4EEFF;
                .UserPhoto{
                    height: 1.2rem;
                    width: 1.2rem;
                    position: relative;
                    left: 50%;
                    margin-left: -.6rem;
                    margin-top: -.44rem;
                    border-radius: .6rem;
                    background: #DDD;
                }
                .UserInfo{
                    .UserName{
                        margin-top: .18rem;
                        font-family: PingFangSC-Regular;
                        font-size: .36rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                    .UserId{
                        margin-top: 12px;
                        opacity: .65;
                        font-family: PingFangSC-Regular;
                        font-size: .26rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
            }
        }
        .ChangeInfo{
            height: 5.2rem;
            width: 7.5rem;
            padding: 0 .3rem;
            margin-top: .67rem;
            background: white;
            .ContentTitle{
                font-weight: bold;
                line-height: .6rem;
            }
        }
        .Hint{
            padding: .2rem .1rem;
            background: #EEE;
            font-size: .28rem;
            .HintTitle{
                line-height: .5rem;
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
