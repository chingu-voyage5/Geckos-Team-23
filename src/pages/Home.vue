<template>
	<div class="home">

		<div class="sign-in">
			<h3>Sign In</h3>
			<input type="text" placeholder="Email">
			<input type="password" placeholder="Password">
			<button v-on:click="login">Sign In</button>
		</div>

		<div class="sign-up">
			<h3>Sign Up</h3>
			<input type="text" v-model="email" placeholder="Email">
			<input type="text" v-model="username" placeholder="Username">
			<input type="password" v-model="password" placeholder="Password">
			<button v-on:click="signUp">Sign Up</button>
			<p>Email: {{ email }}</p>
		</div>

	</div>

</template>

<script>
	import firebase from 'firebase'

	export default {
		name: 'home',
		data () {
				return {
					email: '',
					passord: ''
				}
		},
		methods: {
			login: function () {
				this.$router.replace('workspaces');
			},
			signUp: function () {
				firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
					function (user) {
						alert('Your account has been created')
					},
					function (err) {
						alert('Oops. ' + err.message)
					}
				);
			}
		}
	}
</script>

<style scoped>

</style>
