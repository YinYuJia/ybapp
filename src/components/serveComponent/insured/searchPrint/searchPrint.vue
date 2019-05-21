<template>
    <div class="searchPrint">
        <div class="Title">
            <el-row>
                <el-col :span="6">
                    <span class="el-icon-arrow-left" style="color: #ffffff;font-size: .38rem;margin-left: -50px;"></span>
                </el-col>
                <el-col :span="12">
                    <div class="NameTitle">
                        打印参保证明
                    </div>
                </el-col>
                <el-col :span="6">
                </el-col>
            </el-row>
        </div>
        <div class="Content">
            <!-- 基本信息 -->
            <div class="BaseInfo">
                <div class="ContentTitle">基本信息</div>
                <div class="Info">
                    <div class="Line">
                        <span>证件号码</span>
                        <span>3**************X</span>
                    </div>
                    <div class="Line">
                        <span>姓名</span>
                        <span>*佳</span>
                    </div>
                </div>
            </div>
            <!-- 查询月数 -->
            <div class="SearchInfo">
                <span>查询月数</span>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <!-- 按钮 -->
        <footer class="Btn active" @click="search()">
            查询
        </footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{
                name: '',
                phone: '',
                address: ''
            },
            value: '',
            options:[
                {value: '12', label: '12个月'},
                {value: '24', label: '24个月'},
                {value: '36', label: '36个月'},
                {value: '48', label: '48个月'},
            ],
        }
    },
    watch:{
        form:{
            handler:function(val){
                if(val.name != '' && val.phone != '' && val.address != ''){
                    this.canSubmit = true;
                }else{
                    this.canSubmit = false;
                }
            },
            deep: true
        }
    },
    methods:{
        search(){
            this.$router.push('/insuredDownload');
        },
    }
}
</script>

<style lang="less" scoped>
.searchPrint{
    color: #666;
    .Title {
        height: .8rem;
        background-color: #05AEF0;
        font-size: .36rem;
        line-height: .8rem;
        overflow: hidden;
        .NameTitle{
            color: white;
        }
    }
    .Content{
        height: 100%;
        background: white;
        text-align: left;
        padding: 0 .2rem;
        .BaseInfo{
            padding: .1rem 0;
            font-size: .3rem;
            .ContentTitle{
                font-weight: bold;
                line-height: .6rem;
            }
            .Info{
                border: 0.01rem solid #DDD;
                padding: .1rem .25rem;
                .Line{
                    line-height: .6rem;
                    display: flex;
                    justify-content: space-between;
                    span{
                        &:first-child{
                            font-weight: bold;
                        }
                    }
                }
            }
        }
        .SearchInfo{
            padding: .2rem 0;
            font-size: .3rem;
            display: flex;
            span{
                display: block;
                width: 1.7rem;
                display: flex;
                align-items: center;
            }
            .el-select{
                width: 5.3rem;
            }
        }
    }
    .Btn{
        height: 1rem;
        width: 100%;
        background: rgb(124, 206, 250);
        font-size: .34rem;
        color: white;
        line-height: 1rem;
        text-align: center;
        position: fixed;
        bottom: 0;
    }
    .active{
        background: #05AEF0;
    }
}
</style>
