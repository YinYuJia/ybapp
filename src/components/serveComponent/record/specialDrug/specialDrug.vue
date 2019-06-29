<template>
  <div class="specialDrug">
    <Title :title="'特治特药备案'" :backRouter="'/'"></Title>
    <!-- MintUI弹出框区域 -->
    <SelectCity :type="2" ref="insuredPicker" @confirm="chooseInsured"></SelectCity>
    <mt-datetime-picker
      type="date"
      ref="startPicker"
      v-model="dateVal"
      :startDate="startDate"
      @confirm="handleStartConfirm"
    ></mt-datetime-picker>
    <mt-datetime-picker
      type="date"
      ref="endPicker"
      v-model="endDateVal"
      :startDate="startDate"
      @confirm="handleEndConfirm"
    ></mt-datetime-picker>
    <!-- 项目类型 -->
    <SelectCity 
        :type="1"
        ref="projectTypePicker"
        :propArr="typeList"
        @confirm="handleProjectTypeConfirm"
        >
    </SelectCity>
    <!-- 特质特药类型 -->
    <SelectCity 
        :type="1"
        ref="drugPicker"
        :propArr="drugList"
        @confirm="handleDrugConfirm"
        >
    </SelectCity>
    <!-- 用药时期 -->
    <SelectCity 
        :type="1"
        ref="drugTimePicker"
        :propArr="drugTimeList"
        @confirm="handleDrugTimeConfirm"
        >
    </SelectCity>
    <!-- 弹出框区域结束 -->
    <div class="Content">
      <!-- 基本信息 -->
      <UserBaseInfo></UserBaseInfo>
      <!-- 申报信息 -->
      <div class="ReportInfo">
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
            <span>就诊机构</span>
          </div>
          <div class="InfoText">
            <input type="text" @click="org" v-model="form.AKB020Name" readonly placeholder="请选择">
          </div>
        </div>
        <div class="InfoLine">
          <div class="InfoName">
            <span>项目类型</span>
          </div>
          <div class="InfoText">
            <input @click="openProjectTypePicker()" type="text" v-model="BKE253VALUE" placeholder="请选择" readonly>
          </div>
        </div>
        <div class="InfoLine">
          <div class="InfoName">
            <span>特治特药类型</span>
          </div>
          <div class="InfoText">
            <input 
              @click="openDrugPicker()" 
              type="text" v-model="BKE228VALUE" 
              placeholder="请选择" 
              readonly 
              :disabled="oneDisabled"
              :class="{disabledInput:oneDisabled}"
              >
          </div>
        </div>
        <div class="InfoLine">
          <div class="InfoName">
            <span>疾病名称</span>
          </div>
          <div class="InfoText">
            <input 
              type="text" 
              @click="species" 
              v-model="form.AKA121" 
              :class="{disabledInput:twoDisabled}" 
              :disabled="twoDisabled" 
              readonly 
              placeholder="请选择">
          </div>
        </div>
        <div class="InfoLine">
          <div class="InfoName">
            <span>用药时期</span>
          </div>
          <div class="InfoText">
            <!-- <el-select v-model="form.BKE248" placeholder="请选择">
              <el-option
                v-for="item in drugTimeList"
                :key="item.AAA102"
                :label="item.AAA103"
                :value="item.AAA102"
              ></el-option>
            </el-select> -->
            <input @click="openDrugTimePicker()" type="text" v-model="BKE248VALUE" placeholder="请选择" readonly>
          </div>
        </div>
        <div class="InfoLine">
          <div class="InfoName">
            <span>项目名称</span>
          </div>
          <div class="InfoText">
            <input type="text" @click="project" :class="{disabledInput:threeDisabled}" v-model="form.AKE002" :disabled="threeDisabled" placeholder="请选择" readonly>
          </div>
        </div>
        <div class="InfoLine">
          <div class="InfoName">
            <span>剂量</span>
          </div>
          <div class="InfoText">
            <input type="tel" v-model="form.AKA071" placeholder="请输入">
          </div>
        </div>
        <div class="InfoLine">
          <div class="InfoName">
            <span>数量</span>
          </div>
          <div class="InfoText">
            <input type="tel" v-model="form.AKC226" placeholder="请输入">
          </div>
        </div>
        <div class="InfoLine">
          <div class="InfoName">
            <span>开始日期</span>
          </div>
          <div class="InfoText">
            <input
              @click="openStartPicker"
              type="text"
              v-model="form.AAE030"
              placeholder="请选择"
              readonly
            >
          </div>
        </div>
        <div class="InfoLine">
          <div class="InfoName">
            <span>结束日期</span>
          </div>
          <div class="InfoText">
            <input
              @click="openEndPicker"
              type="text"
              v-model="form.AAE031"
              placeholder="请选择"
              readonly
            >
          </div>
        </div>
      </div>
      <!-- 资料上传 -->
      <div class="dataUpload">
          <div class="uploadHint">附件上传，请选择下述其中一项附件内容进行上传</div>
          <div class="uploadList">
              1、特治特药备案表（医院盖章）
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
    <!-- 就诊机构 -->
    <SearchInfoPage ref="org" @childrenClick="orgClick"></SearchInfoPage>
    <!-- 疾病名称 -->
    <SearchInfoPage ref="species" :AAE013="AAE013One" :AAA052="AAA052One" type="AKA120" @childrenClick="speciesClick"></SearchInfoPage>
    <!-- 项目名称 -->
    <SearchInfoPage ref="project" :AAE013="AAE013Two" :AAA052="AAA052Two" type=AKE001 @childrenClick="projectClick"></SearchInfoPage>
  </div>
