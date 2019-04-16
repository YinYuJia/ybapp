<template>
    <div class="Service">
        <div class="OnlineService">
            <div class="service_title">在线客服</div>
            <div class="service_icon"><svg-icon icon-class="Service_OnlineService" /></div>
        </div>
        <div class="WorkGuide">
            <div class="service_title">办事指南</div>
            <div class="service_icon"><svg-icon icon-class="Service_WorkGuide" /></div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
    .Service{
        height: 1.2rem;
        width: 7.5rem;
        display: flex;
        justify-content: space-between;

        .OnlineService{
            height: 1.2rem;
            width: 3.07rem;
            background: #fff;
            display: flex;
            align-items: center;
            .service_title{
                height: .45rem;
                margin-left: .49rem;
                opacity: 0.8;
                font-family: PingFangSC-Medium;
                font-size: .32rem;
                color: #000000;
                letter-spacing: 0;
            }
            .service_icon{
                height: 1rem;
                width: 1rem;
                margin-left: .19rem;
                .svg-icon{
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
        }
        .WorkGuide{
            height: 1.2rem;
            width: 4.28rem;
            background: #fff;
            display: flex;
            align-items: center;
            .service_title{
                height: .45rem;
                margin-left: .49rem;
                opacity: 0.8;
                font-family: PingFangSC-Medium;
                font-size: .32rem;
                color: #000000;
                letter-spacing: 0;
            }
            .service_icon{
                height: 1rem;
                width: 1rem;
                margin-left: 1.01rem;
                .svg-icon{
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
        }
    }
</style>