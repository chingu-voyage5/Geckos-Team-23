import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
// pages
import Home from '@/pages/Home'
import Dashboard from '@/pages/Dashboard'
import Workspace from '@/pages/Workspace'
import Signup from '@/components/Signup'

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
      component: Home
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard,
      // check if user is logged in
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Dashboard/Workspace',
      name: 'Workspace',
      component: Workspace,
      // check if user is logged in
      meta: {
        requiresAuth: true
      }
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
  if (requiresAuth && !currentUser) next('Home')
  // if page does not require auth and user logged in => go to workspaces view
  else if (!requiresAuth && currentUser) next('Dashboard')
  // otherwise, proceed navigation
  else next()
})

export default router
