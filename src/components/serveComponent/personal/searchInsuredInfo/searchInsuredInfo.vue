<template>
    <div class="searchInsuredInfo">
        <Title :title="'个人参保信息'" :backRouter="'/'"></Title>
        <!-- 弹出区域 -->
        <selectCity 
            :type="3"
            ref="cityPicker"
            @confirm="chooseCity"
            >
        </selectCity>
        <!-- 弹出区域结束 -->
        <div class="Content">
            <!-- 基本信息 -->
            <userBaseInfo></userBaseInfo>
            <!-- 变更信息 -->
            <div class="ListInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地：</span></div>
                    <div class="InfoText">
                        <input @click="openInsuredPicker" type="text" v-model="form.canbao" placeholder="请选择" readonly>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>查询月数：</span></div>
                    <div class="InfoText">
                        <el-select v-model="form.AAE091" placeholder="请选择">
                            <el-option v-for="item in months" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
        </div>
        <!-- 按钮 -->
        <Footer :canSubmit='canSubmit' @submit="submit()"></Footer>
    </div>
</template>

<script>
import Title from '../../common/Title'
import userBaseInfo from '../../common/userBaseInfo'
import selectCity from '../../common/selectCity'
import Footer from '../../common/Footer'
export default {
    components:{
        Title,userBaseInfo,selectCity,Footer
    },
    data(){
        return{
            form:{
                canbao: '', //参保地
                AAS301: '', //参保地省
                AAB301: '', //参保地市
                AAQ301: '', //参保地区
                AAE091: '', //查询月数
            },
            canSubmit: false, //是否能提交
            months: [
                {value: 6 ,label: '6个月'},
                {value: 12 ,label: '12个月'},
                {value: 24 ,label: '24个月'},
            ],
        }
    },
    methods:{
        // 选择参保地
        openInsuredPicker(){
            this.$refs.cityPicker.open();
        },
        chooseCity(val){
            this.form.canbao = val.name;
            this.form.AAS301 = val.code[0];
            this.form.AAB301 = val.code[1];
            this.form.AAQ301 = val.code[2];
            console.log(this.form);
        }
    }
}
</script>

<style lang="less" scoped>
.searchInsuredInfo{
    .Content{
        .ListInfo{
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
                &:last-child{
                    border-bottom: none;
                }
            }
        }
    }
}
</style>

<style>
    .searchInsuredInfo .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 160px;
    }
    .searchInsuredInfo .el-input__prefix,
    .el-input__suffix {
        display: none;
    }
    .searchInsuredInfo .el-input__inner {
        border: none;
        text-align: right;
        padding-right: 0;
        padding-left: 0;
    }
    .searchInsuredInfo .el-cascader .el-input .el-input__inner {
        width: 4.5rem;
    }
    .searchInsuredInfo .el-cascader .el-cascader__label {
        text-align: right;
        padding: 0;
    }
</style>