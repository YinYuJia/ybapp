<template>
    <div>
       <img class="img" src="../../static/images/My/wode.jpg" alt="">
       <!-- <div class="ooo" @click="show"></div> -->
       <!-- <img src="../../static/images/index/1.svg" class="img" alt=""> -->
       <!-- <icon name="index" scale="20"></icon> -->
       <!-- <svgicon name="my" width="200" height="200"></svgicon> -->
       <!-- <div class="ooo"></div> -->
       <v-Foter :info = "info" message :show = 'isShow' v-on:fas = 'lst' ></v-Foter>
    </div>
</template>

<style lang="less" scoped>
     .img {
         width: 7.5rem;
     }
     .ooo {
         height: 100px;
         width: 100%;
         background-color: red;
         position: fixed;
         bottom:100px;
         left: 0;
     }
</style>
   
<script>
import Foter from './Footer';
import RotationChart from '../components/lunbotu/RotationChart.vue';
export default {
    data() {
        return {
            a:"11111",
            info:'My',
            isShow:false
        }
    },
    methods:{
        show() {
           this.isShow = true
        },
        lst(a) {
            console.log(a)
            this.isShow = false
        }
    },
    components:{
        'v-Foter':Foter
    },
}
</script>



