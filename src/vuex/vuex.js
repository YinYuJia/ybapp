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
          AAB301: '', //参保地
          AAE030: '', //离杭日期
          AAE031: '', //回杭日期
          AAE011: '', //省市信息
          AAE006: '', //详细地址 
          ACK030: '', //申请原因
          AAE004: '', //联系人
          AAE005: '', //联系电话
        },

        // 转外就医备案
        SET_TURNOUT_OPERATION:{
          canbao: [], //参保地
          start: '', //开始日期
          city: [], //省市信息，提交时需要转成String
          treatName: '',//疾病名称
          treatment: '', //就诊疗程
        },

        // 出境带药备案
        SET_ABROADTAKE_OPERATION:{
          AAB301: '', //参保地
          AAE030: '', //出境日期
          AAE031: '', //拟回国日期
          AKB020: '',//取药机构
          BKE260: '', //护照号码
        },

        // 家庭共济备案
        SET_FAMILYAID_OPERATION:{
          canbao: [], //参保地
          name: '', //享受人姓名
          idNo: '', //享受人身份证
          relation: '',//绑定关系
          start: '', //开始日期
        },

        // 基本信息变更
        SET_BASEINFOCHANGE_OPERATION:{
          address: '', //家庭地址
          phone: '', //手机号码
          code: '' //邮政编码
        },

        // 领取就医凭证
        SET_INSURED_PROOF:{
          'AAE011': '', //收件人
          'AAE005': '', //联系电话
          'AAE006': '', //地址
          'AAC050':'', //变更类型
          'BKA077' :'' ,//领取方式
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
          AAE007: '' //邮政编码
        },
        //缴费年限核定
        SET_PAYLIMIT_OPERATION:{
          AKC412: '', //视作缴费年限
          BAC213: '', //缴费月数
          AAE041: '', //退休工资
          BKE810: '', //提前退休类别
        },
        //医保关系转移接续
        SET_TRANSFERRENEWING_OPERATION:{
          AAA027000:"",
          AAA027:"", //转出地code
          AAB301:"", //转入地code
          AAB301000:"",
          AAE005: '', //手机号码,
          AAQ027:"",
          AAQ301:""
        },
        //零星报销
        SET_SMALLREIM_OPERATION:{
          AAB301: '', //参保地
          ACK264: '', //发票费用总额
          number: '', //发票张数
          AAE008: '', //收款开户行
          AAE009: '', //收款开户名
          AAE010: '', //收款银行账号
        }
        
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
        SET_PAYLIMIT_OPERATION( context, payload ) {
          context.commit( 'SET_PAYLIMIT_OPERATION', payload ); //context提交
        },
        SET_TRANSFERRENEWING_OPERATION( context, payload ) {
          context.commit( 'SET_TRANSFERRENEWING_OPERATION', payload ); //context提交
        },
        SET_SMALLREIM_OPERATION( context, payload ) {
          context.commit( 'SET_SMALLREIM_OPERATION', payload ); //context提交
        },
      }
})