<template>
    <div class="indexInfoList">
        <!-- 头部 -->
        <div class="indexHeader">
            <svg-icon icon-class="serveComponent_background" />
            <div class="headerText">医疗保障专区</div>
            <div class="headerInfo">汇聚浙江省医疗保障服务</div>
            <div class="headerPad" >
                <div class="iconBox" @click="socialCard">
                    <svg-icon v-if="1" icon-class="serveComponent_icon1" />
                    <svg-icon v-if="0" icon-class="serveComponent_grey_1" />
                    <div class="text">电子社保卡</div>
                </div>
                <div class="iconBox" @click="payCode">
                    <svg-icon v-if="1" icon-class="serveComponent_icon2" />
                    <svg-icon v-if="0" icon-class="serveComponent_grey_2" />
                    <div class="text">支付码</div>
                </div>
                <div class="iconBox" @click="movePay">
                    <svg-icon v-if="1" icon-class="serveComponent_icon4" />
                    <svg-icon v-if="0" icon-class="serveComponent_grey_4" />
                    <div class="text">移动支付</div>
                </div>
                <div class="iconBox" @click="showDetail('medicalInsuranceAccount','医保账户')">
                    <svg-icon v-if="1" icon-class="serveComponent_icon3" />
                    <svg-icon v-if="0" icon-class="serveComponent_grey_3" />
                    <div class="text">医保账户</div>
                </div>

            </div>
        </div>
        <!-- 图标列表 -->
        <div class="iconContent">
            <div class="iconList">
                <div class="iconBox" @click="showDetail('smallReim','基本医疗保险参保人员医疗费用零星报销')">
                    <svg-icon icon-class="serveComponent_icon5" />
                    <svg-icon icon-class="serveComponent_province" class="provinceIcon" />
                    <div class="text">零星报销</div>
                </div>
                <div class="iconBox" @click="showDetail('transferRenewing','关系转移接续')">
                    <svg-icon icon-class="serveComponent_icon6" />
                    <svg-icon icon-class="serveComponent_province" class="provinceIcon" />
                    <div class="text">医保转接</div>
                </div>
                <div class="iconBox" v-if="iconFlag" @click="showDetail('searchFee','费用信息查询')">
                    <svg-icon icon-class="serveComponent_icon_19" />
                    <div class="text">就医信息</div>
                </div>
                <div class="iconBox"  @click="showDetail('searchProgress','我的事项')">
                    <svg-icon icon-class="serveComponent_icon8" />
                    <div class="text">办事进度</div>
                </div>
                <div class="iconBox" v-if="!iconFlag">
                </div>
                <div class="iconBox" v-if="!iconFlag">
                </div>
            </div>
            <div class="iconList">
                <div class="iconBox" v-if="iconFlag" @click="showDetail('searchBaseInfo','个人信息查询')">
                    <svg-icon icon-class="serveComponent_icon_16" />
                    <div class="text">参保信息</div>
                </div>
                <div class="iconBox" v-if="iconFlag" @click="showDetail('searchInsuredInfo','参保信息查询')">
                    <svg-icon icon-class="serveComponent_icon_17" />
                    <div class="text">征缴信息</div>
                </div>
                <div class="iconBox" v-if="iconFlag" @click="showDetail('getProof','领取就医凭证')">
                    <svg-icon icon-class="serveComponent_icon11" />
                    <div class="text">就医凭证</div>
                </div>
                <div class="iconBox" v-if="iconFlag" @click="goRouter('indexInfoListMore')">
                    <svg-icon icon-class="serveComponent_icon12" />
                    <div class="text">更多</div>
                </div>
            </div>
        </div>
        <!-- banner -->
        <div class="banner">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <svg-icon icon-class="serveComponent_icon13" @click="hint" /></div>
                    <div class="swiper-slide">
                        <svg-icon icon-class="serveComponent_icon14" @click="hint" /></div>
                    <div class="swiper-slide">
                        <svg-icon icon-class="serveComponent_icon16" @click="hint" /></div>
                </div>
            </div>
        </div>
        <!-- 轮播图 -->
        <div class="carousel">
            <swipe>
                <swipe-item>
                    <svg-icon icon-class="serveComponent_icon15" /></swipe-item>
                <!-- <swipe-item>
                    <svg-icon icon-class="serveComponent_icon15" /></swipe-item>
                <swipe-item>
                    <svg-icon icon-class="serveComponent_icon15" /></swipe-item> -->
            </swipe>
        </div>
        <div class="changeUserBtn" v-if="ifShow">
            <div class="btn" @click="changeUsername(true)">更改用户名</div>
            <div class="btn" @click="changeUserCode(true)">更改社保卡号</div>
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
        <div class="bottomline">
            <p>本服务由浙江政务服务网提供</p>
            <p>服务咨询热线 : <span class="bottomSpan">{{tel}}</span> </p>
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import {
        MessageBox
    } from 'mint-ui'
    export default {
        data() {
           
            return {
                 ifShow:true,
                tel: "0571-88808880",
                imgurl: "",
                hotMsg: [ //热点资讯
                    {
                        text: '“数字经济”：开启浙江经济增长新“大时代”',
                        date: '2019-09-09'
                    },
                    {
                        text: '本式港澳通行证将失效！9图出入境证件办理全攻略',
                        date: '2019-09-09'
                    }
                ],
                iconFlag: false,
            }
        },
        mounted() {
            new Swiper('.swiper-container', {
                slidesPerView: 2.15, //显示的范围
                spaceBetween: -8, //间隔大小
                slidesOffsetBefore: 10, //靠左偏移量
                slidesOffsetAfter: 10, //靠左偏移量
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents: true, //修改swiper的父元素时，自动初始化swiper
            })
        },
        created() {


            console.log(21000 * 0.87)
            // 清空零星报销的Vuex
            let SET_SMALL_REIM_SUBMIT={
                AAS301: '', //参保地统筹省编码
                AAB301: '', //参保地统筹市编码
                AKC264: 0, //发票费用总额
                AAE008: '', //收款开户行
                AAE009: '', //收款开户名
                AAE010: '', //收款银行账号
                BKC013: '', //发票张数
                AKB020: '', //机构编码（医院编码）
            }
            this.$store.dispatch('SET_SMALL_REIM_SUBMIT',SET_SMALL_REIM_SUBMIT)
            let SET_SMALL_REIM_1={
                hospitalName: '', //就诊医院
                AKB020: '', //医院编码
                AKA078: '', //就诊类型
                AAE030: '' //就诊日期
            }
            this.$store.dispatch('SET_SMALL_REIM_1',SET_SMALL_REIM_1)
            let SET_SMALL_REIM_2={
                eleInvoices: [], //电子发票信息
                invoicesImg: [], //附件信息信息  图片id
            }
            this.$store.dispatch('SET_SMALL_REIM_2',SET_SMALL_REIM_2)
            
            let SET_ENCLOSURE=[]
            this.$store.dispatch('SET_ENCLOSURE',SET_ENCLOSURE)
            // 清空结束

            console.log("$build",this.$build)
            //  切换打包环境  1 网新恩普包  2  浙理办包
            if (this.$build =="1" ) {
                this.ifShow = true   //显示输入人名社保卡
            }else if( this.$build == "2" ){
                this.ifShow = false; //隐藏输入人名社保卡
                this.setNativeMsg();  //浙理办打包需要打开 
                this.getUserRegion();  // 自动获取参保地
            }
            console.log('dddddd引入浙理办SDKddddddd', dd)
 
            this.epFn.setTitle('医疗保障专区')

            // 获取参保地
            if(sessionStorage.getItem("GinsengLandCode") == "339900"){
                this.iconFlag = true;  //省本级设置为true
            }else{
                this.iconFlag = false;  //其他情况设置为false
            }

        },
        filters: {
            msgLength: function(val) {
                return val.slice(0, 20) + '...';
            }
        },
        methods: {
            hint(){
                this.$toast("功能正在建设中");
            },
            //移动支付
            movePay(){

                let _this = this
                dd.ready({
                    developer: 'daip@dtdream.com',
                    usage: [
                        'dd.biz.navigation.open',
                    ],
                    remark: '移动支付'
                }, function() {
                    dd.biz.navigation.open({
                        pageId: 'card',
                        params:{
                            id:"medicalPayCard",
                            functionType:1//1医保SDK
                        },
                        onSuccess: function(data) {
                            console.log(data)
                        },
                        onFail: function(error) {
                            console.log(error)
                            _this.$toast("请升级浙里办APP版本")
                        }
                    })
                })
            },
            //支付码
            payCode(){
                let _this = this
                dd.ready({
                    developer: 'daip@dtdream.com',
                    usage: [
                        'dd.biz.navigation.open',
                    ],
                    remark: '支付码'
                }, function() {
                    dd.biz.navigation.open({
                        pageId: 'card',
                        params:{
                            id:"socialCard",
                            functionType:2//1社保卡首页 2打开社保卡支付码 3打开社保卡关联页
                        },
                        onSuccess: function(data) {
                            console.log(data)
                        },
                        onFail: function(error) {
                            console.log(error)
                            _this.$toast("请升级浙里办APP版本")
                        }
                    })
                })
            },
            //电子社保卡
            socialCard(){
                let _this = this
                dd.ready({
                    developer: 'daip@dtdream.com',
                    usage: [
                        'dd.biz.navigation.open',
                    ],
                    remark: '电子社保卡'
                }, function() {
                    dd.biz.navigation.open({
                        pageId: 'card',
                        params:{
                            id:"socialCard",
                            functionType:1//1社保卡首页 2打开社保卡支付码 3打开社保卡关联页
                        },
                        onSuccess: function(data) {
                            console.log(data)
                        },
                        onFail: function(error) {
                            console.log(error)
                            _this.$toast("请升级浙里办APP版本")
                        }
                    })
                })
            },
            yibaozhanghu() {
                this.$toast("功能正在建设中")
            },
            goRouter(route) {
                this.$router.push(route);
            },
            setNativeMsg() {
                this.$store.dispatch('SET_NATIVEMSG', {
                    title: "",
                    describe: "",
                    type: "",
                    typeItem: "",
                    name: sessionStorage.getItem("userName"),
                    idCard: sessionStorage.getItem("idCard"),
                    PublicHeader: {
                        imei: '',
                        mac: '1111',
                        phoneModel: '',
                        platform: '',
                        signType: '',
                        sign: '',
                        version: 'v2.0',
                    }
                });
            },
            getUserRegion() {
                let params = this.formatSubmitData();
                this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1033/getRecord', params).then((resData) => {
                    console.log('返回成功信息', resData)
                    //   成功   1000
                    if (resData.enCode == 1000) {
                        if (resData.AAB301) {
                            sessionStorage.setItem("GinsengLandCode", resData.AAB301)
                            sessionStorage.setItem("GinsengLandName", resData.RegionName)
                            this.$store.dispatch('SET_USER_DETAILINFO', {
                                insured: resData.AAB301,
                                regionName: resData.RegionName || '杭州市'
                            })
                            console.log('用户参保地信息',sessionStorage.getItem("GinsengLandCode"));
                            if(sessionStorage.getItem("GinsengLandCode") == "339900"){
                                this.iconFlag = true;  //省本级设置为true
                            }else{
                                this.iconFlag = false;  //其他情况设置为false
                            }
                        } else {
                            dd.ready({
                                developer: 'daip@dtdream.com',
                                usage: [
                                    'dd.device.location.get',
                                ],
                                remark: '获取当前位置'
                            }, function() {
                                dd.device.location.get({
                                    onSuccess: function(data) {
                                        console.log(data)
                                    },
                                    onFail: function(error) {}
                                })
                            })
                        }
                    } else if (resData.enCode == 1001) {
                        //   失败  1001
                        this.$toast(resData.msg);
                        return;
                    } else {
                        this.$toast('业务出错');
                        return;
                    }
                })
            },
            formatSubmitData() {
                let submitForm = {}
                // 加入用户名和电子社保卡号
                submitForm.AAC003 = sessionStorage.getItem("userName");
                submitForm.AAE135 = sessionStorage.getItem("idCard");
                // 请求参数封装
                const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader, submitForm, "1033");
                return params;
            },
            changeUsername(str) {
                if (str) {
                    let user = Object.assign({}, this.$store.state.SET_USER_BASEINFO);
                    MessageBox.prompt('用户名', '').then(({
                        value,
                        action
                    }) => {
                        user.name = value;
                        this.$store.dispatch('SET_USER_BASEINFO', user);
                        sessionStorage.setItem('userName', value);
                        this.setNativeMsg();
                    });
                } else {
                    this.$toast("功能正在建设中")
                }
            },
            changeUserCode(str) {
                if (str) {
                    let user = Object.assign({}, this.$store.state.SET_USER_BASEINFO);
                    MessageBox.prompt('社保卡号', '').then(({
                        value,
                        action
                    }) => {
                        user.idNo = value;
                        this.$store.dispatch('SET_USER_BASEINFO', user);
                        sessionStorage.setItem('idCard', value);
                        this.setNativeMsg();
                        this.getUserRegion();
                    });
                } else {
                    this.$toast('功能正在建设中')
                }
            },
            showWork(url, item, itemInfo) {
                sessionStorage.setItem('itemUrl', url);
                sessionStorage.setItem("item", item);
                sessionStorage.setItem("itemInfo", itemInfo);
                this.$router.push({
                    name: 'Index',
                    params: {
                        info: url,
                        item: item,
                        itemInfo: itemInfo
                    }
                })
            },
            showDetail(url, item) {
                const tip = sessionStorage.getItem("GinsengLandCode")
                const tipstr = sessionStorage.getItem("GinsengLandName")

                
                if ( tip != "339900" &&  tip != "331099") {
                    console.log("tiptiptiptiptiptip",tip);
                    
                    this.$toast(tipstr + "服务暂未开通")
                    return;
                }

                 
                // 医保账户 只有省本级能点
                if (url == 'medicalInsuranceAccount' ) {
                    if (tip != '339900') {
                           
                        this.$toast(tipstr + "服务暂未开通")
                        return;
                    }
                }
                //  台州市只能点转移接续
                // if ( url == "smallReim" ) {
                //     if ( tip != "339900" ) {
                //         this.$toast(tipstr + "服务暂未开通")
                //         return
                //     }
                // }
                let str = sessionStorage.getItem("GinsengLandCode")
                console.log('str', str)
                if (str == "" || str == undefined || str == null) {
                    this.$toast("未获取到您的参保地信息")
                    return
                }
                sessionStorage.setItem('itemUrl', url);
                sessionStorage.setItem("item", item);
                this.$router.push({
                    name: url,
                    params: {
                        item: item,
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .indexInfoList {
        // 头部
        .indexHeader {
            height: 3.4rem;
            position: relative;
            .svg-icon {
                height: 3.4rem;
                width: 7.5rem;
            }
            .headerText {
                position: absolute;
                top: .4rem;
                left: .5rem;
                font-size: .6rem;
                color: #FFFFFF;
                line-height: .6rem;
            }
            .headerInfo {
                position: absolute;
                top: 1.1rem;
                left: .5rem;
                opacity: 0.8;
                font-size: .28rem;
                color: #FFFFFF;
                letter-spacing: .0046rem;
                line-height: .4rem;
            }
            .headerPad {
                position: absolute;
                top: 2.3rem;
                left: .2rem;
                height: 2.2rem;
                width: 7.1rem;
                background: #FFFFFF;
                border: 0 solid #E7EDF7;
                box-shadow: 0 0 .28rem 0 rgba(0, 0, 0, 0.07);
                border-radius: .08rem;
                display: flex;
                justify-content: space-around;
                align-items: center;
                .iconBox {
                    height: 1.4rem;
                    width: 1.4rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    .svg-icon {
                        height: .68rem;
                        width: .68rem;
                    }
                    .text {
                        font-size: .28rem;
                        color: #3A4259;
                        letter-spacing: 0;
                        text-align: center;
                        line-height: .28rem;
                    }
                }
            }
        } // 图标区域
        .iconContent {
            height: 4.74rem;
            background: #FFF;
            padding: 1.8rem .2rem 0 .2rem;
            .iconList {
                display: flex;
                justify-content: space-around;
                .iconBox {
                    position: relative;
                    height: 1.4rem;
                    width: 1.4rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    .svg-icon {
                        height: .68rem;
                        width: .68rem;
                    }
                    .provinceIcon {
                        height: .28rem;
                        width: .5rem;
                        position: absolute;
                        top: 0rem;
                        right: 0rem;
                    }
                    .text {
                        font-size: .28rem;
                        color: #3A4259;
                        letter-spacing: 0;
                        text-align: center;
                        line-height: .28rem;
                    }
                }
                &:last-child {
                    margin-top: .16rem;
                }
            }
        } // banner
        .banner {
            height: 2.96rem;
            padding: .6rem 0;
            background: #FFF;
            .swiper-container {
                height: 100%;
                .swiper-wrapper {
                    height: 100%;
                    .swiper-slide {
                        .svg-icon {
                            height: 100%;
                            width: 100%;
                        }
                    }
                }
            }
        } // 轮播图
        .carousel {
            height: 4.48rem;
            padding-bottom: 2.48rem;
            background: #FFF;
            .c-swipe {
                height: 100%;
                .svg-icon {
                    height: 100%;
                    width: 100%;
                }
            }
        } // 热点资讯
        .hotMsg {
            background: #FFF;
            padding: 0 .32rem;
            .hotHeader {
                height: .8rem;
                line-height: .8rem;
                font-size: .44rem;
                color: #000000;
                letter-spacing: 0;
                text-align: left;
                font-weight: bold;
            }
            .msgLine {
                height: 2.24rem;
                padding: .32rem 0;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid#E5E5E5;
                .textBox {
                    width: 4rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .textInfo {
                        height: 1rem;
                        font-size: .36rem;
                        color: #000000;
                        letter-spacing: 0;
                        line-height: .48rem;
                        text-align: left;
                    }
                    .dateInfo {
                        font-size: .28rem;
                        color: #999999;
                        text-align: left;
                        line-height: .3rem;
                    }
                }
                .imgBox {
                    height: 1.6rem;
                    width: 2.2rem;
                    background: #EEE;
                    .img {
                        height: 100%;
                        width: 100%
                    }
                }
            }
        }
    }
    .bottomline {
        font-size: .28rem;
        margin-top: .1rem;
        margin-bottom: .18rem;
        text-align: center;
        p {
            margin: 0 10px;
            line-height: 25px;
            color: #888;
            .bottomSpan {
                color: #1492ff; // color: red;
                a {
                    color: #1492ff
                }
            }
        }
    }
.changeUserBtn{
    display: flex;
    justify-content: space-around;
    .btn{
        height: .6rem;
        line-height: .6rem;
        width: 3.5rem;
        border: 1px solid #DDD;
        font-size: .36rem;
        border-radius: .2rem;
        background: #FFF;
    }
}
</style>