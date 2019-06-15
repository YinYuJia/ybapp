<template>
    <!-- 流程进度 -->
    <div class="WorkProgress">
        <div class="ProgressMsg">
            <div class="ProgressBox"
                v-for="item in progress" :key="item.step"
                :class="{'active': item.step == currentStep,'actived': currentStep > item.step}">
                <div class="BoxBtn">{{item.step}}</div>
                <div class="BoxLine" :style="{width: lineWidth+'rem'}"></div>
                <div class="BoxText">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        currentStep:{
            type: Number,
            required: true
        },
        progress:{
            type: Array,
            default:() => [
                {step:1,name:'收件'},
                {step:2,name:'受理'},
                {step:3,name:'审核'},
                {step:4,name:'办结'}
            ]
        }
    },
    computed:{
        lineWidth(){
            return 5.44/(this.progress.length-1);
        }
    },
}
</script>

<style lang="less" scoped>
.WorkProgress{
    height: 1.8rem;
    width: 7.5rem;
    position: relative;
    .ProgressMsg{
        height: 100%;
        display: flex;
        .ProgressBox{
            width: 100%;
            position: relative;
            .BoxBtn{
                z-index: 2;
                height: .4rem;
                width: .4rem;
                line-height: .4rem;
                background: #989898;
                font-size: .26rem;
                color: #FFFFFF;
                text-align: center;
                border-radius: .2rem;
                position: absolute;
                left: 50%;
                margin-left: -0.2rem;
                top: .5rem;
            }
            .BoxLine{
                z-index: 1;
                height: .03rem;
                position: absolute;
                top: .67rem;
                left: 50%;
                background: #c9c9c9;
            }
            .BoxText{
                width: 100%;
                position: absolute;
                bottom: .33rem;
                font-size: .24rem;
                color: #999999;
                letter-spacing: 0;
                text-align: center;
            }
            &:last-child{
                .BoxLine{
                    display: none;
                }
            }
        }
        .active{
            .BoxBtn{
                height: .72rem;
                width: .72rem;
                line-height: .72rem;
                background: #1492FF;
                font-size: .36rem;
                border-radius: .36rem;
                position: absolute;
                left: 50%;
                margin-left: -0.36rem;
                top: .34rem;
            }
            .BoxText{
                color: #000000;
            }
        }
        .actived{
            .BoxBtn{
                background: #82C9FF;
            }
            .BoxLine{
                background: #1492FF;
            }
        }
    }
}
</style>
