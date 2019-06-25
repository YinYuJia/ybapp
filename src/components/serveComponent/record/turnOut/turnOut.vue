<template>
    <div class="turnOut">
        <Title :title="'转外就医备案'" :backRouter="'/'"></Title>
        <!-- MintUI弹出框区域 -->
        <SelectCity 
            :type="2"
            ref="insuredPicker"
            @confirm="chooseInsured"
            >
        </SelectCity>
        <mt-datetime-picker
            type="date"
            ref="startPicker"
            v-model="dateVal"
            @confirm="handleStartConfirm">
        </mt-datetime-picker>
        <SelectCity 
            :type="3"
            ref="cityPicker"
            @confirm="chooseCity"
            >
        </SelectCity>
        <SelectCity 
            :type="1"
            ref="treatPicker"
            :propArr="treatment"
            @confirm="handleTreatConfirm"
            >
        </SelectCity>
        <!-- 弹出框区域结束 -->
        <div class="Content">
            <!-- 基本信息 -->
            <UserBaseInfo></UserBaseInfo>
            <!-- 申报信息 -->
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地</span></div>
                    <div class="InfoText"><input @click="openInsuredPicker" type="text" v-model="AAS027000" placeholder="请选择" readonly></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>开始日期</span></div>
                    <div class="InfoText"><input @click="openStartPicker" type="text" v-model="form.AAE030" placeholder="请选择" readonly></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>结束日期</span></div>
                    <div class="InfoText"><input type="text" v-model="form.AAE031" placeholder="请选择" readonly></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>转往地市</span></div>
                    <div class="InfoText"><input @click="openCityPicker" type="text" v-model="AAB301000" placeholder="请选择" readonly></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>疾病名称</span></div>
                    <div class="InfoText"><input type="text" v-model="form.AKA121" placeholder="请输入"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>就医疗程</span></div>
                    <div class="InfoText">
                        <input @click="openTreatPicker()" type="text" v-model="BKE255VALUE" placeholder="请选择" readonly>
                    </div>
                </div>
            </div>
            <!-- 资料上传 -->
            <div class="dataUpload">
                <div class="uploadHint">附件上传，请选择下述其中一项附件内容进行上传</div>
                <div class="uploadList">
                    1、《基本医疗保险参保人员转外就医备案表》（医院盖章）
                </div>
                <div class="picWrap">
                    <div class="uploadBtn" v-for="(item,index) in picArr" :key="index">
                        <img :src="item" class="pic" />
                        <svg-icon icon-class="serveComponent_delete" />
                    </div>
                    <svg-icon @click="uploadImg" icon-class="serveComponent_upload" />
                </div>
            </div>
        </div>
        <!-- 按钮 -->
        <Footer :canSubmit='canSubmit' @submit="submit()"></Footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {          
                picArr: [],//附件集合
                AAS027000:"",//参保地
                AAB301000: "",//转往地市
                form: {
                    AAE030: '', //开始日期
                    AAE031: '', //结束日期
                    AAS301: "", //参保地省
                    AAB301: "", //参保地市
                    AAQ301: "", //参保地区
                    AAS027:"",	//转往省
                    AAB027:"",	//转往市
                    AAQ027:"",  //转往区
                    AKA121: '',//疾病名称
                    BKE255: '', //就诊疗程
                    photoIdList:[],//照片ID数组
                    BKZ019:""
                },
                BKE255VALUE: '',
                canSubmit: false,
                dateVal: new Date(), //默认绑定的时间
                treatment: [
                    {value:'1', label:'初诊'},
                    {value:'2', label:'复诊'}
                ],
            }
        },
        created() {
            this.epFn.setTitle('转外就医备案')
            console.log(this.$store.state.SET_USER_DETAILINFO,55555555555);
            
            // this.form.AAA301000 = this.$store.state.SET_USER_DETAILINFO.regionName
            // // this.form.AAA301000 = "杭州"
            // this.form.AAB301 = this.$store.state.SET_USER_DETAILINFO.AAB301
            // this.form.AAB301 = "12344"
        },
        watch: {
            form: {
                handler: function(val) {
                    // 判断不为空
                    if (val.AAS027000 != '' && val.AAB301000 != '' && val.AAE030 != '' && val.AAE031 != '' && val.AKA121 != '' && val.BKE255 != '' ) {
                        this.canSubmit = true;
                    } else {
                        this.canSubmit = false;
                    }
                    // 判断时间间隔
                    if (val.AAE030 != '' && val.AAE031 != '') {
                    let AAE030 = new Date(val.AAE030);
                    let AAE031 = new Date(val.AAE031);
                    let month = 24 * 3600 * 1000 * 30;
                    let gap = AAE031 - AAE030;
                    if (gap <= 0) {
                        this.$toast('开始日期需大于结束日期');
                        this.form.AAE031 = '';
                    }
                    }
                    // 判断转入转出地
                    if (val.AAB027 != '' && val.AAB301 != '') {
                        if(val.AAB027==val.AAB301){
                            this.$toast('转出地不能与转入地相同');
                            this.AAB301000 = '';
                            this.form.AAS301="";
                            this.form.AAB301="";
                            this.form.AAQ301="";
                        }
                    }
                },
                deep: true
            },
        },
        methods: {
             // 上传图片附件
        uploadImg(){
            console.log("zhaopian")
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
                                This.picArr.push(data.picPath[0])
                                // This.$store.dispatch('SET_ENCLOSURE',This.picArr)
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
                                submitForm.AGA002 = '确认-00253-002'
                                submitForm.photoList = data.picPath[0]
                                submitForm.PTX001 = '2'
                                const params = This.epFn.commonRequsetData(This.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'2006');
                                // 图片上传后台
                                This.$axios.post(This.epFn.ApiUrl() + '/h5/jy2006/updPhoto', params).then((resData) => {
                                    console.log('返回成功信息',resData) 
                                    //   成功   1000
                                    if ( resData.enCode == 1000 ) {
                                        this.form.photoIdList.push(resData.photoId)
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
            // 选择参保地
            openInsuredPicker(){
                this.$refs.insuredPicker.open();
            },
            chooseInsured(val){
                this.AAS027000=val.name
                this.form.AAS027=val.code[0]
                this.form.AAB027=val.code[1]
            },
            // 选择开始日期
            openStartPicker(){
                this.$refs.startPicker.open();
            },
            handleStartConfirm(val){
                this.getEndDate(val);
                let date = this.util.formatDate(val,'yyyy-MM-dd');
                this.form.AAE030 = date;
            },
            // 计算三个月后日期
            getEndDate(val){
                let year = val.getFullYear();
                let month = val.getMonth()+1;
                let day = val.getDate();
                console.log(month);
                
                if(month + 3 > 12){
                    year ++;
                    month = month + 3 - 12;
                }else{
                    month += 3;
                }
                if(month < 10){
                    month = '0' + month;
                }
                this.form.AAE031 = year + '-' + month + '-' + day;
            },
            // 选择转往地市
            openCityPicker(){
                this.$refs.cityPicker.open();
            },
            chooseCity(val){
                console.log(val);
                
                this.AAB301000= val.name;
                this.form.AAS301=val.code[0]
                this.form.AAB301=val.code[1]
                this.form.AAQ301=val.code[2]
            },
            // 选择就医疗程
            openTreatPicker(){
                this.$refs.treatPicker.open();
            },
            handleTreatConfirm(val){
                console.log(val);
                this.form.BKE255 = val.value;
                this.BKE255VALUE = val.label;
            },
            submit() {
                
            if (this.canSubmit == false) {
                this.$toast('信息未填写完整');
                return false;
            } else {
                // this.$store.dispatch('SET_TURNOUT_OPERATION', this.form);

                // 封装数据
                let params = this.formatSubmitData();
                // 开始请求
                console.log('parmas------',params)
                this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1020/info', params).then((resData) => {
                        console.log('返回成功信息',resData)
                        //   成功   1000
                            if ( resData.enCode == 1000 ) {
                                this.$toast("提交成功");
                                this.$router.push('/turnDetail');
                            }else if (resData.enCode == 1001 ) {
                            //   失败  1001
                                this.$toast(resData.msg);
                                return;
                            }else{
                                this.$toast('业务出错');
                                return;
                            }
                        })
                
            }
            },
            formatSubmitData(){
                // let submitForm = JSON.parse(JSON.stringify(this.form));
                let submitForm ={};
                // 日期传换成Number
                console.log(this.form);

                submitForm.AAE030 = this.util.DateToNumber(this.form.AAE030);
                submitForm.AAE031 = this.util.DateToNumber(this.form.AAE031);
                submitForm.AAS027 =  this.form.AAS027;//转往地省
                submitForm.AAB027 =  this.form.AAB027;//转往地市
                submitForm.AAS301 =  this.form.AAS301;//参保地省
                submitForm.AAB301 =  this.form.AAB301;//参保地市
                submitForm.AAQ301 =  this.form.AAQ301;//参保地区
                submitForm.AKA121 =  this.form.AKA121;//疾病名称
                submitForm.BKE255 =  this.form.BKE255;//就诊疗程
                submitForm.photoIdList =  this.form.photoIdList;//照片ID数组
                submitForm.BKZ019 =  this.form.BKZ019;//经办编号
                // submitForm.debugTest=  "true";
                // submitForm.dibuger =  "true";
                // 加入用户名和电子社保卡号
                if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                    submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                    submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
                }else {
                    submitForm.AAC003 = '许肖军';
                    submitForm.AAE135 = "332625197501010910";
                }
                // 请求参数封装
                const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1020");
                return params;
            }
        }
    }
