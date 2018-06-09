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
			<input type="text" placeholder="Email">
			<input type="text" placeholder="Username">
			<input type="password" placeholder="Password">
			<button>Sign Up</button>
		</div>

	</div>

</template>

<script>
	import { mapState } from 'vuex'

	export default {
		name: 'home',
		data () {
				return {

				}
		},
		methods: {
			login: function(){
				this.$router.replace('workspaces')
			}
		}
	}
</script>

<style scoped>

</style>
