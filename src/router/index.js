import Vue from 'vue'
import Router from 'vue-router'

// pages
import MainPage from '@/pages/MainPage'
import Workspaces from '@/pages/Workspaces'
import Login from '@/pages/Login'
import SignUp from '@/pages/SignUp'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/Login'
    },
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/workspaces',
      name: 'Workspaces',
      component: Workspaces,
      meta: {
        requiresAuth: true
      }
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

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('Login')
  else if (!requiresAuth && currentUser) next('MainPage')
  else next()
})

export default router
