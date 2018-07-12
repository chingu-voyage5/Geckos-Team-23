<template>
  <div>
    <Login />
  </div>
</template>

<script>
import Login from '../components/Login'
import Signup from '../components/Signup'
import firebase from 'firebase'
import { db } from '../main'

export default {
  name: 'Home',
  components: {
    'Login': Login,
    'Signup': Signup
  },
  data () {
    return {
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      signedUser: firebase.auth().currentUser,
      userName: ''
    }
  },
  methods: {
    goToWorkspaces: function () {
      this.$router.replace('Dashboard')
    },
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.signInEmail, this.signInPassword).then(
        // use arrow notation to fix this's context
        (user) => {
          this.$router.replace('Dashboard')
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      )
    },
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.signUpEmail, this.signUpPassword).then(
        // use arrow notation to fix this's context
        (user) => {
          // Add user data to DB
          db.collection('users').add({
            email: this.signUpEmail,
            name: this.userName,
            image: '',
            workspaces: []
          })
          .then(function (docRef) {
            console.log('Document written with ID: ', docRef.id)
          })
          .catch(function (error) {
            console.error('Error adding document: ', error)
          })

          // Redirect to User Workspaces
          this.$router.replace('Dashboard')
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      )
    }
  }
}
</script>

<style>

</style>
