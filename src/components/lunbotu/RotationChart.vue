<template>
    <swipe  v-model="index" :loop='loop' :pagination='pagination' class="itemStyle">
        <swipe-item class="itemStyle">
            <img src="../../../static/images/StartupPage/01.jpg" alt="">
        </swipe-item>
        <swipe-item class="itemStyle">
            <img src="../../../static/images/StartupPage/02.jpg" alt="">
        </swipe-item>
        <swipe-item class="itemStyle">
            <img src="../../../static/images/StartupPage/03.jpg" alt="">
        </swipe-item>
    </swipe>
</template>

<style lang='less' scoped>
    img {
        width: 7.5rem;
        height: 100%;
        float: left;
    }
    ;
    .clickTrun {
        float: left;
        // background-color: red;
        height: 70px;
        width: 150px; //   position: absolute;
        margin-top: -110px;
        margin-left: 50%;
        transform: translateX(-50%);
        z-index: 10000;
    }
    ;
    .itemStyle {
        height: 850px;
        line-height: 850px
    }
</style>

<script>
    import '../../common/js/base.js'
    export default {
        // 数据集合
        data() {
            return {
                index: 0, // two way,
                loop: false,
                pagination: false
            }
        },
        // c-swipe 内部将重新计算 Swipe 的宽度，
        // 并根据新的宽度来计算滚屏的距离。这个可以解决容器重置大小后 c-swipe 滚屏距离不正确的问题。
        handleResize() {
            this.$refs.swipe.reset();
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize);
        },
        // 生命周期发送请求
        created() {
            /*
             * 1.自动轮播  定时器  无缝衔接  动画结束瞬间定位
             * 2.点需要随着轮播的滚动改变对应的点  改变当前样式  当前图片的索引
             * 3.手指滑动的时候让轮播图滑动   touch事件  记录坐标轴的改变 改变轮播图的定位（位移css3）
             * 4.当滑动的距离不超过一定的距离的时候  需要吸附回去  过渡的形式去做
             * 5.当滑动超过了一定的距离  需要 跳到 下一张或者上一张  （滑动的方向） 一定的距离（屏幕的三分之一）
             * */
        },
    }
</script>


