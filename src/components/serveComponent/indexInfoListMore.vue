<template>
    <div class="indexInfoListMore">
        <Title :title="'更多医保服务'" :backRouter="'/indexInfoList1'"></Title>
        <div class="infoListHeader">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" @click="changeIndex(1)" :class="{'active': activeIndex == 1}">参保服务</div>
                    <div class="swiper-slide" @click="changeIndex(2)" :class="{'active': activeIndex == 2}">备案服务</div>
                    <div class="swiper-slide" @click="changeIndex(3)" :class="{'active': activeIndex == 3}">待遇服务</div>
                    <div class="swiper-slide" @click="changeIndex(4)" :class="{'active': activeIndex == 4}">其他服务</div>
                    <div class="swiper-slide" @click="changeIndex(5)" :class="{'active': activeIndex == 5}">555服务</div>
                    <div class="swiper-slide" @click="changeIndex(6)" :class="{'active': activeIndex == 6}">666服务</div>
                    <div class="swiper-slide" @click="changeIndex(7)" :class="{'active': activeIndex == 7}">777服务</div>
                </div>
            </div>
        </div>
        <!-- 图标列表 -->
        <div class="iconContainer">
            <!-- 参保服务 -->
            <div class="iconList">
                <div class="iconContent">
                    <div class="iconBox">
                        <svg-icon icon-class="serveComponent_icon5" />
                        <div class="text">就医凭证</div>
                    </div>
                    <div class="iconBox">
                        <svg-icon icon-class="serveComponent_icon6" />
                        <div class="text">信息变更</div>
                    </div>
                    <div class="iconBox">
                        <svg-icon icon-class="serveComponent_icon7" />
                        <div class="text">打印信息</div>
                    </div>
                    <div class="iconBox">
                        <svg-icon icon-class="serveComponent_icon8" />
                        <div class="text">转移接续</div>
                    </div>
                </div>
            </div>
            <!-- 备案服务 -->
            <div class="iconList">
                <div class="listHeader">备案服务</div>
                <div class="iconContent">
                    <div class="iconBox">
                        <svg-icon icon-class="serveComponent_icon5" />
                        <div class="text">异地备案</div>
                    </div>
                    <div class="iconBox">
                        <svg-icon icon-class="serveComponent_icon6" />
                        <div class="text">转外就医</div>
                    </div>
                    <div class="iconBox">
                        <svg-icon icon-class="serveComponent_icon7" />
                        <div class="text">出国带药</div>
                    </div>
                    <div class="iconBox">
                        <svg-icon icon-class="serveComponent_icon8" />
                        <div class="text">家庭共济</div>
                    </div>
                    <div class="iconBox">
                        <svg-icon icon-class="serveComponent_icon8" />
                        <div class="text">特药备案</div>
                    </div>
                    <div class="iconBox">
                        <svg-icon icon-class="serveComponent_icon8" />
                        <div class="text">规定病种</div>
                    </div>
                </div>
            </div>
            <!-- 待遇服务 -->
            <div class="iconList">
                <div class="listHeader">待遇服务</div>
                <div class="iconContent">
                    <div class="iconBox">
                        <svg-icon icon-class="serveComponent_icon5" />
                        <div class="text">零星报销</div>
                    </div>
                    <div class="iconBox">
                        <svg-icon icon-class="serveComponent_icon6" />
                        <div class="text">缴费年限</div>
                    </div>
                    <div class="iconBox">
                        <svg-icon icon-class="serveComponent_icon7" />
                        <div class="text">平产/剖腹</div>
                    </div>
                    <div class="iconBox">
                        <svg-icon icon-class="serveComponent_icon8" />
                        <div class="text">流产/引产</div>
                    </div>
                    <div class="iconBox">
                        <svg-icon icon-class="serveComponent_icon8" />
                        <div class="text">未就业配偶</div>
                    </div>
                </div>
            </div>
            <!-- 其他服务 -->
            <div class="iconList">
                <div class="listHeader">其他服务</div>
                <div class="iconContent">
                    <div class="iconBox">
                        <svg-icon icon-class="serveComponent_icon5" />
                        <div class="text">信息变更</div>
                    </div>
                    <div class="iconBox">
                        <svg-icon icon-class="serveComponent_icon6" />
                        <div class="text">参保信息</div>
                    </div>
                    <div class="iconBox">
                        <svg-icon icon-class="serveComponent_icon7" />
                        <div class="text">办事进度</div>
                    </div>
                    <div class="iconBox">
                        <svg-icon icon-class="serveComponent_icon8" />
                        <div class="text">费用信息</div>
                    </div>
                    <div class="iconBox">
                        <svg-icon icon-class="serveComponent_icon8" />
                        <div class="text">备案信息</div>
                    </div>
                    <div class="iconBox">
                        <svg-icon icon-class="serveComponent_icon8" />
                        <div class="text">就诊信息</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Title from './common/Title'
import Swiper from 'swiper';
export default {
    components:{
        Title
    },
    data(){
        return{
            activeIndex: 1,
            headerSwiper: {},
        }
    },
    mounted(){
<<<<<<< HEAD
        this.headerSwiper = new Swiper('.swiper-container', {
            slidesPerView: 3.5, //显示的范围
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
            freeMode: true, //去除惯性
=======
        new Swiper('.swiper-container', {
            slidesPerView: 2, //显示的范围
            spaceBetween: -8, //间隔大小
>>>>>>> f2c48cedd4af3d01b4621ff1762e6b3eeeb962b2
        })
    },
    methods:{
        changeIndex(index){
            this.activeIndex = index;
            this.headerSwiper.slideTo(index-2,200);
        }
    }
}
</script>

<style lang="less" scoped>
.indexInfoListMore{
    // 头部
    .infoListHeader{
        height: .94rem;
        width: 7.5rem;
        background: #FFF;
        position: fixed;
        top: 0.8rem;
        .swiper-container{
            height: 100%;
            width: 100%;
            .swiper-wrapper{
                border-bottom: .04rem solid #E6E6E6;
                .swiper-slide{
                    height: .94rem;
                    width: 2rem;
                    line-height: .94rem;
                    font-size: .36rem;
                    color: #333333;
                    letter-spacing: -0.0064rem;
                    text-align: center;
                }
                .active{
                    border-bottom: .04rem solid #0284FD;
                    color: #000;
                    font-weight: bold;
                }
            }
        }
    }
    // 图标区域
    .iconContainer{
        background: #FFF;
        padding: 0 .2rem;
        margin-top: 1.74rem;
        .iconList{
            .listHeader{
                height: .8rem;
                line-height: .8rem;
                font-size: .44rem;
                color: #000000;
                letter-spacing: 0;
                text-align: left;
                font-weight: bold;
            }
            .iconContent{
                display: flex;
                flex-wrap: wrap;
                padding: .2rem 0 .44rem 0;
                .iconBox{
                    height: 1.4rem;
                    width: 1.775rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    .svg-icon{
                        height: .68rem;
                        width: .68rem;
                    }
                    .text{
                        font-size: .28rem;
                        color: #3A4259;
                        letter-spacing: 0;
                        text-align: center;
                        line-height: .28rem;
                    }
                }
            }
        }
    }
}
</style>