<template>
    <div class="searchInsuredInfo">
        <Title :title="'个人参保信息'" :backRouter="'/'"></Title>
        <!-- 弹出区域 -->
        <SelectCity 
            :type="2"
            ref="cityPicker"
            @confirm="chooseCity"
            >
        </SelectCity>
        <SelectCity 
            :type="1"
            ref="monthPicker"
            :propArr="months"
            @confirm="handleMonthConfirm"
            >
        </SelectCity>
        <!-- 弹出区域结束 -->
        <div class="Content">
            <!-- 基本信息 -->
            <UserBaseInfo></UserBaseInfo>
            <!-- 变更信息 -->
            <div class="ListInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地：</span></div>
                    <div class="InfoText">
                        <!-- <input @click="openInsuredPicker" type="text" v-model="form.AAB301000" placeholder="请选择" readonly> -->
                        <input type="text" v-model="form.AAB301000" placeholder="请选择" readonly>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>查询月数：</span></div>
                    <div class="InfoText">
                        <input @click="openMonthPicker()" type="text" v-model="AAE091VALUE" placeholder="请选择" readonly>
                    </div>
                </div>
            </div>
        </div>
        <!-- 按钮 -->
        <Footer :canSubmit='canSubmit' @submit="submit()"></Footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{
                AAB301000: '', //参保地
                AAS301: '', //参保地省
                AAB301: '', //参保地市
                AAQ301: '', //参保地区
                AAE091: '24', //查询月数
            },
            AAE091VALUE: '24个月',
            canSubmit: false, //是否能提交
            months: [
                {value: "6" ,label: '6个月'},
                {value: "12" ,label: '12个月'},
                {value: "24" ,label: '24个月'},
            ],
        }
    },
    created(){
        this.epFn.setTitle('个人参保信息')
        this.form.AAB301000 = this.$store.state.SET_USER_DETAILINFO.regionName
        this.form.AAB301 = this.$store.state.SET_USER_DETAILINFO.AAB301
    },
    watch: {
        form: {
            handler: function(val) {
                // 判断不为空
                if (val.AAB301000 != '' && val.AAE091 != '' ) {
                    this.canSubmit = true;
                } else {
                    this.canSubmit = false;
                }
            },
            deep: true
        },
    },
    methods:{
        // 选择参保地
        openInsuredPicker(){
            this.$refs.cityPicker.open();
        },
        chooseCity(val){
            this.form.AAB301000 = val.name;
            this.form.AAS301 = val.code[0];
            this.form.AAB301 = val.code[1];
            this.form.AAQ301 = val.code[2];
        },
        // 选择月数
        openMonthPicker(){
            this.$refs.monthPicker.open();
        },
        handleMonthConfirm(val){
            console.log(val);
            this.form.AAE091 = val.value;
            this.AAE091VALUE = val.label;
        },
        // 提交
        submit() {
            
            if (this.canSubmit == false) {
                this.$toast('信息未填写完整');
                return false;
            } else {
                this.$router.push('/searchInsuredResult')  
                this.$store.dispatch('SET_SEARCHINSUREDINFO_OPERATION', this.form); 
            }
        },

    }
}
</script>

<style lang="less" scoped>
.searchInsuredInfo{
    .Content{
        margin-bottom: 1.4rem;
        .ListInfo{
            width: 7.5rem;
            padding: 0 .3rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                position: relative;
                font-size: .28rem;
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