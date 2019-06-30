<template>
    <div class="searchRecord">
        <Title :title="'个人备案信息'" :backRouter="'/'"></Title>
        <div class="Content">
            <!-- 列表信息 -->
            <div class="ListInfo" v-for="(item,index) in List" :key="index">
                <div class="InfoLine">
                    <div class="InfoName"><span>备案号：</span></div>
                    <div class="InfoText">{{item.AAZ267}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>备案类型：</span></div>
                    <div class="InfoText">{{item.AKA083}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>审核状态：</span></div>
                    <div class="InfoText">{{item.AAE016}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>备案来源：</span></div>
                    <div class="InfoText">{{item.BKE258 || "暂无" | BKE258()}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>备案期限：</span></div>
                    <div class="InfoText">{{item.AAE031}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form:{
                // AAZ267:"",//备案号
                // AKA083:"",//备案类型
                // AAE016:"",//审核状态
                // BKE258:"",//备案来源
                // AAE031:"",//备案期限
            },
            List:[] 
        }
    },
    created () {
        this.epFn.setTitle('个人备案信息')
        this.form = this.$store.state.SET_SEARCHINSUREDINFO_OPERATION;
        // 封装数据
        let params = this.formatSubmitData();
        // 开始请求
        this.$axios.post(this.epFn.ApiUrl()+'/h5/jy1028/recordInformationinquiry', params).then((resData) => {
                console.log('返回成功信息',resData)
                //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        this.List =[...this.List,...resData.LS_DS]
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
     formatSubmitData(){
            let submitForm ={};
            // submitForm.debugTest=  "true";
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                
                this.$toast("未获取到人员基本信息");
            }
            // 请求参数封装
            console.log('submitForm',submitForm)
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1028");
            return params;
        }
    }
}
</script>

<style lang="less" scoped>
.searchRecord{
    .Content{
        .ListInfo{
            width: 7.5rem;
            padding: 0 .3rem;
            margin-bottom: .3rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                position: relative;
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
                        color: #666;
                        letter-spacing: 0;
                    }
                }
                .InfoText{
                    width: 100%;
                    line-height: 1.2rem;
                    color: #000;
                    display: flex;
                    position: relative;
                    letter-spacing: 0;
                    align-items: center;
                    justify-content: flex-end;
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
    }
}
</style>