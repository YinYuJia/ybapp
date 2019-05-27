<template>
    <!-- 基本信息 -->
    <div class="UserBaseInfo">
        <div class="InfoPad">
            <div class="UserPhoto"></div>
            <div class="UserInfo">
                <div class="UserName">{{form.name}}</div>
                <div class="UserId">{{form.idNo}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{
                name: '张*佳',
                idNo: '3301**********4567'
            }
        }
    },
    created(){
        // this.form = this.$store.state.SET_USER_BASEINFO;
        console.log(this.$store.state.SET_NATIVEMSG === {})
        this.form.name = this.$store.state.SET_NATIVEMSG.name
        this.form.idNo = this.$store.state.SET_NATIVEMSG.idCard

        // this.$store.state.SET_NATIVEMSG.name,
    }
}
</script>

<style lang="less" scoped>
.UserBaseInfo{
    width: 7.5rem;
    height: 2.35rem;
    background: #05AEF0;
    position: relative;
    .InfoPad{
        height: 2.3rem;
        width: 6.9rem;
        position: absolute;
        margin-top: .42rem;
        left: 50%;
        margin-left: -6.9rem/2;
        background: white;
        border-radius: .08rem;
        border-bottom: .1rem solid #C4EEFF;
        .UserPhoto{
            height: 1.2rem;
            width: 1.2rem;
            position: relative;
            left: 50%;
            margin-left: -.6rem;
            margin-top: -.44rem;
            border-radius: .6rem;
            background: #DDD;
        }
        .UserInfo{
            .UserName{
                margin-top: .18rem;
                font-family: PingFangSC-Regular;
                font-size: .36rem;
                color: #000000;
                letter-spacing: 0;
            }
            .UserId{
                margin-top: 12px;
                opacity: .65;
                font-family: PingFangSC-Regular;
                font-size: .26rem;
                color: #000000;
                letter-spacing: 0;
            }
        }
    }
}
</style>
