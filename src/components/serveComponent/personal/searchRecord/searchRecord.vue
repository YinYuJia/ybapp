<template>
    <div class="searchRecord">
        <Title :title="'个人备案信息'" :backRouter="'/'"></Title>
        <div class="Content">
            <!-- 列表信息 -->
            <div class="ListInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>备案号：</span></div>
                    <div class="InfoText">{{form.AAZ267}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>备案类型：</span></div>
                    <div class="InfoText">{{form.AKA083}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>审核状态：</span></div>
                    <div class="InfoText">{{form.AAE016}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>备案来源：</span></div>
                    <div class="InfoText">{{form.BKE258}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>备案期限：</span></div>
                    <div class="InfoText">{{form.AAE031}}</div>
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
            form:{
                AAZ267:"",//备案号
                AKA083:"",//备案类型
                AAE016:"",//审核状态
                BKE258:"",//备案来源
                AAE031:"",//备案期限
            },
            List:[] 
        }
    },
    created () {
        this.form = this.$store.state.SET_SEARCHINSUREDINFO_OPERATION;
        // 封装数据
        let params = this.formatSubmitData();
        // 开始请求
        this.$axios.post(this.epFn.ApiUrl()+'/h5/jy1028/recordInformationinquiry', params).then((resData) => {
                console.log('返回成功信息',resData)
                //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        this.List = [...this.List, ...resData.LS_DS];
                        this.form ={...this.from,...this.List[0]}
                        this.$toast("请求成功");
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
                submitForm.AAC003 = '胡';
                submitForm.AAE135 = "113344223344536624";
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
                &:last-child{
                    border-bottom: none;
                }
            }
        }
    }
}
</style>