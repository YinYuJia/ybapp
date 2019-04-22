<template>
    <div class="Tips">
        <div class="TipsInfo">
            <div style="height:100%;width:100%">
                <div class="left">
                   <!-- Tips_Success -->
                    <svg-icon icon-class="Tips_Success" className="Tips_Success" v-if="PropTips == 'PropTipsTrue'" />
                    <svg-icon icon-class="Tips_Fail" className="Tips_Success" v-if ="PropTips == 'PropTipsFalse'" />
                    
                </div>
                
                <div class="right">
                    {{message}}
                    </div> 
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        message:{
            type:String,
            default:''
        },
        PropTips:{
            type:String,
            default:''
        }
    },
    created() {
      console.log(this.message)
      console.log(this.PropTips)
    },
     methods:{

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
         background-color: rgba(0,0,0,.4);
         .TipsInfo {
             height: 1.4rem;
             width: 100%;;
             background-color: white;
             position: absolute;
             top: .8rem;
             left: 50%;
             transform: translateX(-50%);
             .p {
                 font-size: 24px;
                 margin-top: 15px;
                 text-align: left;
                 margin-left: 10px;
             };
             .left {
                 height: 100%;
                 float: left;
                 width: 50%;
                 text-align: right;
                 .Tips_Success {
                     height:.6rem;
                     width: .6rem;
                     margin-right: .6rem;
                 }
             };
             .right {
                 width: 49%;
                 height: 100%;
                 float: left;
                 font-size: .36rem;
                 line-height: 1.5rem;
                 text-align: left;
                 text-indent: .2rem;
                 font-family: 'PingFangSC-Regular';
             }
         }
     }
</style>

