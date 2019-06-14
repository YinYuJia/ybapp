<template>
    <!-- 流程进度 -->
    <div class="WorkProgress">
        <div class="ProgressMsg">
            <div class="ProgressBox" :class="{'active': progress == 1,'actived': progress > 1}">
                <div class="BoxBtn">1</div>
                <div class="BoxText">收件</div>
            </div>
            <div class="ProgressBox" :class="{'active': progress == 2,'actived': progress > 2}">
                <div class="BoxBtn">2</div>
                <div class="BoxText">受理</div>
            </div>
            <div class="ProgressBox" :class="{'active': progress == 3,'actived': progress > 3}">
                <div class="BoxBtn">3</div>
                <div class="BoxText">审核</div>
            </div>
            <div class="ProgressBox" :class="{'active': progress == 4}">
                <div class="BoxBtn">4</div>
                <div class="BoxText">办结</div>
            </div>
        </div>
        <div class="ProgressLine"></div>
        <div class="ActiveLine" :style="{width: lineWidth+'rem'}"></div>
    </div>
</template>

<script>
export default {
    props:{
        progress:{
            type: Number,
            required: true
        }
    },
    computed:{
        lineWidth(){
            console.log('progress',this.progress);
            let lineWidth;
            if(this.progress === 2){
                lineWidth = 5.44/3*1;
            }else if(this.progress === 3){
                lineWidth = 5.44/3*2;
            }else if(this.progress === 4){
                lineWidth = 5.44;
            }else{
                lineWidth = 0;
            }
            return lineWidth;
        }
    },
}
</script>

<style lang="less" scoped>
.WorkProgress{
    height: 1.8rem;
    width: 7.5rem;
    background: #F6F8F7;
    position: relative;
    .ProgressMsg{
        height: 100%;
        display: flex;
        .ProgressBox{
            z-index: 3;
            width: 25%;
            position: relative;
            .BoxBtn{
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
            .BoxText{
                width: 100%;
                position: absolute;
                bottom: .33rem;
                font-size: .24rem;
                color: #999999;
                letter-spacing: 0;
                text-align: center;
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
        }
    }
    .ProgressLine{
        z-index: 1;
        height: .03rem;
        width: 5.44rem;
        position: absolute;
        top: .67rem;
        left: 50%;
        margin-left: -5.44rem/2;
        background: #c9c9c9;
    }
    .ActiveLine{
        z-index: 1;
        height: .03rem;
        position: absolute;
        top: .67rem;
        left: 50%;
        margin-left: -5.44rem/2;
        background: #1492FF;
    }
}
</style>
