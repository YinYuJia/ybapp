<template>
    <div class="SearchHospital">
        <Title :title="'选择医院'" :backRouter="'/smallReim'"></Title>
        <div class="SearchContent">
            <div class="SearchBox">
                <svg-icon icon-class="serveComponent_search" />
                <input class="InputContent" placeholder="按疾病名称查找"/>
                <div class="SearchBtn">搜索</div>
            </div>
        </div>
        <div class="ListContent">
            <div class="List"
                v-for="item in HospitalList" 
                :key="item.hospitalCode"
                @click="chooseHospital(item.hospitalCode,item.hospitalName)">
                {{item.hospitalCode}}-{{item.hospitalName}}
            </div>
        </div>
    </div>
</template>

<script>
import Title from '../../common/Title'
export default {
    components: {
        Title
    },
    data(){
        return{
            HospitalList:[
                {hospitalCode: '1001', hospitalName: '医院1'},
                {hospitalCode: '1002', hospitalName: '医院2'},
                {hospitalCode: '1003', hospitalName: '医院3'},
                {hospitalCode: '1004', hospitalName: '医院4'},
                {hospitalCode: '1005', hospitalName: '医院5'},
            ],
            smallReimForm: {}, // 零星报销对象
        }
    },
    created(){
        // 获取VUEX信息
        // this.smallReimForm = Object.assign({}, res.data.result.sysFunction);
    },
    methods:{
        chooseHospital(code,name){
            
        }
    }
}
</script>

<style lang="less" scoped>
.SearchHospital{
    .SearchContent{
        height: 1.18rem;
        width: 7.5rem;
        background: #FFF;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        .SearchBox{
            height: .8rem;
            width: 6.7rem;
            padding: 0 .15rem;
            border: .01rem solid #1492FF;
            border-radius: .05rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .svg-icon{
                height: .5rem;
                width: .5rem;
            }
            .InputContent{
                height: .49rem;
                width: 4.8rem;
                font-size: .26rem;
                border: none;
                &::placeholder{
                    color: #C9C9C9;
                }
            }
            .SearchBtn{
                height: .49rem;
                width: .99rem;
                background: #1492FF;
                border-radius: .04rem;
                color: white;
                font-size: .26rem;
                line-height: .49rem;
                letter-spacing: 0;
            }
        }
    }
    .ListContent{
        width: 7.5rem;
        background: #FFF;
        padding: 0 .37rem;
        .List{
            height: 1.2rem;
            font-size: .28rem;
            color: #000;
            letter-spacing: 0;
            line-height: 1.2rem;
            text-align: left;
        }
    }
}
</style>