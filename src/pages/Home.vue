<template>
  <div class="home">

    <div class="sign-in">
      <h3>Sign In</h3>
      <input type="text" v-model="signInEmail" placeholder="Email">
      <input type="password" v-model="signInPassword" placeholder="Password">
      <button v-on:click="signIn">Sign In</button>
    </div>

    <div class="sign-up">
      <h3>Sign Up</h3>
			<input type="text" v-model="userName" placeholder="Display Name">
      <input type="text" v-model="signUpEmail" placeholder="Email">
      <input type="password" v-model="signUpPassword" placeholder="Password">
      <button v-on:click="signUp">Sign Up</button>
      <p>Signed User: {{ signedUser }}</p>
    </div>

  </div>

</template>

<script>
  import firebase from 'firebase'
  import { db } from '../main'

  export default {
    name: 'home',
    data () {
        return {
          signInEmail: '',
          signInPassword: '',
          signUpEmail: '',
          signUpPassword: '',
          signedUser: firebase.auth().currentUser,
					userName
        }
    },
    methods: {
      goToWorkspaces: function () {
        this.$router.replace('workspaces')
      },
      signIn: function () {
        firebase.auth().signInWithEmailAndPassword(this.signInEmail, this.signInPassword).then(
          // use arrow notation to fix this's context
          (user) => {
            this.$router.replace('workspaces')
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
            db.collection("users").add({
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
            this.$router.replace('workspaces')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        )
      }
    }
  }

</script>

<style scoped>

</style>
