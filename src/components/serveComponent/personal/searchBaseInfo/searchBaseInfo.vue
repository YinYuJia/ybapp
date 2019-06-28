<template>
    <div class="searchBaseInfo">
        <Title :title="'个人基础信息'" :backRouter="'/'"></Title>
        <div class="Content">
            <!-- 列表信息 -->
            <div class="ListInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>姓名：</span></div>
                    <div class="InfoText">{{form.AAC003 |tuoMin(0,2)}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>社会保障号：</span></div>
                    <div class="InfoText">{{form.AAC002 | tuoMin(1,1)}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>性别：</span></div>
                    <div class="InfoText">{{form.AAC004}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>出生日期：</span></div>
                    <div class="InfoText">{{form.AAC006}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>参加工作日期：</span></div>
                    <div class="InfoText">{{form.AAC007}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>人员性质：</span></div>
                    <div class="InfoText">{{form.AAC021}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>参保状态：</span></div>
                    <div class="InfoText">{{form.AAC008}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>待遇状态：</span></div>
                    <div class="InfoText">{{form.AAC031}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>用工形式：</span></div>
                    <div class="InfoText">{{form.AAC013}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>邮政编码：</span></div>
                    <div class="InfoText">{{form.AAE007}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>手机号码：</span></div>
                    <div class="InfoText">{{form.AAE005 | tuoMin(3,4)}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>地址：</span></div>
                    <div class="InfoText"><textarea v-model="form.AAE006" readonly></textarea></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>部门：</span></div>
                    <div class="InfoText">{{form.AAC026}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>上年账户结余：</span></div>
                    <div class="InfoText">{{form.BKC102}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>当年账户划入金额：</span></div>
                    <div class="InfoText">{{form.BKC101}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>当年账户支出累计：</span></div>
                    <div class="InfoText">{{form.BKC103}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>历年账户支出累计：</span></div>
                    <div class="InfoText">{{form.BKC104}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>当年账户余额：</span></div>
                    <div class="InfoText">{{form.BKC105}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            List:[],
            form:{}
        }
    },
    created () {
        this.epFn.setTitle('个人参保信息')
        // 封装数据
        let params = this.formatSubmitData();
        // 开始请求
        console.log('parmas------',params)
        this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1013/info', params).then((resData) => {
                console.log('返回成功信息',resData)
                //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        if(resData.LS_DS){ 
                            this.form={...this.form,...resData.LS_DS[0]}
                        }
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
                
                this.$toast("未获取到人员基本信息");
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
                &:nth-child(12){
                    height: 1.6rem;
                    .InfoText{
                        height: 1.6rem;
                        textarea{
                            width: 100%;
                            color: #000;
                            border: none;
                            text-align: right;
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
