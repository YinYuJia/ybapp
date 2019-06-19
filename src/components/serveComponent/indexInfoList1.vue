<template>
    <div class="indexInfoList">
        <!-- 头部 -->
        <div class="indexHeader">
            <svg-icon icon-class="serveComponent_background" />
            <div class="headerText">医疗保障专区</div>
            <div class="headerInfo">汇总浙江省医疗保障服务</div>
            <div class="headerPad">
                <div class="iconBox">
                    <svg-icon icon-class="serveComponent_icon1" />
                    <div class="text">电子社保卡</div>
                </div>
                <div class="iconBox">
                    <svg-icon icon-class="serveComponent_icon2" />
                    <div class="text">缴费支付</div>
                </div>
                <div class="iconBox">
                    <svg-icon icon-class="serveComponent_icon3" />
                    <div class="text">医保账户</div>
                </div>
                <div class="iconBox">
                    <svg-icon icon-class="serveComponent_icon4" />
                    <div class="text">移动支付</div>
                </div>
            </div>
        </div>
        <!-- 图标列表 -->
        <div class="iconContent">
            <div class="iconList">
                <div class="iconBox">
                    <svg-icon icon-class="serveComponent_icon5" />
                    <div class="text">零星报销</div>
                </div>
                <div class="iconBox">
                    <svg-icon icon-class="serveComponent_icon6" />
                    <div class="text">转移接续</div>
                </div>
                <div class="iconBox">
                    <svg-icon icon-class="serveComponent_icon7" />
                    <div class="text">就诊信息</div>
                </div>
                <div class="iconBox">
                    <svg-icon icon-class="serveComponent_icon8" />
                    <div class="text">办事进度</div>
                </div>
            </div>
            <div class="iconList">
                <div class="iconBox">
                    <svg-icon icon-class="serveComponent_icon9" />
                    <div class="text">异地备案</div>
                </div>
                <div class="iconBox">
                    <svg-icon icon-class="serveComponent_icon10" />
                    <div class="text">特药备案</div>
                </div>
                <div class="iconBox">
                    <svg-icon icon-class="serveComponent_icon11" />
                    <div class="text">就医凭证</div>
                </div>
                <div class="iconBox">
                    <svg-icon icon-class="serveComponent_icon12" />
                    <div class="text">更多</div>
                </div>
            </div>
        </div>
        <!-- banner -->
        <div class="banner">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"><svg-icon icon-class="serveComponent_icon13" /></div>
                    <div class="swiper-slide"><svg-icon icon-class="serveComponent_icon14" /></div>
                    <div class="swiper-slide"><svg-icon icon-class="serveComponent_icon13" /></div>
                </div>
            </div>
        </div>
        <!-- 轮播图 -->
        <div class="carousel">
            <swipe>
                <swipe-item><svg-icon icon-class="serveComponent_icon15" /></swipe-item>
                <swipe-item><svg-icon icon-class="serveComponent_icon15" /></swipe-item>
                <swipe-item><svg-icon icon-class="serveComponent_icon15" /></swipe-item>
            </swipe>
        </div>
        <!-- 热点资讯 -->
        <div class="hotMsg">
            <div class="hotHeader">热点资讯</div>
            <div class="msgLine" v-for="(item,index) in hotMsg" :key="index">
                <div class="textBox">
                    <div class="textInfo">{{item.text | msgLength}}</div>
                    <div class="dateInfo">{{item.date}}</div>
                </div>
                <div class="imgBox"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper';
export default {
    data(){
        return{
            hotMsg:[ //热点资讯
                {text:'“数字经济”：开启浙江经济增长新“大时代”', date:'2019-09-09'},
                {text:'本式港澳通行证将失效！9图出入境证件办理全攻略', date:'2019-09-09'}
            ]
        }
    },
    mounted(){
        new Swiper('.swiper-container', {
            slidesPerView: 2.15, //显示的范围
            spaceBetween: -8, //间隔大小
            slidesOffsetBefore: 10, //靠左偏移量
            slidesOffsetAfter: 10, //靠左偏移量
        })
    },
    filters:{
        msgLength: function(val){
            return val.slice(0,20) + '...';
        }
    }
}
</script>

<style lang="less" scoped>
.indexInfoList{
    // 头部
    .indexHeader{
        height: 3.4rem;
        position: relative;
        .svg-icon{
            height: 3.4rem;
            width: 7.5rem;
        }
        .headerText{
            position: absolute;
            top: .4rem;
            left: .5rem;
            font-size: .6rem;
            color: #FFFFFF;
            line-height: .6rem;
        }
        .headerInfo{
            position: absolute;
            top: 1.1rem;
            left: .5rem;
            opacity: 0.8;
            font-size: .28rem;
            color: #FFFFFF;
            letter-spacing: .0046rem;
            line-height: .4rem;
        }
        .headerPad{
            position: absolute;
            top: 2.3rem;
            left: .2rem;
            height: 2.2rem;
            width: 7.1rem;
            background: #FFFFFF;
            border: 0 solid #E7EDF7;
            box-shadow: 0 0 .28rem 0 rgba(0,0,0,0.07);
            border-radius: .08rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .iconBox{
                height: 1.4rem;
                width: 1.4rem;
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
    // 图标区域
    .iconContent{
        height: 4.74rem;
        background: #FFF;
        padding: 1.8rem .2rem 0 .2rem;
        .iconList{
            display: flex;
            justify-content: space-around;
            .iconBox{
                height: 1.4rem;
                width: 1.4rem;
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
            &:last-child{
                margin-top: .16rem;
            }
        }
    }
    // banner
    .banner{
        height: 2.96rem;
        padding: .6rem 0;
        background: #FFF;
        .swiper-container{
            height: 100%;
            .swiper-wrapper{
                height: 100%;
                .swiper-slide{
                    .svg-icon{
                        height: 100%;
                        width: 100%;
                    }
                }
            }
        }
    }
    // 轮播图
    .carousel{
        height: 2.48rem;
        padding-bottom: .48rem;
        background: #FFF;
        .c-swipe{
            height: 100%;
            .svg-icon{
                height: 100%;
                width: 100%;
            }
        }
    }
    // 热点资讯
    .hotMsg{
        background: #FFF;
        padding: 0 .32rem;
        .hotHeader{
            height: .8rem;
            line-height: .8rem;
            font-size: .44rem;
            color: #000000;
            letter-spacing: 0;
            text-align: left;
            font-weight: bold;
        }
        .msgLine{
            height: 2.24rem;
            padding: .32rem 0;
            display: flex;
            justify-content: space-between;
            border-bottom: .01rem solid#E5E5E5;
            .textBox{
                width: 4rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .textInfo{
                    height: 1rem;
                    font-size: .36rem;
                    color: #000000;
                    letter-spacing: 0;
                    line-height: .48rem;
                    text-align: left;
                }
                .dateInfo{
                    font-size: .28rem;
                    color: #999999;
                    text-align: left;
                    line-height: .3rem;
                }
            }
            .imgBox{
                height: 1.6rem;
                width: 2.2rem;
                background: #EEE;
                .img{
                    height: 100%;
                    width: 100%
                }
            }
        }
    }
}
</style>