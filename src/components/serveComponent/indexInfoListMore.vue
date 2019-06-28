<template>
    <div class="indexInfoListMore">
        <div class="infoListHeader" id="title">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" @click="changeIndex('insured',1)" :class="{'active': activeIndex == 1}">参保服务</div>
                    <div class="swiper-slide" @click="changeIndex('record',2)" :class="{'active': activeIndex == 2}">备案服务</div>
                    <div class="swiper-slide" @click="changeIndex('treat',3)" :class="{'active': activeIndex == 3}">待遇服务</div>
                    <div class="swiper-slide" @click="changeIndex('others',4)" :class="{'active': activeIndex == 4}">其他服务</div>
                </div>
            </div>
        </div>
        <!-- 图标列表 -->
        <div id="wrapper">
            <div class="iconContainer" :style="{height:containerHeight}">
                <!-- 参保服务 -->
                <div class="iconList">
                    <div class="iconContent" id="insured">
                        <div class="iconBox" @click="showDetail('getProof','领取就医凭证')">
                            <svg-icon icon-class="serveComponent_icon_1" />
                            <div class="text">就医凭证</div>
                        </div>
                        <div class="iconBox" @click="showDetail('insuredChange','参保信息变更')">
                            <svg-icon icon-class="serveComponent_icon_2" />
                            <div class="text">信息变更</div>
                        </div>
                        <div class="iconBox" @click="showDetail('searchPrint','打印信息')">
                            <svg-icon icon-class="serveComponent_icon_3" />
                            <div class="text">医保证明</div>
                        </div>
                        <div class="iconBox" @click="showDetail('transferRenewing','关系转移接续')">
                            <svg-icon icon-class="serveComponent_icon6" />
                            <svg-icon icon-class="serveComponent_province" class="provinceIcon" />
                            <div class="text">医保转接</div>
                        </div>
                    </div>
                </div>
                <!-- 备案服务 -->
                <div class="iconList">
                    <div class="listHeader">备案服务</div>
                    <div class="iconContent" id="record">
                        <div class="iconBox" @click="showDetail('elseWhere','异地就医备案')">
                            <svg-icon icon-class="serveComponent_icon_5" />
                            <div class="text">异地备案</div>
                        </div>
                        <div class="iconBox" @click="showDetail('turnOut','转外备案')">
                            <svg-icon icon-class="serveComponent_icon_6" />
                            <div class="text">转外就医</div>
                        </div>
                        <div class="iconBox" @click="showDetail('abroadTake','出国带药')">
                            <svg-icon icon-class="serveComponent_icon_7" />
                            <div class="text">出国带药</div>
                        </div>
                        <div class="iconBox" @click="showDetail('familyAid','家庭共济')">
                            <svg-icon icon-class="serveComponent_icon_8" />
                            <div class="text">家庭共济</div>
                        </div>
                        <div class="iconBox" @click="showDetail('specialDrug','特制特药备案')">
                            <svg-icon icon-class="serveComponent_icon_9" />
                            <div class="text">特药备案</div>
                        </div>
                        <div class="iconBox" @click="showDetail('chronicDisease','规定（特殊慢性）病种待遇备案')">
                            <svg-icon icon-class="serveComponent_icon_10" />
                            <div class="text">规定病种</div>
                        </div>
                        <div class="iconBox"></div>
                        <div class="iconBox"></div>
                    </div>
                </div>
                <!-- 待遇服务 -->
                <div class="iconList">
                    <div class="listHeader">待遇服务</div>
                    <div class="iconContent" id="treat">
                        <div class="iconBox" @click="showDetail('smallReim','基本医疗保险参保人员医疗费用零星报销')">
                            <svg-icon icon-class="serveComponent_icon5" />
                            <svg-icon icon-class="serveComponent_province" class="provinceIcon" />
                            <div class="text">零星报销</div>
                        </div>
                        <div class="iconBox" @click="showDetail('payLimit','视同缴费年限核定')">
                            <svg-icon icon-class="serveComponent_icon_12" />
                            <div class="text">年限核定</div>
                        </div>
                        <div class="iconBox">
                            <svg-icon icon-class="serveComponent_icon_13" />
                            <div class="text">平产/剖腹</div>
                        </div>
                        <div class="iconBox">
                            <svg-icon icon-class="serveComponent_icon_14" />
                            <div class="text">流产/引产</div>
                        </div>
                        <div class="iconBox">
                            <svg-icon icon-class="serveComponent_icon_15" />
                            <div class="text">未就业配偶</div>
                        </div>
                        <div class="iconBox"></div>
                        <div class="iconBox"></div>
                        <div class="iconBox"></div>
                    </div>
                </div>
                <!-- 其他服务 -->
                <div class="iconList">
                    <div class="listHeader">其他服务</div>
                    <div class="iconContent" id="others">
                        <div class="iconBox" @click="showDetail('searchBaseInfo','个人信息查询')">
                            <svg-icon icon-class="serveComponent_icon_16" />
                            <div class="text">参保信息</div>
                        </div>
                        <div class="iconBox" @click="showDetail('searchInsuredInfo','参保信息查询')">
                            <svg-icon icon-class="serveComponent_icon_17" />
                            <div class="text">征缴信息</div>
                        </div>
                        <div class="iconBox" @click="showDetail('searchProgress','我的事项')">
                            <svg-icon icon-class="serveComponent_icon_18" />
                            <div class="text">办事进度</div>
                        </div>
                        <div class="iconBox" @click="showDetail('searchFee','费用信息查询')">
                            <svg-icon icon-class="serveComponent_icon_19" />
                            <div class="text">就医信息</div>
                        </div>
                        <div class="iconBox" @click="showDetail('searchRecord','备案信息查询')">
                            <svg-icon icon-class="serveComponent_icon_20" />
                            <div class="text">备案信息</div>
                        </div>
                        <div class="iconBox"></div>
                        <div class="iconBox"></div>
                        <div class="iconBox"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper';
