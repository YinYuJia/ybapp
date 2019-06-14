<template>
    <div class="abroadDetail">
        <Title :title="'领取就医凭证'" :backRouter="'/abroadTake'"></Title>
        <div class="Content">
            <!-- 事项名称 -->
            <div class="ItemInfo">
                <div class="name">基本医疗保险参保人员转外就医备案</div>
                <div class="icon">收件</div>
            </div>
            <!-- 邮递信息 -->
            <div class="MailInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地:</span></div>
                    <div class="InfoText">{{canbaocity}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>出境日期:</span></div>
                    <div class="InfoText">{{form.start}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>拟回国日期:</span></div>
                    <div class="InfoText">{{form.end}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>取药机构:</span></div>
                    <div class="InfoText">{{form.organize}}</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>护照号码:</span></div>
                    <div class="InfoText">{{form.passport}}</div>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <footer class="Footer">
            <div class="Btn">
                <div class="ResetBtn">撤销</div>
                <div class="EditBtn" @click="edit()">编辑</div>
            </div>
        </footer>
    </div>
</template>

<script>
import Title from '../../common/Title'
export default {
    components:{
        'Title': Title,
    },
    data() {
      return {
        form: {
            canbao: [], //参保地
            start: '', //出境日期
            end: '', //拟回国日期
            organize: '',//取药机构
            passport: '', //护照号码
        },
      }
    },
    created(){
        this.form = this.$store.state.SET_ABROADTAKE_OPERATION;
    },
    computed:{
        canbaocity: function(){
            return this.form.canbao.join(' ');
        },
    },
    methods:{
        edit(){
            this.$router.push("/abroadTake");
        },
    }
}
</script>


<style lang="less" scoped>
.abroadDetail{
    .Content{
        .ItemInfo{
            height: 2.4rem;
            width: 7.5rem;
            background: white;
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
                background:  #8BDFFF;
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
        .MailInfo{
            height: 6rem;
            width: 7.5rem;
            padding: 0 .3rem;
            margin-top: .15rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .3rem;
                display: flex;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName{
                    width: 1.8rem;
                    opacity: 0.45;
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
                    width: 5.1rem;
                    opacity: 0.85;
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
    }
    // 底部
    .Footer {
        height: 1.2rem;
        width: 7.5rem;
        background-color: white;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 199;
        display: flex;
        justify-content: center;
        align-items: center;
        .Btn {
            height: .8rem;
            width: 6.9rem;
            line-height: 0.8rem;
            background-image: linear-gradient(-90deg, #35B8FD 0%, #4E8DFF 100%);
            border-radius: .4rem;
            font-family: PingFangSC-Regular;
            font-size: .36rem;
            color: #FFFFFF;
            letter-spacing: 0;
            display: flex;
            .ResetBtn {
                width: 3.45rem;
                background: #B6DEFF;
                border-top-left-radius: .4rem;
                border-bottom-left-radius: .4rem;
            }
            .EditBtn {
                width: 3.45rem;
            }
        }
    }
}
</style>