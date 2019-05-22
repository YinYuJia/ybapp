<template>
    <div class="getDetail">
        <div class="Title">
            <el-row>
                <el-col :span="6">
                    <span class="el-icon-arrow-left" style="color: #ffffff;font-size: .38rem;margin-left: -50px;" @click="back()"></span>
                </el-col>
                <el-col :span="12">
                    <div class="NameTitle">
                        领取就医凭证
                    </div>
                </el-col>
                <el-col :span="6">
                    <span class="el-icon-bell" style="color: #ffffff;font-size: .50rem;margin-right: -.4rem;margin-top:.35rem"></span>
                </el-col>
            </el-row>
        </div>
        <div class="Content">
            <!-- 事项名称 -->
            <div class="ItemInfo">
                <div class="name">领取基本医疗保险就医凭证</div>
                <div class="icon">收件</div>
            </div>
            <!-- 邮递信息 -->
            <div class="MailInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>收件人:</span></div>
                    <div class="InfoText">{{form.name}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>联系电话:</span></div>
                    <div class="InfoText">{{form.phone}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>详细地址:</span></div>
                    <div class="InfoText"><textarea v-model="address" readonly></textarea></div>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <footer class="Footer">
            <div class="Btn">
                <div class="ResetBtn">撤销</div>
                <div class="EditBtn" @click="edit()">编辑</div>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{
                name: '',
                phone: '',
                address1: [],
                address2: ''
            },
        }
    },
    created(){
        this.form = this.$store.state.SET_INSURED_PROOF;
    },
    computed:{
        address: function(){
            return this.form.address1.join('') + this.form.address2;
        }
    },
    methods:{
        back(){
            this.$router.push("/getProof");
        },
        edit(){
            this.$router.push("/getProof");
        },
    }
}
</script>

<style lang="less" scoped>
.getDetail{
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
        .ItemInfo{
            height: 2.4rem;
            width: 7.5rem;
            background: white;
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
                background:  #8BDFFF;
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
            margin-top: .15rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .3rem;
                display: flex;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName{
                    width: 1.5rem;
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
                    opacity: 0.85;
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                }
                &:last-child{
                    border-bottom: none;
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
            }
        }
    }
    // 底部
    .Footer {
        height: 1.2rem;
        width: 7.5rem;
        background-color: white;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 199;
        display: flex;
        align-items: center;
        .Btn {
            height: .8rem;
            width: 6.9rem;
            margin-left: .51rem;
            line-height: 0.8rem;
            background-image: linear-gradient(90deg, #35B8FD 0%, #4E8DFF 100%);
            border-radius: .4rem;
            font-family: PingFangSC-Regular;
            font-size: .36rem;
            color: #FFFFFF;
            letter-spacing: 0;
            display: flex;
            .ResetBtn {
                width: 3.45rem;
                background: #B6DEFF;
                border-top-left-radius: .4rem;
                border-bottom-left-radius: .4rem;
            }
            .EditBtn {
                width: 3.45rem;
            }
        }
    }
}
</style>
