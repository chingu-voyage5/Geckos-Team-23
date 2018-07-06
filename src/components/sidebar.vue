<template>
  <div class="sidebar">

		<div class="sidebar-normal" v-if="accountPageState === 'closed'">
			<div class="top-bar">
				<i class="fas fa-times"></i>
				<h2>Clipboard</h2>
	  		</div>

			<ul class="workspaces-list">
				<li><a href="#/Dashboard/Workspace"><i class="fas fa-columns"></i> Workspace 1</a></li>
				<li><a href=""><i class="fas fa-columns"></i> Workspace 2</a></li>
				<li><a href=""><i class="fas fa-columns"></i> Workspace 3</a></li>
			</ul>

			<a v-on:click="switchSidebarPage"><i class="fas fa-user-circle"></i> Account</a>

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
				<input id="account-user-email" type="text" value="">
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

				<a id="account-delete" v-on:click="deleteAccount()" href=""><i class="mdi mdi-alert-outline"></i>&nbsp;Delete Account</a>
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
			accountPageState: 'open'
    }
  },
  methods: {
		switchSidebarPage: function () {
			switch(this.accountPageState) {
		    case 'open':
	        this.accountPageState = 'closed';
	        break;
		    default:
	        this.accountPageState = 'open';
			}
		}
  }
}
</script>

<style scoped>

	h2 {
		font-family: sans-serif;
		font-size: 1.3em;
	}

	input {
		border: none;
		/* background: transparent; */
	}

	.sidebar {
		position: absolute;
		top: 0;
		left: 0;
		width: 400px;
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
