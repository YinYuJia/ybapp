<template>
    <div class="bestDiv">
        <el-row class="WorkHead">
            <el-col class="Choose" :span="6">
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col class="Search" :span="15">
                <el-input placeholder="请输入搜索内容" v-model="search">
                    <i slot="prefix" class="el-input__icon el-icon-search Icon"></i>
                </el-input>
            </el-col>
            <el-col class="Btn" :span="3">
                <svg-icon icon-class="Index_Message" className="Index_Message" />
            </el-col>
        </el-row>
    </div>
</template>

<style lang="less" scoped>
    .bestDiv {
        background-color: #05AEF0;
        height: 1.2rem;
        padding-top: .21rem;
        .WorkHead {
            height: .6rem;
            .Choose,.Search {
                height: .6rem;
                .el-select{
                    display: block;
                }
                .el-input{
                    display: block;
                }
            }
            .Btn {
                height: .6rem;
                .svg-icon{
                    display: block;
                    height: 100%;
                    width: 100%;
                }
            }
        }
    }
</style>

<style>
/*覆盖Element自带样式*/
/* 选择 */
.bestDiv .WorkHead .Choose .el-select .el-input__inner{
    height: .6rem;
    border: none;
    background: #05AEF0;
    font-size: .32rem;
    color: #FFF;
    letter-spacing: 0;
}
.bestDiv .WorkHead .Choose .el-select .el-input__inner::placeholder{
    color: #FFF;
}
.bestDiv .WorkHead .Choose .el-input__suffix .el-input__suffix-inner .el-select__caret{
    color: #FFF;
    line-height: .6rem;
    font-size: .3rem;
}
/* 搜索 */
.bestDiv .WorkHead .Search .el-input .el-input__inner{
    height: .6rem;
    border: none;
    background: #50C6F4;
    font-size: .24rem;
    opacity: 0.65;
    font-size: .24rem;
    color: #FFF;
    letter-spacing: 0;
}
.bestDiv .WorkHead .Search .el-input .el-input__inner::placeholder{
    color: #FFF;
}
.bestDiv .WorkHead .Search .el-input__prefix .el-input__icon{
    line-height: .6rem;
    color: #FFF;
    font-size: .4rem;
    opacity: 0.8;
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
                value: '',
                search:''
            }
        }
    }
</script>


