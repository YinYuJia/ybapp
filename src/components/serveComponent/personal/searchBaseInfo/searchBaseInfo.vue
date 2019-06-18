<template>
    <div class="searchBaseInfo">
        <Title :title="'个人基础信息'" :backRouter="'/'"></Title>
        <div class="Content">
            <!-- 列表信息 -->
            <div class="ListInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>姓名：</span></div>
                    <div class="InfoText">{{this.List.AAC003 |tuoMin(0.1)}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>社会保障号：</span></div>
                    <div class="InfoText">{{this.List.AAE135 | tuoMin(1,1)}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>性别：</span></div>
                    <div class="InfoText">{{this.List.AAC004}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>出生日期：</span></div>
                    <div class="InfoText">{{this.List.AAC006}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>参加工作日期：</span></div>
                    <div class="InfoText">{{this.List.AAC007}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>人员性质：</span></div>
                    <div class="InfoText">{{this.List.AAC021}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>参保状态：</span></div>
                    <div class="InfoText">{{this.List.AAC008}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>待遇状态：</span></div>
                    <div class="InfoText">{{this.List.AAC031}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>用工形式：</span></div>
                    <div class="InfoText">{{this.List.AAC013}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>邮政编码：</span></div>
                    <div class="InfoText">{{this.List.AAE007}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>联系电话：</span></div>
                    <div class="InfoText">{{this.List.AAE005 | tuoMin(3,4)}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>地址：</span></div>
                    <div class="InfoText">{{this.List.AAE006}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>部门：</span></div>
                    <div class="InfoText">{{this.List.AAC026}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>上年账户结余：</span></div>
                    <div class="InfoText">{{this.List.BKC102}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>当年账户划入金额：</span></div>
                    <div class="InfoText">{{this.List.BKC101}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>当年账户支出累计：</span></div>
                    <div class="InfoText">{{this.List.BKC103}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>历年账户支出累计：</span></div>
                    <div class="InfoText">{{this.List.BKC104}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>当年账户余额：</span></div>
                    <div class="InfoText">{{this.List.BKC105}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Title from '../../common/Title'
export default {
    components:{
        Title
    },
    data () {
        return {
            List:[]
        }
    },
    created () {
        // 封装数据
        let params = this.formatSubmitData();
        // 开始请求
        console.log('parmas------',params)
        this.$axios.post(this.epFn.ApiUrl2()+ '/h5/jy1013/info', params).then((resData) => {
                console.log('返回成功信息',resData)
                //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        if(resData.LS_DS){
                            this.List = [...this.List, ...resData.LS_DS];
                        }
                        this.$toast("提交成功");
                    }else if (resData.enCode == 1001 ) {
                    //   失败  1001
                        this.$toast(resData.msg);
                        return;
                    }else{
                        this.$toast('业务出错');
                        return;
                    }
            
        })
    },
    methods: {
       // 提交
        formatSubmitData(){
            let submitForm ={};
            // submitForm.debugTest=  "true";
            // 加入用户名和电子社保卡号

            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                submitForm.AAC003 = '胡';
                submitForm.AAE135 = "113344223344536624";
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1013");
            return params;
        }
    }
}
</script>

<style lang="less" scoped>
.searchBaseInfo{
    .Content{
        .ListInfo{
            width: 7.5rem;
            padding: 0 .3rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .28rem;
                display: flex;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName{
                    width: 4rem;
                    line-height: 1.2rem;
                    text-align: left;
                    span{
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText{
                    width: 100%;
                    line-height: 1.2rem;
                    color: #333;
                    display: flex;
                    position: relative;
                    letter-spacing: 0;
                    align-items: center;
                    justify-content: flex-end;
                }
                &:nth-child(12){
                    height: 1.6rem;
                    .InfoText{
                        height: 1.6rem;
                        textarea{
                            width: 100%;
                            border: none;
                            opacity: 0.85;
                            line-height: .45rem;
                            padding: 0;
                        }
                    }
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
    }
}
</style>
