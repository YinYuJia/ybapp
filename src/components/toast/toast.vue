<template>
    <div v-if="show" class="toast" :class="showContent ? 'fadeIn' : 'fadeOut'">{{text}}</div>
</template>

<script>
export default {
    data(){
        return{
            text: '',
            show: false,
            showContent: false,
        }
    }
}
</script>


<style scoped>
.toast{
    position: fixed;
    left: 50%;
    top: 85%;
    background: rgba(0, 0, 0, .55);
    padding: .17rem;
    border-radius: .1rem;
    transform: translate(-50%,-50%);
    font-size: .32rem;
    color: #ffffff;
}
.fadeIn{
    animation: animate_in 0.25s;
}
.fadeOut{
    animation: animate_out 0.25s;
    opacity: 0;
}
@keyframes animate_in{
    0%{background: rgba(0, 0, 0, 0);}
    100%{background: rgba(0, 0, 0, .55);}
}
@keyframes animate_out{
    0%{background: rgba(0, 0, 0, .55);}
    100%{background: rgba(0, 0, 0, 0);}
}
</style>