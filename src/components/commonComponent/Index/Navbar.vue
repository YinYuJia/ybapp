<template>
    <div class="bestDiv">
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="grid-content bg-purple ">
                    <svg-icon icon-class="Index_nav_SweepCode" className="Index_nav_SweepCode" />
                    <p class="p">扫一扫</p>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple ">
                   <svg-icon icon-class="Index_nav_payment" className="Index_nav_payment" />
                   <p class="p">缴费支付</p>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple ">
                    <svg-icon icon-class="Index_nav_MedicalInsuranceAccount" className="Index_nav_MedicalInsuranceAccount" />
                   <p class="p">缴费支付</p>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<style lang="less" scoped>
    .bestDiv {
        background-color: #05AEF0;
    }
    .el-row {
        margin-bottom: 20px;
        overflow: hidden;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-select {
        display: block;
        top: 50%;
        transform: translateY(-50%);
    }
    .el-col {
        border-radius: 4px;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        height: 1.8rem;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .p {
        font-size: .28rem;
        color: #ffffff;
        font-family: 'PingFangSC-Regular';
    }
    .Index_nav_payment {
        height: 1rem;
        width: 1rem;
    }


</style>

<script>
    export default {
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: ''
            }
        }
    }
</script>


