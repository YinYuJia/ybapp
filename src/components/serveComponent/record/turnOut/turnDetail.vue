<template>
    <div class="turnDetail">
        <div class="Title">
            <el-row>
                <el-col :span="6">
                    <span class="el-icon-arrow-left" style="color: #ffffff;font-size: .38rem;margin-left: -50px;" @click="back()"></span>
                </el-col>
                <el-col :span="12">
                    <div class="NameTitle">
                        转外就医备案
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
                <div class="name">基本医疗保险参保人员转外就医备案</div>
                <div class="icon">收件</div>
            </div>
            <!-- 邮递信息 -->
            <div class="MailInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地:</span></div>
                    <div class="InfoText">{{canbaocity}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>开始日期:</span></div>
                    <div class="InfoText">{{form.start}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>转往地市:</span></div>
                    <div class="InfoText">{{address}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>疾病名称:</span></div>
                    <div class="InfoText">{{form.treatName}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>就诊疗程:</span></div>
                    <div class="InfoText">{{form.treatment}}</div>
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
    data() {
      return {
        form: {
            canbao: [], //参保地
            start: '', //开始日期
            city: [], //省市信息，提交时需要转成String
            treatName: '',//疾病名称
            treatment: '', //就诊疗程
        },
      }
    },
    created(){
        this.form = this.$store.state.SET_TURNOUT_OPERATION;
    },
    computed:{
        canbaocity: function(){
            return this.form.canbao.join(' ');
        },
        address: function(){
            return this.form.city.join(' ');
        }
    },
    methods:{
        back(){
            this.$router.push("/turnOut");
        },
        edit(){
            this.$router.push("/turnOut");
        },
    }
}
</script>


<style lang="less" scoped>
.turnDetail{
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
            height: 6rem;
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
                &:last-child{
                    border-bottom: none;
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
        justify-content: center;
        align-items: center;
        .Btn {
            height: .8rem;
            width: 6.9rem;
            line-height: 0.8rem;
            background-image: linear-gradient(-90deg, #35B8FD 0%, #4E8DFF 100%);
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

<style>
</style>
