// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
<<<<<<< HEAD
import firebase from 'firebase'
=======
import store from './store'
import VModal from 'vue-js-modal'
import firebase from 'firebase'

Vue.use(VModal)
>>>>>>> add-item

Vue.config.productionTip = false
let app

<<<<<<< HEAD
firebase.initializeApp(config)
=======
// Initialize the app only when we are sure Firebase Auth object is ready to use.
>>>>>>> add-item
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
    })
  }
})

// Allows for string.capitalize()
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}
