import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/serveComponent/index'
import indexInfoList from '@/components/serveComponent/indexInfoList'

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
import elseWhere from '@/components/serveComponent/record/elseWhere/elseWhere'
import elseDetail from '@/components/serveComponent/record/elseWhere/elseDetail'
import turnOut from '@/components/serveComponent/record/turnOut/turnOut'
import turnDetail from '@/components/serveComponent/record/turnOut/turnDetail'
import searchDisease from '@/components/serveComponent/record/turnOut/searchDisease'
import abroadTake from '@/components/serveComponent/record/abroadTake/abroadTake'
import abroadDetail from '@/components/serveComponent/record/abroadTake/abroadDetail'
import familyAid from '@/components/serveComponent/record/familyAid/familyAid'
import familyDetail from '@/components/serveComponent/record/familyAid/familyDetail'
import mendChangeCard from '@/components/serveComponent/others/mendChangeCard/mendChangeCard'
import mendChangeDetail from '@/components/serveComponent/others/mendChangeCard/mendChangeDetail'
import baseInfoChange from '@/components/serveComponent/others/baseInfoChange/baseInfoChange'
import baseInfoChangeDetail from '@/components/serveComponent/others/baseInfoChange/baseInfoChangeDetail'
import smallReim from '@/components/serveComponent/treat/smallReim/smallReim'


Vue.use(Router)

export default new Router({
  routes: [
    // 首页
    {
      path: '/',
      name: 'Index',
      component: Index
    },

    {
      path: '/first',
      name: 'FirstComponent',
      component: First
    },
    {
      path: '/indexInfoList',
      name: 'indexInfoListComponent',
      component: indexInfoList
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
      path: '/familyAid',
      name: 'familyAid',
      component: familyAid
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
