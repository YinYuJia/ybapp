<template>
    <div class="searchRecord">
        <Title :title="'个人备案信息'" :backRouter="'/'"></Title>
        <div class="Content">
            <!-- 列表信息 -->
            <div class="ListInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>备案号：</span></div>
                    <div class="InfoText">71823919391</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>备案类型：</span></div>
                    <div class="InfoText">备案类型信息</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>审核状态：</span></div>
                    <div class="InfoText">审核状态信息与内容</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>备案来源：</span></div>
                    <div class="InfoText">备案来源信息</div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>备案期限：</span></div>
                    <div class="InfoText">2019-02-02</div>
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