<template>
    <div class="searchBaseInfo">
        <Title :title="'个人基础信息'" :backRouter="'/'"></Title>
        <div class="Content">
            <!-- 列表信息 -->
            <div class="ListInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>姓名：</span></div>
                    <div class="InfoText">*宇佳</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>社会保障号：</span></div>
                    <div class="InfoText">3**********************X</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>性别：</span></div>
                    <div class="InfoText">男</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>出生日期：</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>参加工作日期：</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>人员性质：</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>参保状态：</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>待遇状态：</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>用工形式：</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>邮政编码：</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>联系电话：</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>地址：</span></div>
                    <div class="InfoText"><textarea>我是单位地址全称，有可能会很长，会有两行或者更多行</textarea></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>部门：</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>上年账户结余：</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>当年账户划入金额：</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>当年账户支出累计：</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>历年账户支出累计：</span></div>
                    <div class="InfoText"></div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>当年账户余额：</span></div>
                    <div class="InfoText"></div>
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
