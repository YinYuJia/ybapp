<template>
    <div class="bestDiv">
        <el-row :gutter="20">
            <el-col :span="7">
                <div class="grid-content bg-purple Row1 first">
                    <svg-icon icon-class="Index_Search" className="Index_Search" />
                </div>
            </el-col>
            <el-col :span="10">
                <div class="grid-content bg-purple Row2">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="grid-content bg-purple Row3 first">
                    <svg-icon icon-class="Index_Message" className="Index_Message" />
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
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .first {
        line-height: .7rem;
    }
    .Row1 {
        height: 1rem;
        text-align: left;
                    .Index_Search {
            text-align: left;
            margin-left: .23rem;
            height: .6rem;
            width: .6rem;
        }
    }
    .Row2 {
        height: 1rem;
        text-align: center
    }
    .Row3 {
        height: 1rem;
        text-align: right;
                .Index_Message {
            text-align: center;
            height: .6rem;
            width: .6rem;
            margin-right: .23rem;
        }
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


