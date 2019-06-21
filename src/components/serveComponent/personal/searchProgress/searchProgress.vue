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
        <mt-loadmore 
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded" 
        
        ref="loadmore">
            <!-- 列表 -->
            <ul class="ListInfo">
                <li class="ListLine" v-for="(item,index) in itemGroup" :key="index" @click="gotoplace(item)">
                    <div class="InfoName">
                        <div class="InfoHead">{{item.AGA004}}</div>
                        <div class="InfoDate">{{item.AAE036}}</div>
                    </div>
                    <svg-icon icon-class="serveComponent_arrowRight" />
                </li>
            </ul>
        </mt-loadmore>
        <div v-if="isShow">
        <div class="pic_null"></div>
        <div class="tip">没有更多事项了~~~</div>
        </div>
        
    </div>
</template>
<script>
export default {
    data(){
        return{
            allLoaded: true,
            activeIndex: 1,
            pageSize:10,
            pageNum:"1",
            itemGroup: [
                // {name: '基本医疗保险', date: '2019-05-19 12:09:31'},
                // {name: '领取基本医疗保险就医凭证', date: '2019-05-19 12:09:31'},
                // {name: '基本医疗保险职工参保信息变更登记', date: '2019-05-19 12:09:31'},
                // {name: '参保人员查询打印社会保险信息', date: '2019-05-19 12:09:31'},
            ],
            BOD037:"1",
            totalPage:"",
            isShow:false

        }
    },
    created () {
        this.getList();
    },
    methods:{
        gotoplace(item){
            console.log("item",item)
            console.log("item.bkz019",item.bkz019)
            // this.itemInof()

        },
        changeIndex(index){
            this.activeIndex=index;
            this.itemGroup=[];
            if(index==1){
                this.BOD037="1";
                this.pageNum="1";
                this.getList();
            }else if(index==2){
                this.BOD037="2";
                this.pageNum="1";
                this.getList();
            }else if(index==3){
                this.BOD037="3";
                this.pageNum="1";
                this.getList();
            }

        },
        itemInof() {
                let params = this.formatSubmitData2();
                // 开始请求
                this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1018/getList', params).then((resData) => {
                        console.log('返回成功信息',resData)
                        //   成功   1000
                        if ( resData.enCode == 1000 ) {
                              console.log("请求成功")
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
            let submitForm = {}
                console.log(submitForm)
                // 加入用户名和电子社保卡号
                if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                    submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                    submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
                }else {
                    submitForm.AAC003 = '殷宇佳';
                    submitForm.AAE135 = "113344223344536624";
                }      
                // 请求参数封装
                const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1034");
                return params;
        },
        getList(){
                // 封装数据
                let params = this.formatSubmitData();
                // 开始请求
                this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1018/getList', params).then((resData) => {
                        console.log('返回成功信息',resData)
                        //   成功   1000
                        if ( resData.enCode == 1000 ) {
                            if(resData.LS_DS.length>0&&resData.LS_DS.length<10){
                                this.isShow=true;
                            }
                            if(resData.LS_DS.length>0){
                                this.itemGroup=[...this.itemGroup,...resData.LS_DS]
                                //向上取整
                                let Num=Math.ceil(resData.pages/this.pageSize);
                                    this.totalPage=Num;
                                    console.log("totalPage",this.totalPage)                   
                                    let Num111=Number(this.pageNum);
                                    this.pageNum=Num111                        
                                if(this.totalPage>this.pageNum){
                                    console.log("up",Num111)
                                    this.pageNum+=1;
                                    console.log("down",this.pageNum)
                                    let Num222=this.pageNum.toString();
                                    this.pageNum=Num222
                                    console.log('pageNum',this.pageNum)
                                    this.allLoaded=false
                                    console.log(this.allLoaded)
                                }else{
                                    // this.allLoaded=true
                                    this.isShow=true;
                                }
                            }

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
                submitForm.BOD037 = "1"//办件状态
                submitForm.pageNum = this.pageNum//页码
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
                const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1018");
                return params;
        },
        loadBottom() {
        console.log("加载")
        if (!this.allLoaded) {
            this.getList();
        }
        this.allLoaded = true;
        this.$refs.loadmore.onBottomLoaded();
        },
    }
}
</script>

<style lang="less" scoped>
.searchProgress{
    overflow: auto;
    font-size: 0.32rem;
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