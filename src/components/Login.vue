<template>
  <div class="tile" style="margin: auto;">
    <div class="tile-header">
      <h2 >SIGN IN</h2>
    </div>
    <div class="tile-body">
      <form id="form">
        <label class="form-input">
          <i class="material-icons">email</i>
            <input type="text" v-model="email" autofocus="true" required />
            <span class="label">Email</span>
          <span class="underline"></span>
        </label>
        <label class="form-input">
          <i class="material-icons">lock</i>
            <input type="password" v-model="password" required />
            <span class="label">Password</span>
          <div class="underline"></div>
        </label>
        <div class="submit-container clearfix" style="margin-top: 2rem;">
          <div v-on:click="MainPage" id="submit" role="button" type="button" class="btn btn-irenic float-right" tabindex="0">
            <span>SIGN IN</span>
          </div>
          <p style="padding-top: 40px;">Don't have an account? Create one <router-link to="/SignUp">here</router-link>.</p>
          <p style="cursor: pointer; width: 110px;height: 25px; margin: auto; color: blue" v-on:click="ForgotPassword">Forgot my password</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Login',
    data: function () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      MainPage () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('Dashboard')
          },
          (err) => {
            alert('Oops!' + err.message)
          }
        )
      },
      ForgotPassword () {
        const auth = firebase.auth()
        const emailAddress = this.email

        auth.sendPasswordResetEmail(emailAddress)
      }
    }
}
</script>
