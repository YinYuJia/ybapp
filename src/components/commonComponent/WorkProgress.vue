<template>
    <div class="progress">
        <div class="progress-btn">办事进度</div>
        <span class="progress-msg">{{msg}}</span>
        <svg-icon icon-class="WorkPro_more" />
    </div>
</template>

<script>
export default {
    data() {
        return{
            msg: '异地就医已办理完成'
        }
    }
}
</script>

<style lang="less" scoped>
 .progress{
    position: relative;
    height: .91rem;
    display: flex;
    align-items: center;
    background: #fff;
    &:before{
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -6.54rem/2;
        height: .02rem;
        width: 6.54rem;
        background-color: #E3E3E3;
    }
    
    .progress-btn{
        height: .4rem;
        width: 1.2rem;
        margin-left: .53rem;
        border-radius: .06rem;
        background: #519AFF;
        line-height: .4rem;
        font-family: PingFangSC-Regular;
        font-size: .22rem;
        color: #FFFFFF;
        letter-spacing: 0;
    }
    .progress-msg{
        margin-left: .26rem;
        opacity: 0.65;
        font-family: PingFangSC-Regular;
        font-size: .24rem;
        color: #000000;
        letter-spacing: 0;
    }
    .svg-icon{
        display: block;
        height: .3rem;
        width: .3rem;
        margin-left: 2.71rem;
    }
 }
</style>