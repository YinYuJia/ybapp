import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/serveComponent/index'
import First from '@/components/First';
// import Work from '@/components/Work';
// import TreatmentReimbursement from '@/components/commonComponent/Work/TreatmentReimbursement';
// import TReimbursement1 from '@/components/commonComponent/Work/TreatmentReimbursement/TReimbursement1'
// import SubmitReimbursement from '@/components/commonComponent/Work/TreatmentReimbursement/SubmitReimbursement'
// import EventDetail from '@/components/commonComponent/Work/TreatmentReimbursement/EventDetail_1'

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
