<template>
    <div class="tile">
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
                <p>Don't have an account? Create one <router-link to="/SignUp">here</router-link>.</p>
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
        MainPage: function () {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                function (user) {
                    alert('Welcome!')
                    window.location.href = '/MainPage'
                },
                function (err) {
                    alert('Oops!' + err.message)
                }
            )
        }
    }
}
</script>
