<template>
    <div class="searchDisease">
        <div class="Title">
            <el-row>
                <el-col :span="6">
                    <span class="el-icon-arrow-left" style="color: #ffffff;font-size: .38rem;margin-left: -50px;" @click="back()"></span>
                </el-col>
                <el-col :span="12">
                    <div class="NameTitle">
                        疾病诊断
                    </div>
                </el-col>
                <el-col :span="6">
                    <span class="el-icon-search" style="color: #ffffff;font-size: .50rem;margin-right: -.4rem;margin-top:.35rem"></span>
                </el-col>
            </el-row>
        </div>
        <div class="SearchList">
            <div class="Line" v-for="item in resultList" :key="item.code">
                {{item.code}}-{{item.value}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            resultList:[
                {code:'1000', value:'疾病名称1'},
                {code:'1001', value:'疾病名称2'},
                {code:'1002', value:'疾病名称3'},
                {code:'1003', value:'疾病名称4'},
                {code:'1004', value:'疾病名称5'},
                {code:'1005', value:'疾病名称6'},
                {code:'1006', value:'疾病名称7'},
                {code:'1007', value:'疾病名称8'},
                {code:'1008', value:'疾病名称9'},
            ]
        }
    },
    created(){
        this.epFn.setTitle('疾病诊断')
    },
    methods:{
        back(){
            this.$router.push('/turnOut')
        }
    }
}
</script>

<style lang="less" scoped>
.searchDisease{
    .Title {
        height: 1.2rem;
        background-color: #05AEF0;
        font-size: .36rem;
        line-height: 1.2rem;
        overflow: hidden;
        .NameTitle{
            color: white;
        }
    }
    .SearchList{
        background-color: white;
        padding: 0 .3rem;
        .Line{
            height: 1rem;
            display: block;
            height: 1rem;
            line-height: 1rem;
            text-align: left;
            font-size: .31rem;
            border-bottom: .01rem solid #D5D5D5;
            &:last-child{
                border-bottom: none;
            }
        }
    }
}
</style>