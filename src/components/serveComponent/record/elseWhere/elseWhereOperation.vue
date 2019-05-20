<template>
    <div class="basediv">
        <div class="baseMessage">
            <h3>基本信息</h3>
            <div>
                <div class="card"><p>证件号码</p><span>330302199512167311</span></div>
                <div class="name"><p>姓名</p><span>huzhihao</span></div>
            </div>
        </div>
        <div class="declareMessage">
            <h3>申报信息</h3>
            <div>
                <el-form ref="form" :model="form" label-width="90px" label-position="left" >
                <el-form-item label="拟离杭日期" >
                    <el-col>
                    <el-date-picker type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" v-model="form.leave" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="回杭日期">
                    <el-col>
                    <el-date-picker type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" v-model="form.back" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="省市信息">
                <el-cascader
                    :show-all-levels="false"
                    :options="options"
                    v-model="form.selectedOptions"
                    @change="handleChange"
                    :separator="' '"
                >
                </el-cascader>
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input type="textarea" v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="申请原因">
                    <el-select v-model="form.reason" placeholder="请选择">
                    <el-option label="日出江花红胜火" value="日出江花红胜火"></el-option>
                    <el-option label="春来江水绿如蓝" value="春来江水绿如蓝"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="footer">
            <el-button type="primary" @click="onSubmit" >确认提交</el-button>
        </div>
    </div>
</template>

<script>
import options from '@/common/js/country-data'
  export default {
    data() {
      return {
        form: {
          name: '',
          phone:"",
          reason: '',
          leave: '',
          back: '',
          delivery: false,
          address:"",
          selectedOptions: [],//存放默认值
        },

        options:options   //存放城市数据
      }
    },
    methods: {
      onSubmit() {
        console.log(this.form);
        this.$store.dispatch('SET_ELSEWHERE_OPERATION',this.form);
        this.$router.push('/elseWhereDetails')
      },
      handleChange(value) {
        console.log(value);
      }
    },

    watch:{
    checked: {
        deep: true,
        handler: function(newValue, oldValue) {
            console.log('newValue',newValue)
        }
      },
    // selectedOptions:{
    //     deep:true;
    //     handler: function(newValue, oldValue) {
    //         console.log('formValue',newValue)
    //         if (newValue.length == 0  ) {
    //           this.check1 = false
    //         }else{
    //           this.form.releaseto = this.ReleaseToSelect
    //         }
    //     }
    // }
    }
  }
</script>

<style lang="less" scoped>
.basediv{
    font-size: .3rem;
    .baseMessage{
        h3{
            text-align: left;
            text-indent: .2rem;
        }
        .card{
            display: flex;
            justify-content: space-between;
            padding: 0 .2rem;
        }
        .name{
            display: flex;
            justify-content: space-between;
            padding: 0 .2rem;
        }
    }
    .declareMessage{
        h3{
            text-align: left;
            text-indent: .2rem;
        }
    }
    .footer{
        position: fixed;
        bottom: 0;
        width: 100%;
    }
}
</style>

<style>
.basediv .el-cascader{
    display: block
} 
.basediv .el-button--primary{
    width: 100%;
}
.basediv .el-select{
    display: block;
}
</style>
