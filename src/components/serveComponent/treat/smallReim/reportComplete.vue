<template>
    <div class="infoRecord">
        <!-- 标题 -->
        <Title :title="'零星报销'" :backRouter="'/infoRecord'"></Title>
        <!-- 填写进度 -->
        <WorkProgress :currentStep="4" :progress="progress"></WorkProgress>
        <!-- 银行信息 -->
        <div class="Content">
            <svg-icon icon-class="serveComponent_success" />
            <div class="successText">申报完成</div>
            <div class="hintText">请在10个工作日后查看事项结果</div>
        </div>
        <!-- 按钮 -->
        <Footer @submit="submit()" :btnText="'查看事项明细'" :canSubmit="true"></Footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{
                account: '', //银行账户
                place: '', //开户行
                name: '', //开户名
            },
            progress:[
                {step:1,name:'申请报销'},
                {step:2,name:'发票信息'},
                {step:3,name:'信息录入'},
                {step:4,name:'申报完成'}
            ],
        }
    },
    methods:{
        submit(){
            this.$router.push('/smallReimDetail');
        }
    }
}
</script>

<style lang="less" scoped>
.infoRecord{
    .Content {
        height: 7.5rem;
        margin-bottom: 1.4rem;
        padding: 1.66rem 0 2.1rem 0;
        background: #FFF;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .svg-icon{
            height: 1.4rem;
            width: 1.4rem;
        }
        .successText{
            font-size: .36rem;
            color: #000000;
            letter-spacing: 0;
            text-align: center;
        }
        .hintText{
            font-size: .28rem;
            color: #666666;
            letter-spacing: 0;
            text-align: center;
        }
    }
}
</style>