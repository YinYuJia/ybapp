<template>
    <div class="smallReimDetial">
        <!-- 标题 -->
        <Title :title="'零星报销'" :backRouter="'/reportComplete'"></Title>
        <div class="secondTitle">基本医疗保险参保人员医疗费用零星报销</div>
        <!-- 办事进度 -->
        <WorkProgress :currentStep="currentStep" :progress="arr"></WorkProgress>
        
        <div class="Content">
            <!-- 列表 -->
            <div class="ListInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>发票总额:</span></div>
                    <div class="InfoText"><span>{{form3.AKC264}}</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>发票张数:</span></div>
                    <div class="InfoText"><span>{{form3.BKC013}}</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>申请时间:</span></div>
                    <div class="InfoText"><span>{{form3.AAE036}}</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>进度时间:</span></div>
                    <div class="InfoText"><span>{{form3.BAE019}}</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>收款开户行:</span></div>
                    <div class="InfoText"><span>{{form3.AAE008}}</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>收款开户名:</span></div>
                    <div class="InfoText"><span>{{form3.AAE009 |tuoMin(0,2)}}</span></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>收款银行账号:</span></div>
                    <div class="InfoText"><span>{{form3.AAE010|tuoMin(1,1)}}</span></div>
                </div>
            </div>
            <!-- 发票信息 -->
            <div class="invoiceContent" v-if="!invoiceComplete">
                <div class="invoiceHint">报销明细</div>
                <!-- 报销中状态 -->
                <div class="invoiceList" v-for="item in invoices" :key="item.code">
                    <div class="textLine">
                        <span class="textName">发票号</span>
                        <span class="textInfo">{{item.BKE100}}</span>
                    </div>
                    <div class="textLine">
                        <span class="textName">发票金额</span>
                        <span class="textInfo">{{item.AKC264}}</span>
                    </div>
                    <div class="textLine">
                        <span class="textName">状态</span>
                        <span class="textInfo warn">{{item.BKE586 |BKE586}}</span>
                    </div>
                </div>
            </div>
            <div class="invoiceContent" v-if="invoiceComplete">
                <div class="invoiceHint">报销明细</div>
                <!-- 报销完成状态 -->
                <div class="invoiceList2" v-for="item in invoices" :key="item.code">
                    <div class="textLine" v-if="item.BKE586==3">
                        <div class="textHeader" @click="showInvoiceDetail(item)">
                            <span>医保报销金额：</span>
                            <span class="active">{{item.BKE450}}</span>
                            <svg-icon icon-class="serveComponent_arrowRight" />
                        </div>
                        <div class="textInfo">{{item.BKE586 | BKE586}}</div>
                    </div>
                    <div class="textLine">
                        <span class="textName">发票号码</span>
                        <span class="textInfo">{{item.BKE100}}</span>
                    </div>
                    <div class="textLine">  
                        <span class="textName">发票金额</span>
                        <span class="textInfo">{{item.AKC264}}</span>
                    </div>
                    <!-- <div class="textLine">
                        <span class="textName">状态</span>
                        <span class="textInfo warn">{{item.BKE586 |BKE586}}</span>
                    </div> -->
                    <div class="textLine" v-if="item.BKE586==3">
                        <span class="textName">说明</span>
                        <span class="textInfo">{{item.AAE013==true?item.AAE013:'已报销'}}</span>
                    </div>
                </div>
            </div>
            <!-- 病例资料 -->
            <div class="caseInfo">
                <div class="infoName">病例资料（如出院小结、用药清单、医嘱等）</div>
                <div class="photoBox">
                     <div class="picWrap">
                        <div class="uploadBtn" v-for="(item,index) in picList" :key="index">
                            <img :src="item" class="pic" @click="showBigPhoto(item)" />
                            <!-- <span>{{item}}</span> -->
                        </div>
                    </div>
                    <!-- <svg-icon icon-class="serveComponent_photo" /> -->
                </div>
            </div>
            <!-- 需要补充信息 -->
            <div class="supplementInfo" v-if="needMoreInfo">
                <div class="infoName">根据业务需要，需要您补充提交以下资料</div>
                <div class="infoList" v-for="(item,index) in moreInfoList" :key="index">
                    {{BKE262}}、{{BKE265}}（{{BKE266}}）
                </div>
                <!-- <div class="photoBox">
                    <svg-icon icon-class="serveComponent_upload" />
                </div> -->
                 <div class="picWrap">
                    <div class="uploadBtn" v-for="(item,index) in picArr" :key="index">
                        <img :src="item" class="pic" @click="showBigPhoto(item)" />
                        <svg-icon icon-class="serveComponent_delete" @click="deletePic(item,index)"/>
                    </div>
                    <svg-icon  @click="uploadImg()" icon-class="serveComponent_upload" />
                </div>
            </div>
        </div>
        <Success :flag="successFlag"></Success>
        <PhotoView ref="photo" :imgUrl="imgUrl"></PhotoView>
        <!-- 补齐材料提交 -->
        <Footer v-if="needMoreInfo" @submit="submit()" :btnType="1" :canSubmit="true"></Footer>
        <!-- 撤销按钮 -->
        <Footer :btnType="2" v-if="currentStep==1" @backout="backout()"  @edit="edit()" :handleNumber="handleNumber"></Footer>
    </div>
