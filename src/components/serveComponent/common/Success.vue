<template>
    <div class="Success" v-if="show">
        <div class="buttonBox">
            <svg-icon icon-class="serveComponent_success" />
            <div class="successText">提交成功</div>
        </div>
        <footer class="Footer">
            <div class="Btn">
                <div class="ResetBtn" @click="backout()">返回医保专区</div>
                <div class="EditBtn" @click="showDetail()">查看事项明细</div>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            show: true
        }
    },
    methods:{
        backout(){
            this.$router.push('/');
        },
        showDetail(){
            this.show = false;
        }
    }
}
</script>

<style lang="less" scoped>
.Success{
    position: fixed;
    z-index: 999;
    top: 0;
    height: 100%;
    width: 100%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    .buttonBox{
        height: 2.56rem;
        width: 1.5rem;
        margin-bottom: 2.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .svg-icon{
            height: 1.2rem;
            width: 1.2rem;
        }
        .successText{
            height: .36rem;
            width: 1.44rem;
            font-size: .36rem;
            color: #000000;
            letter-spacing: 0;
            text-align: center;
        }
    }
    .Footer {
        height: 1.31rem;
        width: 7.5rem;
        padding: 0 .2rem;
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 199;
        .Btn{
            width: 100%;
            display: flex;
            justify-content: space-between;
            .ResetBtn {
                height: 1.05rem;
                width: 3.45rem;
                border-radius: .05rem;
                line-height: 1.05rem;
                background: #FFF;;
                font-family: PingFangSC-Regular;
                font-size: .36rem;
                color: #666;
                letter-spacing: 0;
                text-align: center;
                border: .01rem solid #C9C9C9;
            }
            .EditBtn{
                height: 1.05rem;
                width: 3.45rem;
                border-radius: .05rem;
                line-height: 1.05rem;
                background: #F2F2F2;;
                font-family: PingFangSC-Regular;
                font-size: .36rem;
                background: #1492FF;
                color: #FFF;
                letter-spacing: 0;
                text-align: center;
            }
        }
    }
}
</style>