<template>
    <div>
        <div class="Title">
            <el-row>
                <el-col :span="6">
                    <div class="grid-content">
                        <span class="el-icon-arrow-left" style="color: #ffffff;font-size: .38rem;margin-left: -50px;" @click="goBackIndex"></span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content NameTitle">
                        {{NameTitle}}
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <!-- <svg-icon icon-class="Index_Message" className="Index_Message1" /> -->
                        <span class="el-icon-bell" style="color: #ffffff;font-size: .50rem;margin-right: -.4rem;margin-top:.15rem"></span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#F5F5F5" active-text-color='#059BF0' @select="handleSelect">
            <el-menu-item index="1" style="width:25%">办事指南</el-menu-item>
            <el-menu-item index="2" style="width:25%">政策解读</el-menu-item>
            <el-menu-item index="3" style="width:25%">案例分析</el-menu-item>
            <el-menu-item index="4" style="width:25%">常见问题</el-menu-item>
        </el-menu>
        <div v-if="activeIndex == 1">
            <!-- 参保服务 -->
            1111
        </div>
        <div v-if="activeIndex == 2">
            <!-- 备案服务 -->
            2222
        </div>
        <div v-if="activeIndex == 3">
            <!-- 待遇报销 -->
            3333
        </div>
        <div v-if="activeIndex == 4">
            <!-- 其他服务 -->
            4444
        </div>
        <div class="bottom">
            <div class="bottom_left">
                <!-- Work_TreatmentReimbursement_CustomerService -->
                <svg-icon icon-class="Work_TreatmentReimbursement_CustomerService" class="Icon" />
                <p class="p">客服</p>
            </div>
            <div class="bottom_right">
                <el-button class="button">我要办事</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: '1',
                NameTitle: this.$route.params.name
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                this.activeIndex = key
            },
            goBackIndex() {
                this.$router.push({
                    name: 'TreatmentReimbursement',
                    params: {
                        id: '3',
                        name: "待遇报销"
                    }
                })
            }
        },
        created() {
            console.log()
        }
    }
</script>

<style lang="less" scoped>
    .Title {
        height: .8rem;
        background-color: #05AEF0;
        font-size: .36rem;
        line-height: .8rem;
        overflow: hidden;
    }
    .NameTitle {
        font-size: .36rem;
        color: #FFFFFF;
        font-family: 'PingFangSC-Regular';
    }
    .bottom {
        width: 7.5rem;
        height: 1.2rem;
        background-color: #ffffff;
        position: fixed;
        bottom: 0;
        .bottom_left {
            width: 20%;
            height: 100%;
            float: left;
            line-height: .5rem;
            .p {
                font-size: .2rem;
                color: rgba(0, 0, 0, .45);
                margin-top: -0.1rem;
            }
            .Icon {
                height: .6rem;
                width: .6rem;
            }
        }
        .bottom_right {
            width: 80%;
            float: left;
            line-height: .8rem;
            .button {
                width: 90%;
                color: #ffffff;
                font-size: .36rem;
                background-image: linear-gradient(90deg, #35B8FD 0%, #4E8DFF 100%);
                border-radius: .4rem;
            }
        }
    }
</style>


