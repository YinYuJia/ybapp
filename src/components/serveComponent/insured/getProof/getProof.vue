<template>
    <div class="getProof">
        <div class="Title">
            <el-row>
                <el-col :span="6">
                    <span class="el-icon-arrow-left" style="color: #ffffff;font-size: .38rem;margin-left: -50px;"></span>
                </el-col>
                <el-col :span="12">
                    <div class="NameTitle">
                        领取就医凭证
                    </div>
                </el-col>
                <el-col :span="6">
                </el-col>
            </el-row>
        </div>
        <div class="Content">
            <!-- 基本信息 -->
            <div class="BaseInfo">
                <div class="ContentTitle">基本信息</div>
                <div class="Info">
                    <div class="Line">
                        <span>证件号码</span>
                        <span>3**************X</span>
                    </div>
                    <div class="Line">
                        <span>姓名</span>
                        <span>*佳</span>
                    </div>
                </div>
            </div>
            <!-- 邮递信息 -->
            <div class="MailInfo">
                <div class="ContentTitle">邮递信息</div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="收件人">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="详细地址">
                        <el-input type="textarea" :rows="4" v-model="form.address"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 提示 -->
            <div class="Hint">
                <div class="HintTitle"><i class="el-icon-warning" style="color:#05AEF0"></i>温馨提示</div>
                <div class="HintText">为保证您的正常领取，请务必填写正确、完整的邮递信息。</div>
            </div>
        </div>
        <!-- 按钮 -->
        <footer class="Btn" :class="{'active': canSubmit == true}" @click="submit()">
            确认提交
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
                address: ''
            },
            canSubmit: false,
        }
    },
    watch:{
        form:{
            handler:function(val){
                if(val.name != '' && val.phone != '' && val.address != ''){
                    this.canSubmit = true;
                }else{
                    this.canSubmit = false;
                }
            },
            deep: true
        }
    },
    methods:{
        submit(){
            if(this.canSubmit == false){
                return false;
            }else{
                this.$store.dispatch('SET_INSURED_PROOF', this.form);
                this.$router.push("/getDetail");
            }
        }
    }
}
</script>

<style lang="less" scoped>
.getProof{
    color: #666;
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
        height: 100%;
        background: white;
        text-align: left;
        padding: 0 .2rem;
        .BaseInfo{
            padding: .1rem 0;
            font-size: .3rem;
            .ContentTitle{
                font-weight: bold;
                line-height: .6rem;
            }
            .Info{
                border: 0.01rem solid #DDD;
                padding: .1rem .25rem;
                .Line{
                    line-height: .6rem;
                    display: flex;
                    justify-content: space-between;
                    span{
                        &:first-child{
                            font-weight: bold;
                        }
                    }
                }
            }
        }
        .MailInfo{
            padding: .1rem 0;
            font-size: .3rem;
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
    .Btn{
        height: 1rem;
        width: 100%;
        background: rgb(124, 206, 250);
        font-size: .34rem;
        color: white;
        line-height: 1rem;
        text-align: center;
        position: fixed;
        bottom: 0;
    }
    .active{
        background: #05AEF0;
    }
}
</style>
