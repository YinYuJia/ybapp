<template>
  <div class="SearchInfoPage">
    <Title :title="title" :backRouter="'/chronicDisease'"></Title>
    <div class="SearchContent">
      <div class="SearchBox">
        <svg-icon icon-class="serveComponent_search"/>
        <input class="InputContent" placeholder="按疾病名称查找">
        <div class="SearchBtn">搜索</div>
      </div>
    </div>
    <!-- <div class="ListContent">
      <div
        class="List"
        v-for="item in HospitalList"
        :key="item.AKB020"
        @click="chooseHospital(item.AKB020,item.hospitalName)"
      >{{item.hospitalName}}</div>
    </div> -->

    <mt-loadmore
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
    >
      <ul class="ListContent">
        <li
          class="List"
          v-for="item in HospitalList"
          :key="item.AKB020"
          @click="chooseHospital(item.AKB020,item.hospitalName)"
        >{{ item.hospitalName }}</li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
import Title from "./Title";
export default {
  components: {
    Title
  },
  data() {
    return {
      HospitalList: [
        { AKB020: "3300001101019", hospitalName: "浙江中医药大学附属第三医院" },
        { AKB020: "3300001102003", hospitalName: "杭州市第三人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" }
      ],
      smallReimForm: {}, // 零星报销对象
      params: {
        pageSize: 10,
        pageNum: "1",
        AAA102: ""
      },
      allLoaded: true
    };
  },
  props: {
    type: {
      type: String,
      default: 'AKB020'
    },
    title:{
        type: String,
        default: "标题"
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      // 封装数据
      let params = this.formatSubmitData();
      // 开始请求
      this.$axios.post("http://192.168.1.8:13010/app/jy2001/optionInformationList",params).then(resData => {
          console.log("返回成功信息", resData.LS_DS);
          //   成功   1000
          if (resData.enCode == 1000) {
            this.$toast("提交成功");
            if (resData.LS_DS.length > 0) {
              this.List = [...this.List, ...resData.LS_DS];
              let pageNum = Math.ceil(this.List.length / this.params.pageSize);
              //向上取整
              this.params.pageNum = pageNum;
              if (resData.page > pageNum) {
                this.params.pageNum += 1;
                this.allLoaded = false;
                sessionStorage.setItem("params", JSON.stringify(this.params));
                sessionStorage.setItem("pointList", JSON.stringify(this.List));
              }
              // sessionStorage.setItem("params", JSON.stringify(this.params));
            }
          } else if (resData.enCode == 1001) {
            //   失败  1001
            this.$toast(resData.msg);
            return;
          } else {
            this.$toast("业务出错");
            return;
          }
        });
    },
    loadBottom() {
        // 加载更多数据
        this.allLoaded = true;// 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
    },
    formatSubmitData() {
      let submitForm = {};
      // 日期传换成Number
    //   submitForm.AAS301 = this.form.AAS301; //参保地省
    //   submitForm.AAB301 = this.form.AAB301; //参保地市
    //   submitForm.AAQ301 = this.form.AAQ301; //参保地区
      submitForm.AAA102 = this.form.AAA102; //模糊查询
      submitForm.AAA100 = this.type; //机构参数
      submitForm.pageNum = this.params.pageNum; //模糊查询

      // 加入用户名和电子社保卡号
      if (this.$store.state.SET_NATIVEMSG.name !== undefined) {
        submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
        submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
      } else {
        submitForm.AAC003 = "胡";
        submitForm.AAE135 = "113344223344536624";
      }
      // 请求参数封装
      const params = this.epFn.commonRequsetData(
        this.$store.state.SET_NATIVEMSG.PublicHeader,
        submitForm,
        "2001"
      );
      return params;
    },
    chooseHospital(code, name) {
        this.$emit('childrenClick',code,name)
    //   this.smallReimForm.AKB020 = code;
    //   this.smallReimForm.hospitalName = name;
    //   this.$store.dispatch("SET_SMALL_REIM_1", this.smallReimForm);
    //   this.$emit("childrenClick", code, name);
      // this.$router.push('/smallReim');
    }
  }
};
</script>

<style lang="less" scoped>
.SearchInfoPage {
  .SearchContent {
    height: 1.18rem;
    width: 7.5rem;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    .SearchBox {
      height: 0.8rem;
      width: 6.7rem;
      padding: 0 0.15rem;
      border: 0.01rem solid #1492ff;
      border-radius: 0.05rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .svg-icon {
        height: 0.5rem;
        width: 0.5rem;
      }
      .InputContent {
        height: 0.49rem;
        width: 4.8rem;
        font-size: 0.26rem;
        border: none;
        &::placeholder {
          color: #c9c9c9;
        }
      }
      .SearchBtn {
        height: 0.49rem;
        width: 0.99rem;
        background: #1492ff;
        border-radius: 0.04rem;
        color: white;
        font-size: 0.26rem;
        line-height: 0.49rem;
        letter-spacing: 0;
      }
    }
  }
  .ListContent {
    width: 7.5rem;
    background: #fff;
    padding: 0 0.37rem;
    .List {
      height: 1.2rem;
      font-size: 0.28rem;
      color: #000;
      letter-spacing: 0;
      line-height: 1.2rem;
      text-align: left;
      border-bottom: 0.01rem solid #d5d5d5;
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>