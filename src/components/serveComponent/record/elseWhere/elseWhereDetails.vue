<template>
    <div class="bestdiv">
        <div class="state">
            <p>基本医疗保险参保人员异地就医备案</p><svg-icon icon-class="MyItems_receive" />
        </div>
        <div class="display">
            <el-row>
                <el-col :span="6"><p>拟离杭日期</p></el-col>
                <el-col :span="18"><span>{{operation.leave}}</span></el-col>
            </el-row>
            <el-row>
                <el-col :span="6"><p>回杭日期</p></el-col>
                <el-col :span="18">{{operation.back}}</el-col>    
            </el-row>
            <el-row>
                <el-col :span="6"><p>省市信息</p></el-col>
                <el-col :span="18">{{operation.selectedOptions}}</el-col>    
            </el-row>
            <el-row>
                <el-col :span="6"><p>详细地址</p></el-col>
                <el-col :span="18">{{operation.address}}</el-col>                
            </el-row>
            <el-row>
                <el-col :span="6"><p>申请原因</p></el-col>
                <el-col :span="18">{{operation.reason}}</el-col>            
            </el-row>
            <el-row>
                <el-col :span="6"><p>联系人</p></el-col>
                <el-col :span="18">{{operation.name}}</el-col>    
            </el-row>
            <el-row>
                <el-col :span="6"><p>联系电话</p></el-col>
                <el-col :span="18">{{operation.phone}}</el-col>        
            </el-row>
        </div>
        <div class="footer">
            <el-row type="flex">
                <el-col :span="6"><svg-icon icon-class="MyItems_receive" /></el-col>
                <el-col :span="9"><el-button type="primary" @click="onEdit" >编辑</el-button></el-col>
                <el-col :span="9"><el-button type="text" @click="onCancel" :center="true">撤销</el-button></el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data(){
    return{
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
        operation:{},
        }
    },
    created(){
      this.operation = this.$store.state.SET_ELSEWHERE_OPERATION,
      console.log('this.$store.getters.SET_ELSEWHERE_OPERATION',this.$store.getters.SET_ELSEWHERE_OPERATION)
    },
    methods:{
        onEdit(){
        console.log(this.form);
        this.$store.dispatch('SET_ELSEWHERE_OPERATION',this.operation);
        this.$router.push('/elseWhereEdit')
        },
        onCancel(){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        }
    }
}
</script>


<style lang="less" scoped>
.bestdiv{
    font-size:.3rem;
    background: #ffffff;
    .state{
        display: flex;
        justify-content: space-between;
    }
    .display{
        p{
        text-align: right;
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
.bestdiv .el-input__inner{
    border:0;
}
.bestdiv .el-input.is-disabled .el-input__inner{
    background-color: #ffffff;
}
.bestdiv .el-button--primary{
    width: 100%;
}
.bestdiv .el-message-box{
    width:0;
}
</style>
