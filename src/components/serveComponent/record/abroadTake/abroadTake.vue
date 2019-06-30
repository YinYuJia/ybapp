<template>
    <div class="abroadTake">
        <Title :title="'出国带药备案'" :backRouter="'/'"></Title>
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
        <mt-datetime-picker
            type="date"
            ref="endPicker"
            v-model="dateVal"
            @confirm="handleEndConfirm">
        </mt-datetime-picker>
        <div class="Content">
            <!-- 基本信息 -->
            <UserBaseInfo></UserBaseInfo>
            <!-- 申报信息 -->
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地</span></div>
                    <div class="InfoText">
                         <div class="InfoText"><input  type="text" v-model="AAB301000" placeholder="请选择" readonly></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>出境日期</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input @click="openStartPicker" type="text" v-model="form.AAE030" placeholder="请选择" readonly></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>拟回国日期</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input @click="openEndPicker" type="text" v-model="form.AAE031" placeholder="请选择" readonly></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>取药机构</span></div>
                    <div class="InfoText">
                        <!-- @click="gotoTakeDrug()" -->
                        <div class="InfoText"><input type="text" @click="chooseHospital" v-model="form.AKB020Name" placeholder="请选择" readonly></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>护照号码</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input type="text" maxlength="9" v-model="form.BKE260" placeholder="请输入"></div>
                    </div>
                </div>
            </div>
            <!-- 资料上传 -->
            <div class="dataUpload">
                <div class="uploadHint">附件上传，请选择下述其中一项附件内容进行上传</div>
                <div class="uploadList">
                    1、出国带药备案表（医院盖章）
                </div>
                <div class="picWrap">
                    <div class="uploadBtn" v-for="(item,index) in picArr" :key="index">
                        <img @click="showBigPhoto(item)" :src="item" class="pic" />
                        <svg-icon icon-class="serveComponent_delete" @click="deletePic(item,index)"/>
                    </div>
                    <svg-icon  @click="uploadImg()" icon-class="serveComponent_upload" />
                </div>
            </div>
        </div>
        
        <PhotoView ref="photo" :imgUrl="imgUrl"></PhotoView>
        <!-- 按钮 -->
        <Footer :canSubmit='canSubmit' @submit="submit()"></Footer>
    <SearchInfoPage ref="hospita" @childrenClick="hospitaClick" title="取药机构"></SearchInfoPage>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                imgUrl:'',
                picArr: [],//附件集合
                AAB301000: '', //参保地
                form: {
                    AAS301: '', //参保地省
                    AAB301: '', //参保地市
                    AAQ301: '', //参保地区
                    AKB020: '',//取药机构
                    AKB020Name: '',//取药机构
                    AAE030: '', //出境日期
                    AAE031: '', //拟回国日期
                    BKE260: '', //护照号码
                    AAA100:"",//参数类别
                    BKZ019:"",//经办编号
                    photoIdList: [],
                },
                dateVal: new Date(), //默认绑定的时间
                canSubmit: false,
            }
        },
        created () {
            this.epFn.setTitle('出国带药备案')
            let GinsengLandCode = sessionStorage.getItem("GinsengLandCode")
            let GinsengLandName = sessionStorage.getItem("GinsengLandName")

           console.log('GinsengLandCode',GinsengLandCode,'GinsengLandName',GinsengLandName)
           this.AAB301000 = GinsengLandName
           console.log(this.AAB301000=="")
           this.form.AAB301 = GinsengLandCode
           this.form.AAS301 = GinsengLandCode.substring(0,2) + '0000'
           console.log('this.form.AAS301',this.form.AAS301)
           console.log('this.form.AAB301',this.form.AAB301)
            // this.form = this.$store.state.SET_ABROADTAKE_OPERATION;
            // this.form.AAC003 = this.$store.state.SET_NATIVEMSG.name
            // this.form.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;  
            // this.form.AAB301000 = this.$store.state.SET_USER_DETAILINFO.regionName
            // this.form.AAB301 = this.$store.state.SET_USER_DETAILINFO.AAB301
        },
        watch: {
            form: {
                handler: function(val) {
                    // 判断不为空
                    if (this.AAB301000 != '' && val.AAE030 != '' && val.AAE031 != '' && val.AKB020 != '' && val.BKE260 != '' &&val.photoIdList.length>0) {
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
                        this.$toast('回国日期需大于出境日期');
                        this.form.AAE031 = '';
                    }
                }
                },
                deep: true
            },
        },
        methods: {
            // 查看大图
            showBigPhoto(val){
                this.imgUrl = val;
                this.$refs.photo.open();
            },
            gotoTakeDrug(){
                this.$router.push('/searchTakeDrug')
            },
             // 选择取药机构
            chooseHospital(){
                this.$refs.hospita.open();
                // this.$store.dispatch('SET_SMALL_REIM_1', this.form);
                // this.$router.push('/searchHospital');
            },
            hospitaClick(code,name){
                this.form.AKB020Name = name
                this.form.AKB020 = code
            },
            // 选择参保地
            openInsuredPicker(){
                this.$refs.insuredPicker.open();
            },
            chooseInsured(val){
                this.AAB301000=val.name;
                this.form.AAS301=val.code[0]
                this.form.AAB301=val.code[1]
                this.$store.dispatch('SET_ABROADTAKE_OPERATION', this.form);
            },
            // 选择出境日期
            openStartPicker(){
                this.$refs.startPicker.open();
            },
            handleStartConfirm(val){
                let date = this.util.formatDate(val,'yyyy-MM-dd');
                this.form.AAE030 = date;
            },
            // 选择回国日期
            openEndPicker(){
                this.$refs.endPicker.open();
            },
            handleEndConfirm(val){
                let date = this.util.formatDate(val,'yyyy-MM-dd');
                this.form.AAE031 = date;
            },
            // 上传图片
            uploadImg(){
                if(this.picArr.length>4){
                    this.$toast("附件信息最大5张")
                    return
                }
                let _this = this;
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
                                console.log('照片上传成功',data.picPath[0]);
                                if(data.result){
                                    let submitForm = {};
                                     // 加入用户名和电子社保卡号
                                    if (_this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                                        submitForm.AAC003 = _this.$store.state.SET_NATIVEMSG.name;
                                        submitForm.AAE135 = _this.$store.state.SET_NATIVEMSG.idCard;
                                    }else {
                                        _this.$toast("未获取到人员基本信息");
                                    }
                                    // 加入子项编码
                                    submitForm.AGA002 = '330800253001';
                                    submitForm.photoList = data.picPath[0];
                                    submitForm.PTX001 = '2';
                                    const params = _this.epFn.commonRequsetData(_this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'2006');
                                    _this.$axios.post(_this.epFn.ApiUrl() + '/h5/jy2006/updPhoto', params).then((resData) => {
                                        console.log('返回成功信息',resData) 
                                        //   成功   1000
                                        if ( resData.enCode == 1000 ) {
                                            // 页面中添加照片
                                            _this.picArr.push(data.picPath[0])
                                            _this.form.photoIdList.push(resData.photoId);
                                        }else if (resData.enCode == 1001 ) {
                                        //   失败  1001
                                            _this.$toast(resData.msg);
                                            return;
                                        }else{
                                            _this.$toast('业务出错');
                                            return;
                                        }
                                    })

                                }
                            },
                            onFail: function(error) {}
                        })
                    })
                }
            },
            // 删除图片
            deletePic(item,index){
                console.log('删除图片',this.form.photoIdList);
                this.picArr.splice(index,1)
                this.form.photoIdList.splice(index,1)
                console.log('删除后',this.form.photoIdList);
            },
            submit() {
                

            if (this.canSubmit == false) {
                this.$toast('信息未填写完整');
                return false;

            } else {
                this.$store.dispatch('SET_ABROADTAKE_OPERATION', this.form);
                this.form.BKE260 = this.form.BKE260.toUpperCase(); //将所有小写字母转换为大写
                if (!this.util.passPort(this.form.BKE260)) {
                    this.$toast("护照号码格式不正确");
                    return false;
                }
                // 封装数据
                let params = this.formatSubmitData();
                // 开始请求
                console.log('parmas------',params)
                this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1021/info', params).then((resData) => {
                        console.log('返回成功信息',resData)
                        //   成功   1000
                            if ( resData.enCode == 1000 ) {
                                this.$router.push("/abroadDetail");
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
            let submitForm = {};
            // 日期传换成Number

            submitForm.AAE030 = this.util.DateToNumber(this.form.AAE030);
            submitForm.AAE031 = this.util.DateToNumber(this.form.AAE031);
            submitForm.AAS301 =  this.form.AAS301;//参保地省
            submitForm.AAB301 =  this.form.AAB301;//参保地市
            submitForm.AAQ301 =  this.form.AAQ301;//参保地区
            submitForm.AKB020 =  this.form.AKB020;//取药机构
            submitForm.BKE260 =  this.form.BKE260;//护照号码
            submitForm.photoIdList =  this.form.photoIdList.join(',');//照片ID数组
            submitForm.BKZ019 =  this.form.BKZ019;//经办编号
            // submitForm.debugTest=  "true";
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                
                this.$toast("未获取到人员基本信息");
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1021");
            return params;
        }
        }
    }
</script>

<style lang="less" scoped>
.abroadTake {
    .Content {
        height: 100%;
        margin-bottom: 1.4rem;
        .ReportInfo {
            height: 6rem;
            width: 7.5rem;
            padding: 0 .3rem;
            background: white;
            .InfoLine {
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
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
                        width: 4rem;
                        height: .6rem;
                        font-size: .3rem;
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
    .Footer {
        height: 1.2rem;
        width: 7.5rem;
        background: white;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 199;
        display: flex;
        justify-content: center;
        align-items: center;
        .Btn {
            height: .8rem;
            width: 6.9rem;
            background-image: linear-gradient(-90deg, rgb(142, 214, 253) 0%, rgb(173, 201, 255) 100%);
            border-radius: 40px;
            text-align: center;
            line-height: 0.8rem;
            font-family: PingFangSC-Regular;
            font-size: .36rem;
            color: #FFFFFF;
            letter-spacing: 0;
        }
        .active {
            background-image: linear-gradient(-90deg, #35B8FD 0%, #4E8DFF 100%);
        }
    }
}
</style>
