<template>
    <div class="SearchHospital">
        <Title :title="'选择医院'" :backRouter="'/smallReim'"></Title>
        <div class="SearchContent">
            <div class="SearchBox">
                <svg-icon icon-class="serveComponent_search" />
                <input class="InputContent" placeholder="按医院名称查找"/>
                <div class="SearchBtn">搜索</div>
            </div>
        </div>
        <div class="ListContent">
            <div class="List"
                v-for="item in HospitalList" 
                :key="item.AKB020"
                @click="chooseHospital(item.AKB020,item.hospitalName)">
                {{item.hospitalName}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            HospitalList:[
                {AKB020: '3300001101019', hospitalName: '浙江中医药大学附属第三医院'},
                {AKB020: '3300001102003', hospitalName: '杭州市第三人民医院'},
                {AKB020: '3302001100003', hospitalName: '宁波市北仑区人民医院'}
            ],
            smallReimForm: {}, // 零星报销对象
        }
    },
    created(){
        // 获取VUEX信息
        this.smallReimForm = JSON.parse(JSON.stringify(this.$store.state.SET_SMALL_REIM_1));
        // this.smallReimForm = this.$store.state.SET_SMALL_REIM;
    },
    methods:{
        chooseHospital(code,name){
            this.smallReimForm.AKB020 = code;
            this.smallReimForm.hospitalName = name;
            this.$store.dispatch('SET_SMALL_REIM_1', this.smallReimForm);
            this.$router.push('/smallReim');
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
            border-bottom: .01rem solid #D5D5D5;
            &:last-child{
                border-bottom: none;
            }
        }
    }
}
</style>