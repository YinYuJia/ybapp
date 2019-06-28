<template>
  <div class="chronicDisease">
    <div v-show="!isSearch">
      <Title :title="'规定病种备案'" :backRouter="'/'"></Title>
      <!-- MintUI弹出框区域 -->
      <SelectCity :type="2" ref="insuredPicker" @confirm="chooseInsured"></SelectCity>
      <mt-datetime-picker
        type="date"
        ref="startPicker"
        v-model="dateVal"
        @confirm="handleStartConfirm"
      ></mt-datetime-picker>
      <SelectCity 
        :type="1"
        ref="typePicker"
        :propArr="option"
        @confirm="handleTypeConfirm"
        >
      </SelectCity>
      <!-- 弹出框区域结束 -->
      <div class="Content">
        <!-- 基本信息 -->
        <UserBaseInfo></UserBaseInfo>
        <!-- 列表信息 -->
        <div class="ListInfo">
          <div class="InfoLine">
            <div class="InfoName">
              <span>参保地</span>
            </div>
            <div class="InfoText">
              <input
                type="text"
                v-model="AAB301000"
                placeholder="请选择"
                readonly
              >
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>规定病种</span>
            </div>
            <div class="InfoText">
              <input
                @click="species()"
                type="text"
                v-model="form.AKA035Name"
                placeholder="请选择"
                readonly
              >
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>疾病1</span>
            </div>
            <div class="InfoText">
              <input
                :class="{disabledInput:disabledOne}"
                @click="disease1()"
                :disabled="disabledOne"
                type="text"
                v-model="form.AKA121"
                placeholder="请选择"
                readonly
              >
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>疾病2</span>
            </div>
            <div class="InfoText">
              <input
                :class="{disabledInput:disabledOne}"
                @click="disease2()"
                :disabled="disabledOne"
                type="text"
                v-model="form.AKA1211"
                placeholder="请选择"
                readonly
              >
              <svg-icon v-if="this.form.AKA1211 != ''" icon-class="serveComponent_delete" @click="deleteText(2)"/>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>疾病3</span>
            </div>
            <div class="InfoText">
              <input
                :class="{disabledInput:disabledOne}"
                @click="disease3()"
                :disabled="disabledOne"
                type="text"
                v-model="form.AKA1212"
                placeholder="请选择"
                readonly
              >
              <svg-icon v-if="this.form.AKA1212 != ''" icon-class="serveComponent_delete" @click="deleteText(3)"/>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>开始日期</span>
            </div>
            <div class="InfoText">
              <input
                @click="openStartPicker()"
                type="text"
                v-model="form.AAE030"
                placeholder="请选择"
                readonly
              >
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>病历提取</span>
            </div>
            <div class="InfoText">
              <!-- <el-select v-model="form.BKE247" placeholder="请选择领取方式">
                <el-option
                  v-for="item in option"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select> -->
              <input @click="openTypePicker()" type="text" v-model="BKE247VALUE" placeholder="请选择" readonly>
            </div>
          </div>
        </div>
        <!-- 邮递信息 -->
        <div class="MailInfo" v-if="showMail">
          <div class="InfoLine">
            <div class="InfoName">
              <span>收件人：</span>
            </div>
            <div class="InfoText">
              <input type="text" v-model="form.AAE011" placeholder="请输入收件人姓名">
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>手机号码：</span>
            </div>
            <div class="InfoText">
              <input type="tel" maxlength="11" v-model="form.AAE005" placeholder="请输入">
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>详细地址</span>
            </div>
            <div class="InfoText">
              <textarea v-model="form.AAE006" placeholder="请输入"></textarea>
            </div>
          </div>
        </div>
        <!-- 提示 -->
        <div class="Hint" v-if="showMail">
          <div class="HintTitle">
            <i class="el-icon-warning" style="color:#05AEF0"></i>温馨提示
          </div>
          <div class="HintText">为保证您的正常领取，请务必填写正确、完整的邮递信息。具体送达时间以实际邮递情况为准。</div>
        </div>
        <!-- 资料上传 -->
        <div class="dataUpload">
            <div class="uploadHint">附件上传，请选择下述至少2项附件内容进行上传</div>
            <div class="uploadList">
                1、规定病种待遇备案表（医院盖章）（必选）
            </div>
            <div class="uploadList">
                2、确诊的病理切片报告复印件
            </div>
            <div class="uploadList">
                3、出院记录
            </div>
            <div class="uploadList">
                4、病历原件
            </div>
            <div class="picWrap">
                <div class="uploadBtn" v-for="(item,index) in picArr" :key="index">
                    <img :src="item" class="pic" />
                    <svg-icon icon-class="serveComponent_delete" @click="deletePic(item,index)"/>
                </div>
                <svg-icon  @click="uploadImg()" icon-class="serveComponent_upload" />
            </div>
        </div>
      </div>
      <!-- 按钮 -->
      <Footer :canSubmit="canSubmit" @submit="submit()"></Footer>
    </div>
    <!-- 规定病种 -->
    <SearchInfoPage ref="species" type="AKA035"  @childrenClick="speciesClick"></SearchInfoPage>
    <!-- 疾病1 -->
    <SearchInfoPage ref="disease1" type="AKA120" @childrenClick="disease1Click"></SearchInfoPage>
    <!-- <SearchInfoPage ref="disease1" type="AKA130" AAE013="AKA035" :AAA052="form.AKA035" @childrenClick="disease1Click"></SearchInfoPage> -->
    <!-- 疾病2 -->
    <SearchInfoPage ref="disease2" type="AKA120" @childrenClick="disease2Click"></SearchInfoPage>
    <!-- <SearchInfoPage ref="disease2" type="AKA130" AAE013="AKA035" :AAA052="form.AKA035" @childrenClick="disease2Click"></SearchInfoPage> -->
    <!-- 疾病3 -->
    <!-- <SearchInfoPage ref="disease3" type="AKA130" AAE013="AKA035" :AAA052="form.AKA035" @childrenClick="disease3Click"></SearchInfoPage> -->
    <SearchInfoPage ref="disease3" type="AKA120" @childrenClick="disease3Click"></SearchInfoPage>
  </div>
