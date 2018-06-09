import Vue from 'vue'
import Router from 'vue-router'

// pages
import MainPage from '@/pages/Home'
import Workspaces from '@/pages/Workspaces'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: MainPage
    },
    {
      path: '/workspaces',
      name: 'Workspaces',
      component: Workspaces
    }
  ]
})
