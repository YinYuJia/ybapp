<template>
    <div class="insuredChange">
        <div class="Title">
            <el-row>
                <el-col :span="6">
                    <span class="el-icon-arrow-left" style="color: #ffffff;font-size: .38rem;margin-left: -50px;"></span>
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
            <!-- 变更信息 -->
            <div class="ChangeInfo">
                <div class="ContentTitle">变更信息</div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="家庭住址">
                        <el-input type="textarea" :rows="4" v-model="form.address"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码">
                        <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮政编码">
                        <el-input v-model="form.code"></el-input>
                    </el-form-item>
                    
                </el-form>
            </div>
            <!-- 提示 -->
            <div class="Hint">
                <div class="HintTitle"><i class="el-icon-warning" style="color:#05AEF0"></i>温馨提示</div>
                <div class="HintText">请依照您的实际变更情况，修改以上内容。</div>
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
        submit(){
            if(this.canSubmit == false){
                return false;
            }else{
                this.$store.dispatch('SET_INSURED_CHANGE', this.form);
                this.$router.push("/test1");
            }
        }
    }
}
</script>

<style lang="less" scoped>
.insuredChange{
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
        .ChangeInfo{
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
