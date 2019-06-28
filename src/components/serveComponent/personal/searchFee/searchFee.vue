<template>
    <div class="searchFee">
        <Title :title="'个人费用查询'" :backRouter="'/'"></Title>
        <!-- 弹出区域 -->
        <mt-datetime-picker
            type="date"
            ref="startPicker"
            v-model="dateVal"
            @confirm="handleStartConfirm">
        </mt-datetime-picker>
        <mt-datetime-picker
            type="date"
            ref="endPicker"
            v-model="dateVal"
            @confirm="handleEndConfirm">
        </mt-datetime-picker>
        <div class="Content">
            <!-- 基本信息 -->
            <UserBaseInfo></UserBaseInfo>
            <!-- 变更信息 -->
            <div class="ListInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>开始日期：</span></div>
                    <div class="InfoText">
                        <input @click="openStartPicker" type="text" v-model="form.AAE030" placeholder="请选择" readonly>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>结束日期：</span></div>
                    <div class="InfoText">
                        <input @click="openEndPicker" type="text" v-model="form.AAE031" placeholder="请选择" readonly>
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
                AAE030: '', //开始日期
                AAE031: '', //结束日期
            },
            dateVal: new Date(), //默认绑定的时间
            
            canSubmit: false,
        }
    },
    created () {
        this.epFn.setTitle('个人费用查询');
        this.form.AAE031 = this.util.formatDate(new Date(),'yyyy-MM-dd');
        // 计算三个月前日期
        this.getStartDate(new Date());
        // this.form = this.$store.state.SET_SEARCHFEE_OPERATION;
    },
    watch: {
        form: {
            handler: function(val) {
                // 判断不为空
                if (val.AAE030 != '' && val.AAE031 != '') {
                    this.canSubmit = true;
                } else {
                    this.canSubmit = false;
                }
                // 判断时间间隔
                if (val.AAE030 != '' && val.AAE031 != '') {
                    let AAE030 = new Date(val.AAE030);
                    let AAE031 = new Date(val.AAE031);
                    let month = 24 * 3600 * 1000 * 30;
                    let gap = AAE031 - AAE030;
                    if (gap <=0) {
                        this.$toast('结束日期必须大于开始日期');
                        this.form.AAE031 = '';      
                    }
                }
            },
            deep: true
        },
    },
    methods:{
        // 计算三个月前日期
        getStartDate(val){
            let end = val.getTime();
            let start = end - (24*3600*90*1000);
            let date = this.util.formatDate(new Date(start),'yyyy-MM-dd');
            this.form.AAE030 = date;
        },
        // 选择离开日期
        openStartPicker(){
            this.$refs.startPicker.open();
        },
        handleStartConfirm(val){
            let date = this.util.formatDate(val,'yyyy-MM-dd');
            this.form.AAE030 = date;
        },
        // 选择回杭日期
        openEndPicker(){
            this.$refs.endPicker.open();
        },
        handleEndConfirm(val){
            let date = this.util.formatDate(val,'yyyy-MM-dd');
            this.form.AAE031 = date;
        },
        // 提交
        submit() {
            // 判断时间间隔不得超过一年
            if (this.form.AAE030 != '' && this.form.AAE031 != '') {
                let start = new Date(this.form.AAE030);
                let end = new Date(this.form.AAE031);
                let year = 365 * 24 * 3600 * 1000;
                let gap = end - start;
                if (gap > year) {
                    this.$toast('时间跨度不得超过一年');
                    this.form.AAE031 = '';
                    return false;  
                }
            }
            if (this.canSubmit == false) {
                this.$toast('信息未填写完整');
                return false;
            } else {
                this.$store.dispatch('SET_SEARCHFEE_OPERATION', this.form);
                this.$router.push('/searchFeeResult')      
            }
        },

    }
}
</script>

<style lang="less" scoped>
.searchFee{
    .Content{
        margin-bottom: 1.4rem;
        .ListInfo{
            width: 7.5rem;
            padding: 0 .3rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
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
