<template>
    <!-- 标题 -->
    <div class="Title">
        <el-row>
            <el-col :span="6">
                <div class="BackIcon" @click="back()">
                    <svg-icon icon-class="serveComponent_back" />
                    <span>返回</span>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="NameTitle">{{title}}</div>
            </el-col>
            <el-col :span="6">
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type: String,
            required: true
        },
        backRouter:{
            type: String,
            required: true
        }
    },
    methods:{
        back(){
            this.$router.push(this.backRouter);
        }
    }
}
</script>

<style lang="less" scoped>
.Title {
    display: none;
    height: .8rem;
    width: 7.5rem;
    background-color: white;
    line-height: .8rem;
    .BackIcon{
        display: flex;
        align-items: center;
        color: #1492FF;
        font-size: .32rem;
        .svg-icon{
            height: .5rem;
            width: .5rem;
        }
    }
    .NameTitle {
        color: #000000;
        letter-spacing: 0;
        font-size: .36rem;
    }
}
</style>
