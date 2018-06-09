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
      <input type="text" v-model="signUpEmail" placeholder="Email">
      <input type="password" v-model="signUpPassword" placeholder="Password">
      <button v-on:click="signUp">Sign Up</button>
      <p>Signed User: {{ signedUser }}</p>
    </div>

  </div>

</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'home',
    data () {
        return {
          signInEmail: '',
          signInPassword: '',
          signUpEmail: '',
          signUpPassword: '',
          signedUser: firebase.auth().currentUser
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
