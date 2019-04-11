import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '@/components/StartPage'
import First from '@/components/First';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StartPage',
      component: StartPage
    },

    {
      path: '/first',
      name: 'FirstComponent',
      component: First
    },

  ]
})
