import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import First from '@/components/First';
import Work from '@/components/Work'

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

  ]
})