import IScroll from 'iscroll/build/iscroll-probe';
export default {
    data(){
        return{
            activeIndex: 1,
            headerSwiper: {},
            containerHeight: 0,
            myScroll: undefined,
        }
    },
    destroyed(){
        this.myScroll.destroy();
        this.myScroll = null;
    },
    created(){
        this.epFn.setTitle('医疗保障专区')
    },
    mounted(){
        this.headerSwiper = new Swiper('.swiper-container', {
            slidesPerView: 3.5, //显示的范围
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
            freeMode: true, //去除惯性
        });
        // 计算留白高度
        this.$nextTick(()=>{
            let lastContentHeight = document.getElementById('others').offsetHeight;
            let titleHeight = document.getElementById('title').offsetHeight;
            let offsetHeight = document.getElementById('others').offsetTop;
            this.containerHeight = offsetHeight + window.innerHeight - titleHeight + 'px';
            setTimeout(()=>{
                this.myScroll = new IScroll('#wrapper',{
                    mouseWheel: true, //允许鼠标滑动
                    bounce: false, //关闭回弹
                    scrollbars: false, //关闭滚动条
                    click: true, //开启点击功能
                    // momentum: false, //关闭势能，提升性能
                    probeType: 3
                });
                this.myScroll.on('scroll',this.handleScroll);
            },50);
        });
    },
    methods:{
        // gotoSDK(){
        //     console.log(111)
        //     let url =
        //         location.href.substring(0, location.href.indexOf("#")) +
        //         // "#/payDetail?obj=" +
        //         // JSON.stringify(item) +
        //         "&signNo=" +
        //         "2037EAE0AC692753452C80EA73580B86" +
        //         "&idCard=" +
        //         "331081198611144030" +
        //         "&name=" +
        //         "林江";
        //     let ua = navigator.userAgent;
        //     let isIos = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        //     if (isIos) {
        //         window.webkit.messageHandlers.goToPay.postMessage(url);
        //     } else {
        //         window.EPSdk.newHtml(url);
        //     }
        // },
        changeIndex(chooseId,index){
            this.activeIndex = index;
            this.headerSwiper.slideTo(index-1,50);
            let scrollHieght = 0;
            var u = navigator.userAgent;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if(isiOS){
                scrollHieght = -document.getElementById(chooseId).offsetTop+document.getElementById('title').offsetHeight;
            }else{
                scrollHieght = -document.getElementById(chooseId).offsetTop;
            }
            this.myScroll.scrollTo(0, scrollHieght);
        },
        slideIndex(index){
            this.activeIndex = index;
            this.headerSwiper.slideTo(index-1,50);
        },
        handleScroll(){
            var u = navigator.userAgent;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

            let scrollY = -(this.myScroll.y);
            let title = 10;
            if(isiOS){
                title = document.getElementById('title').offsetHeight + 10;
            }
            let scroll_1 = document.getElementById('insured').offsetTop - title;
            let scroll_2 = document.getElementById('record').offsetTop - title;
            let scroll_3 = document.getElementById('treat').offsetTop - title;
            let scroll_4 = document.getElementById('others').offsetTop - title;
            if(scrollY >= scroll_1 && scrollY < scroll_2){
                this.slideIndex(1);
            }else if(scrollY >= scroll_2 && scrollY < scroll_3){
                this.slideIndex(2);
            }else if(scrollY >= scroll_3 && scrollY < scroll_4){
                this.slideIndex(3);
            }else if(scrollY >= scroll_4){
                this.slideIndex(4);
            }
        },
        getScrollTop() {  
            var scrollPos;  
            if (window.pageYOffset) {  
            scrollPos = window.pageYOffset; }  
            else if (document.compatMode && document.compatMode != 'BackCompat')  
            { scrollPos = document.documentElement.scrollTop; }  
            else if (document.body) { scrollPos = document.body.scrollTop; }   
            return scrollPos;   
        },
        showWork(url,item,itemInfo) {
            sessionStorage.setItem('itemUrl',url);
            sessionStorage.setItem("item",item);
            sessionStorage.setItem("itemInfo",itemInfo);
            this.$router.push({
                name: 'Index',
                params: {
                    info: url,
                    item:item,
                    itemInfo:itemInfo
                }
            })
        },
        showDetail(url,item) {
            let str = sessionStorage.getItem("GinsengLandCode")
                console.log('str',str)
                if ( str == "" || str == undefined || str == null) {
                this.$toast("未获取到您的参保地信息")
                return
            }
            sessionStorage.setItem('itemUrl',url);
            sessionStorage.setItem("item",item);
            this.$router.push({
                name: url,
                params: {
                    item:item,
                }
            })
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
        z-index: 999;
        top: 0;
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
    #wrapper{
        position: fixed;
        height: 100%;
    }
    // 图标区域
    .iconContainer{
        touch-action: none;
        background: #FFF;
        padding: 0 .2rem;
        margin-top: .94rem;
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
                justify-content: space-around;
                flex-wrap: wrap;
                padding: .2rem 0 .44rem 0;
                .iconBox{
                    position: relative;
                    height: 1.4rem;
                    width: 1.7rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    .svg-icon{
                        height: .68rem;
                        width: .68rem;
                    }
                    .provinceIcon{
                        height: .28rem;
                        width: .5rem;
                        position: absolute;
                        top: 0rem;
                        right: 0.1rem;
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