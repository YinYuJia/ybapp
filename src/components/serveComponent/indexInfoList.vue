<template>
    <div>
        <header class="header"><span class="el-icon-arrow-left icon-left"></span> <span class="title">更多医保服务</span></header>
        <!-- Index -->
        <div class="IconNav">
            <!-- <div v-for="item in List" :key="item.title">
                    <div class="DepartmentsList">
                        <span></span>
                        <p class="titleOne">{{item.title}}</p>
                    </div>
                    <el-row class="IconList" v-for="line in item.Info" :key="line.title">
                        <el-col :span="6" class="IconBox" v-for="box in line.line" :key="box.iconName">
                            <div class="IconImg">
                                <svg-icon v-if="show" icon-class="indexInfoList-yuyueguahao" />
                                <svg-icon v-if="hidden" icon-class="indexInfoList-yuyueguahao1" />
                            </div>
                            <div class="IconText"><span>{{box.iconName}}</span></div>
                        </el-col>
                    </el-row>
                </div> -->

            <!-- <div class="DepartmentsList">
                <span></span>
                <p class="titleOne">我的健康</p>
            </div>
            <el-row class="IconList">
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="show" icon-class="indexInfoList-yuyueguahao" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-yuyueguahao1" />
                    </div>
                    <div class="IconText"><span>预约挂号</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="show" icon-class="indexInfoList-paiduijiaohao" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-paiduijiaohao1" />
                    </div>
                    <div class="IconText"><span>排队叫号</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="show" icon-class="indexInfoList-yibaozhifu" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-yibaozhifu1" />
                    </div>
                    <div class="IconText"><span>医保支付</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="show" icon-class="indexInfoList-baogaochaxun" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-baogaochaxun1" />
                    </div>
                    <div class="IconText"><span>报告查询</span></div>
                </el-col>
            </el-row>
            <div class="DepartmentsList">
                <span></span>
                <p class="titleOne">个人信息查询</p>
            </div>
            <el-row class="IconList">
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="show" icon-class="indexInfoList-benanxinxi" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-benanxinxi1" />
                    </div>
                    <div class="IconText"><span>备案信息</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="show" icon-class="indexInfoList-jiuzhenxinxi" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-jiuzhenxinxi1" />
                    </div>
                    <div class="IconText"><span>就诊信息</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="show" icon-class="indexInfoList-canbaoxinxi" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-canbaoxinxi1" />
                    </div>
                    <div class="IconText"><span>参保信息</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="show" icon-class="indexInfoList-jiuzhenxinxi" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-jiuzhenxinxi1" />
                    </div>
                    <div class="IconText"><span>账户信息</span></div>
                </el-col>
            </el-row>
            <el-row class="IconList">
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="show" icon-class="indexInfoList-jiaofeixinxi" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-jiaofeixinxi1" />
                    </div>
                    <div class="IconText"><span>缴费信息</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="show" icon-class="indexInfoList-quanyidan" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-quanyidan1" />
                    </div>
                    <div class="IconText"><span>权益单</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="show" icon-class="indexInfoList-banshijindu" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-banshijindu1" />
                    </div>
                    <div class="IconText"><span>办事进度</span></div>
                </el-col>
            </el-row> -->
            <div class="DepartmentsList">
                <span></span>
                <p class="titleOne">参保服务</p>
            </div>
            <el-row class="IconList">
                <!-- <el-col :span="6" class="IconBox">
                    <div class="IconImg" >
                        <svg-icon v-if="show" icon-class="indexInfoList-canbaodengji" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-canbaodengji1" />
                    </div>
                    <div class="IconText"><span>参保登记</span></div>
                </el-col> -->
                <el-col :span="6" class="IconBox">
                    <div class="IconImg" @click="showWork('/getProof','参保服务','领取就医凭证')">
                        <svg-icon v-if="show" icon-class="indexInfoList-jiuyipingzheng" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-jiuyipingzheng1" />
                    </div>
                    <div class="IconText"><span>就医凭证</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg" @click="showWork('/insuredChange','参保服务','信息变更')">
                        <svg-icon v-if="show" icon-class="indexInfoList-xinxibiangeng" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-xinxibiangeng1" />
                    </div>
                    <div class="IconText"><span>参保变更</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg" @click="showWork('/searchPrint','参保服务','打印信息')">
                        <svg-icon v-if="show" icon-class="indexInfoList-dayinxinxi" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-dayinxinxi1" />
                    </div>
                    <div class="IconText"><span>打印信息</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg" @click="showWork('/transferRenewing','参保服务','关系转移接续')">
                        <svg-icon v-if="show" icon-class="indexInfoList-guanxizhuanyi" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-guanxizhuanyi1" />
                    </div>
                    <div class="IconText"><span>接续转移</span></div>
                </el-col>
            </el-row>

            <div class="DepartmentsList">
                <span></span>
                <p class="titleOne">备案服务</p>
            </div>
            <el-row class="IconList">
                <el-col :span="6" class="IconBox">
                    <div class="IconImg" @click="showWork('/elseWhere','备案服务','异地就医备案')">
                        <svg-icon v-if="show" icon-class="indexInfoList-yidibeian" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-yidibeian1" />
                    </div>
                    <div class="IconText"><span>异地备案</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg" @click="showWork('/turnOut','备案服务','转外备案')">
                        <svg-icon v-if="show" icon-class="indexInfoList-zhuanwaibeian" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-zhuanwaibeian1" />
                    </div>
                    <div class="IconText"><span>转外就医</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg" @click="showWork('/abroadTake','备案服务','出国带药')">
                        <svg-icon v-if="show" icon-class="indexInfoList-chuguodaiyao" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-chuguodaiyao1" />
                    </div>
                    <div class="IconText"><span>出国带药</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg" @click="showWork('/familyAid','备案服务','家庭共济')">
                        <svg-icon v-if="show" icon-class="indexInfoList-jiatinggongji" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-jiatinggongji1" />
                    </div>
                    <div class="IconText"><span>家庭共济</span></div>
                </el-col>
            </el-row>
            <el-row class="IconList">
                <el-col :span="6" class="IconBox">
                    <div class="IconImg" @click="showWork('/specialDrug','备案服务','特制特药备案')">
                        <svg-icon v-if="hidden" icon-class="indexInfoList-teyaobeian" />
                        <svg-icon v-if="show" icon-class="indexInfoList-teyaobeian1" />
                    </div>
                    <div class="IconText"><span>特药备案</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg" @click="showWork('/chronicDisease','备案服务','规定（特殊慢性）病种待遇备案')">
                        <svg-icon v-if="hidden" icon-class="indexInfoList-manbingbeian" />
                        <svg-icon v-if="show" icon-class="indexInfoList-manbingbeian1" />
                    </div>
                    <div class="IconText"><span>慢病备案</span></div>
                </el-col>
            </el-row>
            <div class="DepartmentsList">
                <span></span>
                <p class="titleOne">待遇报销</p>
            </div>
            <el-row class="IconList">
                <el-col :span="6" class="IconBox">
                    <div class="IconImg" @click="showWork('/smallReim','待遇报销','基本医疗保险参保人员医疗费用零星报销')">
                        <svg-icon v-if="show" icon-class="indexInfoList-lingxingbaoxiao" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-lingxingbaoxiao1" />
                    </div>
                    <div class="IconText"><span>零星报销</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg" @click="showWork('/payLimit','待遇报销','视同缴费年限核定')">
                        <svg-icon v-if="show" icon-class="indexInfoList-jiaofeinianxian" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-jiaofeinianxian1" />
                    </div>
                    <div class="IconText"><span>缴费年限</span></div>
                </el-col>
                
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="hidden" icon-class="indexInfoList-pingchan" />
                        <svg-icon v-if="show" icon-class="indexInfoList-pingchan1" />
                    </div>
                    <div class="IconText"><span>平产...<br/>待遇核准</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="hidden" icon-class="indexInfoList-liuchan" />
                        <svg-icon v-if="show" icon-class="indexInfoList-liuchan1" />
                    </div>
                    <div class="IconText"><span>流产...<br/>待遇核准</span></div>
                </el-col>
            </el-row>
            <el-row class="IconList">
                
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="hidden" icon-class="indexInfoList-peiou" />
                        <svg-icon v-if="show" icon-class="indexInfoList-peiou1" />
                    </div>
                    <div class="IconText"><span>未就业配偶<br/>待遇核准</span></div>
                </el-col>
            </el-row>
            <!-- <div class="DepartmentsList">
                <span></span>
                <p class="titleOne">其他服务</p>
            </div>
            <el-row class="IconList">
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="show" icon-class="indexInfoList-feiyongshenhe" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-feiyongshenhe1" />
                    </div>
                    <div class="IconText"><span>费用审核</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="show" icon-class="indexInfoList-guashi" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-guashi1" />
                    </div>
                    <div class="IconText"><span>社保卡</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg" @click="showWork('/mendChangeCard','备案服务','社保卡补换')">
                        <svg-icon v-if="show" icon-class="indexInfoList-buhuan" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-buhuan1" />
                    </div>
                    <div class="IconText"><span>社保卡补换</span></div>
                </el-col>
            </el-row> -->
            
            <!-- <div class="DepartmentsList">
                <span></span>
                <p class="titleOne">我的健康</p>
            </div>
            <el-row class="IconList">
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="show" icon-class="indexInfoList-yuyueguahao" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-yuyueguahao1" />
                    </div>
                    <div class="IconText"><span>预约挂号</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="show" icon-class="indexInfoList-paiduijiaohao" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-paiduijiaohao1" />
                    </div>
                    <div class="IconText"><span>排队叫号</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="show" icon-class="indexInfoList-yibaozhifu" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-yibaozhifu1" />
                    </div>
                    <div class="IconText"><span>医保支付</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="show" icon-class="indexInfoList-baogaochaxun" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-baogaochaxun1" />
                    </div>
                    <div class="IconText"><span>报告查询</span></div>
                </el-col>
            </el-row> -->
            <div class="DepartmentsList">
                <span></span>
                <p class="titleOne">个人信息查询</p>
            </div>
            <el-row class="IconList">
                <el-col :span="6" class="IconBox">
                    <div class="IconImg" @click="showDetail('searchBaseInfo','个人信息查询')" >
                        <svg-icon v-if="show" icon-class="indexInfoList-xinxichaxun" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-xinxichaxun1" />
                    </div>
                    <div class="IconText"><span>信息查询</span></div>
                </el-col>

                <el-col :span="6" class="IconBox">
                    <div class="IconImg" @click="showDetail('searchInsuredInfo','参保信息查询')" >
                        <svg-icon v-if="show" icon-class="indexInfoList-canbaoxinxi" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-canbaoxinxi1" />
                    </div>
                    <div class="IconText"><span>参保信息</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="hidden" icon-class="indexInfoList-banshijindu" />
                        <svg-icon v-if="show" icon-class="indexInfoList-banshijindu1" />
                    </div>
                    <div class="IconText"><span>办事进度</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg" @click="showDetail('searchFee','费用信息查询')">
                        <svg-icon v-if="show" icon-class="indexInfoList-jiaofeixinxi" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-jiaofeixinxi1" />
                    </div>
                    <div class="IconText"><span>费用信息</span></div>
                </el-col>
                <!-- <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="hidden" icon-class="indexInfoList-jiuzhenxinxi" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-jiuzhenxinxi1" />
                    </div>
                    <div class="IconText"><span>账户信息</span></div>
                </el-col> -->
            </el-row>
            <el-row class="IconList">
                <el-col :span="6" class="IconBox">
                    <div class="IconImg"  @click="showDetail('searchRecord','备案信息查询')" >
                        <svg-icon v-if="show" icon-class="indexInfoList-benanxinxi" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-benanxinxi1" />
                    </div>
                    <div class="IconText"><span>备案信息</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <!-- @click="showDetail('searchTreat','就诊信息查询')" -->
                    <div class="IconImg" >
                        <svg-icon v-if="hidden" icon-class="indexInfoList-jiuzhenxinxi" />
                        <svg-icon v-if="show" icon-class="indexInfoList-jiuzhenxinxi1" />
                    </div>
                    <div class="IconText"><span>就诊信息</span></div>
                </el-col>


            </el-row>
            <!-- <div class="DepartmentsList">
                <span></span>
                <p class="titleOne">公共查询</p>
            </div>
            <el-row class="IconList">
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="show" icon-class="indexInfoList-yiyuan" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-yiyuan1" />
                    </div>
                    <div class="IconText"><span>定点医院</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="show" icon-class="indexInfoList-yaodian" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-yaodian1" />
                    </div>
                    <div class="IconText"><span>定点药店</span></div>
                </el-col>
                <el-col :span="6" class="IconBox">
                    <div class="IconImg">
                        <svg-icon v-if="show" icon-class="indexInfoList-yaopinmulu" />
                        <svg-icon v-if="hidden" icon-class="indexInfoList-yaopinmulu1" />
                    </div>
                    <div class="IconText"><span>药品目录</span></div>
                </el-col>
            </el-row> -->
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: true,
                hidden: false
            }
        },
        created() {
            this.$store.dispatch('SET_NATIVEMSG', {
                title: "",
                describe: "",
                type: "",
                typeItem: "",
                name: sessionStorage.getItem("userName") ,
                idCard:sessionStorage.getItem("idCard") ,
                PublicHeader: {
                    imei: '',
                    mac: '1111',
                    phoneModel: '',
                    platform: '',
                    signType: '',
                    sign: '',
                    version: 'v2.0',
                }
            });
        },
        methods: {
            showWork(url,item,itemInfo) {
                sessionStorage.setItem("item",item);
                sessionStorage.setItem("itemInfo",itemInfo);
                this.$router.push({
                    name: 'Index',
                    params: {
                        info: url,
                        item:item,
                        itemInfo:itemInfo
                    }
                })
            },
            showDetail(url,item) {
                sessionStorage.setItem("item",item);
                this.$router.push({
                    name: url,
                    params: {
                        item:item,
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .header {
        height: .8rem;
        background-color: #05AEF0;
        text-align: left;
        line-height: .5rem;
        .icon-left {
            height: .5rem;
            width: .5rem;
            color: #ffffff;
            font-size: .5rem;
            margin-left: .15rem;
        }
        .title {
            font-size: .36rem;
            color: #ffffff;
            background-color: #05AEF0;
            margin-left: 25%;
        }
    }
    .DepartmentsList {
        height: .7rem;
        padding-left: .35rem;
        span {
            display: block;
            height: .35rem;
            width: .07rem;
            background-color: #278DFF;
            float: left;
            margin-top: .27rem;
            margin-right: .22rem;
            border-radius: .04rem;
        }
        .titleOne {
            font-size: .3rem;
            height: .9rem;
            line-height: .9rem;
            text-align: left;
            font-family: 'PingFangSC-Medium';
            color: rgba(0, 0, 0, .65);
            font-weight: 700;
        }
    }
    .IconNav {
        width: 7.5rem;
        background: #fff;
        .IconList {
            display: flex;
            align-items: center;
            height: 3.45rem/2;
            .IconBox {
                .IconImg {
                    height: .8rem;
                    width: .8rem;
                    margin: auto;
                    .svg-icon {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
                .IconText {
                    height: .33rem;
                    margin-top: .1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    span {
                        display: block;
                        opacity: .65;
                        font-family: 'PingFangSC-Regular';
                        letter-spacing: 0;
                        color: #000;
                        font-size: .24rem;
                    }
                }
            }
        }
    }
</style>