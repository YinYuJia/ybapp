import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/serveComponent/index'
import First from '@/components/First';
// import Work from '@/components/Work';
// import TreatmentReimbursement from '@/components/commonComponent/Work/TreatmentReimbursement';
// import TReimbursement1 from '@/components/commonComponent/Work/TreatmentReimbursement/TReimbursement1'
// import SubmitReimbursement from '@/components/commonComponent/Work/TreatmentReimbursement/SubmitReimbursement'
// import EventDetail from '@/components/commonComponent/Work/TreatmentReimbursement/EventDetail_1'
import elseWhereDetails from '@/components/serveComponent/record/elseWhere/elseWhereDetails'
import elseWhereEdit from '@/components/serveComponent/record/elseWhere/elseWhereEdit'
import elseWhereOperation from '@/components/serveComponent/record/elseWhere/elseWhereOperation'
import getProof from '@/components/serveComponent/insured/getProof/getProof'
import getDetail from '@/components/serveComponent/insured/getProof/getDetail'
import insuredChange from '@/components/serveComponent/insured/insuredChange/insuredChange'
import changeDetail from '@/components/serveComponent/insured/insuredChange/changeDetail'
import searchPrint from '@/components/serveComponent/insured/searchPrint/searchPrint'
import insuredDownload from '@/components/serveComponent/insured/searchPrint/insuredDownload'


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
      path: '/elseWhereDetails',
      name: 'elseWhereDetails',
      component: elseWhereDetails
    },

    {
      path: '/elseWhereEdit',
      name: 'elseWhereEdit',
      component: elseWhereEdit
    },
    
    {
      path: '/elseWhereOperation',
      name: 'elseWhereOperation',
      component: elseWhereOperation
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
