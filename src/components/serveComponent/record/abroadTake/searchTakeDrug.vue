<template>
    <div class="SearchTakeDrug">
        <Title :title="'取药机构'" :backRouter="'/abroadTake'"></Title>
        <div class="SearchContent">
            <div class="SearchBox">
                <svg-icon icon-class="serveComponent_search" />
                <input class="InputContent" placeholder="按疾病名称查找" v-model="params.AAA102" />
                <div class="SearchBtn" @click="search">搜索</div>
            </div>
        </div>
      <div class="ListContent" :style="{height: height}">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
          <ul class="border_bottom">
            <li  v-if="isShow" v-for="item in List" class="List" @click="check(item)"
            >
              <h4 class="name">{{ item && item.AAA101 }}</h4>
              <!-- <div class="info">
                <label>{{(item && item.address && item.address !== 'null') ? item.address: '暂无' }}</label>
                <span>距离{{item && item.distance}}km</span>
              </div> -->
            </li>
          </ul>
        </mt-loadmore>
        <div class="footer" v-if="List.length < 20 && List.length >= 0">没有更多数据了~</div>
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
            form:{},
            List: [],
            status: "",
            params: {
                pageSize:10,
                pageNum: "1",
                AAA102: "",
                // lng: 120.158772, //电脑上测试使用
                // lat: 30.2753 //电脑上测试使用
            },
            allLoaded: true,
            height: window.innerHeight - 50 + "px",
            isShow:true,
            tips:false  
        }
    },
    created(){
        // 获取VUEX信息
        this.form = this.$store.state.SET_ABROADTAKE_OPERATION;
        console.log(this.form)
        this.getList()
        // this.smallReimForm = this.$store.state.SET_SMALL_REIM;
        console.log("List",this.List)
    },
    methods:{
        chooseTakeDrug(code,name){
            this.smallReimForm.AKB020 = code;
            this.smallReimForm.TakeDrugName = name;
            this.$store.dispatch('SET_SMALL_REIM_1', this.smallReimForm);
            this.$router.push('/smallReim');
        },
        getList(){
            this.$store.dispatch('SET_ABROADTAKE_OPERATION', this.form);
            // 封装数据
            let params = this.formatSubmitData();
            // 开始请求
            console.log('parmas------',params)
            this.$axios.post('http://192.168.1.96:13010/app/jy2001/optionInformationList', params).then((resData) => {
                console.log('返回成功信息',resData.LS_DS)
                //   成功   1000
                    if ( resData.enCode == 1000 ) {
                        this.$toast("提交成功");
                        if (resData.LS_DS.length > 0) {
                            this.List = [...this.List, ...resData.LS_DS];
                            let pageNum=Math.ceil(this.List.length/this.params.pageSize);
                            //向上取整
                            this.params.pageNum=pageNum;
                            if (resData.page > pageNum) {
                            this.params.pageNum+=1;
                            this.allLoaded = false;
                            sessionStorage.setItem("params", JSON.stringify(this.params));
                            sessionStorage.setItem("pointList", JSON.stringify(this.List));
                            }
                            // sessionStorage.setItem("params", JSON.stringify(this.params));
                        }

                    }else if (resData.enCode == 1001 ) {
                    //   失败  1001
                        this.$toast(resData.msg);
                        return;
                    }else{
                        this.$toast('业务出错');
                        return;
                    }
                })
        },
        formatSubmitData(){
            let submitForm = {};
            // 日期传换成Number
            console.log()

            submitForm.AAS301 =  this.form.AAS301;//参保地省
            submitForm.AAB301 =  this.form.AAB301;//参保地市
            submitForm.AAQ301 =  this.form.AAQ301;//参保地区
            submitForm.AAA102 =  this.form.AAA102;//模糊查询
            submitForm.AAA100 =  this.form.AAA100;//机构参数
            submitForm.pageNum =  this.params.pageNum;//模糊查询
            
            
            // 加入用户名和电子社保卡号
            if (this.$store.state.SET_NATIVEMSG.name !== undefined ) {
                submitForm.AAC003 = this.$store.state.SET_NATIVEMSG.name;
                submitForm.AAE135 = this.$store.state.SET_NATIVEMSG.idCard;
            }else {
                submitForm.AAC003 = '胡';
                submitForm.AAE135 = "113344223344536624";
            }
            // 请求参数封装
            const params = this.epFn.commonRequsetData(this.$store.state.SET_NATIVEMSG.PublicHeader,submitForm,"2001");
            return params;
        },
        //点击查看详情
        check(item) {
        this.$router.push({
            path: "/hospital-info",
            query: { obj: JSON.stringify(item) }
        });
        },
        //搜索
        search() {
        this.allLoaded = true;
        this.List = [];
        this.params.pageNum = 1;
        this.status=1;
        this.getList();
        console.log("清空List",this.List)


        },
        //清空输入框
        clear() {
        this.params.akb021 = "";
        console.log(this.params)
        console.log(this.List)
        },
        //加载更多
        loadBottom() {
        console.log('加载')
        if (!this.allLoaded) {
            console.log("loading",this.allLoaded);
            this.getList();
            
        }
        this.allLoaded = true;
        this.$refs.loadmore.onBottomLoaded(); 
        }
    },
  mounted() {
    //如果有保存医院列表就从session里获取，没有就发起请求
    let List = JSON.parse(sessionStorage.getItem("pointList"));
    let params = JSON.parse(sessionStorage.getItem("params"));
    if (List) {
      this.List = List;
      console.log("pointList",this.List.length)
      let pageNum=Math.ceil(this.List.length/params.pageSize);
      console.log("pointList",this.List.page)
      console.log("paramsNum",pageNum)
      this.status = '1';
      this.params = params;
        if(List.page>pageNum){
        this.allLoaded=false
        }else{
        this.allLoaded=true
      }
    } else {
    //   this.getPosition();
    }
  }
}
</script>

<style lang="less" scoped>
.SearchTakeDrug{
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
            .name {
                margin-bottom: 8px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .info {
                display: flex;
                align-items: center;
                font-size: 13px;
                color: #888;
                label {
                    flex: 1;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                span {
                    flex: 0 0 auto;
                    width: 3.2rem;
                    text-align: right;
                }
            }
        }
    }
}

</style>