<template>
    <div>
        <div class="items" style="border-top:1px solid transparent">
            <p class="p11">基本医疗保险职工参保登记 <span class="el-icon-arrow-right"></span> </p>
        </div>
        <div class="items" @click="gotoTReimbursement1">
            <p class="p11">领取基本医疗保险就医凭证 <span class="el-icon-arrow-right"></span> </p>
        </div>
        <div class="items">
            <p class="p11">基本医疗保险职工参保信息变更登记 <span class="el-icon-arrow-right"></span> </p>
        </div>
        <div class="items">
            <p class="p11">参保人员查询打印社会保险信息 <span class="el-icon-arrow-right"></span> </p>
        </div>
        <div class="items">
            <p class="p11">基本医疗保险关系转移 <span class="el-icon-arrow-right"></span> </p>
        </div>
        <div class="items">
            <p class="p11">基本医疗保险关系接续 <span class="el-icon-arrow-right"></span> </p>
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


