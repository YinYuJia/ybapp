<template>
  <div class="chronicDisease">
    <div v-show="!isSearch">
      <Title :title="'规定病种备案'" :backRouter="'/'"></Title>
      <!-- MintUI弹出框区域 -->
      <selectCity :type="3" ref="insuredPicker" @confirm="chooseInsured"></selectCity>
      <mt-datetime-picker
        type="date"
        ref="startPicker"
        v-model="dateVal"
        @confirm="handleStartConfirm"
      ></mt-datetime-picker>
      <!-- 弹出框区域结束 -->
      <div class="Content">
        <!-- 基本信息 -->
        <userBaseInfo></userBaseInfo>
        <!-- 列表信息 -->
        <div class="ListInfo">
          <div class="InfoLine">
            <div class="InfoName">
              <span>参保地</span>
            </div>
            <div class="InfoText">
              <input
                @click="openInsuredPicker"
                type="text"
                v-model="form.canbao"
                placeholder="请选择"
                readonly
              >
              <svg-icon icon-class="serveComponent_arrowRight"/>
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
              <svg-icon icon-class="serveComponent_arrowRight"/>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>疾病1</span>
            </div>
            <div class="InfoText">
              <input
                @click="disease1()"
                type="text"
                v-model="form.AKA121"
                placeholder="请选择"
                readonly
              >
              <svg-icon icon-class="serveComponent_arrowRight"/>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>疾病2</span>
            </div>
            <div class="InfoText">
              <input
                @click="disease2()"
                type="text"
                v-model="form.AKA1211"
                placeholder="请选择"
                readonly
              >
              <svg-icon icon-class="serveComponent_arrowRight"/>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>疾病3</span>
            </div>
            <div class="InfoText">
              <input
                @click="disease3()"
                type="text"
                v-model="form.AKA1212"
                placeholder="请选择"
                readonly
              >
              <svg-icon icon-class="serveComponent_arrowRight"/>
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
              <svg-icon icon-class="serveComponent_arrowRight"/>
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>病历提取</span>
            </div>
            <div class="InfoText">
              <el-select v-model="form.BKE247" placeholder="请选择领取方式">
                <el-option
                  v-for="item in option"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <svg-icon icon-class="serveComponent_arrowRight"/>
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
              <span>联系电话：</span>
            </div>
            <div class="InfoText">
              <input type="tel" maxlength="11" v-model="form.AAE005" placeholder="请输入联系人电话号码">
            </div>
          </div>
          <div class="InfoLine">
            <div class="InfoName">
              <span>详细地址</span>
            </div>
            <div class="InfoText">
              <textarea v-model="form.AAE006" placeholder="请输入详细地址"></textarea>
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
      </div>
      <!-- 按钮 -->
      <Footer :canSubmit="canSubmit" @submit="submit()"></Footer>
    </div>
    <!-- 规定病种 -->
    <SearchInfoPage ref="species"  @childrenClick="speciesClick"></SearchInfoPage>
    <!-- 疾病1 -->
    <SearchInfoPage ref="disease1" @childrenClick="disease1Click"></SearchInfoPage>
    <!-- 疾病2 -->
    <SearchInfoPage ref="disease2" @childrenClick="disease2Click"></SearchInfoPage>
    <!-- 疾病3 -->
    <SearchInfoPage ref="disease3" @childrenClick="disease3Click"></SearchInfoPage>
  </div>
</template>

<script>
import Title from "../../common/Title";
import userBaseInfo from "../../common/userBaseInfo";
import selectCity from "../../common/selectCity";
import Footer from "../../common/Footer";
import SearchInfoPage from "../../common/searchInfoPage";
export default {
  components: {
    Title,
    userBaseInfo,
    selectCity,
    Footer,
    SearchInfoPage
  },
  data() {
    return {
      form: {
        canbao: "", //参保地
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
        AAE005: "", //联系电话
        AAE006: "" //详细地址
      },
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
           if ( val.AAS301 != '' && val.AKA035 != '' && val.AKA120 !=  '' && val.AAE030 != '' && val.AAE011 != '' && val.AAE005 != '' && val.AAE006 != '') {
                this.canSubmit = true
            }else{
                this.canSubmit = false
            }
          
        } else {
            if ( val.AAS301 != '' && val.AKA035 != '' && val.AKA120 != ''  && val.AAE030 != '') {
                this.canSubmit = true
            }else{
                this.canSubmit = false
            }
          this.showMail = false;
        }
      },
      deep: true
    }
  },
    created(){
        this.form = this.$store.state.SET_CHRONIC_DISEASE;
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
      this.form.canbao = val.name;
      this.form.AAS301 = val.code[0];
      this.form.AAB301 = val.code[1];
      this.form.AAQ301 = val.code[2];
    },
    // 选择开始日期
    openStartPicker() {
      this.$refs.startPicker.open();
    },
    handleStartConfirm(val) {
      let date = this.util.formatDate(val, "yyyy-MM-dd");
      this.form.AAE030 = date;
    },
    submit() {
      if (this.showMail == true) {
        if (!this.util.checkPhone(this.form.AAE005)) {
          this.$toast("请填写正确的联系电话");
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
        this.$axios.post(this.epFn.ApiUrl1() + "/h5/jy1024/diseasesRecord",params)
          .then(resData => {
            if (resData.enCode == "1000") {
              this.$store.dispatch("SET_CHRONIC_DISEASE", this.form);
              this.$router.push("/chronicDiseaseDetail");
            }
          })
      }
    },
    // 提交信息封装
    formatSubmitData() {
      let submitForm = Object.assign({}, this.form);
      submitForm.AAE030 = this.util.DateToNumber(this.form.AAE030).toString();
      // let submitForm = JSON.parse(JSON.stringify(this.form)); //深拷贝
      // 加入用户名和电子社保卡号
      if (this.$store.state.SET_NATIVEMSG.name !== undefined) {
        submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
        submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
      } else {
        submitForm.AAC003 = "鲁伟兴";
        submitForm.AAE135 = "330622197407215513";
      }
      submitForm.debugTest = "true"
      // 请求参数封装
      const params = this.epFn.commonRequsetData(
        this.$store.state.SET_NATIVEMSG.PublicHeader,
        submitForm,
        "1024"
      );
      return params;
    }
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
            height: 0.6rem;
            font-family: PingFangSC-Regular;
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