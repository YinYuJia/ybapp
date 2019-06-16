<template>
    <!-- 标题 -->
    <Title :title="'零星报销'" :backRouter="'/reportComplete'"></Title>
</template>

<script>
import Title from '../../common/Title'
import WorkProgress from '../../common/WorkProgress'
import Footer from '../../common/Footer'
export default {
    components:{
        Title,WorkProgress,Footer
    },
}
</script>

<style lang="less" scoped>

</style>