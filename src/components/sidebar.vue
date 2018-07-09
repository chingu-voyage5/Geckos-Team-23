<template>
  <div class="sidebar">

		<!-- safety commit -->

		<div class="sidebar-normal" v-if="accountPageState === 'closed'">
			<div class="top-bar">
				<i class="fas fa-times"></i>
				<h2>Clipboard</h2>
	  		</div>

			<button v-on:click="logOut"><i class="fas fa-sign-out-alt"></i> Sign Out</button>

			<button v-on:click="switchSidebarPage"><i class="fas fa-user-circle"></i> Account</button>

			<ul class="workspaces-list">
				<li v-for="(workspace, idx) in userDB.workspaces" :key="idx">
					<a href=""><i class="fas fa-columns"></i> {{ workspace.title }}</a>
				</li>
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
				<input id="account-username" type="text" v-model="userName" v-on:keyup="updateUserName">

				<h3>Private Info</h3>

				<label for="account-user-email">Email:</label>
				<input id="account-user-email" type="email" v-model="userEmail" v-on:keyup="updateEmail">

				<h3>Password</h3>

				<label for="account-user-password">Current Password:</label>
				<input id="user-password" type="password" v-model="password" v-on:keyup="validatePassword">
				<p class="warning">Please fill in your current password</p>

				<label for="account-user-new-password">New Password:</label>
				<input id="account-user-new-password" type="password" v-model="newPassword" v-on:keyup="validatePassword">
				<p class="warning">Password must be at least 6 characters long!</p>

				<label for="account-user-new-password-confirm">Confirm New Password:</label>
				<input id="account-user-new-password-confirm" type="password" v-model="newPasswordConfirmation" v-on:keyup="validatePassword">
				<p class="warning">Looks like New Password doen't correspond!</p>

				<button v-on:click="changePassword" v-bind:disabled="changePasswordBtnDisabled"><i class="fas fa-key"></i> Change Password</button>

				<h3>Danger</h3>

				<button id="account-delete" v-on:click="showDeleteConfirmation = true"><i class="fas fa-exclamation-triangle"></i> Delete Account</button>

				<div id="delete-account-confirmation" v-if="showDeleteConfirmation">
					<p>This action is irreversible. Are you sure?</p>
					<button v-on:click="deleteAccount">Delete</button>
					<button v-on:click="showDeleteConfirmation = false">Cancel</button>
				</div>
			</div>
		</div>



  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '../main'

export default {
  name: 'Sidebar',
  data () {
    return {
			accountPageState: 'closed',
			user: firebase.auth().currentUser,
			userId: firebase.auth().currentUser.uid,
			userName: firebase.auth().currentUser.displayName,
			userEmail: firebase.auth().currentUser.email,
			password: '',
			newPassword: '',
			newPasswordConfirmation: '',
			changePasswordBtnDisabled: true,
			showDeleteConfirmation: false,
			userDB: []
    }
  },
	firestore () {
		return {
			userDB: db.collection('users').doc(this.userId)
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
		},
		logOut: function () {
      firebase.auth().signOut().then(() => {
      this.$router.replace('/')
      })
    },
		updateUserName: function () {
			this.user.updateProfile({
			  displayName: this.userName,
			  photoURL: "https://example.com/jane-q-user/profile.jpg"
			}).then(function() {
			  console.log("Update successful");
			}).catch(function(error) {
			  console.log(error);
			});
		},
		updateEmail: function () {
			this.user.updateEmail(this.userEmail).then(function() {
			  console.log("Update successful");
			}).catch(function(error) {
			  console.log(error);
			});
		},
		validatePassword: function () {
			const userPasswordWarning = document.querySelector('#user-password+p');
			const invalidPasswordWarning = document.querySelector('#account-user-new-password+p');
			const differentPasswordWarning = document.querySelector('#account-user-new-password-confirm+p');

			if (this.password.length < 6) {
				userPasswordWarning.style.display = "block";
				this.changePasswordBtnDisabled = true;
			} else {
				userPasswordWarning.style.display = "none";
			}

			if (this.newPassword.length < 6) {
				invalidPasswordWarning.style.display = "block";
				this.changePasswordBtnDisabled = true;
			} else {
				invalidPasswordWarning.style.display = "none";
			}

			if (this.newPassword !== this.newPasswordConfirmation) {
				differentPasswordWarning.style.display = "block";
				this.changePasswordBtnDisabled = true;
			} else {
				differentPasswordWarning.style.display = "none";
			}

			if (!(this.password.length < 6) && !(this.newPassword < 6) && !(this.newPassword !== this.newPasswordConfirmation)) {
				this.changePasswordBtnDisabled = false;
			}
		},
		changePassword: function () {
			// create user credential (needed for reauthentication)
			const user = firebase.auth().currentUser;
			const credential = firebase.auth.EmailAuthProvider.credential(
				user.email,
    		this.password
			);

			user.reauthenticateAndRetrieveDataWithCredential(credential).then(
				() => {
					user.updatePassword(this.newPassword).then(function() {
					  alert("Update successful");
					}).catch(function(error) {
					  alert(error);
					});
				}
			).catch(function(error) {
				alert(error);
			});
		},
		deleteAccount: function () {
			this.user.delete().then(() => {
			  alert("Account Deleted");
				this.$router.replace('Home');
			}).catch(function(error) {
			  alert(error);
			});
		}
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

	h3 {
		margin: 0;
	}

	p {
		font-size: 1em;
		padding: 0;
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
		/* background: lightblue; */
	}

	.sidebar {
		position: absolute;
		top: 0;
		left: 0;
		width: 360px;
		height: 100%;
		padding: 20px;
		overflow-y: auto;
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

	#account-settings .warning {
		grid-column: 1 / 3;
		color: var(--color-danger);
		display: none;
	}

	#account-settings h3 {
		grid-column: 1 / 3;
	}

	#account-settings h3:not(:first-child) {
		margin-top: 30px;
	}

	#account-settings > *:not(h3) {
		margin-top: 10px;
	}

	#account-settings button {
		text-align: left;
	}

	#delete-account-confirmation {
		grid-column: 1 / 3;
		display: flex;
		flex-direction: column;
	}

	#delete-account-confirmation p, #delete-account-confirmation button {
		margin-bottom: 10px;
	}

	#delete-account-confirmation button {
		text-align: center;
		padding: 10px 15px;
		border-radius: var(--standard-border-radius);
		transition: .2s;
	}

	#delete-account-confirmation button:first-of-type {
		background-color: var(--color-danger);
	}
	#delete-account-confirmation button:first-of-type:hover {
		background-color: var(--color-danger-hover);
	}

	#delete-account-confirmation button:first-of-type+button {
		background-color: var(--color-neutral);
	}
	#delete-account-confirmation button:first-of-type+button:hover {
		background-color: var(--color-neutral-hover);
	}

</style>
