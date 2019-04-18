<template>
    <div>
        <div v-if=" PropsFlage == '1'">
            <div class="first">
                <span class="span1"></span>
                <p class="titleOne">{{title1}}</p>
                <span class="el-icon-arrow-right span2"></span>
            </div>
            <div class="second">
                <div class="grid-content position" style="border:1px solid transparent">
                    <!-- <svg-icon icon-class="Work_Nav_1" className= ' /> -->
                    <p class="p1">基本医疗保险视同缴费年限核定</p>
                    <img src="../../../../static/images/Work/01.png" class='Work_Nav_1' alt="">
                </div>
            </div>
            <div class="second">
                <div class="grid-content position">
                    <!-- <svg-icon icon-class="Work_Nav_1" className= ' /> -->
                    <p class="p1">基本医疗保险参保人员医疗费用零星报销</p>
                    <img src="../../../../static/images/Work/02.png" class='Work_Nav_1' alt="">
                </div>
            </div>
            <div class="second">
                <div class="grid-content position">
                    <!-- <svg-icon icon-class="Work_Nav_1" className= ' /> -->
                    <p class="p1">医疗保险费用审核结算</p>
                    <img src="../../../../static/images/Work/03.png" class='Work_Nav_1' alt="">
                </div>
            </div>
        </div>

        <div v-if=" PropsFlage == '2'">
            <div class="first">
                <span class="span1"></span>
                <p class="titleOne">{{title2}}</p>
                <span class="el-icon-arrow-right span2"></span>
            </div>
            <div class="second">
                <div class="grid-content position" style="border:1px solid transparent">
                    <!-- <svg-icon icon-class="Work_Nav_1" className= ' /> -->
                    <p class="p1">基本医疗保险视同缴费年限核定</p>
                    <img src="../../../../static/images/Work/04.png" class='Work_Nav_1' alt="">
                </div>
            </div>
            <div class="second">
                <div class="grid-content position">
                    <!-- <svg-icon icon-class="Work_Nav_1" className= ' /> -->
                    <p class="p1">基本医疗保险参保人员医疗费用零星报销</p>
                    <img src="../../../../static/images/Work/05.png" class='Work_Nav_1' alt="">
                </div>
            </div>
            <div class="second">
                <div class="grid-content position">
                    <!-- <svg-icon icon-class="Work_Nav_1" className= ' /> -->
                    <p class="p1">医疗保险费用审核结算</p>
                    <img src="../../../../static/images/Work/06.png" class='Work_Nav_1' alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title1: "热门事项",
                title2: "医保资讯"
            }
        },
        created() {
            
        },
        props: {
            PropsTitle: {
                type: String,
                default: ''
            },
            PropsFlage: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style lang="less" scoped>
    .first {
        height: .7rem;
        background-color: #ffffff; // padding-left: .34rem;
        .span1 {
            display: block;
            height: .3rem;
            width: .08rem;
            background-color: #278DFF;
            float: left;
            margin-top: .37rem;
            margin-right: .22rem;
            border-radius: .04rem;
            margin-left: .34rem;
        }
        .span2 {
            display: block;
            float: right;
            margin-top: -0.3rem;
            margin-right: .22rem;
            border-radius: .04rem;
            font-size: .34rem;
            color: rgba(0, 0, 0, .7)
        }
        .titleOne {
            font-size: .3rem;
            height: .7rem;
            line-height: 1.04rem;
            text-align: left;
            font-family: 'PingFangSC-Medium';
            color: rgba(0, 0, 0, .65);
            font-weight: 700;
        }
    }
    .second {
        .position {
            padding-left: 2.4rem;
            padding-right: .6rem;
            border-top: 1px solid transparent;
            height: 1.63rem;
            background-color: #ffffff;
            border-top: 1px solid #CACACA;
            position: relative;
            .Work_Nav_1 {
                position: absolute;
                left: .4rem;
                top: 50%;
                transform: translateY(-50%);
                width: 1.6rem;
                height: .9rem;
            }
            .p1 {
                margin-top: .38rem;
                font-size: .3rem;
                text-align: left;
                word-wrap: break-word;
                word-break: break-all;
                overflow: hidden;
                line-height: .42rem;
                font-family: 'PingFangSC-Regular';
                color: rgba(0, 0, 0, .85)
            }
        }
    }
    .el-row {
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>


