<template>
    <div>
        <div class="items" style="border-top:1px solid transparent">
            <p class="p11">基本医疗保险视同年缴费核定 <span class="el-icon-arrow-right"></span> </p>
        </div>
        <div class="items"  @click="gotoTReimbursement1">
            <p class="p11">基本医疗保险参保人员医疗费用零星报销 <span class="el-icon-arrow-right"></span> </p>
        </div>
        <div class="items">
            <p class="p11">医疗保险费用审核结算 <span class="el-icon-arrow-right"></span> </p>
        </div>
        <div class="items">
            <p class="p11">平产-刨宫产-助娩产待遇核准支付 <span class="el-icon-arrow-right"></span> </p>
        </div>
        <div class="items">
            <p class="p11">流产-引产-节育-复通手术待遇核准支付 <span class="el-icon-arrow-right"></span> </p>
        </div>
        <div class="items">
            <p class="p11">未就业配偶医疗待遇核准支付 <span class="el-icon-arrow-right"></span> </p>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            NameTitle:{
                type:String,
                default:""
            }
        },
        created() {
            console.log('this.NameTitle',this.NameTitle)
        },
        methods:{
            gotoTReimbursement1() {
                               this.$router.push({
                    name: 'TReimbursement1',
                    params: {
                        name:this.NameTitle
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .items {
        height: 1.2rem;
        line-height: 1.2rem;
        background-color: #ffffff;
        border-top: 1px solid #D3D3D3;
        text-align: left;
        padding-left: .27rem;
        padding-right: .37rem;
        .p11 {
            font-size: .3rem;
            font-family: 'PingFangSC-Regular';
            color: #000000;
            .el-icon-arrow-right {
                float: right;
                margin-top: .42rem;
            }
        }
    }
</style>


