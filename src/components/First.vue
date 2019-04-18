<template>
  <div>
    <el-button type="primary" @click="iShow">主要按钮</el-button>
    <el-select v-model="value" placeholder="请选择" @change='onChange'>
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-cascader :options="optionst" :show-all-levels="false" v-model="optionsModel"></el-cascader>
    <div class="formList " v-if="ifShow">
      <div :class="{formListDiv:true,formListDiv1:form.delivery}">{{cont}}</div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <router-link to='/'>
            <el-button type="primary">跳转</el-button>
          </router-link>
          <el-button @click="cancle">{{msg == 1 ? "不取消" : "取消"}}</el-button>
        </el-form-item>
      </el-form>
      <div>{{message}}</div>
      <div>{{reversedMessage}}</div>
      <div>{{As}}</div>
      <div>{{Bs}}</div>
      <div>{{Cs}}</div>
      <svg-icon icon-class="1" className="Svg" />
      <Footer :info="infoMse"></Footer>
    </div>
  </div>
</template>

<style lang='less' scoped>
  .formList {
    width: 7.5rem;
    background-color: aqua;
    .formListDiv {
      color: red;
      height: 50px;
      background-color: yellow;
      font-size: .5rem;
    }
    .formListDiv1 {
      background-color: blue;
    }
    .Svg {
      height: 22.1rem;
      width: 7.5rem;
    }
  }
</style>

<script>
  import Footer from './Footer'
  export default {
    components: {
      'Footer': Footer
    },
    // 数据集合
    data() {
      return {
        infoMse: {
          msg: 'work',
        },
        value: '',
        cont: 50,
        message: "12345389",
        optionsModel: [],
        optionst: this.$store.state.SET_SELECTARRAY,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        msg: '取消',
        resDatas: {},
        ifShow: true,
        arrayList: [],
        As: '',
        Bs: '',
        Cs: ''
      }
    },
    // 生命周期发送请求
    created() {
      // const _this = this
      // this.$axios.post('http://192.168.101.62:8001/test/json', {
      //   id: 1
      // }).then(function(resData) {
      //   _this.resDatas = resData.data
      // }).catch(function(error) {
      //   console.log(error)
      // })
      // 定时器
      // this.timer = setInterval(() => {
      //   this.cont--
      //     if (this.cont == 0) {
      //       clearInterval(this.timer);
      //       console.log('定时器停止')
      //     }
      // }, 1000)
            console.log('this.$store.state.SET_PRODUCTS', this.$store.state.SET_PRODUCTS)
            console.log('this.$store.state.SET_TREATMENT_REIMBURSEMENT', this.$store.state.SET_TREATMENT_REIMBURSEMENT)
      console.log('this.$store.getters.SET_PRODUCTS', this.$store.getters.SET_PRODUCTS)

      this.$store.dispatch('SET_SELECTARRAY', this.epFn.ChinaJsonDatas())
      this.optionst = this.$store.state.SET_SELECTARRAY
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    // 计算属性
    computed: {
      // 计算属性的 getter
      reversedMessage: function() {
        // `this` 指向 vm 实例
        return this.form.name.split('').reverse().join('')
      }
    },
    // 监听数据
    watch: {
      // msg 要监听的值变化
      cont: {
        deep: true,
        handler: function(newValue, oldValue) {
          this.$store.state.SET_PRODUCTS.map((item, index) => {
            console.log(item.name + newValue)
          })
        }
      },
      delivery: {
        deep: true,
        handler: function(New, Old) {
          if (New) {}
        }
      }
    },
    mounted() {
      //  发送给  安卓  ios  交互方法 
      window.setOrderList = this.setOrderList
    },
    // 方法集合
    methods: {
      onSubmit() {
        console.log(this.form)
        console.log(this.optionsModel)
      },
      onChange(value) {
        this.$store.dispatch('SET_SELECT', value);
      },
      cancle() {
        this.msg = 0;
        // vuex获取数据
        const m = this.$store.state.products;
        const d = this.$store.getters.Old
      },
      iShow() {
        if (this.ifShow) {
          this.ifShow = false
        } else {
          this.ifShow = true;
        }
      },
      //  安卓  ios  交互方法 
      setOrderList: function(a, b, c) {
        alert("33333333333333333333")
        this.As = "" + a + ""
        this.Bs = "" + b + ""
        this.Cs = "" + c + ""
      }
    }
  }
</script>


