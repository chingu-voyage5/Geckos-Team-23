// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
<<<<<<< HEAD
import store from './store'
import firebase from 'firebase'
// firestore config
import VueFire from 'vuefire'
import 'firebase/firestore'

Vue.use(VueFire)
=======
import firebase from 'firebase'
>>>>>>> homepage

Vue.config.productionTip = false
let app
// Firebase
let config = {
    apiKey: 'AIzaSyBh4ShYKn9CEZXwZU05yW6JHL45vezOGpo',
    authDomain: 'project-management-app-v2.firebaseapp.com',
    databaseURL: 'https://project-management-app-v2.firebaseio.com',
    projectId: 'project-management-app-v2',
    storageBucket: 'project-management-app-v2.appspot.com',
    messagingSenderId: '562925944482'
}

<<<<<<< HEAD
let app

// Initialize Firebase
/* CHANGE IN PRODUCTION - Import firebase config from external config file */
var config = {
	apiKey: "AIzaSyBh4ShYKn9CEZXwZU05yW6JHL45vezOGpo",
  authDomain: "project-management-app-v2.firebaseapp.com",
  databaseURL: "https://project-management-app-v2.firebaseio.com",
  projectId: "project-management-app-v2",
  storageBucket: "project-management-app-v2.appspot.com",
  messagingSenderId: "562925944482"

}
firebase.initializeApp(config)

// Export the database as a variable named db for use in other components
export const db = firebase.firestore()

// Initialize the app only when we are sure Firebase Auth object is ready to use.
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
=======
firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router
>>>>>>> homepage
    })
  }
})