</template>

<script>

export default {
  data() {
    return {
      picArr: [],//附件集合
      oneDisabled: true,
      twoDisabled: true,
      threeDisabled: true,
      AAE013One:'',
      AAE013Two:'',
      AAA052One:'',
      AAA052Two:'',       
      AAB301000: "",
      form: {
        AAS301: "", //参保地
        AAB301: "", //参保地
        AAQ301: "", //参保地
        AKB020: "", //就诊机构
        AKB020Name:"",
        BKE253: "", //项目类型
        BKE228: "", //特药特治类型
        AKA120: "", //疾病编码
        AKA121: "", //疾病名称
        BKE248: "", //用药时期
        AKE001: "", //项目编码
        AKE002: "", //项目名称
        AKA071: "", //单位剂量
        AKC226: "", //数量
        BKE249: "", //备案剂量
        AKA069: "", //自理比例
        BKE250: "", //累计备案剂量
        BKE251: "", //剩余备案剂量
        BKE252: "", //实际使用量
        AKB063: "", //备案天数
        AAE030: "", //开始日期
        AAE031: "", //结束日期
        photoIdList:[],//照片ID数组
      },
      BKE253VALUE: "", //项目类型值
      BKE228VALUE: "", //特治特药类型值
      BKE248VALUE: "", //用药时期值
      startDate: new Date(),
      dateVal: new Date(), //默认绑定的时间
      endDateVal: new Date(), //默认绑定的时间
      canSubmit: false,
      hospitalList: [],
      typeList: [],
      drugList: [],
      drugTimeList: []
    };
  },
  created() {
    this.epFn.setTitle('特治特药备案')
               let GinsengLandCode = sessionStorage.getItem("GinsengLandCode")
           let GinsengLandName = sessionStorage.getItem("GinsengLandName")

           console.log('GinsengLandCode',GinsengLandCode,'GinsengLandName',GinsengLandName)
           this.AAB301000 = GinsengLandName
           this.form.AAB301 = GinsengLandCode
           this.form.AAS301 = GinsengLandCode.substring(0,2) + '0000'
           console.log('this.form.AAS301',this.form.AAS301)
           console.log('this.form.AAB301',this.form.AAB301)
    // this.form = this.$store.state.SET_SPECIAL_DRUG;
    // this.form.canbao = this.$store.state.SET_USER_DETAILINFO.regionName
    // this.form.AAB301 = this.$store.state.SET_USER_DETAILINFO.AAB301
  },
  mounted(){
    /**
     * BKE253 项目类型
        BKE228 特药特治类型
        BKE248 用药时期
        AKB020 医疗机构
     */
    // this.getSelect('AKB020')
    this.getSelect('BKE253')
    
    this.getSelect('BKE248')
    
  },
  destroyed(){
    // window.removeEventListener('popstate', this.fun, false);//false阻止默认事件
  },
  watch: {
    form: {
      handler: function(val,oldVal) {
        // 判断不为空
        if (
          val.AAS301 != "" && //参保地
          val.AKB020 != "" && //就诊机构
          val.BKE253 != "" && //项目类型
          val.BKE228 != "" && //特药特治类型
          val.AKA121 != "" && //疾病名称
          val.BKE248 != "" && //用药时期
          val.AKE002 != "" && //项目名称
          val.AKA071 != "" && //单位剂量
          val.AKC226 != "" && //数量
          val.AAE030 != "" && //开始日期
          val.AAE031 != "" && //结束日期
          val.photoIdList.length>0 //照片数组
        ) {
          this.canSubmit = true;
        } else {
          this.canSubmit = false;
        }
        // 判断时间间隔
        if (val.AAE030 != "" && val.AAE031 != "") {
          let AAE030 = new Date(val.AAE030);
          let AAE031 = new Date(val.AAE031);
          let month = 24 * 3600 * 1000 * 30;
          let gap = AAE031 - AAE030;
          if (gap <= 0) {
            this.$toast("结束日期必须大于开始日期");
            this.form.AAE031 = "";
          }
        }
        
        
      },
      deep: true
    },
    'form.BKE253'(val,oldVal){
      // 项目类型
        if(val ==""){
          this.oneDisabled = true;
          this.form.BKE228 = "";
          this.BKE228VALUE = "";
        }else{
          // 获取特药特治类型列表
          this.oneDisabled = false
          if(val!=oldVal){
            // 如果项目类型修改了 重新请求
            this.getSelect('BKE228',"BKE253",val);
            this.form.BKE228="";
            this.BKE228VALUE = "";
          }
        }
      
    },
    'form.BKE228'(val,oldVal){
       // 特治特药类型
      if(val ==""){
        this.twoDisabled = true
        this.threeDisabled = true
        this.form.AKA121 = ""
        this.form.AKE001 = ""
          
      }else{
        // 获取疾病名称和项目名称
        this.twoDisabled = false
        this.threeDisabled = false
        if(val!=oldVal){
          // 如果修改 重新请求
          this.AAE013One = 'BKE228'
          this.AAE013Two = 'BKE228'

          this.AAA052One = val
          
          this.AAA052Two = val
          this.form.AKA121=""
          this.form.AKE002=""
        }
      }
    }
  },
  methods: {
    fun(){
      console.log("监听到了");

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
    // 选择项目类型
    openProjectTypePicker(){
      this.$refs.projectTypePicker.open();
    },
    handleProjectTypeConfirm(val){
      this.form.BKE253 = val.value;
      this.BKE253VALUE = val.label;
    },
    // 选择特治特药类型
    openDrugPicker(){
      this.$refs.drugPicker.open();
    },
    handleDrugConfirm(val){
      this.form.BKE228 = val.value;
      this.BKE228VALUE = val.label;
    },
    // 选择用药时期
    openDrugTimePicker(){
      this.$refs.drugTimePicker.open();
    },
    handleDrugTimeConfirm(val){
      this.form.BKE248 = val.value;
      this.BKE248VALUE = val.label;
    },
    // 选择开始日期
    openStartPicker() {
      this.$refs.startPicker.open();
    },
    openEndPicker() {
      this.$refs.endPicker.open();
    },
    handleStartConfirm(val) {
      let date = this.util.formatDate(val, "yyyy-MM-dd");
      this.form.AAE030 = date;
    },
    handleEndConfirm(val) {
      let date = this.util.formatDate(val, "yyyy-MM-dd");
      this.form.AAE031 = date;
    },
    // 疾病名称
    species(val) {
      this.$refs.species.open();
    },
    project(val) {
      this.$refs.project.open();
    },
    org(){
        this.$refs.org.open();
    },
    // 组件返回的数据
    speciesClick(code, name) {
      this.form.AKA121 = name;
      this.form.AKA120 = code;
    },
    projectClick(code, name) {
      this.form.AKE002 = name;
      this.form.AKE001 = code;
    },
    orgClick(code, name) {
      this.form.AKB020 = code;
      this.form.AKB020Name = name;
      // alert(name)
    },
    submit() {
      if (this.canSubmit == false) {
        this.$toast("信息未填写完整");
        return false;
      } else {
        // this.$store.dispatch("SET_SPECIAL_DRUG", this.form);
        // this.$router.push("/specialDrugDetail");
        let params = this.formatSubmitData();
        console.log(params);
        
        this.$axios
          .post(this.epFn.ApiUrl() + "/h5/jy1023/specialTreat", params)
          .then(resData => {
            if (resData.enCode == "1000") {
              
              this.$store.dispatch("SET_SPECIAL_DRUG", this.form);
              this.$router.push("/specialDrugDetail");
            }else{
              this.$toast(resData.msg)
            }
          });
      }
    },
    // 提交信息封装
    formatSubmitData() {
      let submitForm = Object.assign({}, this.form);
      submitForm.AAE030 = this.util.DateToNumber(this.form.AAE030)
      submitForm.AAE031 = this.util.DateToNumber(this.form.AAE031)
      submitForm.photoIdList = this.form.photoIdList.join(',');//照片ID数组
      // let submitForm = JSON.parse(JSON.stringify(this.form)); //深拷贝
      // 加入用户名和电子社保卡号
      if (this.$store.state.SET_NATIVEMSG.name !== undefined) {
        submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
        submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
      } else {
        this.$toast("未获取到人员基本信息");
      }
      // submitForm.debugTest = "true";
      // 请求参数封装
      const params = this.epFn.commonRequsetData(
        this.$store.state.SET_NATIVEMSG.PublicHeader,
        submitForm,
        "1023"
      );
      return params;
    },
    getSelect(val,AAE013,AAA052) {
      AAE013 = AAE013 || ''
      AAA052 = AAA052 || ''
      let submitForm = { AAA100: val, pageNum: "1",AAE013:AAE013,AAA052:AAA052 };
      const params = this.epFn.commonRequsetData(
        this.$store.state.SET_NATIVEMSG.PublicHeader,
        submitForm,
        "2001"
      );
      this.$axios
        .post(this.epFn.ApiUrl() + "/h5/jy2001/optionInformationList", params)
        .then(resData => {
          if (resData.enCode == "1000") {
              if(val == 'AKB020'){
                console.log(5555555555,resData.LS_DS);
                
                // this.hospitalList = resData.LS_DS
                return
              }
              if(val == 'BKE253'){
                this.typeList = [];
                resData.LS_DS.forEach(ele => {
                  let obj = new Object();
                  obj.value = ele.AAA102;
                  obj.label = ele.AAA103;
                  this.typeList.push(obj);
                });
                return
              }
              if(val == 'BKE228'){
                this.drugList = [];
                resData.LS_DS.forEach(ele =>{
                  let obj = new Object();
                  obj.value = ele.AAA102;
                  obj.label = ele.AAA103;
                  this.drugList.push(obj);
                })
                return
              }
              if(val == 'BKE248'){
                this.drugTimeList = [];
                resData.LS_DS.forEach(ele =>{
                  let obj = new Object();
                  obj.value = ele.AAA102;
                  obj.label = ele.AAA103;
                  this.drugTimeList.push(obj);
                })
                return
              }
          }else if (resData.enCode == 1001 ) {
              //   失败  1001
                this.$toast(resData.msg);
                return;
            }
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
                                
                                this.$toast("未获取到人员基本信息");
                            }
                            // 加入子项编码
                            submitForm.AGA002 = '330800253003'
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
.specialDrug {
  .Content {
    height: 100%;
    margin-bottom: 1.4rem;
    .ReportInfo {
      width: 7.5rem;
      padding: 0 0.3rem;
      background: white;
      .InfoLine {
        height: 1.2rem;
        position: relative;
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
            width: 4rem;
            background-color: #fff;
            height: 0.6rem;
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
/deep/ .el-input.is-disabled .el-input__inner{
  background-color: rgba(0, 0, 0, 0) !important;
}
</style>

<style>
.specialDrug .el-input__prefix,
.el-input__suffix {
  display: none;
}
.specialDrug .el-input__inner {
  border: none;
  text-align: right;
  padding-right: 0;
  padding-left: 0;
}

</style>