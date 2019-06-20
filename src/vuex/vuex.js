import Vue from 'vue'  //引入vue
import Vuex from 'vuex'  // 引入vuex
Vue.use(Vuex)   // 注册vuex
export default new Vuex.Store({  // 暴露与new vuex
    state:{ 
        SET_PRODUCTS: [
          {name: '鼠标', price: 20},
          {name: '键盘', price: 40},
          {name: '耳机', price: 60},
          {name: '显示屏', price: 80}
        ],
        
        // 原生传过来的数据
        SET_NATIVEMSG:{},

        SET_SELECT:'选项1',
        SET_SELECTARRAY:[],
        // 待遇报销表单
        SET_TREATMENT_REIMBURSEMENT: {
          // 开始时间
          startDate: '',
          // 结束时间
          endDate:"",
          // 就诊类型
          TypeOfVisit:"",
          // 省
          province:"",
          // 市
          city:"",
          // 就诊机构
          VisitingInstitution:"",
          // 发票号
          InvoiceNumber:"",
          // 总金额
          TotalSum:""
        },

        // 用户基本信息
        SET_USER_BASEINFO:{
          name: '张*佳', //姓名
          idNo: '3301**********4567', //身份证号
        },

        // 异地就医备案
        SET_ELSEWHERE_OPERATION:{
          AAB301000:"",
          AAS011000:"",
          AAE030: '', //离杭日期
          AAE031: '', //回杭日期
          AAS011: '', //参保地省
          AAE011: '', //参保地市
          AAQ011: '', //参保地区
          AAE006: '', //详细地址 
          AKC030: '', //申请原因
          AAE004: '', //联系人
          AAE005: '', //联系电话
          AAS301: '',//申请地省
          AAB301: '',//申请地市
          AAQ301: '',//申请地区
        },
        // 打印参保证明
        SET_SEARCH_PRINT:{
          AAS301:'', //参保地
          AAB301:'', //参保地
          AAQ301:'', //参保地
          AAE011: '24' //缴费月数
        },
        // 转外就医备案
        SET_TURNOUT_OPERATION:{
          AAA301000:"",//参保地
          AAB301000: "",//转往地市
          AAE030: '', //开始日期
          AAE031: '', //结束日期
          AAS301: "", //转往地省
          AAB301: "", //转往地市
          AAQ301: "", //转往地区
          AKA121: '',//疾病名称
          BKE255: '', //就诊疗程
          photoIdList:[],//照片ID数组
          BKZ019:""
        },

        // 出国带药备案
        SET_ABROADTAKE_OPERATION:{
          AAB301000: '', //参保地
          AAS301: '', //参保地省
          AAB301: '', //参保地市
          AAQ301: '', //参保地区
          AKB020: '',//取药机构
          AKB020Name: '',//取药机构
          AAE030: '', //出境日期
          AAE031: '', //拟回国日期
          BKE260: '', //护照号码
          AAA100:"",//参数类别
          BKZ019:"",//经办编号 
          AAA100: 'AKB020',//参数类别
        },

        // 家庭共济备案
        SET_FAMILYAID_OPERATION:{
          BAC003: '', //被授权人姓名
          BAC002: '', //被授权人身份证
          AAE144: '',//绑定关系
          AAE030: '', //开始日期
          AAB301000:'',
          AAS301:"",//参保地省
          AAB301:"",//参保地市
          AAQ301:"",//参保地区
          BKZ019:""//经办编号
        },

        // 基本信息变更
        SET_BASEINFOCHANGE_OPERATION:{
          AAE006: '', //家庭住址
          AAE005: '', //手机号码
          AAE007: '', //邮政编码
          BKZ019: '', //经办编号
        },

        // 领取就医凭证
        SET_INSURED_PROOF:{
          AAE011: '', //收件人
          AAE005: '', //联系电话
          AAE006: '', //地址
          AAC050:'', //变更类型
          BKA077 :'0' ,//领取方式
        },
        SET_PUBLICHEADER:{  imei:	'移动设备身份码',
        mac:	'设备编号',
        phoneModel:	'设备机型',
        platform:	'平台标识',
        signType	:	'签名类型',
        sign	:'签名',
        // tradeCode	:	'交易类型',
        // data	:	'交易内容',
        version	:	'版本号',
      },

        // 参保变更信息
        SET_INSURED_CHANGE:{
          AAE006: '', //家庭住址
          AAE005: '', //手机号码
          AAE007: '', //邮政编码
          BKZ019: '', //经办编号
        },

        // 零星报销
        SET_SMALL_REIM_SUBMIT:{
          AAS301: '330000', //参保地统筹省编码
          AAB301: '330100', //参保地统筹市编码
          AKC264: 0, //发票费用总额
          AAE008: '', //收款开户行
          AAE009: '', //收款开户名
          AAE010: '', //收款银行账号
          BKC013: '', //发票张数
          AKB020: '', //机构编码（医院编码）
        },
        SET_SMALL_REIM_1:{
          hospitalName: '', //就诊医院
          AKB020: '', //医院编码
          AKA078: '', //就诊类型
          AAE030: '' //就诊日期
        },
        SET_SMALL_REIM_2:{
          eleInvoices: [], //电子发票信息
        },

        //缴费年限核定
        SET_PAYLIMIT_OPERATION:{
          AKC412: '', //视作缴费年限
          BAC213: '', //缴费月数
          AAE041: '', //退休工资
          BKE810: '' //提前退休类别
        },
        //医保关系转移接续
        SET_TRANSFERRENEWING_OPERATION:{
          AAA027000:"",
          AAS027:"", //转出地省code
          AAS301:"", //转入地省code
          AAB301000:"",
          AAE005: '', //手机号码,
          AAA027:"",//转出地市
          AAB301:"",//转入地市
          BKZ019:''//经办编号
        },
        //零星报销
        SET_SMALLREIM_OPERATION:{
          AAB301: '', //参保地
          ACK264: '', //发票费用总额
          number: '', //发票张数
          AAE008: '', //收款开户行
          AAE009: '', //收款开户名
          AAE010: '', //收款银行账号
        },
        //费用信息查询
        SET_SEARCHFEE_OPERATION:{
          AAE030: '', //开始日期
          AAE031: '', //结束日期
        },
        //参保信息查询
        SET_SEARCHINSUREDINFO_OPERATION:{
          AAB301000: '', //参保地
          AAS301: '', //参保地省
          AAB301: '', //参保地市
          AAQ301: '', //参保地区
          AAE091: '', //查询月数
        },

        // 慢性病备案
        SET_CHRONIC_DISEASE:{
          canbao: '', //参保地
          AAS301: '', //参保地省编码
          AAB301: '', //参保地市编码
          AAQ301: '', //参保地区编码
          AKA035: '', //规定病种
          AKA035Name: '', //规定病种
          AKA120: '', //疾病编码1
          AKA121: '', //疾病名称1
          AKA1201: '', //疾病编码2
          AKA1211: '', //疾病名称2
          AKA1202: '', //疾病编码3
          AKA1212: '', //疾病名称3
          AAE030: '', //开始日期
          BKE247: '1', //病历本提取方式 1自取，2邮寄
          AAE011: '', //收件人
          AAE005: '', //联系电话
          AAE006: '', //详细地址
      },
      // 特治特药备案
      SET_SPECIAL_DRUG:{
        canbao: '',
        AAB301: '', //参保地
        AKB020: '', //就诊机构
        BKE253: '', //项目类型
        BKE228: '',//特药特治类型
        AKA120: '', //疾病编码
        AKA121: '', //疾病名称
        BKE248: '', //用药时期
        AKE001: '', //项目编码
        AKE002: '', //项目名称
        AKA071: '', //单位剂量
        AKC226: '', //数量
        BKE249: '', //备案剂量
        AKA069: '', //自理比例
        BKE250: '', //累计备案剂量
        BKE251: '', //剩余备案剂量
        BKE252: '', //实际使用量
        AKB063: '', //备案天数
        AAE030: '', //开始日期
        AAE031: '' //结束日期
    },
        
      },
      // 计算属性 getters
      getters:{
        SET_PRODUCTS:(state) => {
          let a = state.SET_PRODUCTS.map( product => {
            return {
              name: product.name,
              price: product.price / 2,
              name2:product.name + (Number(product.price) + 1)
            }
          })
          return a;
        },
        SET_USER_BASEINFO:( state ) => {
          return state.SET_USER_BASEINFO=JSON.parse(sessionStorage.getItem('SET_USER_BASEINFO'));
        },
        SET_NATIVEMSG:( state ) => {
          return state.SET_NATIVEMSG=JSON.parse(sessionStorage.getItem('SET_NATIVEMSG'));
        },
        SET_ELSEWHERE_OPERATION:(state) => {
          
          let a = state.SET_ELSEWHERE_OPERATION
          if (a.selectedOptions.length != 0 ) {
            a.selectedOptions = a.selectedOptions[3]
          }
          
          return a;
        },
        SET_TREATMENT_REIMBURSEMENT:(state) => {
          state.SET_TREATMENT_REIMBURSEMENT.startDate = state.SET_TREATMENT_REIMBURSEMENT.startDate.valueOf()
          state.SET_TREATMENT_REIMBURSEMENT.endDate = state.SET_TREATMENT_REIMBURSEMENT.endDate.valueOf()
          let a = new Date(state.SET_TREATMENT_REIMBURSEMENT.startDate)
          let b = new Date(state.SET_TREATMENT_REIMBURSEMENT.endDate)
          
           state.SET_TREATMENT_REIMBURSEMENT.startDate = a.toLocaleDateString().replace(/\//g, "-") 
           state.SET_TREATMENT_REIMBURSEMENT.endDate =  b.toLocaleDateString().replace(/\//g, "-") 
          return state.SET_TREATMENT_REIMBURSEMENT;
        },
      },
      // 相当于methods
      mutations:{
        SET_PRODUCTS (state, payload ) {
          state.SET_PRODUCTS = payload
        },
        SET_SELECT (state,payload) {
          state.SET_SELECT = payload
        },
        SET_SELECTARRAY (state,payload) {
          state.SET_SELECTARRAY = payload
        },
        SET_TREATMENT_REIMBURSEMENT (state,payload) {
          state.SET_TREATMENT_REIMBURSEMENT = payload
        },
        SET_ELSEWHERE_OPERATION(state,payload){
          state.SET_ELSEWHERE_OPERATION = payload
        },
        SET_TURNOUT_OPERATION(state,payload){
          state.SET_TURNOUT_OPERATION = payload
        },
        SET_ABROADTAKE_OPERATION(state,payload){
          state.SET_ABROADTAKE_OPERATION = payload
        },
        SET_FAMILYAID_OPERATION(state,payload){
          state.SET_FAMILYAID_OPERATION = payload
        },
        SET_BASEINFOCHANGE_OPERATION(state,payload){
          state.SET_BASEINFOCHANGE_OPERATION = payload
        },
        SET_INSURED_PROOF(state,payload){
          state.SET_INSURED_PROOF = payload;
        },
        SET_INSURED_CHANGE(state,payload){
          state.SET_INSURED_CHANGE = payload;
        },
        SET_USER_BASEINFO(state,payload){
          sessionStorage.setItem("SET_USER_BASEINFO",JSON.stringify(payload));
          state.SET_USER_BASEINFO = payload;
        },
        SET_NATIVEMSG(state,payload){
          sessionStorage.setItem("SET_NATIVEMSG",JSON.stringify(payload));
          state.SET_NATIVEMSG = payload;
        },
        SET_SMALL_REIM_SUBMIT(state,payload){
          state.SET_SMALL_REIM_SUBMIT = payload;
        },
        SET_SMALL_REIM_1(state,payload){
          state.SET_SMALL_REIM_1 = payload;
        },
        SET_SMALL_REIM_2(state,payload){
          state.SET_SMALL_REIM_2 = payload;
        },
        SET_PAYLIMIT_OPERATION(state,payload){
          sessionStorage.setItem("SET_PAYLIMIT_OPERATION",JSON.stringify(payload));
          state.SET_PAYLIMIT_OPERATION = payload;
        },
        SET_TRANSFERRENEWING_OPERATION(state,payload){
          sessionStorage.setItem("SET_TRANSFERRENEWING_OPERATION",JSON.stringify(payload));
          state.SET_TRANSFERRENEWING_OPERATION = payload;
        },
        SET_SMALLREIM_OPERATION(state,payload){
          sessionStorage.setItem("SET_SMALLREIM_OPERATION",JSON.stringify(payload));
          state.SET_SMALLREIM_OPERATION = payload;
        },
        SET_SEARCHFEE_OPERATION(state,payload){
          sessionStorage.setItem("SET_SEARCHFEE_OPERATION",JSON.stringify(payload));
          state.SET_SEARCHFEE_OPERATION = payload;
        },
        SET_SEARCHINSUREDINFO_OPERATION(state,payload){
          sessionStorage.setItem("SET_SEARCHINSUREDINFO_OPERATION",JSON.stringify(payload));
          state.SET_SEARCHINSUREDINFO_OPERATION = payload;
        },
        SET_CHRONIC_DISEASE(state,payload){
          state.SET_CHRONIC_DISEASE = payload;
        },
        SET_SPECIAL_DRUG(state,payload){
          state.SET_SPECIAL_DRUG = payload;
        }
      },

      actions:{ //添加actions
        SET_PRODUCTS( context, payload ) {
          context.commit( 'SET_PRODUCTS', payload ); //context提交
        },
        SET_NATIVEMSG( context, payload ) {
          context.commit( 'SET_NATIVEMSG', payload ); //context提交
        },
        SET_SELECT( context, payload ) {
          context.commit( 'SET_SELECT', payload ); //context提交
        },
        SET_SELECTARRAY( context, payload ) {
          context.commit( 'SET_SELECTARRAY', payload ); //context提交
        },
        SET_TREATMENT_REIMBURSEMENT( context, payload ) {
          context.commit( 'SET_TREATMENT_REIMBURSEMENT', payload ); //context提交
        },
        SET_ELSEWHERE_OPERATION( context, payload ) {
          context.commit( 'SET_ELSEWHERE_OPERATION', payload ); //context提交
        },
        SET_TURNOUT_OPERATION( context, payload ) {
          context.commit( 'SET_TURNOUT_OPERATION', payload ); //context提交
        },
        SET_ABROADTAKE_OPERATION( context, payload ) {
          context.commit( 'SET_ABROADTAKE_OPERATION', payload ); //context提交
        },
        SET_FAMILYAID_OPERATION( context, payload ) {
          context.commit( 'SET_FAMILYAID_OPERATION', payload ); //context提交
        },
        SET_BASEINFOCHANGE_OPERATION( context, payload ) {
          context.commit( 'SET_BASEINFOCHANGE_OPERATION', payload ); //context提交
        },
        SET_INSURED_PROOF( context, payload ) {
          context.commit( 'SET_INSURED_PROOF', payload ); //context提交
        },
        SET_INSURED_CHANGE( context, payload ) {
          context.commit( 'SET_INSURED_CHANGE', payload ); //context提交
        },
        SET_USER_BASEINFO( context, payload ) {
          context.commit( 'SET_USER_BASEINFO', payload ); //context提交
        },
        SET_SMALL_REIM_SUBMIT( context, payload ) {
          context.commit( 'SET_SMALL_REIM_SUBMIT', payload );
        },
        SET_SMALL_REIM_1( context, payload ) {
          context.commit( 'SET_SMALL_REIM_1', payload );
        },
        SET_SMALL_REIM_2( context, payload ) {
          context.commit( 'SET_SMALL_REIM_2', payload );
        },
        SET_PAYLIMIT_OPERATION( context, payload ) {
          context.commit( 'SET_PAYLIMIT_OPERATION', payload ); //context提交
        },
        SET_TRANSFERRENEWING_OPERATION( context, payload ) {
          context.commit( 'SET_TRANSFERRENEWING_OPERATION', payload ); //context提交
        },
        SET_SMALLREIM_OPERATION( context, payload ) {
          context.commit( 'SET_SMALLREIM_OPERATION', payload ); //context提交
        },
        SET_SEARCHFEE_OPERATION( context, payload ) {
          context.commit( 'SET_SEARCHFEE_OPERATION', payload ); //context提交
        },
        SET_SEARCHINSUREDINFO_OPERATION( context, payload ) {
          context.commit( 'SET_SEARCHINSUREDINFO_OPERATION', payload );//context提交
        }, 
        SET_CHRONIC_DISEASE( context, payload ) {
          context.commit( 'SET_CHRONIC_DISEASE', payload );//context提交
        },
        SET_SPECIAL_DRUG( context, payload ) {
          context.commit( 'SET_SPECIAL_DRUG', payload );//context提交
        },
      }
})  