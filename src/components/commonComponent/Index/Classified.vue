<template>
    <div class="Classified">
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
</template>

<script>
export default {
    
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
            height: 3.1rem;
            border-right: .01rem solid #E3E3E3;
            box-sizing: border-box;

            .hos_title{
                width: 1.48rem;
                height: .45rem;
                text-align: left;
                font-family: PingFangSC-Medium;
                font-size: .32rem;
                color: #278DFF;
                letter-spacing: 0;
                text-align: center;
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
            height: 3.1rem;

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
</style>