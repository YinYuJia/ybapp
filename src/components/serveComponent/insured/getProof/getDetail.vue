<template>
    <div class="getDetail">
        <Title :title="'领取就医凭证'" :backRouter="'/getProof'"></Title>
        <div class="Content">
            <WorkProgress :progress="4"></WorkProgress>
            <!-- 信息 -->
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>类型:</span></div>
                    <div class="InfoText">{{type}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>领取方式:</span></div>
                    <div class="InfoText">{{mailType}}</div>
                </div>
            </div>
            <div class="MailInfo" v-if="form.BKA077 == '1'">
                <div class="InfoLine">
                    <div class="InfoName"><span>收件人:</span></div>
                    <div class="InfoText">{{form.AAE011}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>联系电话:</span></div>
                    <div class="InfoText">{{form.AAE005}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>详细地址:</span></div>
                    <div class="InfoText"><textarea v-model="form.AAE006" readonly></textarea></div>
                </div>
            </div>
            <div class="searchPlace" v-if="form.BKA077 == '0'">
                <div class="searchBtn">点击查看附近可领取的医院网点</div>
                <div class="searchBtn" v-if="form.AAC050 == '1'">点击查看附近可领取的银行网点</div>
            </div>
        </div>
        <!-- 底部 -->
        <footer class="Footer">
            <div class="Btn">
                <div class="ResetBtn" @click="backout()">撤销</div>
                <div class="EditBtn" @click="edit()">编辑</div>
            </div>
        </footer>
    </div>
</template>

<script>
import Title from '../../common/Title'
import WorkProgress from '../../common/WorkProgress'
export default {
    components:{
        'Title': Title,
        'WorkProgress': WorkProgress,
    },
    data(){
        return{
            form: {}
        }
    },
    created(){
        // 请求参数封装
        console.log();
        this.form = this.$store.state.SET_INSURED_PROOF
        console.log(this.form,"成功参数");
        
        let submitForm = {
            AGA002: '确认-00122-043',
            AAC003: '吴学文',
            AAE135: '333333'
        };
        const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'1009');
        this.$axios.post( this.epFn.ApiUrl() +  '/h5/jy1009/getRecord', params)
        .then((resData) => {
            // console.log('返回成功信息',resData);
        }).catch((error) => {
            // console.log(error);
        })
    },
    computed:{
        type(){
            if(this.form.AAC050 == '1'){
                return '变更';
            }else if(this.form.AAC050 == '2'){
                return '补办';
            }
        },
        mailType(){
            if(this.form.BKA077 == '0'){
                return '自取';
            }else if(this.form.BKA077 == '1'){
                return '邮寄';
            }
        }
    },
    methods:{
        edit(){
            this.$router.push("/getProof");
        },
        // 撤销提醒
        backout(){
            this.$messagebox.confirm('确定撤销吗?').then(() => {
                this.$toast("撤销请求");
            });
        },
    }
}
</script>

<style lang="less" scoped>
.getDetail{
    .Content{
        margin-bottom: 1.4rem;
        .ItemInfo{
            height: 1.86rem;
            width: 7.5rem;
            padding: 0 .4rem 0 .3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .name{
                opacity: 0.85;
                font-family: PingFangSC-Medium;
                font-size: .32rem;
                color: #000000;
                letter-spacing: 0;
            }
            .icon{
                height: 1.34rem;
                width: 1.34rem;
                background:  #8BCEFF;
                border-radius: 1.34rem/2;
                text-align: center;
                line-height: 1.34rem;
                font-family: PingFangSC-Regular;
                font-size: .4rem;
                color: #FFFFFF;
                letter-spacing: 0;
                text-align: center;
            }
        }
        .ReportInfo{
            height: 2.4rem;
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
                    width: 1.5rem;
                    line-height: 1.2rem;
                    text-align: left;
                    span{
                        height: .6rem;
                        line-height: .6rem;
                        letter-spacing: 0;
                        color: #000;
                    }
                }
                .InfoText{
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    color: #333;
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
        .MailInfo{
            height: 4rem;
            width: 7.5rem;
            padding: 0 .3rem;
            margin-top: .15rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .28rem;
                display: flex;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName{
                    width: 1.5rem;
                    line-height: 1.2rem;
                    text-align: left;
                    span{
                        height: .6rem;
                        line-height: .6rem;
                        letter-spacing: 0;
                        color: #000;
                    }
                }
                .InfoText{
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    color: #333;
                }
                &:last-child{
                    border-bottom: none;
                    .InfoText{
                        height: 1.6rem;
                        textarea{
                            border: none;
                            width: 5rem;
                            line-height: .45rem;
                            color: #333;
                            padding: 0;
                        }
                    }
                }
            }
        }
        .searchPlace{
            width: 7.5rem;
            .searchBtn{
                height: .8rem;
                width: 7rem;
                margin: auto;
                margin-top: .16rem;
                line-height: .8rem;
                font-size: .32rem;
                background: #CCC;
                border-radius: .1rem;
            }
        }
    }
    // 底部
    .Footer {
        height: 1.31rem;
        width: 7.5rem;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 199;
        .Btn{
            display: flex;
            justify-content: space-around;
            .ResetBtn {
                height: 1.05rem;
                width: 3.45rem;
                border-radius: .05rem;
                line-height: 1.05rem;
                background: #F2F2F2;;
                font-family: PingFangSC-Regular;
                font-size: .36rem;
                color: #B4B4B4;
                letter-spacing: 0;
                text-align: center;
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
