// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

// Initialize Firebase
/* CHANGE IN PRODUCTION - Import firebase config from external config file */
var config = {
  apiKey: 'AIzaSyBvXUYM9X8s__Uu7QIAF7qRY5iM0CTcFD4',
  authDomain: 'project-management-app-geckos.firebaseapp.com',
  databaseURL: 'https://project-management-app-geckos.firebaseio.com',
  projectId: 'project-management-app-geckos',
  storageBucket: 'project-management-app-geckos.appspot.com',
  messagingSenderId: '272301499240'
}
firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
