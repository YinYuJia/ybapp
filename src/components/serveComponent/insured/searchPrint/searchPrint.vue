<template>
    <div class="searchPrint">
        <!-- 弹出框内容 -->
        <selectCity 
            :type="3"
            ref="insuredPicker"
            @confirm="chooseInsured"
            >
        </selectCity>
        <!-- 弹出框结束 -->
        <Title :title="'打印参保证明'" :backRouter="'/'"></Title>
        <div class="Content">
            <!-- 基本信息 -->
            <userBaseInfo></userBaseInfo>
            <!-- 查询月数 -->
            <div class="SearchInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地</span></div>
                    <div class="InfoText">
                         <div class="InfoText"><input @click="openInsuredPicker" type="text" v-model="canbao" placeholder="请选择" readonly></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>查询月数：</span></div>
                    <div class="InfoText">
                        <el-select v-model="form.AAE011" placeholder="请选择">
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
        <Footer :canSubmit='canSubmit' @submit="submit()"></Footer>
    </div>
</template>

<script>
import Title from '../../common/Title'
import userBaseInfo from '../../common/userBaseInfo'
import selectCity from '../../common/selectCity'
import Footer from '../../common/Footer'
export default {
    components:{
        Title,userBaseInfo,selectCity,Footer
    },
    data(){
        return{
            form:{
                AAS301:'', //参保地
                AAB301:'', //参保地
                AAQ301:'', //参保地
                AAE011: '' //缴费月数
            },
            canbao:"",
            options:[
                {value: '12', label: '12个月'},
                {value: '24', label: '24个月'},
                {value: '36', label: '36个月'},
                {value: '48', label: '48个月'},
            ],
            canSubmit: false,
        }
    },
    watch:{
        form:{
            handler:function(val){
                if(val.AAB301 != '' && val.AAE011 != ''){
                    this.canSubmit = true;
                }else{
                    this.canSubmit = false;
                }
            },
            deep: true
        }
    },
    created () {
        this.form = this.$store.state.SET_SEARCH_PRINT;
        // this.form.AAC003 = this.$store.state.SET_NATIVEMSG.name
        // this.form.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
    },
    methods:{
        openInsuredPicker(){
            this.$refs.insuredPicker.open();
        },
        chooseInsured(val){
            this.canbao = val.name;
            this.form.AAS301 = val.code[0]
            this.form.AAB301 = val.code[1]
            this.form.AAQ301 = val.code[2]
        },
        submit(){
            if(this.canSubmit == false){
                this.$toast('信息未填写完整');
                return false;
            }else{
                let submitForm = JSON.parse(JSON.stringify(this.form)); //深拷贝
                // 加入用户名和电子社保卡号
                if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                    // submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                    submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
                }else {
                    // submitForm.AAC003 = '鲁伟兴';
                    submitForm.AAE135 = "330622197407215513";
                }
                // 暂时删除参保地
                // delete submitForm.AAB301
                
                const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,'1011');
                
                this.$axios.post(this.epFn.ApiUrl1() + '/h5/jy1011/QueryInsurance', params)
                    .then((resData) => {
                        console.log(resData);
                        
                        if(resData.enCode==1000){
                            
                            this.$router.push('/insuredDownload');
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        },
    }
}
</script>

<style lang="less" scoped>
.searchPrint{
    .Content{
        height: 100%;
        margin-bottom: 1.4rem;
        .SearchInfo{
            height:2.4rem;
            width: 7.5rem;
            background: white;
            padding: 0 .3rem;
            .InfoLine {
                    height: 1.2rem;
                    position: relative;
                    font-family: PingFangSC-Regular;
                    font-size: .3rem;
                    display: flex;
                    justify-content: space-between;
                    border-bottom: .01rem solid #D5D5D5;
                    .InfoName {
                        opacity: 0.85;
                        line-height: 1.2rem;
                        span {
                            height: .6rem;
                            line-height: .6rem;
                            color: #000000;
                            letter-spacing: 0;
                        }
                    }
                    .InfoText {
                        opacity: 0.85;
                        line-height: 1.2rem;
                        display: flex;
                        position: relative;
                        align-items: center;
                        input {
                            width: 4rem;
                            height: .6rem;
                            opacity: 0.85;
                            font-family: PingFangSC-Regular;
                            font-size: .3rem;
                            color: #000000;
                            letter-spacing: 0;
                            text-align: right;
                            border: none;
                        }
                    }
                    &:last-child {
                        border-bottom: none;
                    }
                }
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