</template>

<script>
export default {
  data() {
    return {
      picArr: [],//附件集合 
      AAB301000: "", //参保地
      form: {
        AAS301: "", //参保地省编码
        AAB301: "", //参保地市编码
        AAQ301: "", //参保地区编码
        AKA035: "", //规定病种
        AKA035Name: "", //规定病种
        AKA120: "", //疾病编码1
        AKA121: "", //疾病名称1
        AKA1201: "", //疾病编码2
        AKA1211: "", //疾病名称2
        AKA1202: "", //疾病编码3
        AKA1212: "", //疾病名称3
        AAE030: "", //开始日期
        BKE247: "1", //病历本提取方式 1自取，2邮寄
        AAE011: "", //收件人
        AAE005: "", //手机号码
        AAE006: "", //详细地址
        photoIdList:[],//照片ID数组
      },
      BKE247VALUE: "自取", //病历提取方式值
      disabledOne: true,
      isSearch: false,
      dateVal: new Date(), //默认绑定的时间
      canSubmit: false,
      showMail: false,
      option: [{ value: "1", label: "自取" }, { value: "2", label: "邮寄" }],
      hospitalList: [
        { value: "医院1", label: "医院1" },
        { value: "医院2", label: "医院2" }
      ],
      typeList: [
        { value: "类型1", label: "类型1" },
        { value: "类型2", label: "类型2" }
      ],
      drugList: [
        { value: "类型1", label: "类型1" },
        { value: "类型2", label: "类型2" }
      ],
      drugTimeList: [
        { value: "时期1", label: "时期1" },
        { value: "时期2", label: "时期2" }
      ]
    };
  },
  watch: {
    form: {
      handler: function(val) {
        //   邮寄
        if (val.BKE247 == "2") {
          this.showMail = true;
           if ( 
              val.AAS301 != ''&& val.AKA035 != ''&& 
              val.AKA120 != ''&& val.AAE030 != ''&& 
              val.AAE011 != ''&& val.AAE005 != ''&& 
              val.AAE006 != ''&& val.photoIdList.length>0
            ) {
                this.canSubmit = true
            }else{
                this.canSubmit = false
            }
        } else {
            if ( 
              val.AAS301 != '' && val.AKA035 != '' &&
              val.AKA120 != ''  && val.AAE030 != ''&&
              this.AAB301000 !=""&& this.picArr.length>0
               ) {
                this.canSubmit = true
            }else{
                this.canSubmit = false
            }
          this.showMail = false;
        }
      },
      deep: true
    },
    'form.AKA035Name'(val,oldVal){
      if(val == ''){
        this.disabledOne = true
      }else{
        this.disabledOne = false
        if(val!=oldVal){
          this.form.AKA120= "" 
          this.form.AKA121= "" 
          this.form.AKA1201= "" 
          this.form.AKA1211= "" 
          this.form.AKA1202= "" 
          this.form.AKA1212= "" 
        }
      }
    }
  },
    created(){
      this.getMailInfo();
      this.epFn.setTitle('规定病种备案')
      let GinsengLandCode = sessionStorage.getItem("GinsengLandCode")
      let GinsengLandName = sessionStorage.getItem("GinsengLandName")
      console.log('GinsengLandCode',GinsengLandCode,'GinsengLandName',GinsengLandName)
      this.AAB301000 = GinsengLandName
      this.form.AAB301 = GinsengLandCode
      this.form.AAS301 = GinsengLandCode.substring(0,2) + '0000'
      console.log('this.form.AAS301',this.form.AAS301)
      console.log('this.form.AAB301',this.form.AAB301)
        // this.form = this.$store.state.SET_CHRONIC_DISEASE;
        // this.form.canbao = this.$store.state.SET_USER_DETAILINFO.regionName
        // this.form.AAB301 = this.$store.state.SET_USER_DETAILINFO.AAB301
    },
  methods: {
    //  本页面的点击
    species(val) {
      this.$refs.species.open();
    },
    disease1(val) {
      this.$refs.disease1.open();
    },
    disease2(val) {
      this.$refs.disease2.open();
    },
    disease3(val) {
      this.$refs.disease3.open();
    },
    // 组件返回的数据
    speciesClick(code, name) {
      this.form.AKA035Name = name;
      this.form.AKA035 = code;
    },
    disease1Click(code, name) {
      this.form.AKA121 = name;
      this.form.AKA120 = code;
    },
    disease2Click(code, name) {
      this.form.AKA1211 = name;
      this.form.AKA1201 = code;
    },
    disease3Click(code, name) {
      this.form.AKA1212 = name;
      this.form.AKA1202 = code;
    },
    // 选择参保地
    openInsuredPicker() {
      this.$refs.insuredPicker.open();
    },
    chooseInsured(val) {
      this.AAB301000 = val.name;
      this.form.AAS301 = val.code[0];
      this.form.AAB301 = val.code[1];
    },
    // 选择开始日期
    openStartPicker() {
      this.$refs.startPicker.open();
    },
    handleStartConfirm(val) {
      let date = this.util.formatDate(val, "yyyy-MM-dd");
      this.form.AAE030 = date;
    },
    // 选择病历提取方式
    openTypePicker(){
      this.$refs.typePicker.open();
    },
    handleTypeConfirm(val){
      this.form.BKE247 = val.value;
      this.BKE247VALUE = val.label;
      console.log(this.form.BKE247);
    },
    // 清空疾病选择
    deleteText(val){
      if(val == 2){
        this.form.AKA1201 = '';
        this.form.AKA1211 = '';
      }else if(val == 3){
        this.form.AKA1202 = '';
        this.form.AKA1212 = '';
      }
    },
    // 获取邮寄信息
    getMailInfo(){
        let submitForm = {}
        // 加入电子社保卡号
        if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
            submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
        }else {
            this.$toast("未获取到人员基本信息");
        }
        const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'2002');
        this.$axios.post(this.epFn.ApiUrl() + '/h5/jy2002/getRecord', params).then((resData) => {
            //   成功   1000
            if ( resData.enCode == 1000 ) {
                  this.form.AAE011 = resData.AAE009 //收件人
                  if(resData.AAE005.length > 11){
                      this.form.AAE005 = '';
                  }else{
                      this.form.AAE005 = resData.AAE005  //手机号码
                  }
                  this.form.AAE006 = resData.AAE006   //详细地址
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

    submit() {
      if (this.showMail == true) {
        if (!this.util.checkPhone(this.form.AAE005)) {
          this.$toast("请填写正确的手机号码");
          return false;
        }
      }

      if (this.canSubmit == false) {
        this.$toast("信息未填写完整");
        return false;
      } else {
        //   this.$store.dispatch("SET_CHRONIC_DISEASE", this.form);
            //   this.$router.push("/chronicDiseaseDetail");
        let params = this.formatSubmitData();
        this.$axios.post(this.epFn.ApiUrl() + "/h5/jy1024/diseasesRecord",params)
          .then(resData => {
            if (resData.enCode == "1000") {
              this.$store.dispatch("SET_CHRONIC_DISEASE", this.form);
              this.$router.push("/chronicDiseaseDetail");
            }else if(resData.enCode=="1001"){
               this.$toast(resData.msg)
            }
          })
      }
    },
    // 提交信息封装
    formatSubmitData() {
      let submitForm = Object.assign({}, this.form);
      submitForm.AAE030 = this.util.DateToNumber(this.form.AAE030);
      submitForm.photoIdList = this.form.photoIdList.join(',');
      // let submitForm = JSON.parse(JSON.stringify(this.form)); //深拷贝
      // 加入用户名和电子社保卡号
      if (this.$store.state.SET_NATIVEMSG.name !== undefined) {
        submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
        submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
      } else {
        submitForm.AAC003 = "许肖军";
        this.$toast("未获取到人员基本信息");
      }
      // submitForm.debugTest = "true"
      // 请求参数封装
      const params = this.epFn.commonRequsetData(
        this.$store.state.SET_NATIVEMSG.PublicHeader,
        submitForm,
        "1024"
      );
      return params;
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
                              
                              this.$toast("未获取到人员基本信息");
                          }
                          // 加入子项编码
                          submitForm.AGA002 = '330800253004'
                          submitForm.photoList = data.picPath[0]
                          submitForm.PTX001 = '2'
                          const params = This.epFn.commonRequsetData(This.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'2006');
                          // 图片上传后台
                          This.$axios.post(This.epFn.ApiUrl() + '/h5/jy2006/updPhoto', params).then((resData) => {
                              console.log('返回成功信息',resData) 
                              //   成功   1000
                              if ( resData.enCode == 1000 ) {
                                  // 获取图片
                                  This.picArr.push(data.picPath[0])
                                  This.form.photoIdList.push(resData.photoId);
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
      console.log('删除图片',this.form.photoIdList);
      this.picArr.splice(index,1)
      this.form.photoIdList.splice(index,1)
      console.log('删除后',this.form.photoIdList);
  },
  }
};
</script>

<style lang="less" scoped>
.chronicDisease {
  .Content {
    height: 100%;
    margin-bottom: 1.4rem;
    .ListInfo {
      width: 7.5rem;
      padding: 0 0.28rem;
      background: white;
      .InfoLine {
        height: 1.2rem;
        position: relative;
        font-family: PingFangSC-Regular;
        font-size: 0.28rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 0.01rem solid #d5d5d5;
        .InfoName {
          line-height: 1.2rem;
          span {
            height: 0.6rem;
            line-height: 0.6rem;
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
            background-color: #fff;
            height: 0.6rem;
            font-family: PingFangSC-Regular;
            font-size: 0.28rem;
            color: #000000;
            letter-spacing: 0;
            text-align: right;
            border: none;
          }
          .svg-icon {
            margin-left: 0.23rem;
          }
        }
        &:last-child {
          border-bottom: none;
        }
      }
    }
    .MailInfo {
      width: 7.5rem;
      padding: 0 0.3rem;
      margin-top: 0.27rem;
      background: white;
      .InfoLine {
        height: 1.2rem;
        position: relative;
        font-family: PingFangSC-Regular;
        font-size: 0.28rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 0.01rem solid #d5d5d5;
        .InfoName {
          line-height: 1.2rem;
          span {
            height: 0.6rem;
            line-height: 0.6rem;
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
            background-color: #fff;
            height: 0.6rem;
            font-size: 0.28rem;
            color: #000000;
            letter-spacing: 0;
            text-align: right;
            border: none;
          }
        }
        &:last-child {
          height: 1.6rem;
          border-bottom: none;
          .InfoText {
            display: flex;
            align-items: center;
          }
          textarea {
            height: 0.84rem;
            font-size: 0.3rem;
            opacity: 0.85;
            color: #000000;
            line-height: 0.42rem;
            text-align: right;
          }
        }
      }
      .InfoLineAdress {
        border: 1px solid #ccc;
        border-bottom: 1px solid #ccc !important;
        width: 100%;
        margin-top: -1px;
        textarea {
          width: 100%;
          text-align: left !important;
        }
      }
    }
    .Hint {
      margin-top: 0.45rem;
      padding: 0 0.3rem;
      opacity: 0.45;
      font-family: PingFangSC-Regular;
      font-size: 0.24rem;
      color: #000000;
      text-align: left;
      .HintTitle {
        i {
          margin-right: 0.2rem;
          letter-spacing: 0;
        }
      }
      .HintText {
        margin-top: 0.28rem;
        letter-spacing: 0;
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
.chronicDisease .el-input__prefix,
.el-input__suffix {
  display: none;
}
.chronicDisease .el-input__inner {
  border: none;
  text-align: right;
  padding-right: 0;
  padding-left: 0;
}
</style>