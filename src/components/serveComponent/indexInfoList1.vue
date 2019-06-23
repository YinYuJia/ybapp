<template>
    <div class="indexInfoList">
        <!-- 头部 -->
        <div class="indexHeader">
            <svg-icon icon-class="serveComponent_background" />
            <div class="headerText">医疗保障专区</div>
            <div class="headerInfo">汇总浙江省医疗保障服务</div>
            <div class="headerPad">
                <div class="iconBox" @click="changeUsername()">
                    <svg-icon icon-class="serveComponent_icon1" />
                    <div class="text">电子社保卡</div>
                </div>
                <div class="iconBox" @click="changeUserCode()">
                    <svg-icon icon-class="serveComponent_icon2" />
                    <div class="text">支付码</div>
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
                <div class="iconBox" @click="showWork('/smallReim','待遇报销','基本医疗保险参保人员医疗费用零星报销')">
                    <svg-icon icon-class="serveComponent_icon_11" />
                    <div class="text">零星报销</div>
                </div>
                <div class="iconBox" @click="showWork('/transferRenewing','参保服务','关系转移接续')">
                    <svg-icon icon-class="serveComponent_icon_4" />
                    <div class="text">转移接续</div>
                </div>
                <div class="iconBox" @click="showDetail('searchFee','费用信息查询')">
                    <svg-icon icon-class="serveComponent_icon_19" />
                    <div class="text">费用信息</div>
                </div>
                <div class="iconBox" @click="showDetail('searchProgress','我的事项')">
                    <svg-icon icon-class="serveComponent_icon8" />
                    <div class="text">办事进度</div>
                </div>
            </div>
            <div class="iconList">
                <div class="iconBox" @click="showWork('/elseWhere','备案服务','异地就医备案')">
                    <svg-icon icon-class="serveComponent_icon9" />
                    <div class="text">异地备案</div>
                </div>
                <div class="iconBox" @click="showWork('/specialDrug','备案服务','特制特药备案')">
                    <svg-icon icon-class="serveComponent_icon10" />
                    <div class="text">特药备案</div>
                </div>
                <div class="iconBox" @click="showWork('/getProof','参保服务','领取就医凭证')">
                    <svg-icon icon-class="serveComponent_icon11" />
                    <div class="text">就医凭证</div>
                </div>
                <div class="iconBox" @click="goRouter('/indexInfoListMore')">
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
        <!-- <div class="hotMsg">
            <div class="hotHeader">热点资讯</div>
            <div class="msgLine" v-for="(item,index) in hotMsg" :key="index">
                <div class="textBox">
                    <div class="textInfo">{{item.text | msgLength}}</div>
                    <div class="dateInfo">{{item.date}}</div>
                </div>
                <div class="imgBox"></div>
            </div>
        </div> -->
    </div>
</template>

<script>
import Swiper from 'swiper';
import { MessageBox } from 'mint-ui'
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
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
        })
    },
    created(){
        this.epFn.setTitle('医疗保障专区')
        // 获取参保地
        // name: sessionStorage.getItem("userName") ,
                // idCard:sessionStorage.getItem("idCard") ,
        // /h5/jy1033/getRecord
        let params=this.formatSubmitData();
        this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1033/getRecord', params).then((resData) => {
            console.log('返回成功信息',resData)
            //   成功   1000
            if ( resData.enCode == 1000 ) {  
                this.$store.dispatch('SET_USER_DETAILINFO',{
                    insured: resData.AAB301,
                    regionName:resData.RegionName || '杭州市'
                })
            }else if (resData.enCode == 1001 ) {
            //   失败  1001
                this.$toast(resData.msg);
                return;
            }else{
                this.$toast('业务出错');
                return;
            }
        })
    },
    filters:{
        msgLength: function(val){
            return val.slice(0,20) + '...';
        }
    },
    methods:{
        goRouter(route){
            this.$router.push(route);
        },
        formatSubmitData(){  
            let submitForm ={}

            // 加入用户名和电子社保卡号
          
            submitForm.AAC003 = '殷宇佳'
            submitForm.AAE135 = '113344223344536624'
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1033");
            return params;
        },
        changeUsername(){
            let user = Object.assign({}, this.$store.state.SET_USER_BASEINFO);
            MessageBox.prompt('用户名','').then(({ value, action }) => {
                user.name = value;
                this.$store.dispatch('SET_USER_BASEINFO',user);
            });
        },
        changeUserCode(){
            let user = Object.assign({}, this.$store.state.SET_USER_BASEINFO);
            MessageBox.prompt('社保卡号','').then(({ value, action }) => {
                user.idNo = value;
                this.$store.dispatch('SET_USER_BASEINFO',user);
                console.log(this.$store.state.SET_USER_BASEINFO);
            });
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
        height: 4.48rem;
        padding-bottom: 2.48rem;
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