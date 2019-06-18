<template>
    <div class="searchProgress">
        <Title :title="'我的事项'" :backRouter="'/'"></Title>
        <!-- 标题 -->
        <div class="IndexMenu">
            <div class="MenuLine">
                <div class="MenuCell" @click="changeIndex(1)" :class="{'active': activeIndex == 1}">待受理</div>
                <div class="MenuCell" @click="changeIndex(2)" :class="{'active': activeIndex == 2}">受理中</div>
                <div class="MenuCell" @click="changeIndex(3)" :class="{'active': activeIndex == 3}">已办结</div>
            </div>
        </div>
        <!-- 列表 -->
        <div class="ListInfo">
            <div class="ListLine" v-for="(item,index) in itemGroup" :key="index">
                <div class="InfoName">
                    <div class="InfoHead">{{item.name}}</div>
                    <div class="InfoDate">{{item.date}}</div>
                </div>
                <svg-icon icon-class="serveComponent_arrowRight" />
            </div>
        </div>
    </div>
</template>
<script>
import Title from '../../common/Title'
import Footer from '../../common/Footer'
export default {
    components:{
        Title,Footer
    },
    data(){
        return{
            activeIndex: 1,
            itemGroup: [
                {name: '基本医疗保险', date: '2019-05-19 12:09:31'},
                {name: '领取基本医疗保险就医凭证', date: '2019-05-19 12:09:31'},
                {name: '基本医疗保险职工参保信息变更登记', date: '2019-05-19 12:09:31'},
                {name: '参保人员查询打印社会保险信息', date: '2019-05-19 12:09:31'},
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.searchProgress{
    .IndexMenu {
        height: 1.2rem;
        width: 7.5rem;
        background: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;
        .MenuLine {
            height: .62rem;
            width: 6.9rem;
            background: #FFFFFF;
            border: .01rem solid #1492FF;
            border-radius: .05rem;
            display: flex;
            .MenuCell {
                line-height: .62rem;
                width: 100%;
                color: #1492FF;
                text-align: center;
                letter-spacing: 0;
                font-size: .28rem;
                border-right: .01rem solid #1492FF;
                &:first-child {
                    border-top-left-radius: .05rem;
                    border-bottom-left-radius: .05rem;
                }
                &:last-child {
                    border-top-right-radius: .05rem;
                    border-bottom-right-radius: .05rem;
                    border-right: none;
                }
            }
            .active {
                color: #FFF;
                background: #1492FF;
            }
        }
    }
    .ListInfo{
        width: 7.5rem;
        padding: 0 .37rem;
        background: white;
        .ListLine{
            height: 1.6rem;
            border-bottom: .01rem solid #D5D5D5;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .InfoName{
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                .InfoHead{
                    height: .4rem;
                    line-height: .4rem;
                    font-size: .28rem;
                    color: #000000;
                    letter-spacing: 0;
                }
                .InfoDate{
                    height: .33rem;
                    line-height: .33rem;
                    margin-top: .1rem;
                    font-size: .24rem;
                    color: #999;
                    letter-spacing: 0;
                }
            }
            .svg-icon{
                height: .3rem;
                width: .3rem;
            }
            &:last-child{
                border-bottom: none;
            }
        }
    }
}
</style>