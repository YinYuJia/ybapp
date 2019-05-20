<template>
    <div class="download">
        <div class="picture">

        </div>
        <!-- 按钮 -->
        <footer class="Btn active" @click="search()">
            下载PDF
        </footer>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
.download{
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
