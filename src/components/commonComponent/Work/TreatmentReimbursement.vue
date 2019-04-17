<template>
    <div>
        <div class="Title">
            <el-row>
                <el-col :span="6">
                    <div class="grid-content">
                        <span class="el-icon-arrow-left" 
                        style="color: #ffffff;font-size: .38rem;margin-left: -50px;"
                        @click="goBackIndex"></span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content NameTitle">
                        {{NameTitle}}
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content col3">
                        <svg-icon icon-class="Index_Message" className="Index_Message" />
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1" style="width:25%">参保服务</el-menu-item>
            <el-menu-item index="2" style="width:25%">备案服务</el-menu-item>
            <el-menu-item index="3" style="width:25%">待遇报销</el-menu-item>
            <el-menu-item index="4" style="width:25%">其他服务</el-menu-item>
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
        <div class="line"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: '',
                NameTitle:''
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                const nameAyy = ['参保服务','备案服务','待遇报销','其他服务']
                this.activeIndex = key
                this.NameTitle = nameAyy[key-1]
            },
            goBackIndex() {
                this.$router.push('/Work')
            }
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
    .span {

    }
    .NameTitle {
        font-size: .36rem;
        color: #FFFFFF;
        font-family: 'PingFangSC-Regular';
    }
    .col3 {
       margin-top: .13rem;
       margin-right: -.35rem;
    }
    .Index_Message {
            height: .4rem;
            width: .4rem;
            font-size: .6rem;
            line-height: 0;
        }
</style>


