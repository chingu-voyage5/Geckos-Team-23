import Vue from 'vue'
import Router from 'vue-router'

// pages
import MainPage from '@/pages/MainPage'
import Workspaces from '@/pages/Workspaces'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/workspaces',
      name: 'Workspaces',
      component: Workspaces
    }
  ]
})
