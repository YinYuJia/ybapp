<template>
    <div class="familyAid">
        <Title :title="'家庭共济备案'" :backRouter="'/'"></Title>
        <!-- MintUI弹出框区域 -->
        <SelectCity 
            :type="2"
            ref="insuredPicker"
            @confirm="chooseInsured"
            >
        </SelectCity>
        <mt-datetime-picker
            type="date"
            ref="startPicker"
            v-model="dateVal"
            @confirm="handleStartConfirm">
        </mt-datetime-picker>
        <SelectCity 
            :type="1"
            ref="relatePicker"
            :propArr="relationList"
            @confirm="handleRelateConfirm"
            >
        </SelectCity>
        <!-- 弹出框区域结束 -->
        <div class="Content">
            <!-- 基本信息 -->
            <UserBaseInfo></UserBaseInfo>
            <!-- 申报信息 -->
            <div class="ReportInfo">
                <div class="InfoLine">
                    <div class="InfoName"><span>参保地</span></div>
                    <div class="InfoText">
                         <div class="InfoText"><input  type="text" v-model="AAB301000" placeholder="请选择" readonly></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>被授权人姓名</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input type="text" v-model="form.BAC003" placeholder="请输入"></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>被授权人身份证</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input type="text" maxlength="18" v-model="form.BAC002" placeholder="请输入"></div>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>绑定关系</span></div>
                    <div class="InfoText">
                        <input @click="openRelatePicker()" type="text" v-model="AAE144VALUE" placeholder="请选择" readonly>
                    </div>
                </div>
                <div class="InfoLine">
                    <div class="InfoName"><span>开始日期</span></div>
                    <div class="InfoText">
                        <div class="InfoText"><input @click="openStartPicker" type="text" v-model="form.AAE030" placeholder="请选择" readonly></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 按钮 -->
        <Footer :canSubmit='canSubmit' @submit="submit()"></Footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dddddd: "1111",
                AAB301000:'',
                form: {
                    BAC003: '', //被授权人姓名
                    BAC002: '', //被授权人身份证
                    AAE144: '',//绑定关系
                    AAE030: '', //开始日期
                    AAS301:"",//参保地省
                    AAB301:"",//参保地市
                    AAQ301:"",//参保地区
                    BKZ019:""//经办编号
                },
                AAE144VALUE: '',
                dateVal: new Date(), //默认绑定的时间
                canSubmit: false,
                relationList: [{
                        value: '1',
                        label: '配偶'
                    },
                    {
                        value: '2',
                        label: '子女'
                    },
                    {
                        value: '5',
                        label: '父母'
                    }
                ],
            }
        },
        created() {
            this.epFn.setTitle('家庭共济备案')

                       let GinsengLandCode = sessionStorage.getItem("GinsengLandCode")
           let GinsengLandName = sessionStorage.getItem("GinsengLandName")

           console.log('GinsengLandCode',GinsengLandCode,'GinsengLandName',GinsengLandName)
           this.AAB301000 = GinsengLandName
           this.form.AAB301 = GinsengLandCode
           this.form.AAS301 = GinsengLandCode.substring(0,2) + '0000'
           console.log('this.form.AAS301',this.form.AAS301)
           console.log('this.form.AAB301',this.form.AAB301)
            // this.form = this.$store.state.SET_FAMILYAID_OPERATION;
            // this.form.AAB301000 = this.$store.state.SET_USER_DETAILINFO.regionName
            // this.form.AAB301 = this.$store.state.SET_USER_DETAILINFO.AAB301
        },
        watch:{
            // 监听领取信息
            form:{
                handler:function(val){
                    if ( val.AAB301 != '' && val.BAC003 != '' && val.BAC002 != '' && val.AAE144 != '' && val.AAE030 != '') {
                        this.canSubmit = true
                    }else{
                        this.canSubmit = false
                    }
                },
                deep: true
            },
        },
        methods: {
            // 选择参保地
            openInsuredPicker(){
                this.$refs.insuredPicker.open();
            },
            chooseInsured(val){
            this.AAB301000 =val.name;//参保地省
            this.form.AAS301 =val.code[0]; //参保地省
            this.form.AAB301 =val.code[1]; //参保地市
            },
            // 选择开始日期
            openStartPicker(){
                this.$refs.startPicker.open();
            },
            handleStartConfirm(val){
                let date = this.util.formatDate(val,'yyyy-MM-dd');
                this.form.AAE030 = date;
                console.log(this.form.AAE030);
            },
            // 选择月数
            openRelatePicker(){
                this.$refs.relatePicker.open();
            },
            handleRelateConfirm(val){
                console.log(val);
                this.form.AAE144 = val.value;
                this.AAE144VALUE = val.label;
            },
            submit() {
                if(!this.util.idCard(this.form.BAC002)){
                    this.$toast('请填写正确的身份证号');
                    return false;
                }
                if(this.form.BAC003){
                    if(this.util.checkName(this.form.BAC003)){
                        this.$toast('姓名中不能包含数字');
                        return false;
                    }
                }
                if(this.canSubmit == false){
                this.$toast('信息未填写完整');
                return false;
            }else{
                
                // 封装数据
                let params = this.formatSubmitData();
                // 开始请求
                console.log('parmas------',params)
                this.$axios.post(this.epFn.ApiUrl()+ '/h5/jy1022/familyRecord', params).then((resData) => {
                    console.log('返回成功信息',resData)
                    //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        this.$store.dispatch('SET_FAMILYAID_OPERATION', this.form);
                        this.$router.push('/familyDetail');
                    }else if (resData.enCode == 1001 ) {
                    //   失败  1001
                        this.$toast(resData.msg);
                        return;
                    }else{
                        this.$toast('业务出错');
                        return;
                    }
                })
            }
                
            },
            formatSubmitData(){
                let submitForm ={}
                     // 日期传换成Number
                    submitForm.AAE030 = this.util.DateToNumber(this.form.AAE030)
                    submitForm.BAC003=this.form.BAC003,//被授权人姓名
                    submitForm.BAC002=this.form.BAC002,//被授权人身份证
                    submitForm.AAE144=this.form.AAE144,//绑定关系
                    submitForm.AAS301=this.form.AAS301//参保地省
                    submitForm.AAB301=this.form.AAB301//参保地市
                    submitForm.AAQ301=this.form.AAQ301//参保地区
                    submitForm.BKZ019=this.form.BKZ019//经办编号
                    submitForm.AAE031='20190625'
                    // submitForm.debugTest=  "true";

                // 加入用户名和电子社保卡号
                if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                    submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                    submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
                }else {
                    
                    this.$toast("未获取到人员基本信息");
                }
                // 请求参数封装
                const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"1022");
                return params;
            }
        }
    }
</script>

<style lang="less" scoped>
.familyAid {
    .Content {
        height: 100%;
        margin-bottom: 1.4rem;
        .ReportInfo {
            height: 6rem;
            width: 7.5rem;
            padding: 0 .3rem;
            background: white;
            .InfoLine {
                height: 1.2rem;
                position: relative;
                font-family: PingFangSC-Regular;
                font-size: .28rem;
                display: flex;
                justify-content: space-between;
                border-bottom: .01rem solid #D5D5D5;
                .InfoName {
                    line-height: 1.2rem;
                    span {
                        height: .6rem;
                        line-height: .6rem;
                        color: #000000;
                        letter-spacing: 0;
                    }
                }
                .InfoText {
                    line-height: 1.2rem;
                    display: flex;
                    position: relative;
                    align-items: center;
                    input {
                        width: 4rem;
                        height: .6rem;
                        font-size: .28rem;
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
.familyAid .el-input__prefix,
.el-input__suffix {
    display: none;
}
.familyAid .el-input__inner {
    border: none;
    text-align: right;
    padding-right: 0;
    padding-left: 0;
}
</style>