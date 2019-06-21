<template>
    <!-- 城市选择 -->
    <mt-popup class="cityPicker" v-model="showCityPicker" position="bottom" >
        <mt-picker
            v-if="type=='2'"
            :showToolbar="true"
            :slots="insuredCity"
            :valueKey="'name'"
            @change="onInsuredChange"
            >
            <div class="btnBox">
                <div class="btn" @click="showCityPicker=!showCityPicker">取消</div>
                <div class="btn" @click="confirm()">确定</div>
            </div>
        </mt-picker>
        <mt-picker 
            v-if="type=='3'"
            :showToolbar="true"
            :slots="fullCity"
            :valueKey="'name'"
            @change="onInsuredChange"
            >
            <div class="btnBox">
                <div class="btn" @click="showCityPicker=!showCityPicker">取消</div>
                <div class="btn" @click="confirm()">确定</div>
            </div>
        </mt-picker>
    </mt-popup>
</template>

<script>
export default {
    name: 'selectCity',
    props:{
        type:{
            type: Number,
            required: true
        }
    },
    data(){
        return {
            showCityPicker: false,
            // 省市数据
            insuredCity:[
                {
                    flex: 1,
                    values: [],
                    code:[],
                    className: 'slot1'
                },{
                    divider: true,
                    content: '-',
                    className: 'slot2'
                },{
                    flex: 1,
                    values: [],
                    code:[],
                    className: 'slot3'
                }
            ],  //339900省本级
                //330100杭州市
            // 省市区数据
            fullCity:[
                {
                    flex: 1,
                    values: [],
                    code:[],                    
                    className: 'slot1',
                },{
                    divider: true,
                    content: '-',
                    className: 'slot2'
                },{
                    flex: 1,
                    values: [],
                    code:[],
                    className: 'slot3'
                },{
                    divider: true,
                    content: '-',
                    className: 'slot4'
                },
                {
                    flex: 1,
                    values: [],
                    className: 'slot5'
                }
            ],
            province: '', //省
            city: '', //市
            country: '', //区,县
            codeProvice: '',
            codeCity: '',
            codeCountry: '',
        }
    },

    created(){
        this.$nextTick(() =>{
            this.insuredCity[0].values = this.epFn.addressList();
            this.fullCity[0].values = this.epFn.addressList();
            this.fullCity[0].defaultIndex=10;
            this.insuredCity[0].defaultIndex = 10;
        })
    },
    methods:{
        // 选择参保地
        onInsuredChange(picker, values){
            this.country = "";
            if(values[0] !== undefined){
                picker.setSlotValues(1, values[0].children);
                this.province = values[0].name;
                this.codeProvince = values[0].code;
                if(values[1] !== undefined){
                    picker.setSlotValues(2, values[1].children);
                    this.city = values[1].name;
                    this.codeCity = values[1].code;
                }
                if(values[2] !== undefined){
                    this.country = values[2].name;
                    this.codeCountry = values[2].code;
                }
            }
        },
        open(){
            this.showCityPicker = true;
        },
        confirm(){
            this.showCityPicker = false;
            if(this.type == 2){
                let address = this.province + this.city;
                let code = [];
                code.push(this.codeProvince,this.codeCity);
                let obj = {
                    name: address,
                    code: code
                };
                this.$emit('confirm',obj);
            }else{
                let address = this.province + this.city + this.country;
                let code = [];
                code.push(this.codeProvince,this.codeCity,this.codeCountry);
                let obj = {
                    name: address,
                    code: code
                };
                this.$emit('confirm',obj);
            }
        },
    }
}
</script>

<style lang="less" scoped>
.cityPicker{
    width: 100%;
    .btnBox{
        display: flex;
        .btn{
            height: 40px;
            width: 50%;
            color: #26a2ff;
            line-height: 40px;
            font-size: 16px;
        }
    }
}
</style>