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
                        <span class="el-icon-bell" style="color: #ffffff;font-size: .50rem;margin-right: -.4rem;margin-top:.15rem"></span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#F5F5F5" active-text-color='#059BF0' @select="handleSelect">
            <el-menu-item index="1" style="width:25%">参保服务</el-menu-item>
            <el-menu-item index="2" style="width:25%">备案服务</el-menu-item>
            <el-menu-item index="3" style="width:25%">待遇报销</el-menu-item>
            <el-menu-item index="4" style="width:25%">其他服务</el-menu-item>
        </el-menu>
        <div v-if="activeIndex == 1">
            <!-- 参保服务 -->
            <InsuredService :NameTitle="NameTitle"></InsuredService>
        </div>
        <div v-if="activeIndex == 2">
            <!-- 备案服务 -->
            <RecordService :NameTitle="NameTitle"></RecordService>
        </div>
        <div v-if="activeIndex == 3">
            <!-- 待遇报销 -->
            <TReimbursement :NameTitle="NameTitle"></TReimbursement>
        </div>
        <div v-if="activeIndex == 4">
            <!-- 其他服务 -->
            <OtherService :NameTitle="NameTitle"></OtherService>
        </div>
        <div class="line"></div>
    </div>
</template>

<script>
    import TReimbursement from './TreatmentReimbursement/TReimbursement.vue';
    import InsuredService from './InsuredService/InsuredService.vue';
    import RecordService from './RecordService/RecordService.vue';
    import OtherService from './OtherService/OtherService.vue';
    export default {
        data() {
            return {
                activeIndex: '',
                NameTitle: ''
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                const nameAyy = ['参保服务', '备案服务', '待遇报销', '其他服务']
                this.activeIndex = key
                this.NameTitle = nameAyy[key - 1]
            },
            goBackIndex() {
                this.$router.push('/Work')
            }
        },
        components: {
            'TReimbursement': TReimbursement,
            'InsuredService': InsuredService,
            'RecordService': RecordService,
            'OtherService': OtherService,
        },
        created() {
            
            this.activeIndex = this.$route.params.id
            this.NameTitle = this.$route.params.name
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
    .span {}
    .NameTitle {
        font-size: .36rem;
        color: #FFFFFF;
        font-family: 'PingFangSC-Regular';
    }
</style>


