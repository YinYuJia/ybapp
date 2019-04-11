<template>
    <div class="Tips">
        <div class="TipsInfo">
            <p class="p">提示信息</p>
            <p class="Info">{{message}}</p>
        <el-button type="primary" @click="MakeShrue" class="btn" >确定</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        message:{
            type:String,
            default:""
        }
    },
    created() {
      console.log(this.message)
    },
     methods:{
         MakeShrue() {
             this.$emit('TipsTrue','1')
         }
     }
}
</script>

<style lang="less" scoped>
     .Tips {
         height: 100%;
         width: 7.5rem;
         position: fixed;
         top: 0;
         left: 0;
         z-index: 200;

         background-color: rgba(0,0,0,.5);
         .TipsInfo {
            border-radius: 15px;
             height: 200px;
             width: 300px;
             background-color: white;
             position: absolute;
             top: 30%;
             left: 50%;
             transform: translate(-50%,-50%);
             .p {
                 font-size: 24px;
                 margin-top: 15px;
                 text-align: left;
                 margin-left: 10px;
             }
             .Info {
                font-size: 20px;
                text-align: left;
                text-indent: 15px;
                margin-top: 25px;
             }
             .btn {
                 position: absolute;
                 bottom: 15px;
                 right: 20px;
             }
         }
     }
</style>

