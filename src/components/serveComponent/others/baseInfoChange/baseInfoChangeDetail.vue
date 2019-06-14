<template>
    <div class="baseInfoChange">
        <Title :title="'人员基本信息变更'" :backRouter="'/baseInfoChange'"></Title>
        <div class="Content">
            <!-- 事项名称 -->
            <div class="ItemInfo">
                <div class="name">人员基本信息变更</div>
                <div class="icon">收件</div>
            </div>
            <!-- 信息 -->
            <div class="MailInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>家庭住址:</span></div>
                    <div class="InfoText"><textarea v-model="form.address" readonly></textarea></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>手机号码:</span></div>
                    <div class="InfoText">{{form.phone}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>邮政编码:</span></div>
                    <div class="InfoText">{{form.code}}</div>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <footer class="Footer">
            <div class="Btn">
                <div class="ResetBtn" @click="backout()">撤销</div>
                <div class="EditBtn" @click="edit()">编辑</div>
            </div>
        </footer>
    </div>
</template>

<script>
import Title from '../../common/Title'
export default {
    components:{
        'Title': Title,
    },
    data() {
      return {
        form: {
            address: '', //家庭地址
            phone: '', //手机号码
            code: '' //邮政编码
        },
      }
    },
    created(){
        this.form = this.$store.state.SET_BASEINFOCHANGE_OPERATION;
    },
    methods:{
        edit(){
            this.$router.push("/baseInfoChange");
        },
    }
}
</script>


<style lang="less" scoped>
.baseInfoChange{
    .Content{
        margin-bottom: 1.4rem;
        .ItemInfo{
            height: 1.86rem;
            width: 7.5rem;
            padding: 0 .4rem 0 .3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .name{
                opacity: 0.85;
                font-family: PingFangSC-Medium;
                font-size: .32rem;
                color: #000000;
                letter-spacing: 0;
            }
            .icon{
                height: 1.34rem;
                width: 1.34rem;
                background:  #8BCEFF;
                border-radius: 1.34rem/2;
                text-align: center;
                line-height: 1.34rem;
                font-family: PingFangSC-Regular;
                font-size: .4rem;
                color: #FFFFFF;
                letter-spacing: 0;
                text-align: center;
            }
        }
        .MailInfo{
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
                border-bottom: .01rem solid #D5D5D5;
                .InfoName{
                    width: 1.8rem;
                    opacity: 0.45;
                    line-height: 1.2rem;
                    text-align: left;
                    span{
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText{
                    width: 5.1rem;
                    opacity: 0.85;
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                }
                &:first-child{
                    height: 1.6rem;
                    .InfoText{
                        height: 1.6rem;
                        textarea{
                            border: none;
                            opacity: 0.85;
                            width: 5rem;
                            line-height: .45rem;
                        }
                    }
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
    }
    // 底部
    .Footer {
        height: 1.31rem;
        width: 7.5rem;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 199;
        .Btn{
            display: flex;
            justify-content: space-around;
            .ResetBtn {
                height: 1.05rem;
                width: 3.45rem;
                border-radius: .05rem;
                line-height: 1.05rem;
                background: #F2F2F2;;
                font-family: PingFangSC-Regular;
                font-size: .36rem;
                color: #B4B4B4;
                letter-spacing: 0;
                text-align: center;
            }
            .EditBtn{
                height: 1.05rem;
                width: 3.45rem;
                border-radius: .05rem;
                line-height: 1.05rem;
                background: #F2F2F2;;
                font-family: PingFangSC-Regular;
                font-size: .36rem;
                background: #1492FF;
                color: #FFF;
                letter-spacing: 0;
                text-align: center;
            }
        }
    }
}
</style>

<style>
</style>
