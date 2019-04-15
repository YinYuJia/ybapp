<template>
    <div>
        <div v-if="Propmsg == 'DepartmentsList'" class="DepartmentsList">
            <p>111111</p>
        <div class="swiper-container bestDiv" >
            
            <div class="swiper-wrapper">
                <div class="swiper-slide  swiper-slide1">1</div>
                <div class="swiper-slide swiper-slide1">2</div>
                <div class="swiper-slide swiper-slide1">3</div>
                <div class="swiper-slide swiper-slide1">4</div>
                <div class="swiper-slide swiper-slide1">5</div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
        </div>
        </div>
        <div class="swiper-container1 bestDiv1" v-if="Propmsg == 'Healthy'">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="../../../../static/images/index/Index_RotationChart_HealthyRow.png" alt="">
                </div>
                <div class="swiper-slide">2</div>
                <div class="swiper-slide">3</div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>

<style lang='less' scoped>
.DepartmentsList {
    height: 3.2rem;
    p {
             font-size: .3rem;
             height: .9rem;
             line-height: .9rem;
         }
}
    .bestDiv1 {
        height: 100px;
        img {
            height: 2.1rem;
            width: 7.5rem;
        }
    }
    .bestDiv {
        height: 1.8rem;
         
    }
    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
    .swiper-slide1 {
        border-radius: .04rem;
        border: 2px solid rgba(0,0,0,0.20);
    }
</style>

<script>
    import Swiper from 'swiper';
    export default {
        name: 'HelloWorld',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        props: {
            Propmsg: {
                type: String,
                default: ""
            }
        },
        methods: {},
        mounted() {
            console.log(this.Propmsg)
            if (this.Propmsg == 'DepartmentsList') {
                new Swiper('.swiper-container', {
                    slidesPerView: 3.5,
                    spaceBetween: 20,
                    autoplay: true,
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true, //修改swiper的父元素时，自动初始化swiper
                    //   pagination: {
                    //     el: '.swiper-pagination',
                    //     clickable: true,
                    //   },
                });
            }else if ( this.Propmsg == 'Healthy') {
                
                new Swiper('.swiper-container1', {
                    slidesPerView: 1,
                    // spaceBetween: 20,
                    autoplay: true,
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true, //修改swiper的父元素时，自动初始化swiper
                    //   pagination: {
                    //     el: '.swiper-pagination',
                    //     clickable: true,
                    //   },
                });
            }
        }
    }
</script>