</script>

<style lang="less" scoped>
.turnOut {
    .Content {
        height: 100%;
        margin-bottom: 1.4rem;
        .ReportInfo {
            height: 7.2rem;
            width: 7.5rem;
            padding: 0 .3rem;
            background: white;
            .InfoLine {
                height: 1.2rem;
                position: relative;
                font-size: .28rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName {
                    line-height: 1.2rem;
                    span {
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText {
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    input {
                        height: .6rem;
                        width: 4.5rem;
                        font-size: .28rem;
                        color: #000000;
                        letter-spacing: 0;
                        text-align: right;
                        border: none;
                    }
                }
                &:last-child {
                    border-bottom: none;
                }
            }
        }
        // 资料上传
        .dataUpload{
            background: #FFF;
            margin: .16rem 0 1.4rem 0;
            padding: .37rem .4rem;
            .uploadList{
                margin-top: .1rem;
                font-size: .28rem;
                text-align: left;
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
            .uploadHint{
                font-size: .28rem;
                color: #000000;
                letter-spacing: 0;
                text-align: left;
            }
        }
    }
}
</style>

<style>
.turnOut .el-input__prefix,
.el-input__suffix {
    display: none;
}
.turnOut .el-input__inner {
    border: none;
    text-align: right;
    padding-right: 0;
    padding-left: 0;
}
</style>