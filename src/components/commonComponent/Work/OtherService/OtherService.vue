<template>
    <div>
        <div class="items" style="border-top:1px solid transparent">
            <p class="p11">医保卡挂失、解挂、补换<span class="el-icon-arrow-right"></span> </p>
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


