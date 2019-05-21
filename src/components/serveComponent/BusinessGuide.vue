<template>
    <div>
        <div v-for="item in clist" @click="clickInfoList(item.id)" :key="item.id"  class="items" style="border-top:1px solid transparent">
            <p class="p11">{{item.name}} <span class="el-icon-arrow-right"></span> </p>
        </div>
        <div>{{info}}</div>
    </div>
</template>

<script>
    export default {
        props:{
            info:{
                type:String,
                default:''
            }
        },
        data() {
            return {
                clist:this.$store.state.SET_INDEXRESPONSEDATAARRAY[0].clist
            }
        },
        created() {
            console.log('this.info',this.info)
        },
        watch:{
            info:function(val ) {
                console.log("监听",val)
                this.clist = this.$store.state.SET_INDEXRESPONSEDATAARRAY[val-1].clist
            }
        },
        methods:{
            clickInfoList( val ) {
                console.log( 'val ' , val )
                this.$axios.post('https://d0f44a2a-91b0-421c-abb3-9ffab08af413.mock.pstmn.io/testDetail',{id:val}).then((resData) => {
                     console.log(resData.data)
                }).catch((error) => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .items {
        height: 1.2rem;
        line-height: 1.2rem;
        background-color: #ffffff;
        border-top: 2px solid #D3D3D3;
        text-align: left;
        padding-left: .27rem;
        padding-right: .37rem;
        .p11 {
            font-size: .3rem;
            font-family: 'PingFangSC-Regular';
            color: #000000;
            .el-icon-arrow-right {
                float: right;
                margin-top: .42rem;
            }
        }
    }
</style>


