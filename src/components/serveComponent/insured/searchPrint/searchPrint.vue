<template>
    <div class="searchPrint">
        <div class="Title">
            <el-row>
                <el-col :span="6">
                    <span class="el-icon-arrow-left" style="color: #ffffff;font-size: .38rem;margin-left: -50px;" @click="backIndex()"></span>
                </el-col>
                <el-col :span="12">
                    <div class="NameTitle">
                        打印参保证明
                    </div>
                </el-col>
                <el-col :span="6">
                    <span class="el-icon-bell" style="color: #ffffff;font-size: .50rem;margin-right: -.4rem;margin-top:.35rem"></span>
                </el-col>
            </el-row>
        </div>
        <div class="Content">
            <!-- 基本信息 -->
            <userBaseInfo></userBaseInfo>
            <!-- 查询月数 -->
            <div class="SearchInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>查询月数：</span></div>
                    <div class="InfoText">
                        <el-select v-model="AAE011" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <i class="el-icon-arrow-right" style="font-size:0.4rem; margin-left:0.23rem"></i>
                    </div>
                </div>
            </div>
        </div>
        <!-- 按钮 -->
        <footer class="Footer">
            <div class="Btn" @click="search()">
                立即查询
            </div>
        </footer>
    </div>
</template>

<script>
import userBaseInfo from '../../common/userBaseInfo'
export default {
    components:{
        'userBaseInfo': userBaseInfo
    },
    data(){
        return{
            AAE011: '', //缴费月数
            options:[
                {value: '12', label: '12个月'},
                {value: '24', label: '24个月'},
                {value: '36', label: '36个月'},
                {value: '48', label: '48个月'},
            ],
        }
    },
    methods:{
        backIndex(){
            this.$router.push('/');
        },
        search(){
            // this.$router.push('/insuredDownload');
            let parmas = {
                tradeCode: '1011',
                data:{
                    AAE135: '1212',
                    AAE091: 4
                }
            }
            console.log(this.epFn.ApiUrl() + '/h5/jy1014/getInfo');
            this.$axios.post('/ApiUrl/h5/jy1014/getInfo', parmas)
                .then((resData) => {
                    console.log(resData)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
    }
}
</script>

<style lang="less" scoped>
.searchPrint{
    color: #666;
    .Title {
        height: 1.2rem;
        background-color: #05AEF0;
        font-size: .36rem;
        line-height: 1.2rem;
        overflow: hidden;
        .NameTitle{
            color: white;
        }
    }
    .Content{
        height: 100%;
        .BaseInfo{
            width: 7.5rem;
            height: 2.35rem;
            background: #05AEF0;
            position: relative;
            .InfoPad{
                height: 2.3rem;
                width: 6.9rem;
                position: absolute;
                margin-top: .42rem;
                left: 50%;
                margin-left: -6.9rem/2;
                background: white;
                border-radius: .08rem;
                border-bottom: .1rem solid #C4EEFF;
                .UserPhoto{
                    height: 1.2rem;
                    width: 1.2rem;
                    position: relative;
                    left: 50%;
                    margin-left: -.6rem;
                    margin-top: -.44rem;
                    border-radius: .6rem;
                    background: #DDD;
                }
                .UserInfo{
                    .UserName{
                        margin-top: .18rem;
                        font-family: PingFangSC-Regular;
                        font-size: .36rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                    .UserId{
                        margin-top: 12px;
                        opacity: .65;
                        font-family: PingFangSC-Regular;
                        font-size: .26rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
            }
        }
        .SearchInfo{
            height: 1.2rem;
            width: 7.5rem;
            margin-top: .67rem;
            background: white;
            .InfoLine{
                height: 1.2rem;
                position: relative;
                padding: 0 .3rem;
                font-family: PingFangSC-Regular;
                font-size: .3rem;
                display: flex;
                justify-content: space-between;
                .InfoName{
                    color: #000000;
                    opacity: 0.85;
                    line-height: 1.2rem;
                    letter-spacing: 0;
                }
                .InfoText{
                    opacity: 0.85;
                    line-height: 1.2rem;
                    display: flex;
                    align-items: center;
                }
            }
        }
    }
    .Footer{
        height: 1.2rem;
        width: 7.5rem;
        background: white;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 199;
        display: flex;
        justify-content: center;
        align-items: center;
        .Btn{
            height: .8rem;
            width: 6.9rem;
            background-image: linear-gradient(-90deg, #35B8FD 0%, #4E8DFF 100%);
            border-radius: 40px;
            text-align: center;
            line-height: 0.8rem;
            font-family: PingFangSC-Regular;
            font-size: .36rem;
            color: #FFFFFF;
            letter-spacing: 0;
        }
    }
}
</style>

<style>
.searchPrint .el-select .el-input__inner{
    padding-right: 0;
    text-align: right;
    border: none;
}
.searchPrint .el-select .el-input__suffix .el-input__suffix-inner{
    display: none;
}
</style>