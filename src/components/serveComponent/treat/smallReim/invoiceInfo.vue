<template>
    <div class="invoiceInfo">
        <Title :title="'零星报销'" :backRouter="'/smallReim'"></Title>
        <!-- 填写进度 -->
        <WorkProgress :currentStep="2" :progress="progress"></WorkProgress>
        <div class="Content">
            <!-- 自动获取发票信息 -->
            <div class="invoiceContent" v-if="hasInvoice">
                <div class="invoiceHint">请选择您的报销条目</div>
                <div class="invoiceList" v-for="(item,index) in invoices" :key="index">
                    <div class="selectIcon" @click="chooseInvoice(item)">
                        <svg-icon v-if="item.selected" icon-class="serveComponent_select" />
                    </div>
                    <div class="columnLine"></div>
                    <div class="textBox">
                        <div class="textLine">
                            <span class="textName">发票号</span>
                            <span class="textInfo active">{{item.BKE100}}</span>
                        </div>
                       
                        <div class="textLine">
                            <span class="textName">总费用</span>
                            <span class="textInfo">{{item.AKC264}}</span>
                        </div>
                         <div class="textLine">
                            <span class="textName">发票日期</span>
                            <span class="textInfo">{{item.AAE036}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 手动添加发票信息 -->
            <div class="manualContent" v-if="!hasInvoice">
                <div class="invoiceHint">暂无报销条目，请手动填写/上传发票信息</div>
                <div class="invoiceList" v-for="(item,index) in invoices" :key="index">
                    <div class="invoicePhoto">
                        <img :src="item.photoUrl" class="pic">
                    </div>
                    <div class="textBox">
                        <div class="textLine">
                            <span class="textName">发票号码</span>
                            <span class="textInfo">{{item.BKE100}}</span>
                        </div>
                        <div class="textLine">
                            <span class="textName">发票金额</span>
                            <span class="textInfo">{{item.AKC264}}</span>
                        </div>
                        <div class="textLine">
                            <span class="textName">发票日期</span>
                            <span class="textInfo">{{item.AAE036}}</span>
                        </div>
                    </div>
                    <div class="deleteBtn" @click="deleteBtn(item,index)">删除</div>
                </div>
                <div class="plusInvoice" @click="plusInvoice()">+ 添加发票信息</div>
            </div>
        </div>
        <!-- 资料上传 -->
        <div class="dataUpload">
            <div class="uploadHint">病例资料（如出院小结、用药清单、医嘱等）</div>
            <div class="picWrap">
                <div class="uploadBtn" v-for="(item,index) in picArr" :key="index">
                    <img :src="item" class="pic" />
                    <svg-icon icon-class="serveComponent_delete" @click="deletePic(item,index)" />
                </div>
                <svg-icon @click="uploadImg" icon-class="serveComponent_upload" />
            </div>
        </div>
        <!-- 按钮 -->
        <footer class="Footer">
            <div class="Btn">
                <div class="CountBtn">
                    <span>合计:</span>
                    <span class="active">{{invoiceCount.price}}</span>
                    <span>元（{{invoiceCount.count}}张）</span>
                </div>
                <div class="SubmitBtn" @click="submit()">下一步</div>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 提交信息
            form: {
                
            },
            canSubmit: false, //是否可以提交
            progress:[
                {step:1,name:'申请报销'},
                {step:2,name:'发票信息'},
                {step:3,name:'信息录入'},
                {step:4,name:'申报完成'}
            ],
            hasInvoice: false, //是否有发票信息
            // invoices:[  //发票信息
            //     {BKE100:'9123910023010230120301',BKA104:'骨科',AKC264: 10239.03,selected: false},
            //     {BKE100:'9123910023010230120302',BKA104:'外科',AKC264: 102.88,selected: false},
            // ],
            invoices: [],//发票信息
            picArr: [],//附件集合
            picArrNum: [],//附件图片id集合
            invoiceCount: {price:0,count:0}, // 发票合计
        }
    },
    created() {
        console.log(33333,this.$store.state.SET_SMALL_REIM_2);
        this.picArrNum = JSON.parse(JSON.stringify(this.$store.state.SET_SMALL_REIM_2.invoicesImg));    
        this.hasInvoice = this.$store.state.IS_INVOICE
        this.epFn.setTitle('零星报销')
        
        
        // 获取VUEX信息
        this.invoices = JSON.parse(JSON.stringify(this.$store.state.SET_SMALL_REIM_2.eleInvoices));
        console.log('发票信息',this.invoices);
        
        // 附件集合
        this.picArr = JSON.parse(JSON.stringify(this.$store.state.SET_ENCLOSURE));
        // 封装发票
        
        
        console.log(this.invoices,'55555');
        // 有发票信息
        if(this.hasInvoice){
           
            if(!this.invoices[0].hasOwnProperty('selected')){
                 this.invoices.forEach((val)=>{
                    val.selected = true;
                })
            }
            let index = 0
            let price = 0
             for(let i=0;i<this.invoices.length;i++){
                if(this.invoices[i].selected){
                    index = i+1
                    price += parseFloat(this.invoices[i].AKC264)
                }
            }
            this.invoiceCount.count = index
            this.invoiceCount.price = price
        }
        if(!this.hasInvoice){
            let index = 0
            let price = 0
            for(let i=0;i<this.invoices.length;i++){
                index = i+1
                price += parseFloat(this.invoices[i].AKC264)
            }
            this.invoiceCount.count = index
            this.invoiceCount.price = price
        }
        console.log('发票',this.invoices);
    },
    methods: {
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
                                // 获取图片
                                
                                let submitForm = {}; 
                                 // 加入用户名和电子社保卡号
                                if (This.$store.state.SET_NATIVEMSG.name !== undefined ) {
                                    submitForm.AAC003 = This.$store.state.SET_NATIVEMSG.name;
                                    submitForm.AAE135 = This.$store.state.SET_NATIVEMSG.idCard;
                                }else {
                                    submitForm.AAC003 = '许肖军';
                                    submitForm.AAE135 = "332625197501010910";
                                }
                                // 加入子项编码
                                submitForm.AGA002 = '330600007019'
                                submitForm.photoList = data.picPath[0]
                                submitForm.PTX001 = '2'
                                const params = This.epFn.commonRequsetData(This.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'2006');
                                // 图片上传后台
                                This.$axios.post(This.epFn.ApiUrl() + '/h5/jy2006/updPhoto', params).then((resData) => {
                                    //   成功   1000
                                    if ( resData.enCode == 1000 ) {
                                        This.picArr.push(data.picPath[0])
                                        This.$store.dispatch('SET_ENCLOSURE',This.picArr)
                                        This.picArrNum.push(resData.photoId)
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
        // 删除图片
        deletePic(item,index){
            this.picArr.splice(index,1)
            this.picArrNum.splice(index,1)
            let picArrNum = JSON.parse(JSON.stringify(this.$store.state.SET_SMALL_REIM_2));
            picArrNum.invoicesImg = this.picArrNum
            this.$store.dispatch('SET_SMALL_REIM_2',picArrNum)

            let picArr = JSON.parse(JSON.stringify(this.$store.state.SET_ENCLOSURE));
            picArr = this.picArr
            this.$store.dispatch('SET_SMALL_REIM_2',picArr)
        },
        // 删除手动添加发票
        deleteBtn(item,index){
            this.invoices.splice(index,1)
            let invoices = JSON.parse(JSON.stringify(this.$store.state.SET_SMALL_REIM_2));
            invoices.eleInvoices = this.invoices
            this.$store.dispatch('SET_SMALL_REIM_2',invoices)

        },
        // 选择发票
        chooseInvoice(invoice){
            invoice.selected = !invoice.selected;
            var price = 0;
            var count = 0;
            this.invoices.forEach((val)=>{
                if(val.selected == true){
                    price += parseInt(val.AKC264);
                    count++;
                }
            });
            this.invoiceCount = {
                price: price,
                count: count
            }
        },
        // 添加新发票
        plusInvoice(){
            let SET_SMALL_REIM_2 = this.$store.state.SET_SMALL_REIM_2
                SET_SMALL_REIM_2.eleInvoices = this.invoices
                this.$store.dispatch('SET_SMALL_REIM_2',SET_SMALL_REIM_2)
            this.$router.push('/plusInvoice');
        },
        submit(){
            if(!this.picArr.length){
                this.$toast('请上传附件信息');
                return false;
            }
            if(this.invoiceCount.count == 0){
                this.$toast('未选择任何发票');
                return false;
            }else{
                let submitForm = JSON.parse(JSON.stringify(this.$store.state.SET_SMALL_REIM_SUBMIT));
                submitForm.BKC013 = this.invoiceCount.count;
                submitForm.AKC264 = this.invoiceCount.price;
                this.$store.dispatch('SET_SMALL_REIM_SUBMIT', submitForm);
                
                let SET_SMALL_REIM_2 = this.$store.state.SET_SMALL_REIM_2
                SET_SMALL_REIM_2.eleInvoices = this.invoices
                SET_SMALL_REIM_2.invoicesImg = this.picArrNum
                console.log(this.picArrNum);
                
                this.$store.dispatch('SET_SMALL_REIM_2',SET_SMALL_REIM_2)
                this.$router.push('/infoRecord');
               
            }
        },
    }
}
</script>

<style lang="less" scoped>
.invoiceInfo {
    .Content {
        height: 100%;
        padding: 0 .4rem;
        background: #FFF;
        // 自动获取发票信息
        .invoiceContent{
            .invoiceHint{
                font-size: .28rem;
                color: #000;
                letter-spacing: 0;
                text-align: left;
                padding-top: .4rem;
            }
            .invoiceList{
                height: 3.3rem;
                background: #FFF;
                border-bottom: .02rem solid #D3D3D3;
                display: flex;
                justify-content: space-around;
                align-items: center;
                .selectIcon{
                    height: .4rem;
                    width: .4rem;
                    border-radius: .2rem;
                    background: #D8D8D8;
                    position: relative;
                    .svg-icon{
                        position: absolute;
                        height: .4rem;
                        width: .4rem;
                        top: 0;
                        left: 0;
                    }
                }
                .columnLine{
                    height: 2rem;
                    width: .03rem;
                    background: #D3D3D3;
                }
                .textBox{
                    height: 2rem;
                    width: 5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    .textLine{
                        display: flex;
                        .textName{
                            width: 1.3rem;
                            font-size: .28rem;
                            color: #666666;
                            letter-spacing: 0;
                            text-align: left;
                        }
                        .textInfo{
                            font-size: .28rem;
                            color: #000000;
                            letter-spacing: 0;
                        }
                        .active{
                            color: #1492FF;
                        }
                    }
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
        // 手动上传发票信息
        .manualContent{
            .invoiceHint{
                font-size: .28rem;
                color: #000;
                letter-spacing: 0;
                text-align: left;
                padding-top: .4rem;
            }
            .invoiceList{
                position: relative;
                height: 3.35rem;
                border-bottom: .02rem solid #D3D3D3;
                display: flex;
                align-items: center;
                .invoicePhoto{
                    height: 1.5rem;
                    width: 1.5rem;
                    background: #D8D8D8;
                    .pic{
                        width: 1.5rem;
                        height: 1.5rem;
                    }
                }
                .textBox{
                    height: 1.5rem;
                    width: 5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .textLine{
                        display: flex;
                        margin-left: .28rem;
                        .textName{
                            width: 1.4rem;
                            font-size: .28rem;
                            text-align: left;
                            color: #666666;
                            letter-spacing: 0;
                        }
                        .textInfo{
                            font-size: .28rem;
                            color: #000000;
                            letter-spacing: 0;
                        }
                    }
                }
                .deleteBtn{
                    position: absolute;
                    bottom: .3rem;
                    right: .37rem;
                    height: .6rem;
                    line-height: .6rem;
                    width: 1.1rem;
                    border: .01rem solid #1492FF;
                    border-radius: .05rem;
                    font-size: .28rem;
                    color: #1492FF;
                    letter-spacing: 0;
                }
                &:last-child{
                    border-bottom: none;
                }
            }
            .plusInvoice{
                height: .85rem;
                margin: .47rem 0;
                border: .01rem solid #1492FF;
                border-radius: .05rem;
                font-size: .28rem;
                color: #1492FF;
                letter-spacing: 0;
                line-height: .85rem;
            }
        }
    }
    // 资料上传
    .dataUpload{
        background: #FFF;
        margin: .16rem 0 1.4rem 0;
        padding: .37rem .4rem;
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
        .uploadHint{
            font-size: .28rem;
            color: #000000;
            letter-spacing: 0;
            text-align: left;
        }
    }
    // 底部
    .Footer {
        height: 1.31rem;
        width: 7.5rem;
        padding: 0 .2rem;
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 199;
        .Btn{
            width: 100%;
            display: flex;
            .CountBtn {
                height: 1.05rem;
                width: 4.5rem;
                border-top-left-radius: .05rem;
                border-bottom-left-radius: .05rem;
                line-height: 1.05rem;
                background: #E5E5E5;
                font-size: .36rem;
                color: #666;
                letter-spacing: 0;
                text-align: center;
                span{
                    font-size: .28rem;
                }
                .active{
                    font-size: .36rem;
                    color: #1492FF;
                }
            }
            .SubmitBtn{
                height: 1.05rem;
                width: 2.6rem;
                border-top-right-radius: .05rem;
                border-bottom-right-radius: .05rem;
                line-height: 1.05rem;
                background: #F2F2F2;;
                font-family: PingFangSC-Regular;
                font-size: .36rem;
                background: #1492FF;
                color: #FFF;
                letter-spacing: 0;
                text-align: center;
            }
        }
    }
}
</style>