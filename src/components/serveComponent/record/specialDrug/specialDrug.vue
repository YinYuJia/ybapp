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
              @click="openInsuredPicker"
              type="text"
              v-model="AAB30100"
              placeholder="请选择"
              readonly
            >
            <svg-icon icon-class="serveComponent_arrowRight"/>
          </div>
        </div>
        <div class="InfoLine">
          <div class="InfoName">
            <span>就诊机构</span>
          </div>
          <div class="InfoText">
            <input type="text" @click="org" v-model="form.AKB020Name" readonly placeholder="请选择">
            <svg-icon icon-class="serveComponent_arrowRight"/>
          </div>
          <!-- <div class="InfoText">
            <el-select v-model="form.AKB020" placeholder="请选择">
              <el-option
                v-for="item in hospitalList"
                :key="item.AAA102"
                :label="item.AAA103"
                :value="item.AAA102"
              ></el-option>
            </el-select>
            <svg-icon icon-class="serveComponent_arrowRight"/>
          </div> -->
        </div>
        <div class="InfoLine">
          <div class="InfoName">
            <span>项目类型</span>
          </div>
          <div class="InfoText">
            <el-select v-model="form.BKE253" placeholder="请选择">
              <el-option
                v-for="item in typeList"
                :key="item.AAA102"
                :label="item.AAA103"
                :value="item.AAA102"
              ></el-option>
            </el-select>
            <svg-icon icon-class="serveComponent_arrowRight"/>
          </div>
        </div>
        <div class="InfoLine">
          <div class="InfoName">
            <span>特治特药类型</span>
          </div>
          <div class="InfoText">
            <el-select v-model="form.BKE228" placeholder="请选择" :disabled="oneDisabled">
              <el-option
                v-for="item in drugList"
                :key="item.AAA102"
                :label="item.AAA103"
                :value="item.AAA102"
              ></el-option>
            </el-select>
            <svg-icon icon-class="serveComponent_arrowRight"/>
          </div>
        </div>
        <div class="InfoLine">
          <div class="InfoName">
            <span>疾病名称</span>
          </div>
          <div class="InfoText">
            <input type="text" @click="species" v-model="form.AKA121" :class="{disabledInput:twoDisabled}" :disabled="twoDisabled" readonly placeholder="请选择">
            <svg-icon icon-class="serveComponent_arrowRight"/>
          </div>
        </div>
        <div class="InfoLine">
          <div class="InfoName">
            <span>用药时期</span>
          </div>
          <div class="InfoText">
            <el-select v-model="form.BKE248" placeholder="请选择">
              <el-option
                v-for="item in drugTimeList"
                :key="item.AAA102"
                :label="item.AAA103"
                :value="item.AAA102"
              ></el-option>
            </el-select>
            <svg-icon icon-class="serveComponent_arrowRight"/>
          </div>
        </div>
        <div class="InfoLine">
          <div class="InfoName">
            <span>项目名称</span>
          </div>
          <div class="InfoText">
            <input type="text" @click="project" :class="{disabledInput:threeDisabled}" v-model="form.AKE002" :disabled="threeDisabled" placeholder="请选择">
            <svg-icon icon-class="serveComponent_arrowRight"/>
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
            <svg-icon icon-class="serveComponent_arrowRight"/>
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
            <svg-icon icon-class="serveComponent_arrowRight"/>
          </div>
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
      oneDisabled: true,
      twoDisabled: true,
      threeDisabled: true,
      AAE013One:'',
      AAE013Two:'',
      AAA052One:'',
      AAA052Two:'',       
      AAB30100: "",
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
        AAE031: "" //结束日期
      },
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
    this.form = this.$store.state.SET_SPECIAL_DRUG;
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
          val.AAS301 != "" &&
          val.AKB020 != "" &&
          val.BKE253 != "" &&
          val.BKE228 != "" &&
          val.AKA120 != "" &&
          val.AKA121 != "" &&
          val.AKE002 != "" &&
          val.AKA071 != "" &&
          val.AKC226 != "" &&
          val.AAE030 != "" &&
          val.AAE031 != ""
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
          this.oneDisabled = true
          this.form.BKE228 = ""
        }else{
          // 获取特药特治类型列表
          this.oneDisabled = false
          if(val!=oldVal){
            // 如果项目类型修改了 重新请求
            this.getSelect('BKE228',"BKE253",val)
            this.form.BKE228=""
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
      this.AAB30100 = val.name;
      this.form.AAS301 = val.code[0];
      this.form.AAB301 = val.code[1];
      this.form.AAQ301 = val.code[2];
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
        this.$store.dispatch("SET_SPECIAL_DRUG", this.form);
        this.$router.push("/specialDrugDetail");
        let params = this.formatSubmitData();
        console.log(params);
        
        this.$axios
          .post(this.epFn.ApiUrl() + "/h5/jy1023/specialTreat", params)
          .then(resData => {
            if (resData.enCode == "1000") {
              this.$toast(resData.msg)
              this.$store.dispatch("SET_SPECIAL_DRUG", this.form);
              this.$router.push("/specialDrugDetail");
            }
          });
      }
    },
    // 提交信息封装
    formatSubmitData() {
      let submitForm = Object.assign({}, this.form);
      submitForm.AAE030 = this.util.DateToNumber(this.form.AAE030)
      submitForm.AAE031 = this.util.DateToNumber(this.form.AAE031)
      // let submitForm = JSON.parse(JSON.stringify(this.form)); //深拷贝
      // 加入用户名和电子社保卡号
      if (this.$store.state.SET_NATIVEMSG.name !== undefined) {
        submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
        submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
      } else {
        submitForm.AAC003 = "鲁伟兴";
        submitForm.AAE135 = "330622197407215513";
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
                this.typeList = resData.LS_DS
                return
              }
              if(val == 'BKE228'){
                this.drugList = resData.LS_DS
                return
              }
              if(val == 'BKE248'){
                this.drugTimeList = resData.LS_DS
                return
              }
          }
        });
    }
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