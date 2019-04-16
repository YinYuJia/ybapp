<template>
    <div>
        <div class="Classified" v-if="Types == 'index'">
            <!-- 左侧 -->
            <div class="hospital">
                <div class="hos_title">医疗机构</div>
                <div class="hos_text">全省医院直达</div>
                <div class="hos_icon"><svg-icon icon-class="Classified_hospital" /></div>
            </div>
            <!-- 右侧 -->
            <div class="doc_store">
                <div class="doctor">
                    <div class="doc_title">专家医师</div>
                    <div class="doc_text">专家医师就在您身边</div>
                    <div class="doc_icon"><svg-icon icon-class="Classified_doctor" /></div>
                </div>
                <div class="store">
                    <div class="store_title">优质药店</div>
                    <div class="store_text">您掌中的药店</div>
                    <div class="store_icon"><svg-icon icon-class="Classified_store" /></div>
                </div>
            </div>
        </div>
        <div class="Classified_work" v-if="Types == 'work'">
            <!-- 左侧 -->
            <div class="hospital">
                <div class="hos_title">全省定点医院</div>
                <div class="hos_icon"><svg-icon icon-class="Classified_hospital2" /></div>
            </div>
            <!-- 右侧 -->
            <div class="store">
                <div class="box">
                    <div class="box_title">定点药店</div>
                    <div class="box_icon"><svg-icon icon-class="Classified_store2" /></div>
                </div>
                <div class="box">
                    <div class="box_title">药品目录</div>
                    <div class="box_icon"><svg-icon icon-class="Classified_medicine" /></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        Types: {
            type: String,
            default: ""
        }
    }
}
</script>

<style lang="less" scoped>
    .Classified{
        height: 3.11rem;
        width: 7.5rem;
        background: #fff;
        position: relative;
        display: flex;
        
        .hospital{
            width: 3.475rem;
            height: 3.11rem;
            border-right: .01rem solid #E3E3E3;
            box-sizing: border-box;

            .hos_title{
                height: .45rem;
                width: 1.48rem;
                text-align: left;
                font-family: PingFangSC-Medium;
                font-size: .32rem;
                color: #278DFF;
                letter-spacing: 0;
                position: absolute;
                top: .36rem;
                left: .26rem;
            }
            .hos_text{
                width: 1.35rem;
                height: .28rem;
                opacity: 0.45;
                font-family: PingFangSC-Regular;
                font-size: .2rem;
                color: #000000;
                letter-spacing: 0;
                position: absolute;
                left: .26rem;
                top: .92rem;
            }
            .hos_icon{
                height: 1.22rem;
                width: 2.55rem;
                position: absolute;
                left: .77rem;
                top: 1.6rem;
                .svg-icon{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .doc_store{
            width: 4.025rem;
            height: 3.11rem;

            .doctor {
                height: 1.55rem;
                width: 4.025rem;
                border-bottom: .01rem solid #E3E3E3;
                box-sizing: border-box;
                position: relative;

                .doc_title{
                    height: .45rem;
                    width: 1.48rem;
                    text-align: left;
                    opacity: 0.85;
                    font-family: PingFangSC-Medium;
                    font-size: .32rem;
                    color: #000000;
                    letter-spacing: 0;
                    position: absolute;
                    top: .35rem;
                    left: .235rem;
                }
                .doc_text{
                    height: .28rem;
                    width: 2rem;
                    opacity: 0.45;
                    font-family: PingFangSC-Regular;
                    font-size: .2rem;
                    color: #000000;
                    letter-spacing: 0;
                    position: absolute;
                    left: .235rem;
                    top: .92rem;
                }
                .doc_icon{
                    height: 1rem;
                    width: 1rem;
                    position: absolute;
                    top: .27rem;
                    left: 2.575rem;
                }
            }
            .store {
                height: 1.55rem;
                width: 4.025rem;
                position: relative;

                .store_title{
                    height: .45rem;
                    width: 1.48rem;
                    text-align: left;
                    opacity: 0.85;
                    font-family: PingFangSC-Medium;
                    font-size: .32rem;
                    color: #000000;
                    letter-spacing: 0;
                    position: absolute;
                    left: .235rem;
                    top: .34rem;
                }
                .store_text{
                    height: .28rem;
                    width: 1.35rem;
                    opacity: 0.45;
                    font-family: PingFangSC-Regular;
                    font-size: .2rem;
                    color: #000000;
                    letter-spacing: 0;
                    position: absolute;
                    left: .235rem;
                    top: .91rem;
                }
                .store_icon{
                    height: 1rem;
                    width: 1rem;
                    position: absolute;
                    top: .26rem;
                    left: 2.575rem;
                }
            }
        }
    }
    .Classified_work{
        height: 3.11rem;
        width: 7.5rem;
        background: #fff;
        position: relative;
        display: flex;

        .hospital{
            width: 3.075rem;
            height: 3.11rem;
            border-right: .01rem solid #E3E3E3;
            box-sizing: border-box;

            .hos_title{
                height: .45rem;
                width: 2.12rem;
                text-align: left;
                font-family: PingFangSC-Medium;
                font-size: .32rem;
                color: #278DFF;
                letter-spacing: 0;
                position: absolute;
                top: .59rem;
                left: .51rem;
            }
            .hos_icon{
                height: 1.26rem;
                width: 2.02rem;
                position: absolute;
                left: .44rem;
                top: 1.6rem;
                .svg-icon{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .store{
            width: 4.425rem;
            height: 3.11rem;

            .box {
                height: 1.56rem;
                width: 4.425rem;
                border-bottom: .01rem solid #E3E3E3;
                box-sizing: border-box;
                position: relative;

                .box_title{
                    height: .45rem;
                    width: 1.48rem;
                    text-align: left;
                    opacity: 0.85;
                    font-family: PingFangSC-Medium;
                    font-size: .32rem;
                    color: #000000;
                    letter-spacing: 0;
                    position: absolute;
                    top: .55rem;
                    left: .636rem;
                }
                .box_icon{
                    height: 1rem;
                    width: 1rem;
                    position: absolute;
                    top: .27rem;
                    left: 2.975rem;
                }
            }
        }
    }
</style>