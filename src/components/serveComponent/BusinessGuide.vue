<template>
    <div>
        <div v-if="info == 1">
            <div v-for="item in clist" @click="clickInfoList(item.id)" :key="item.id" class="items" style="border-top:1px solid transparent">
                <p class="p11">{{item.name}} <span class="el-icon-arrow-right"></span> </p>
            </div>
        </div>
        <div v-if="info == 2">
            {{policy}}
        </div>
        <div v-if="info == 3">
            {{CaseAnalysis}}
        </div>
        <div v-if="info == 4">
            {{question}}
        </div>
        <!-- <div>{{name|tuoMin(0,2)}}</div> -->
    </div>
</template>

<script>
    export default {
        props: {
            info: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                clist: [],
                resData: {},
                policy: '', //政策解读
                CaseAnalysis: '',//案例分析
                question: '', //常见问题
                name:"殷宇佳"
            }
        },
        created() {
            this.getIndexList();
            console.log(this.epFn.IndexList())
            this.clist = this.epFn.IndexList().data[0].clist;
            this.resData = this.epFn.IndexList().data
            console.log(1111)
        },
        mounted() {},
        watch: {
            info: function(val) {
                console.log("监听", val)
                this.clist = this.resData[val - 1].clist
            }
        },
        methods: {
            // 获取详情列表
            getIndexList(){
                let submitForm = {
                    AGA002: '1'
                }
                // 请求参数封装
                const params = this.epFn.commonRequsetData('a',submitForm,'1015');
                console.log('parmas------',params)
                this.$axios.post( this.epFn.ApiUrl1() +  '/h5/jy1015/itemQuery', params)
                .then((resData) => {
                    console.log('返回成功信息',resData);
                    let List = resData.LS_DS;
                    console.log(List);
                    this.policy = List.xza008;
                    this.CaseAnalysis = List.xza009;
                    this.question = List.xza010   ;
                }).catch((error) => {
                    console.log(error)
                })
            },
            clickInfoList(val) {
                console.log('val ', val)
                this.$axios.post(this.epFn.ApiUrl() + '/testDetail', {
                    id: val
                }).then((resData) => {
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


