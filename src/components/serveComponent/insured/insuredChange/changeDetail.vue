<template>
    <div class="changeDetail">
        <div class="Title">
            <el-row>
                <el-col :span="6">
                    <span class="el-icon-arrow-left" style="color: #ffffff;font-size: .38rem;margin-left: -50px;" @click="back()"></span>
                </el-col>
                <el-col :span="12">
                    <div class="NameTitle">
                        参保信息变更
                    </div>
                </el-col>
                <el-col :span="6">
                </el-col>
            </el-row>
        </div>
        <div class="Content">
            <div class="Proof">
                <div class="name">基本医疗保险职工参保信息变更登记</div>
                <div class="icon"></div>
            </div>
            <div class="Info">
                <div class="Line">
                    <div class="name">家庭住址</div>
                    <div class="text">{{form.AAE006}}</div>
                </div>
                <div class="Line">
                    <div class="name">手机号码</div>
                    <div class="text">{{form.AAE005}}</div>
                </div>
                <div class="Line">
                    <div class="name">邮政编码</div>
                    <div class="text">{{form.AAE007}}</div>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <footer class="Footer">
            <div class="IconBox">
                <div class="Icon">
                    <svg-icon icon-class="SubmitReim_service" /></div>
                <div class="Text">客服</div>
            </div>
            <div class="BtnBox">
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
                AAE006: '', //家庭地址
                AAE005: '', //手机号码
                AAE007: '' //邮政编码
            },
        }
    },
    created(){
        this.form = this.$store.state.SET_INSURED_CHANGE;
    },
    methods:{
        back(){
            this.$router.push("/changeDetail");
        },
        edit(){
            this.$router.push('/insuredChange');
        },
    }
}
</script>

<style lang="less" scoped>
.changeDetail{
    color: #666;
    background: white;
    .Title {
        height: .8rem;
        background-color: #05AEF0;
        font-size: .36rem;
        line-height: .8rem;
        overflow: hidden;
        .NameTitle{
            color: white;
        }
    }
    .Content{
        .Proof{
            padding: .2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #999;
            .name{
                font-size: .3rem;
                font-weight: bold;
            }
            .icon{
                height: 1.2rem;
                width: 1.2rem;
                background: #aaa;
            }
        }
        .Info{
            padding: .2rem;
            .Line{
                display: flex;
                font-size: .3rem;
                margin: .3rem 0;
                .name{
                    width: 1.4rem;
                    text-align: right;
                }
                .text{
                    width: 5.7rem;
                    padding-left: .4rem;
                    box-sizing: border-box;
                    text-align: left;
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
        .IconBox {
            width: .6rem;
            margin-left: .51rem;
            .Icon {
                height: .6rem;
                width: .6rem;
                .svg-icon {
                    display: block;
                    height: 100%;
                    width: 100%;
                }
            }
            .Text {
                height: .28rem;
                width: .6rem;
                opacity: 0.45;
                font-family: PingFangSC-Regular;
                font-size: .2rem;
                color: #000;
                letter-spacing: 0;
                text-align: center;
            }
        }
        .BtnBox {
            height: .8rem;
            width: 5.6rem;
            line-height: 0.8rem;
            background-image: linear-gradient(90deg, #35B8FD 0%, #4E8DFF 100%);
            border-radius: .4rem;
            font-family: PingFangSC-Regular;
            font-size: .36rem;
            color: #FFFFFF;
            letter-spacing: 0;
            display: flex;
            .ResetBtn {
                width: 2.8rem;
                background: #B6DEFF;
                border-top-left-radius: .4rem;
                border-bottom-left-radius: .4rem;
            }
            .EditBtn {
                width: 2.8rem;
            }
        }
    }
}
</style>
