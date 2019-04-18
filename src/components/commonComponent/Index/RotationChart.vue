<template>
    <div>
        <div v-if="Propmsg == 'DepartmentsList'" class="DepartmentsList">
            <span></span>
            <p class="titleOne">科室专家</p>
            <div class="swiper-container bestDiv">
                <div class="swiper-wrapper">
                    <div class="swiper-slide  swiper-slide1">
                        <p class='title'>内科</p>
                        <svg-icon icon-class="Index_departments_list_Internal_medicine" className="departmentsListImgs"></svg-icon>
                    </div>
                    <div class="swiper-slide  swiper-slide1">
                        <p class='title'>儿科</p>
                        <svg-icon icon-class="Index_departments_list_Pediatrics" className="departmentsListImgs"></svg-icon>
                    </div>
                    <div class="swiper-slide  swiper-slide1">
                        <p class='title'>妇产科</p>
                        <svg-icon icon-class="Index_departments_list_OAGDepartment" className="departmentsListImgs"></svg-icon>
                    </div>
                    <div class="swiper-slide  swiper-slide1">
                        <p class='title'>消化科</p>
                        <svg-icon icon-class="Index_departments_list_Gastroenterology_department" className="departmentsListImgs"></svg-icon>
                    </div>
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
        <div v-if="Propmsg == 'Rotation_chart2'" class="thirdDic">
            <div class="swiper-container2 bestDiv1">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" >
                        <img src="../../../../static/images/index/01.png" alt="">
                    </div>
                    <div class="swiper-slide" >
                         <img src="../../../../static/images/index/02.png" alt="">
                    </div>
                    <div class="swiper-slide" >
                         <img src="../../../../static/images/index/03.png" alt="">
                    </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
        </div>
    </div>
</template>

<style lang='less' scoped>
    .DepartmentsList {
        height: 3.2rem;
        span {
            display: block;
            height: .3rem;
            width: .08rem;
            background-color:#278DFF;
            float: left;
            margin-top: .3rem;
            margin-right: .22rem;
            border-radius: .04rem;
        }
        .titleOne {
            font-size: .3rem;
            height: .9rem;
            line-height: .9rem;
            text-align: left;
            font-family: 'PingFangSC-Medium';
            color: rgba(0, 0, 0, .65);
            font-weight: 700;
        }
    }
    .thirdDic {
        height: 2.1rem;
        background-color: #ffffff;
        margin-top: .3rem;
    }
    .bestDiv1 {
        height: 2.1rem;
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
        font-size: .18rem;
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
        border: 2px solid rgba(0, 0, 0, 0.20);
        position: relative;
        line-height: 0;
        .title {
            position: absolute;
            height: .72rem;
            line-height: .72rem;
            left: 0;
            top: 0;
            color: rgba(0, 0, 0, .65);
            width: 100%;
            background-color: #ffffff;
            font-size: .3rem;
        }
        .departmentsListImgs {
            width: .8rem;
            height: 1rem;
            margin-top: .7rem;
        }
    }
    .swiper-container2 {
        img {
            width: 100%;
        }
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
            if (this.Propmsg == 'DepartmentsList') {
                new Swiper('.swiper-container', {
                    slidesPerView: 3.5,
                    spaceBetween: 20,
                    // autoplay: true,
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true, //修改swiper的父元素时，自动初始化swiper
                    //   pagination: {
                    //     el: '.swiper-pagination',
                    //     clickable: true,
                    //   },
                });
            } else if (this.Propmsg == 'Healthy') {
                new Swiper('.swiper-container1', {
                    slidesPerView: 1,
                    // 偏移
                    // slidesOffsetBefore:100,
                    // spaceBetween: 20,
                    // autoplay: true,
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true, //修改swiper的父元素时，自动初始化swiper
                    //   pagination: {
                    //     el: '.swiper-pagination',
                    //     clickable: true,
                    //   },
                });
            } else if (this.Propmsg == 'Rotation_chart2') {
                new Swiper('.swiper-container2', {
                    slidesPerView: 1.3,
                    // 偏移
                    slidesOffsetBefore: 50,
                    spaceBetween: 20,
                    initialSlide: 1,
                    // autoplay: true,
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


