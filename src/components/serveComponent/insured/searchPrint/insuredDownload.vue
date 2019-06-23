<template>
    <div class="download">
        <Title :title="'打印参保证明'" :backRouter="'/searchPrint'"></Title>
        <!-- 按钮 -->
        <footer class="Btn active" @click="search()">
            下载PDF
        </footer>
    </div>
</template>

<script>
export default {
    created(){
        this.epFn.setTitle('打印参保证明')
    },
    methods:{
        
    }
}
</script>

<style lang="less" scoped>
.download{
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
    .Btn{
        height: 1rem;
        width: 100%;
        background: rgb(124, 206, 250);
        font-size: .34rem;
        color: white;
        line-height: 1rem;
        text-align: center;
        position: fixed;
        bottom: 0;
    }
    .active{
        background: #05AEF0;
    }
}
</style>