</template>

<script>
export default {
    created(){
        if(this.$route.query.param){
            this.successFlag = 2;
        }
        this.epFn.setTitle('零星报销')
        let params = this.formatSubmitForm();
        this.request()
        
        this.request2()
        this.needSubmitInfo();  //判断是否需要提交资料
        console.log(params);
        /*if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.back, false);//false阻止默认事件
        }*/
    },
    /*destroyed(){
        window.removeEventListener('popstate', this.back, false);//false阻止默认事件
    },*/
    data(){
        return{
            invoiceComplete: true,
            invoices:[],
            needMoreInfo: false,
            moreInfoList: [],
            currentStep:1,
            handleNumber:'',
            form:{},
            form1:{},
            form2:{},
            form3:{},
            arr: [
                {step:1,name:'申请'},
                {step:2,name:'受理'},
                {step:3,name:'审核'},
                {step:4,name:'财务支付'}
            ],
            picList:[],
            successFlag: 1,
            picArr:[],
            photoIdList:[],
            imgUrl: '',
            BKZ019:""
        }
    },
    methods:{
        // 查看大图
        showBigPhoto(val){
            this.imgUrl = val;
            this.$refs.photo.open();
        },
        back(){
            // this.$router.push('/')
        },
        edit(){
            this.$router.push("/smallReim");
        },
        // 撤销提醒
        backout(){
            this.$messagebox.confirm('确定撤销吗?').then(() => {
                this.$router.push('/Index');
                this.$toast('撤销成功');
            });
        },
        // 上传图片附件
        uploadImg(){
            let This = this
            if(this.$isSdk){
                dd.ready({
                developer: 'daip@dtdream.com',
                usage: [
                    'dd.device.notification.chooseImage',
                ],
                remark: '描述业务场景'
                }, function() {
                    dd.device.notification.chooseImage ({
                        onSuccess: function(data) {
                            console.log(data.picPath[0],'请求图片成功');
                            if(data.result){
                                // This.$store.dispatch('SET_ENCLOSURE',This.picArr)
                                let submitForm = {}; 
                                // 加入用户名和电子社保卡号
                                if (This.$store.state.SET_NATIVEMSG.name !== undefined ) {
                                    submitForm.AAC003 = This.$store.state.SET_NATIVEMSG.name;
                                    submitForm.AAE135 = This.$store.state.SET_NATIVEMSG.idCard;
                                }else {
                                    
                                    This.$toast("未获取到人员基本信息");
                                }
                                // 加入子项编码
                                submitForm.AGA002 = '330600007019'
                                submitForm.photoList = data.picPath[0]
                                submitForm.PTX001 = '2'
                                const params = This.epFn.commonRequsetData(This.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'2006');
                                // 图片上传后台
                                This.$axios.post(This.epFn.ApiUrl() + '/h5/jy2006/updPhoto', params).then((resData) => {
                                    console.log('返回成功信息',resData) 
                                    //   成功   1000
                                    if ( resData.enCode == 1000 ) {
                                        // 获取图片
                                        This.picArr.push(data.picPath[0]);
                                        This.photoIdList.push(resData.photoId);
                                        // let SET_SMALL_REIM_2 = this.$store.state.SET_SMALL_REIM_2
                                        // SET_SMALL_REIM_2.invoicesImg.push(resData.photoId)
                                        // this.$store.dispatch('SET_SMALL_REIM_2',SET_SMALL_REIM_2)
                                    }else if (resData.enCode == 1001 ) {
                                    //   失败  1001
                                        This.$toast(resData.msg);
                                        return;
                                    }else{
                                        This.$toast('业务出错');
                                        return;
                                    }
                                })
                            }
                        },
                        onFail: function(error) {
                            this.$toast(error)
                            console.log("请求图片失败",error);
                            
                        }
                    })
            })
            }
            
        },
        submit(){
            if(!this.photoIdList.length){
                this.$toast('请上传附件信息')
                return
            }
            let params=this.sunmitFormatSubmitData();
            this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1030/getRecord', params).then((resData) => {
                console.log('返回成功信息',resData)
                //   成功   1000
                if ( resData.enCode == 1000 ) {
                    this.$router.push('smallReimDetail')
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
        // 删除图片
        deletePic(item,index){
            console.log('删除图片',this.photoIdList);
            this.picArr.splice(index,1)
            this.photoIdList.splice(index,1)
            console.log('删除后',this.photoIdList);
        },
        showInvoiceDetail(item){
            this.$store.dispatch('SET_INVOICEDETAIL',item)
            this.$router.push('/invoiceDetail')
        },
        needSubmitInfo(){
            // 加入用户名和电子社保卡号
            let submitForm = {};
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                
                this.$toast("未获取到人员基本信息");
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'1029');
            this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1029/expenseAccount', params).then((resData) => {
                console.log('返回成功信息',resData);
                //   成功   1000
                if ( resData.enCode == 1000 ) {  
                    this.needMoreInfo = true;
                    this.moreInfoList = resData.LS_DS1;
                }else if (resData.enCode == 1001 ) {
                //   失败  1001
                    // this.$toast(resData.msg);
                    return;
                }else{
                    this.$toast('业务出错');
                    return;
                }
            })
        },
        // 封装提交参数
        formatSubmitForm(){
            let submitForm = {
                AGA002: '330600007019',
                BKZ019:this.$route.query.param||"",
                AAC003: this.$store.state.SET_NATIVEMSG.names,
                AAE135: this.$store.state.SET_NATIVEMSG.idCard
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'1009');
            return params;
        },
        request(){
            let params=this.formatSubmitData();
            this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1009/getRecord', params).then((resData) => {
                console.log('返回成功信息',resData)
                //   成功   1000
                if ( resData.enCode == 1000 ) {  
                    if (resData.LS_DS.length > 0 ) {
                       this.currentStep = Number(resData.LS_DS[0].BOD037) 
                    }else{
                        this.$toast("暂无状态信息")
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
        request1(){
            let params=this.formatSubmitData1();
            this.$axios.post(this.epFn.ApiUrl() + '/h5/jy1031/info', params).then((resData) => {
                console.log('返回成功信息',resData)
                //   成功   1000
                if ( resData.enCode == 1000 ) {
                    // this.form={...this.form,...resData.LS_DS_13.LS_DS0} 
                    // this.form1={...this.form1,...resData.LS_DS_13.LS_DS1} 
                    // this.form2={...this.form2,...resData.LS_DS_13.LS_DS2} 
                    // console.log(this.List)
                    if(resData.LS_DS0[0].BKE586==0 || resData.LS_DS0[0].BKE586==1 || resData.LS_DS0[0].BKE586==2 ){
                        this.invoiceComplete = false
                    }
                    this.invoices = resData.LS_DS0
                    console.log('数据最新resData.LS_DS111',resData.LS_DS0);
                    
                    // this.form={...this.from,...this.List[0]}
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
                let submitForm = {}
                submitForm.AGA002 =  "330600007019";
                // 加入用户名和电子社保卡号
                submitForm.BKZ019=this.$route.query.param||""
                if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                    submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                    submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
                }else {
                    
                    this.$toast("未获取到人员基本信息");
                }
                // 请求参数封装
                const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1009");
                return params;
        },
        formatSubmitData1(){
                let submitForm = {}
                submitForm.AGA002 =  "330600007019";
                // 加入用户名和电子社保卡号
                if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                    submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                    submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
                }else {
                    
                    this.$toast("未获取到人员基本信息");
                }      
                // if(this.$route.query.param){
                //     submitForm.BKZ019 = this.$route.query.param
                // }else{
                    submitForm.BKZ019 = this.BKZ019
                // }
                
                // 请求参数封装
                const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1031");
                return params;
        },
        request2(){
            let params=this.formatSubmitData2();
            this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1016/info', params).then((resData) => {
                console.log('返回成功信息',resData)
                //   成功   1000
                if ( resData.enCode == 1000 ) {  
                    this.BKZ019 = resData.LS_DS_08.BKZ019
                    this.request1()
                    // this.form3={...this.form3,...resData.LS_DS_08}
                    let LS=resData.LS_DS_08
                    this.form3={...this.form3,...LS}
                    console.log("form",this.form)
                    this.handleNumber = resData.LS_DS_08.BKZ019
                    this.picList = []
                    
                    for(let i=0;i<resData.LS_DS_08.photoList.length;i++){
                        this.picList.push(resData.LS_DS_08.photoList[i].PUL002)
                        
                    }
                        console.log('我要的数据',this.picList);
                    // alert(this.picList.photoList[0].PUL002)
                    console.log("this.picList.photoList[0].PUL002",resData.LS_DS_08.photoList);
                    
                    // this.$toast("提交成功");
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
                submitForm.AGA002 =  "330600007019";
                // submitForm.debugTest=  "true";
                //从进度查询页面进入接收传参
                if(this.$route.query.param){
                    submitForm.lx="1";
                    submitForm.BKZ019=this.$route.query.param
                }else{
                    submitForm.lx="2";
                    submitForm.BKZ019="";
                }
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                
                this.$toast("未获取到人员基本信息");
            }
            
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1016");
            return params;
        },
        sunmitFormatSubmitData(){
                let submitForm = {}
                submitForm.AGA002 =  "330600007019";
                // 加入用户名和电子社保卡号
                if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                    submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                    submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
                }else {
                    
                    this.$toast("未获取到人员基本信息");
                }
                submitForm.photoIdList = this.photoIdList.join(',')
                // 请求参数封装
                const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1030");
                return params;
        },
    }
}
</script>

<style lang="less" scoped>
.smallReimDetial{
    .secondTitle{
        height: .8rem;
        width: 7.5rem;
        padding-top: .1rem;
        background: #FFF;
        font-size: .32rem;
        color: #000000;
        letter-spacing: 0;
        text-align: center;
    }
    .Content{
        margin-bottom: 1.6rem;
        .ListInfo{
            width: 7.5rem;
            padding: 0 .3rem;
            margin-top: .15rem;
            background: white;
            .InfoLine{
                // height: 1.2rem;
                position: relative;
                display: flex;
                font-size: .28rem;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName{
                    width: 2.2rem;
                    line-height: 1.2rem;
                    text-align: left;
                    span{
                        height: .6rem;
                        line-height: .6rem;
                        color: #666;
                        letter-spacing: 0;
                    }
                }
                .InfoText{
                    width: 5rem;
                    line-height: 1.2rem;
                    letter-spacing: 0;
                    display: flex;
                    position: relative;
                    align-items: center;
                    span{
                        height: .6rem;
                        line-height: .6rem;
                        color: #000;
                        letter-spacing: 0;
                    }
                }
                .active{
                    font-size: .36rem;
                    color: #1492FF;
                    display: flex;
                    justify-content: space-between;
                    .detailBtn{
                        height: .54rem;
                        width: 1.58rem;
                        line-height: .54rem;
                        border: .01rem solid #1492FF;
                        border-radius: .05rem;
                        font-size: .28rem;
                        color: #1492FF;
                        letter-spacing: 0;
                    }
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
        // 发票信息
        .invoiceContent{
            background: #FFF;
            margin-top: .3rem;
            padding: 0 .4rem;
            .invoiceHint{
                height: .8rem;
                padding-top: .4rem;
                font-size: .28rem;
                color: #000;
                letter-spacing: 0;
                text-align: left;
            }
            // 报销中状态
            .invoiceList{
                height: 2.8rem;
                padding: .6rem 0;
                border-bottom: .01rem solid #D5D5D5;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .textLine{
                    display: flex;
                    font-size: .28rem;
                    .textName{
                        width: 1.4rem;
                        text-align: left;
                        color: #666666;
                        letter-spacing: 0;
                    }
                    .textInfo{
                        color: #000000;
                        letter-spacing: 0;
                    }
                    .warn{
                        color: #FFA007;
                    }
                }
                &:last-child{
                    border-bottom: none;
                }
            }
            // 报销完成状态
            .invoiceList2{
                height: 3.3rem;
                padding: .42rem 0 .58rem 0;
                border-bottom: .01rem solid #D5D5D5;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .textLine{
                    display: flex;
                    font-size: .28rem;
                    &:first-child{
                        justify-content: space-between;
                        .textInfo{
                            color: #007CEA;
                        }
                    }
                    .textHeader{
                        width: 4.1rem;
                        display: flex;
                        justify-content: space-between;
                        font-size: .28rem;
                        .active{
                            color: #007CEA;
                        }
                    }
                    .textName{
                        width: 1.4rem;
                        text-align: left;
                        color: #666666;
                        letter-spacing: 0;
                    }
                    .textInfo{
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
        // 病例资料
        .caseInfo{
            height: 3rem;
            background: #FFF;
            padding: 0 .3rem;
            margin-top: .3rem;
            .infoName{
                height: 1.07rem;
                line-height: 1.07rem;
                text-align: left;
                font-size: .28rem;
                color: #000000;
                letter-spacing: 0;
            }
            .photoBox{
                text-align: left;
                .svg-icon{
                    height: 1.5rem;
                    width: 1.5rem;
                }
            }
        }
        // 补充资料
        .supplementInfo{
            background: #FFF;
            font-size: .28rem;
            color: #000000;
            line-height: 38px;
            text-align: left;
            padding: .1rem .3rem;
            margin-top: .3rem;
            .infoName{
                letter-spacing: 0;
            }
            .infoList{
                letter-spacing: 0;
            }
            .photoBox{
                text-align: left;
                .svg-icon{
                    height: 1.5rem;
                    width: 1.5rem;
                }
            }
        }
    }
}
.picWrap{
    display: flex;
    flex-wrap: wrap;
    margin-top: .2rem;
    .uploadBtn{
        position: relative;
        height: 1.5rem;
        width: 1.5rem;
        margin: .1rem .15rem 0 0;
        img{
            height: 100%;
            width: 100%;
        }
        .svg-icon{
            position: absolute;
            height: .4rem;
            width: .4rem;
            top: -0.2rem;
            right: -0.2rem;
        }
    }
    .svg-icon{
        margin: .1rem .15rem 0 0;
        height: 1.5rem;
        width: 1.5rem;
    }
}
</style>