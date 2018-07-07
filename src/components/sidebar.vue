<template>
  <div class="sidebar">

		<div class="sidebar-normal" v-if="accountPageState === 'closed'">
			<div class="top-bar">
				<i class="fas fa-times"></i>
				<h2>Clipboard</h2>
	  		</div>

			<button v-on:click="logOut"><i class="fas fa-sign-out-alt"></i> Sign Out</button>

			<button v-on:click="switchSidebarPage"><i class="fas fa-user-circle"></i> Account</button>

			<ul class="workspaces-list">
				<li><a href="#/Dashboard/Workspace"><i class="fas fa-columns"></i> Workspace 1</a></li>
				<li><a href=""><i class="fas fa-columns"></i> Workspace 2</a></li>
				<li><a href=""><i class="fas fa-columns"></i> Workspace 3</a></li>
			</ul>

		</div>

		<div class="sidebar-account" v-if="accountPageState === 'open'">
			<div class="top-bar">
				<i class="fas fa-arrow-left" v-on:click="switchSidebarPage"></i>
				<h2>Account</h2>
	  		</div>

			<div id="account-settings">

				<h3>Public Info</h3>

				<label for="account-username">Display Name:</label>
				<input id="account-username" type="text" value="">

				<h3>Private Info</h3>

				<label for="account-user-email">Email:</label>
				<input id="account-user-email" type="text" v-model="userEmail">
				<a v-on:click="sendEmail()" href="">Verify Email</a>

				<h3>Password</h3>

				<label for="account-user-password">Current Password:</label>
				<input id="user-password" type="password" value="">

				<label for="account-user-new-password">New Password:</label>
				<input id="account-user-new-password" type="password" value="">

				<label for="account-user-new-password-confirm">Confirm New Password:</label>
				<input id="account-user-new-password-confirm" type="password" value="">

				<a v-on:click="changePassword()" href="">Change Password</a>

				<h3>Danger</h3>

				<a id="account-delete" v-on:click="deleteAccount()" href=""><i class="fas fa-exclamation-triangle "></i> Delete Account</a>
			</div>
		</div>



  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Sidebar',
  data () {
    return {
			accountPageState: 'closed',
			userEmail: firebase.auth().currentUser.email
    }
  },
  methods: {
	switchSidebarPage: function () {
		switch(this.accountPageState) {
	    case 'closed':
        this.accountPageState = 'open';
        break;
	    default:
        this.accountPageState = 'closed';
		}
		console.log(firebase.auth().currentUser.email);
	},
	logOut: function () {
      firebase.auth().signOut().then(() => {
      this.$router.replace('/')
      })
    },
  }
}
</script>

<style scoped>

	*:not(i) {
		font-family: 'Source Sans Pro';
	}

	i.fas {
		cursor: pointer;
	}

	a {
		cursor: pointer;
		text-decoration: none;
	}

	li {
		list-style-type: none;
	}

	h2 {
		font-family: sans-serif;
		font-size: 1.3em;
	}

	input {
		border: none;
		/* background: transparent; */
	}

	button {
		cursor: pointer;
		background: transparent;
		border: none;
		font-size: 1em;
	}

	.sidebar {
		position: absolute;
		top: 0;
		left: 0;
		width: 360px;
		height: 100%;
		padding: 20px;
		background: var(--column-bg-light);
		box-shadow: var(--drop-shadow);
	}

	.sidebar .top-bar {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
	}

	.sidebar .top-bar *:nth-child(2) {
		flex-grow: 1;
		text-align: center;
	}

	.sidebar-normal > button {
		margin-top: 20px;
		display: block;
	}

	.sidebar-normal > ul {
		margin-top: 20px;
		/* background: lightblue; */
	}

	.sidebar-normal > ul li:not(:first-child) {
		margin-top: 6px;
		/* background: lightblue; */
	}

	#account-settings {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	#account-settings h3 {
		grid-column: 1 / 3;
	}

	#account-settings h3:not(:first-child) {
		margin-top: 30px;
	}

	#account-settings *:not(h3) {
		margin-top: 10px;
	}


</style>
