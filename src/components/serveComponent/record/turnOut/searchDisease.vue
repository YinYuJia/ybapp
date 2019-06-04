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
                    <span class="el-icon-bell" style="color: #ffffff;font-size: .50rem;margin-right: -.4rem;margin-top:.35rem"></span>
                </el-col>
            </el-row>
        </div>
        <div class="searchInput">
            <div class="inputBox">
                <input type="text">
            </div>
            <div class="serachBtn">查询</div>
        </div>
    </div>
</template>

<script>
export default {
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
    .searchInput{
        height: 1rem;
        width: 7.5rem;
        background-color: #05AEF0;
        font-size: .28rem;
        display: flex;
    }
}
</style>