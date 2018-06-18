// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

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

firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router
    })
  }
})
