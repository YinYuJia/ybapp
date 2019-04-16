import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import First from '@/components/First';

Vue.use(Router)

export default new Router({
  routes: [
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

  ]
})
