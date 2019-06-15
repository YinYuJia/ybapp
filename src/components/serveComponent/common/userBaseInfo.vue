<template>
    <!-- 用户基本信息 -->
    <div class="UserBaseInfo">
        <div class="UserPhoto"><svg-icon icon-class="serveComponent_userIcon" /></div>
        <div class="UserInfo">
            <div class="UserName">{{form.name|tuoMin(0,2)}}</div>
            <div class="UserId">{{form.idNo|tuoMin(1,1)}}</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{
                name: '',
                idNo: ''
            }
        }
    },
    created(){
        console.log(this.$store.state.SET_NATIVEMSG.name)
        this.form.name = this.$store.state.SET_NATIVEMSG.name 
        this.form.idNo = this.$store.state.SET_NATIVEMSG.idCard 

        console.log('原生参数-----',this.$store.state.SET_NATIVEMSG)
    }
}
</script>

<style lang="less" scoped>
.UserBaseInfo{
    width: 7.5rem;
    height: 1.8rem;
    display: flex;
    align-items: center;
    .UserPhoto{
        margin-left: .32rem;
        height: 1.2rem;
        width: 1.2rem;
        .svg-icon{
            height: 100%;
            width: 100%;
        }
    }
    .UserInfo{
        height: 1.2rem;
        margin-left: .42rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        text-align: left;
        letter-spacing: 0;
        .UserName{
            font-size: .36rem;
            color: #000;
        }
        .UserId{
            font-size: .26rem;
            color: #666;
        }
    }
}
</style>
