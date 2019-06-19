import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/serveComponent/index'
import indexInfoList from '@/components/serveComponent/indexInfoList'
import indexInfoList1 from '@/components/serveComponent/indexInfoList1'

import First from '@/components/First';

// import Work from '@/components/Work';
// import TreatmentReimbursement from '@/components/commonComponent/Work/TreatmentReimbursement';
// import TReimbursement1 from '@/components/commonComponent/Work/TreatmentReimbursement/TReimbursement1'
// import SubmitReimbursement from '@/components/commonComponent/Work/TreatmentReimbursement/SubmitReimbursement'
// import EventDetail from '@/components/commonComponent/Work/TreatmentReimbursement/EventDetail_1'
import getProof from '@/components/serveComponent/insured/getProof/getProof'
import getDetail from '@/components/serveComponent/insured/getProof/getDetail'
import insuredChange from '@/components/serveComponent/insured/insuredChange/insuredChange'
import changeDetail from '@/components/serveComponent/insured/insuredChange/changeDetail'
import searchPrint from '@/components/serveComponent/insured/searchPrint/searchPrint'
import insuredDownload from '@/components/serveComponent/insured/searchPrint/insuredDownload'
import transferRenewing from '@/components/serveComponent/insured/transferRenewing/transferRenewing'
import transferDetail from '@/components/serveComponent/insured/transferRenewing/transferDetail'
import elseWhere from '@/components/serveComponent/record/elseWhere/elseWhere'
import elseDetail from '@/components/serveComponent/record/elseWhere/elseDetail'
import turnOut from '@/components/serveComponent/record/turnOut/turnOut'
import turnDetail from '@/components/serveComponent/record/turnOut/turnDetail'
import searchDisease from '@/components/serveComponent/record/turnOut/searchDisease'
import abroadTake from '@/components/serveComponent/record/abroadTake/abroadTake'
import abroadDetail from '@/components/serveComponent/record/abroadTake/abroadDetail'
import searchTakeDrug from '@/components/serveComponent/record/abroadTake/searchTakeDrug'
import familyAid from '@/components/serveComponent/record/familyAid/familyAid'
import familyDetail from '@/components/serveComponent/record/familyAid/familyDetail'
import specialDrug from '@/components/serveComponent/record/specialDrug/specialDrug'
import specialDrugDetail from '@/components/serveComponent/record/specialDrug/specialDrugDetail'
import chronicDisease from '@/components/serveComponent/record/chronicDisease/chronicDisease'
import chronicDiseaseDetail from '@/components/serveComponent/record/chronicDisease/chronicDiseaseDetail'
import searchInfoPage from '@/components/serveComponent/record/chronicDisease/searchInfoPage'
import mendChangeCard from '@/components/serveComponent/others/mendChangeCard/mendChangeCard'
import mendChangeDetail from '@/components/serveComponent/others/mendChangeCard/mendChangeDetail'
import baseInfoChange from '@/components/serveComponent/others/baseInfoChange/baseInfoChange'
import baseInfoChangeDetail from '@/components/serveComponent/others/baseInfoChange/baseInfoChangeDetail'
import smallReim from '@/components/serveComponent/treat/smallReim/smallReim'
import searchHospital from '@/components/serveComponent/treat/smallReim/searchHospital'
import invoiceInfo from '@/components/serveComponent/treat/smallReim/invoiceInfo'
import plusInvoice from '@/components/serveComponent/treat/smallReim/plusInvoice'
import infoRecord from '@/components/serveComponent/treat/smallReim/infoRecord'
import reportComplete from '@/components/serveComponent/treat/smallReim/reportComplete'
import smallReimDetail from '@/components/serveComponent/treat/smallReim/smallReimDetail'
import payLimit from '@/components/serveComponent/treat/payLimit/payLimit'
import payLimitDetail from '@/components/serveComponent/treat/payLimit/payLimitDetail'
import searchBaseInfo from '@/components/serveComponent/personal/searchBaseInfo/searchBaseInfo'
import searchInsuredInfo from '@/components/serveComponent/personal/searchInsuredInfo/searchInsuredInfo'
import searchInsuredResult from '@/components/serveComponent/personal/searchInsuredInfo/searchInsuredResult'
import searchProgress from '@/components/serveComponent/personal/searchProgress/searchProgress'
import searchFee from '@/components/serveComponent/personal/searchFee/searchFee'
import searchFeeResult from '@/components/serveComponent/personal/searchFee/searchFeeResult'
import searchRecord from '@/components/serveComponent/personal/searchRecord/searchRecord'
import searchTreat from '@/components/serveComponent/personal/searchTreat/searchTreat'
import searchTreatResult from '@/components/serveComponent/personal/searchTreat/searchTreatResult'

Vue.use(Router)

