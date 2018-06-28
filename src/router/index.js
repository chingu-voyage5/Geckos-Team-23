import Vue from 'vue'
import Router from 'vue-router'

// pages
import MainPage from '@/pages/Home'
import Workspaces from '@/pages/Workspaces'
import Login from '@/pages/Login'
import SignUp from '@/pages/SignUp'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      // redirect every path that does not exist to the Home view
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Home',
      component: MainPage
    },
    {
      path: '/workspaces',
      name: 'Workspaces',
      component: Workspaces,
      // check if user is logged in
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

/*
The beforeEach function takes three parameters, to, from, and next and will be called whenever a navigation is triggered.
- to parameter is the target Route Object being navigated to.
- from parameter is the current route being navigated away from.
- next parameter is a function that must be called to resolve the hook, and can take argument to redirect or abort the navigation (see more on the documentation)
*/

router.beforeEach((to, from, next) => {
  // retrieve currently logged user
  let currentUser = firebase.auth().currentUser
  // check if page needs authentication (by checking if the route object has the requiresAuth meta)
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  // if page requires auth and user not logged => go to login view
  if (requiresAuth && !currentUser) next('login')
  // if page does not require auth and user logged in => go to workspaces view
  else if (!requiresAuth && currentUser) next('workspaces')
  // otherwise, proceed navigation
  else next()
})

export default router
