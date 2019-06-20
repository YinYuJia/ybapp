<template>
    <div class="progressTime">
        <div class="InfoLine">
            <div class="InfoName"><span>申请时间:</span></div>
            <div class="InfoText">{{replyDate}}</div>
        </div>
        <div class="InfoLine">
            <div class="InfoName"><span>进度时间:</span></div>
            <div class="InfoText">{{progressDate}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        replyDate:{
            type: String,
            default: ''
        },
        progressDate:{
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="less" scoped>
.progressTime{
    .InfoLine{
        height: 1.2rem;
        position: relative;
        font-family: PingFangSC-Regular;
        font-size: .28rem;
        display: flex;
        border-bottom: .01rem solid #D5D5D5;
        .InfoName{
            width: 1.5rem;
            line-height: 1.2rem;
            text-align: left;
            span{
                height: .6rem;
                line-height: .6rem;
                letter-spacing: 0;
                color: #000;
            }
        }
        .InfoText{
            line-height: 1.2rem;
            display: flex;
            position: relative;
            align-items: center;
            color: #333;
        }
        &:last-child{
            border-bottom: none;
        }
    }
}
</style>
