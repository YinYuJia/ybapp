<template>
    <div class="Classified">
        <!-- 左侧 -->
        <div class="hospital">

        </div>
        <!-- 右侧 -->
        <div class="doc_store">
            <div class="doctor">

            </div>
            <div class="store">

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
        }
        .doc_store{
            width: 4.025rem;
            height: 3.1rem;

            .doctor {
                height: 1.55rem;
                width: 4.025rem;
                border-bottom: .01rem solid #E3E3E3;
                box-sizing: border-box;
            }
            .store {
                height: 1.55rem;
                width: 4.025rem;
            }
        }
    }
</style>