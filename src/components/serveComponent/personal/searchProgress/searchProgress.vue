<template>
    <div class="searchProgress">
        <Title :title="'我的事项'" :backRouter="'/'"></Title>
        <!-- 标题 -->
        <div class="IndexMenu">
            <div class="MenuLine">
                <div class="MenuCell" @click="changeIndex(1)" :class="{'active': activeIndex == 1}">待受理</div>
                <div class="MenuCell" @click="changeIndex(2)" :class="{'active': activeIndex == 2}">受理中</div>
                <div class="MenuCell" @click="changeIndex(3)" :class="{'active': activeIndex == 3}">已办结</div>
            </div>
        </div>
        <mt-loadmore v-show="itemGroup.length" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <!-- 列表 -->
            <ul class="ListInfo">
                <li class="ListLine" v-for="(item,index) in itemGroup" :key="index">
                    <div class="InfoName">
                        <div class="InfoHead">{{item.name}}</div>
                        <div class="InfoDate">{{item.date}}</div>
                    </div>
                    <svg-icon icon-class="serveComponent_arrowRight" />
                </li>
            </ul>
        </mt-loadmore>
        <div v-show="!itemGroup.length">
        <div class="pic_null"></div>
        <div class="tip">暂无事项~~~</div>
        </div>
        
    </div>
</template>
<script>
export default {
    data(){
        return{
            allLoaded: true,
            activeIndex: 1,
            pageNum:1,
            itemGroup: [
                // {name: '基本医疗保险', date: '2019-05-19 12:09:31'},
                // {name: '领取基本医疗保险就医凭证', date: '2019-05-19 12:09:31'},
                // {name: '基本医疗保险职工参保信息变更登记', date: '2019-05-19 12:09:31'},
                // {name: '参保人员查询打印社会保险信息', date: '2019-05-19 12:09:31'},
            ],


        }
    },
    created () {
        this.request();  
    },
    methods:{
        loadBottom() {
        if (!this.allLoaded) {
            this.showList();
        }
        this.allLoaded = true;
        this.$refs.loadmore.onBottomLoaded();
        },
        changeIndex(index){
            this.activeIndex=index;
            this.itemGroup=[];
            if(index==1){
                this.request();
            }else if(index==2){
                this.request1();
            }else if(index==3){
                this.request2();
            }

        },
        request(){
                // 封装数据
                let params = this.formatSubmitData();
                // 开始请求
                this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1014/getInfo', params).then((resData) => {
                        console.log('返回成功信息',resData)
                        //   成功   1000
                        if ( resData.enCode == 1000 ) {
                            this.$router.push('/searchInsuredResult');
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
        formatSubmitData(){
                let submitForm ={};
                submitForm.BOD037 = ""//办件状态
                submitForm.pageNum = this.form.pageNum//页码
                // submitForm.debugTest=  "true";
                // 加入用户名和电子社保卡号
                if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                    submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                    submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
                }else {
                    submitForm.AAC003 = '殷宇佳';
                    submitForm.AAE135 = "113344223344536624";
                }
                // 请求参数封装
                console.log('submitForm',submitForm)
                const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1014");
                return params;
            },
        request1(){
                // 封装数据
                let params = this.formatSubmitData1();
                // 开始请求
                this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1014/getInfo', params).then((resData) => {
                        console.log('返回成功信息',resData)
                        //   成功   1000
                            if ( resData.enCode == 1000 ) {
                                this.$router.push('/searchInsuredResult');
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
        formatSubmitData1(){
                let submitForm ={};
                submitForm.AAS301 = this.form.AAS301//申请地省
                submitForm.AAB301 = this.form.AAB301//申请地市
                submitForm.AAQ301 = this.form.AAQ301//申请地区
                submitForm.AAE091 = this.form.AAE091//缴费月数
                // submitForm.debugTest=  "true";
                // 加入用户名和电子社保卡号
                if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                    submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                    submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
                }else {
                    submitForm.AAC003 = '殷宇佳';
                    submitForm.AAE135 = "113344223344536624";
                }
                // 请求参数封装
                console.log('submitForm',submitForm)
                const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1014");
                return params;
            },
        request2(){
                // 封装数据
                let params = this.formatSubmitData2();
                // 开始请求
                this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1014/getInfo', params).then((resData) => {
                        console.log('返回成功信息',resData)
                        //   成功   1000
                            if ( resData.enCode == 1000 ) {
                                this.$router.push('/searchInsuredResult');
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
        formatSubmitData2(){
                let submitForm ={};
                submitForm.AAS301 = this.form.AAS301//申请地省
                submitForm.AAB301 = this.form.AAB301//申请地市
                submitForm.AAQ301 = this.form.AAQ301//申请地区
                submitForm.AAE091 = this.form.AAE091//缴费月数
                // submitForm.debugTest=  "true";
                // 加入用户名和电子社保卡号
                if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                    submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                    submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
                }else {
                    submitForm.AAC003 = '殷宇佳';
                    submitForm.AAE135 = "113344223344536624";
                }
                // 请求参数封装
                console.log('submitForm',submitForm)
                const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1014");
                return params;
            },
    }
}
</script>

<style lang="less" scoped>
.searchProgress{
    .IndexMenu {
        height: 1.2rem;
        width: 7.5rem;
        background: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;
        .MenuLine {
            height: .62rem;
            width: 6.9rem;
            background: #FFFFFF;
            border: .01rem solid #1492FF;
            border-radius: .05rem;
            display: flex;
            .MenuCell {
                line-height: .62rem;
                width: 100%;
                color: #1492FF;
                text-align: center;
                letter-spacing: 0;
                font-size: .28rem;
                border-right: .01rem solid #1492FF;
                &:first-child {
                    border-top-left-radius: .05rem;
                    border-bottom-left-radius: .05rem;
                }
                &:last-child {
                    border-top-right-radius: .05rem;
                    border-bottom-right-radius: .05rem;
                    border-right: none;
                }
            }
            .active {
                color: #FFF;
                background: #1492FF;
            }
        }
    }
    .ListInfo{
        width: 7.5rem;
        padding: 0 .37rem;
        background: white;
        .ListLine{
            height: 1.6rem;
            border-bottom: .01rem solid #D5D5D5;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .InfoName{
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                .InfoHead{
                    height: .4rem;
                    line-height: .4rem;
                    font-size: .28rem;
                    color: #000000;
                    letter-spacing: 0;
                }
                .InfoDate{
                    height: .33rem;
                    line-height: .33rem;
                    margin-top: .1rem;
                    font-size: .24rem;
                    color: #999;
                    letter-spacing: 0;
                }
            }
            .svg-icon{
                height: .3rem;
                width: .3rem;
            }
            &:last-child{
                border-bottom: none;
            }
        }
    }
    .tip {
        font-size: 16px;
        color: #353535;
        text-align: center;
    }
}
</style>