export default new Router({
  routes: [
    // 首页
    {
      path: '/',
      name: 'indexInfoListComponent',
      component: indexInfoList
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index
    },
    {
      path: '/indexInfoList1',
      name: 'indexInfoList1',
      component: indexInfoList1
    },

    {
      path: '/first',
      name: 'FirstComponent',
      component: First
    },
    {
      path: '/getProof',
      name: 'getProof',
      component: getProof
    },
    {
      path: '/getDetail',
      name: 'getDetail',
      component: getDetail
    },
    {
      path: '/insuredChange',
      name: 'insuredChange',
      component: insuredChange
    },
    {
      path: '/changeDetail',
      name: 'changeDetail',
      component: changeDetail
    },
    {
      path: '/searchPrint',
      name: 'searchPrint',
      component: searchPrint
    },
    {
      path: '/insuredDownload',
      name: 'insuredDownload',
      component: insuredDownload
    },
    {
      path: '/transferRenewing',
      name: 'transferRenewing',
      component: transferRenewing
    },
    {
      path: '/transferDetail',
      name: 'transferDetail',
      component: transferDetail
    },
    {
      path: '/elseWhere',
      name: 'elseWhere',
      component: elseWhere
    },
    {
      path: '/elseDetail',
      name: 'elseDetail',
      component: elseDetail
    },
    {
      path: '/turnOut',
      name: 'turnOut',
      component: turnOut
    },
    {
      path: '/turnDetail',
      name: 'turnDetail',
      component: turnDetail
    },
    {
      path: '/searchDisease',
      name: 'searchDisease',
      component: searchDisease
    },
    {
      path: '/abroadTake',
      name: 'abroadTake',
      component: abroadTake
    },
    {
      path: '/abroadDetail',
      name: 'abroadDetail',
      component: abroadDetail
    },
    {
      path: '/searchTakeDrug',
      name: 'searchTakeDrug',
      component: searchTakeDrug
    },
    {
      path: '/familyAid',
      name: 'familyAid',
      component: familyAid
    },
    {
      path: '/specialDrug',
      name: 'specialDrug',
      component: specialDrug
    },
    {
      path: '/specialDrugDetail',
      name: 'specialDrugDetail',
      component: specialDrugDetail
    },
    {
      path: '/chronicDisease',
      name: 'chronicDisease',
      component: chronicDisease
    },
    {
      path: '/chronicDiseaseDetail',
      name: 'chronicDiseaseDetail',
      component: chronicDiseaseDetail
    },
    {
      path: '/searchInfoPage',
      name: 'searchInfoPage',
      component: searchInfoPage
    },
    {
      path: '/familyDetail',
      name: 'familyDetail',
      component: familyDetail
    },
    {
      path: '/mendChangeCard',
      name: 'mendChangeCard',
      component: mendChangeCard
    },
    {
      path: '/mendChangeDetail',
      name: 'mendChangeDetail',
      component: mendChangeDetail
    },
    {
      path: '/baseInfoChange',
      name: 'baseInfoChange',
      component: baseInfoChange
    },
    {
      path: '/baseInfoChangeDetail',
      name: 'baseInfoChangeDetail',
      component: baseInfoChangeDetail
    },
    {
      path: '/smallReim',
      name: 'smallReim',
      component: smallReim
    },
    {
      path: '/searchHospital',
      name: 'searchHospital',
      component: searchHospital
    },
    {
      path: '/invoiceInfo',
      name: 'invoiceInfo',
      component: invoiceInfo
    },
    {
      path: '/plusInvoice',
      name: 'plusInvoice',
      component: plusInvoice
    },
    {
      path: '/infoRecord',
      name: 'infoRecord',
      component: infoRecord
    },
    {
      path: '/reportComplete',
      name: 'reportComplete',
      component: reportComplete
    },
    {
      path: '/smallReimDetail',
      name: 'smallReimDetail',
      component: smallReimDetail
    },
    {
      path: '/payLimit',
      name: 'payLimit',
      component: payLimit
    },
    {
      path: '/payLimitDetail',
      name: 'payLimitDetail',
      component: payLimitDetail
    },
    {
      path: '/searchBaseInfo',
      name: 'searchBaseInfo',
      component: searchBaseInfo
    },
    {
      path: '/searchInsuredInfo',
      name: 'searchInsuredInfo',
      component: searchInsuredInfo
    },
    {
      path: '/searchInsuredResult',
      name: 'searchInsuredResult',
      component: searchInsuredResult
    },
    {
      path: '/searchProgress',
      name: 'searchProgress',
      component: searchProgress
    },
    {
      path: '/searchFee',
      name: 'searchFee',
      component: searchFee
    },
    {
      path: '/searchFeeResult',
      name: 'searchFeeResult',
      component: searchFeeResult
    },
    {
      path: '/searchRecord',
      name: 'searchRecord',
      component: searchRecord
    },
    {
      path: '/searchTreat',
      name: 'searchTreat',
      component: searchTreat
    },
    {
      path: '/searchTreatResult',
      name: 'searchTreatResult',
      component: searchTreatResult
    }
    // // 办事
    // {
    //   path: '/Work',
    //   name: 'Work',
    //   component: Work
    // },
    // {
    //   path: '/Work/TreatmentReimbursement',
    //   name: 'TreatmentReimbursement',
    //   component: TreatmentReimbursement
    // },
    // {
    //   path: '/Work/TreatmentReimbursement/TReimbursement1',
    //   name: 'TReimbursement1',
    //   component: TReimbursement1
    // },
    // {
    //   path: '/Work/TreatmentReimbursement/TReimbursement1/SubmitReimbursement',
    //   name: 'SubmitReimbursement',
    //   component: SubmitReimbursement
    // },
    // {
    //   path: '/EventDetail',
    //   name: 'EventDetail',
    //   component: EventDetail
    // },
  ]
})
