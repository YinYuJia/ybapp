<template>
    <div v-if="show" class="PhotoView" @click="closePhoto">
        <img :src="imgUrl">
    </div>
</template>

<script>
export default {
    props:{
        imgUrl:{
            type: String,
            default: ''
        }
    },
    data(){
        return{
            show: false,
        }
    },
    destroyed(){
        window.removeEventListener('popstate', this.closePhoto, false);//false阻止默认事件
    },
    methods:{
        open(){
            this.show = true;
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.closePhoto, false);//false阻止默认事件
            }
        },
        closePhoto(){
            this.show = false;
        },
    }
}
</script>

<style lang="less" scoped>
.PhotoView{
    position: fixed;
    z-index: 998;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    background: #0e0e0e;
    img{
        -webkit-user-select: none;
        max-width: 100%;
    }
}
</style>