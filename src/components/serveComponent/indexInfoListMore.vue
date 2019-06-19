<template>
    <div class="indexInfoListMore">
        <div class="infoListHeader">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">参保服务</div>
                    <div class="swiper-slide">备案服务</div>
                    <div class="swiper-slide">待遇服务</div>
                    <div class="swiper-slide">其他服务</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper';
export default {
    mounted(){
        new Swiper('.swiper-container', {
            slidesPerView: 1.5, //显示的范围
            spaceBetween: -8, //间隔大小
        })
    },
}
</script>

<style lang="less" scoped>
.indexInfoListMore{
    .infoListHeader{
        height: .94rem;
        width: 7.5rem;
        background: #FFF;
        .swiper-container{
            height: 100%;
            width: 100%;
            .swiper-wrapper{
                .swiper-slide{
                    height: .94rem;
                    width: 2rem;
                    line-height: .94rem;
                    font-size: .36rem;
                    color: #333333;
                    letter-spacing: -0.0064rem;
                    text-align: center;
                }
            }
        }
    }
}
</style>