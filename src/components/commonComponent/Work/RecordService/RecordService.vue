<template>
    <div>
        <div class="items" style="border-top:1px solid transparent">
            <p class="p11">基本医疗保险参保人员异地就医备案<span class="el-icon-arrow-right"></span> </p>
        </div>
        <div class="items" @click="gotoTReimbursement1">
            <p class="p11">基本医疗保险参保人特治特药备案<span class="el-icon-arrow-right"></span> </p>
        </div>
        <div class="items">
            <p class="p11">基本医疗保险参保人(特殊慢性)病种待遇备案 <span class="el-icon-arrow-right"></span> </p>
        </div>
        <div class="items">
            <p class="p11">基本医疗保险参保人转外就医备案<span class="el-icon-arrow-right"></span> </p>
        </div>
        <div class="items">
            <p class="p11">基本医疗保险参保人出国(境)带药备案<span class="el-icon-arrow-right"></span> </p>
        </div>
        <div class="items">
            <p class="p11">基本医疗保险参保人历年账户家庭共济备案<span class="el-icon-arrow-right"></span> </p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            NameTitle: {
                type: String,
                default: ""
            }
        },
        created() {
        },
        methods: {
            gotoTReimbursement1() {
                // this.$router.push({
                //     name: '',
                //     params: {
                //         name: "参保服务"
                //     }
                // })
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


