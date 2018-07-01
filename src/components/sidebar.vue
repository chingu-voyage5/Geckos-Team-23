<template>
  <div class="sidebar">

		<div class="sidebar-normal">
			<div class="top-bar">
				<i class="fas fa-times"></i>
				<a href="">Clipboard</a>
	  	</div>

			<ul class="workspaces-list">
				<li><a href=""><i class="fas fa-columns"></i> Workspace 1</a></li>
				<li><a href=""><i class="fas fa-columns"></i> Workspace 2</a></li>
				<li><a href=""><i class="fas fa-columns"></i> Workspace 3</a></li>
			</ul>

			<a href=""><i class="fas fa-user-circle"></i> Account</a>
		</div>

		<div class="sidebar-account">
			<div class="top-bar">
				<i class="fas fa-arrow-left"></i>
				<a href="">Account</a>
	  	</div>
		</div>

		<div id="account-settings">

			<h3>Public Info</h3>

			<label for="account-username">Display Name</label>
			<input id="account-username" type="text" value="">

			<h3>Private Info</h3>

			<label for="account-user-email">Email</label>
			<input id="account-user-email" type="text" value="">
			<a ng-click="sendEmail()" href="">Verify Email</a>

			<h3>Password</h3>

			<label for="account-user-password">Current Password</label>
			<input id="user-password" type="password" value="">

			<label for="account-user-new-password">New Password</label>
			<input id="account-user-new-password" type="password" value="">

			<label for="account-user-new-password-confirm">Confirm New Password</label>
			<input id="account-user-new-password-confirm" type="password" value="">

			<a ng-click="changePassword()" href="">Change Password</a>

			<h3>Danger</h3>

			<a id="account-delete" ng-click="deleteAccount()" href=""><i class="mdi mdi-alert-outline"></i>&nbsp;Delete Account</a>
		</div>

  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Sidebar',
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>

	.sidebar {
		position: absolute;
		top: 0;
		left: 0;
		width: 400px;
		height: 100%;
		background: var(--column-bg-light);
		box-shadow: var(--drop-shadow);
	}


</style>