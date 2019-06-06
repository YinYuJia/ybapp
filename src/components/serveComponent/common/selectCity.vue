<template>
    <mt-popup class="cityPicker" v-model="showCityPicker" position="bottom" >
        <mt-picker
            v-if="type=='2'"
            :showToolbar="true"
            :slots="insuredCity"
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
                    values: Object.keys(this.epFn.addressList()),
                    className: 'slot1'
                },{
                    divider: true,
                    content: '-',
                    className: 'slot2'
                },{
                    flex: 1,
                    values: [],
                    className: 'slot3'
                }
            ],
            // 省市区数据
            fullCity:[
                {
                    flex: 1,
                    values: Object.keys(this.epFn.addressList()),
                    className: 'slot1'
                },{
                    divider: true,
                    content: '-',
                    className: 'slot2'
                },{
                    flex: 1,
                    values: [],
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
        }
    },
    created(){
        this.$nextTick(() =>{
            // 不赋值默认值就不会加载市区信息
            this.insuredCity[2].values = [''];
            this.fullCity[2].values = [''];
        })
    },
    methods:{
        // 选择参保地
        onInsuredChange(picker, values){
            if(this.epFn.addressList()[values[0]]){
                picker.setSlotValues(1,Object.keys(this.epFn.addressList()[values[0]]));
                picker.setSlotValues(2,this.epFn.addressList()[values[0]][values[1]]);
                this.province = values[0];
                this.city = values[1];
                this.country = values[2];
            }
        },
        open(){
            this.showCityPicker = true;
        },
        confirm(){
            this.showCityPicker = false;
            if(this.type == 2){
                let address = this.province+this.city;
                this.$emit('confirm',address);
            }else{
                let address = this.province+this.city+this.country;
                this.$emit('confirm',address);
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