<template>
  <div class="SearchInfoPage" v-if="showSearch">
    <!-- 标题 -->
    <div class="Title">
        <el-row>
            <el-col :span="6">
                <div class="BackIcon" @click="back()">
                    <svg-icon icon-class="serveComponent_back" />
                    <span>返回</span>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="NameTitle">{{title}}</div>
            </el-col>
            <el-col :span="6">
            </el-col>
        </el-row>
    </div>
    <div class="SearchContent">
      <div class="SearchBox">
        <svg-icon icon-class="serveComponent_search"/>
        <input class="InputContent" placeholder="按疾病名称查找">
        <div class="SearchBtn">搜索</div>
      </div>
    </div>

    <mt-loadmore
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
    >
      <ul class="ListContent">
        <li
          class="List"
          v-for="(item,index) in List"
          :key="index"
          @click="chooseHospital(item.AKB020,item.hospitalName)"
        >{{ item.hospitalName }}</li>
      </ul>
    </mt-loadmore>
    <div class="footer" v-if="List.length < 20 && List.length >= 0">没有更多数据了~</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      List: [
         { AKB020: "3300001101019", hospitalName: "浙江中医药大学附属第三医院" },
        { AKB020: "3300001102003", hospitalName: "杭州市第三人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },
        { AKB020: "3302001100003", hospitalName: "宁波市北仑区人民医院" },

      ],
      smallReimForm: {}, // 零星报销对象
      params: {
        pageSize: 10,
        pageNum: "1",
        AAA102: ""
      },
      allLoaded: false,
      showSearch: false,
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
  mounted() {

    //如果有保存医院列表就从session里获取，没有就发起请求
    let List = JSON.parse(sessionStorage.getItem("pointList"));
    let params = JSON.parse(sessionStorage.getItem("params"));

    // let start =JSON.parse(sessionStorage.getItem('start'))
    // console.log("start",start)
    // console.log("params",params)
    

    if (List) {
      this.List = List;
      console.log("pointList",this.List.length)
      
      let pageNum=Math.ceil(this.List.length/params.pageSize);

      console.log("pointList",List[0].totalPage)
      console.log("paramsNum",pageNum)
      this.status = '1';
      this.params = params;
        if(List[0].totalPage>pageNum){
        this.allLoaded=false
        }else{
        this.allLoaded=true
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      // 封装数据
      this.allLoaded = false;
      let params = this.formatSubmitData();
      // 开始请求
      this.$axios.post(this.epFn.ApiUrl1()+"/app/jy2001/optionInformationList",params).then(resData => {
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
        console.log('加载')
      if (!this.allLoaded) {
        this.init();
        
      }
        this.allLoaded = true;// 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
        
    },
    formatSubmitData() {
      let submitForm = {};
      submitForm.AAA102 = this.params.AAA102; //模糊查询
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
    open(){
      this.showSearch = true;
    },
    back(){
      this.showSearch = false;
    },
    chooseHospital(code, name) {
        this.$emit('childrenClick',code,name);
        this.showSearch = false
    }
  }
};
</script>

<style lang="less" scoped>
.SearchInfoPage {
  background: #FFF;
  z-index: 999;
  position: fixed;
  top: 0;
  height: 100%;
  .Title {
    height: .8rem;
    background-color: white;
    line-height: .8rem;
    .BackIcon{
        display: flex;
        align-items: center;
        color: #1492FF;
        font-size: .32rem;
        .svg-icon{
            height: .5rem;
            width: .5rem;
        }
    }
    .NameTitle {
        color: #000000;
        letter-spacing: 0;
        font-size: .36rem;
    }
}
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
.footer {
  padding: 8px 0;
  background: #f2f2f2;
  font-size: 14px;
  text-align: center;
}
</style>