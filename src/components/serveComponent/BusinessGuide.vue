<template>
    <div>
        <div v-for="item in clist" @click="clickInfoList(item.id)" :key="item.id"  class="items" style="border-top:1px solid transparent">
            <p class="p11">{{item.name}} <span class="el-icon-arrow-right"></span> </p>
        </div>
        <!-- <div>props:{{info}}</div> -->
    </div>
</template>

<script>
    export default {
        props:{
            info:{
                type:String,
                default:''
            },
        },
        data() {
            return {
                clist:[],
                resData:{}
            }
        },
        created() {
            console.log(this.epFn.IndexList())
            this.clist = this.epFn.IndexList().data[0].clist;
            this.resData = this.epFn.IndexList().data
            
        },
        mounted() {
        },
        watch:{
            info:function(val ) {
                console.log("监听",val)
                this.clist = this.resData[val-1].clist
            }
        },
        methods:{
            clickInfoList( val ) {
                console.log( 'val ' , val )
                this.$axios.post(this.epFn.ApiUrl() + '/testDetail',{id:val}).then((resData) => {
                     console.log(resData.data)
                }).catch((error) => {
                    console.log(error)
                })
            },
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


