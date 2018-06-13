import Vue from 'vue'
import Router from 'vue-router'

// pages
import MainPage from '@/pages/MainPage'
import Workspaces from '@/pages/Workspaces'
import Login from '@/pages/Login'
import SignUp from '@/pages/SignUp'

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
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
