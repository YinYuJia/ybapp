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
        <div class="iconContainer" :style="{height:containerHeight}">
            <!-- 参保服务 -->
            <div class="iconList">
                <div class="iconContent" id="insured">
                    <div class="iconBox" @click="showWork('/getProof','参保服务','领取就医凭证')">
                        <svg-icon icon-class="serveComponent_icon_1" />
                        <div class="text">就医凭证</div>
                    </div>
                    <div class="iconBox" @click="showWork('/insuredChange','参保服务','信息变更')">
                        <svg-icon icon-class="serveComponent_icon_2" />
                        <div class="text">参保变更</div>
                    </div>
                    <div class="iconBox" @click="showWork('/searchPrint','参保服务','打印信息')">
                        <svg-icon icon-class="serveComponent_icon_3" />
                        <div class="text">打印信息</div>
                    </div>
                    <div class="iconBox" @click="showWork('/transferRenewing','参保服务','关系转移接续')">
                        <svg-icon icon-class="serveComponent_icon_4" />
                        <div class="text">转移接续</div>
                    </div>
                </div>
            </div>
            <!-- 备案服务 -->
            <div class="iconList">
                <div class="listHeader">备案服务</div>
                <div class="iconContent" id="record">
                    <div class="iconBox" @click="showWork('/elseWhere','备案服务','异地就医备案')">
                        <svg-icon icon-class="serveComponent_icon_5" />
                        <div class="text">异地备案</div>
                    </div>
                    <div class="iconBox" @click="showWork('/turnOut','备案服务','转外备案')">
                        <svg-icon icon-class="serveComponent_icon_6" />
                        <div class="text">转外就医</div>
                    </div>
                    <div class="iconBox" @click="showWork('/abroadTake','备案服务','出国带药')">
                        <svg-icon icon-class="serveComponent_icon_7" />
                        <div class="text">出国带药</div>
                    </div>
                    <div class="iconBox" @click="showWork('/familyAid','备案服务','家庭共济')">
                        <svg-icon icon-class="serveComponent_icon_8" />
                        <div class="text">家庭共济</div>
                    </div>
                    <div class="iconBox" @click="showWork('/specialDrug','备案服务','特制特药备案')">
                        <svg-icon icon-class="serveComponent_icon_9" />
                        <div class="text">特药备案</div>
                    </div>
                    <div class="iconBox" @click="showWork('/chronicDisease','备案服务','规定（特殊慢性）病种待遇备案')">
                        <svg-icon icon-class="serveComponent_icon_10" />
                        <div class="text">规定病种</div>
                    </div>
                </div>
            </div>
            <!-- 待遇服务 -->
            <div class="iconList">
                <div class="listHeader">待遇服务</div>
                <div class="iconContent" id="treat">
                    <div class="iconBox" @click="showWork('/smallReim','待遇报销','基本医疗保险参保人员医疗费用零星报销')">
                        <svg-icon icon-class="serveComponent_icon_11" />
                        <div class="text">零星报销</div>
                    </div>
                    <div class="iconBox" @click="showWork('/payLimit','待遇报销','视同缴费年限核定')">
                        <svg-icon icon-class="serveComponent_icon_12" />
                        <div class="text">缴费年限</div>
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
                </div>
            </div>
            <!-- 其他服务 -->
            <div class="iconList">
                <div class="listHeader">其他服务</div>
                <div class="iconContent" id="others">
                    <div class="iconBox" @click="showDetail('searchBaseInfo','个人信息查询')">
                        <svg-icon icon-class="serveComponent_icon_16" />
                        <div class="text">信息查询</div>
                    </div>
                    <div class="iconBox" @click="showDetail('searchInsuredInfo','参保信息查询')">
                        <svg-icon icon-class="serveComponent_icon_17" />
                        <div class="text">参保信息</div>
                    </div>
                    <div class="iconBox" @click="showDetail('searchProgress','我的事项')">
                        <svg-icon icon-class="serveComponent_icon_18" />
                        <div class="text">办事进度</div>
                    </div>
                    <div class="iconBox" @click="showDetail('searchFee','费用信息查询')">
                        <svg-icon icon-class="serveComponent_icon_19" />
                        <div class="text">费用信息</div>
                    </div>
                    <div class="iconBox" @click="showDetail('searchRecord','备案信息查询')">
                        <svg-icon icon-class="serveComponent_icon_20" />
                        <div class="text">备案信息</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper';
export default {
    data(){
        return{
            activeIndex: 1,
            headerSwiper: {},
            containerHeight: 0,
        }
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
            this.containerHeight = offsetHeight + window.innerHeight - (titleHeight * 2) + 'px'
        });
        // window.addEventListener('scroll', this.handleScroll);
    },
    methods:{
        changeIndex(chooseId,index){
            this.activeIndex = index;
            this.headerSwiper.slideTo(index-1,200);
            let scrollHieght = document.getElementById(chooseId).offsetTop;
            let titleHeight = document.getElementById('title').offsetHeight;
            window.scrollTo(0,scrollHieght - titleHeight);
        },
        handleScroll(){
        },
        showWork(url,item,itemInfo) {
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
    // 图标区域
    .iconContainer{
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