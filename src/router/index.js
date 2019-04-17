import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import First from '@/components/First';
import Work from '@/components/Work';
import TreatmentReimbursement from '@/components/commonComponent/Work/TreatmentReimbursement';
import TReimbursement1 from '@/components/commonComponent/Work/TreatmentReimbursement/TReimbursement1'
import Submit from '@/components/commonComponent/Work/TreatmentReimbursement/SubmitReimbursement'

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
    // 办事
    {
      path: '/Work',
      name: 'Work',
      component: Work
    },
    {
      path: '/Work/TreatmentReimbursement',
      name: 'TreatmentReimbursement',
      component: TreatmentReimbursement
    },
    {
      path: '/Work/TreatmentReimbursement/TReimbursement1',
      name: 'TReimbursement1',
      component: TReimbursement1
    },
    {
      path: '/Submit',
      name: 'Submit',
      component: Submit
    },
  ]
})
