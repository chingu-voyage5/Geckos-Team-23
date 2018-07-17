<template>
  <div class="sidebar" v-bind:class="{ closed: sidebarClosed }">

    <div class="sidebar-normal" v-if="accountPageState === 'closed'">
      <div class="top-bar">
        <button v-on:click="toggleSidebar">
          <i class="fas fa-times" v-show="!sidebarClosed"></i>
          <i class="fas fa-bars" v-show="sidebarClosed"></i>
        </button>
        <h2>Clipboard</h2>
      </div>

      <router-link v-bind:to="'/dashboard/'"><i class="fas fa-home"></i> <span v-show="!sidebarClosed">Dashboard</span></router-link>

      <button v-on:click="logOut"><i class="fas fa-sign-out-alt"></i> <span v-show="!sidebarClosed">Sign Out</span></button>

      <button v-on:click="switchSidebarPage"><i class="fas fa-user-circle"></i> <span v-show="!sidebarClosed">Account</span></button>

      <ul class="workspaces-list">
        <li v-for="(workspace, idx) in userWorkspaces" :key="idx">
          <router-link v-bind:to="'/dashboard/' + workspace.id" v-bind:style="{ background: workspace.color }">
            <i class="fas fa-columns"></i>
            <span v-show="!sidebarClosed">{{ workspace.title }}</span>
          </router-link>
          <!-- <a v-bind:href="'#/dashboard/' + workspace.id" v-bind:style="'color:' + workspace.color"><i class="fas fa-columns"></i> <span v-show="!sidebarClosed">{{ workspace.title }}</span></a> -->
        </li>
      </ul>

    </div>

    <div class="sidebar-account" v-if="accountPageState === 'open'">
      <div class="top-bar">
        <button v-on:click="switchSidebarPage"><i class="fas fa-arrow-left"></i></button>
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
import db from './firebaseInit'
import { store } from '../store/index.js'

export default {
  name: 'Sidebar',
  data () {
    return {
      sidebarClosed: true,
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
      userWorkspaces: [],
      // use this to update when route changes
      routeId: this.$route.params.id
    }
  },
  created () {
    const workspacesRef = db.collection('workspaces')
    const userWorkspaces = workspacesRef.where('userIDs.id', '==', this.userId)

    // Load and Update Data
    userWorkspaces
    .onSnapshot(querySnapshot => {
      this.userWorkspaces = []
      querySnapshot.forEach(workspace => {
        const data = {
          'id': workspace.id,
          'title': workspace.data().title,
          'color': workspace.data().color,
          'columns': workspace.data().columns, // optional ?
          'userIDs': workspace.data().userIDs
        }
        this.userWorkspaces.push(data)
        this.routeId = this.$route.params.id
      })
    })

    this.sidebarClosed = this.$store.state.sidebarClosed
  },
  methods: {
    toggleSidebar () {
      const sidebar = document.querySelector('.sidebar')
      sidebar.classList.toggle('closed')
      this.sidebarClosed = !this.sidebarClosed
      this.$store.commit('toggleSidebar')
    },
    switchSidebarPage () {
      if (this.sidebarClosed) {
        this.toggleSidebar()
      }
      switch (this.accountPageState) {
        case 'closed':
          this.accountPageState = 'open'
          break
        default:
          this.accountPageState = 'closed'
      }
    },
    logOut () {
      firebase.auth().signOut().then(() => {
      this.$router.replace('/')
      })
    },
    updateUserName () {
      this.user.updateProfile({
        displayName: this.userName,
        photoURL: 'https://example.com/jane-q-user/profile.jpg'
      }).then(function () {
        console.log('Update successful')
      }).catch(function (error) {
        console.log(error)
      })
    },
    updateEmail () {
      this.user.updateEmail(this.userEmail).then(function () {
        console.log('Update successful')
      }).catch(function (error) {
        console.log(error)
      })
    },
    validatePassword () {
      const userPasswordWarning = document.querySelector('#user-password+p')
      const invalidPasswordWarning = document.querySelector('#account-user-new-password+p')
      const differentPasswordWarning = document.querySelector('#account-user-new-password-confirm+p')

      if (this.password.length < 6) {
        userPasswordWarning.style.display = 'block'
        this.changePasswordBtnDisabled = true
      } else {
        userPasswordWarning.style.display = 'none'
      }

      if (this.newPassword.length < 6) {
        invalidPasswordWarning.style.display = 'block'
        this.changePasswordBtnDisabled = true
      } else {
        invalidPasswordWarning.style.display = 'none'
      }

      if (this.newPassword !== this.newPasswordConfirmation) {
        differentPasswordWarning.style.display = 'block'
        this.changePasswordBtnDisabled = true
      } else {
        differentPasswordWarning.style.display = 'none'
      }

      if (!(this.password.length < 6) && !(this.newPassword < 6) && !(this.newPassword !== this.newPasswordConfirmation)) {
        this.changePasswordBtnDisabled = false
      }
    },
    changePassword () {
      // create user credential (needed for reauthentication)
      const user = firebase.auth().currentUser
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        this.password
      )

      user.reauthenticateAndRetrieveDataWithCredential(credential).then(() => {
        user.updatePassword(this.newPassword).then(function () {
          alert('Update successful')
        }).catch(function (error) {
          alert(error)
        })
      }
      ).catch(function (error) {
        alert(error)
      })
    },
    deleteAccount () {
      this.user.delete().then(() => {
        alert('Account Deleted')
        db.collection('users').doc(this.userId).delete()
        this.$router.replace('Home')
      }).catch(function (error) {
        alert(error)
      })
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
  }

  button {
    background: transparent;
    border: none;
    font-size: 1em;
  }
  button:not(:disabled) {
    cursor: pointer;
  }

  .sidebar {
    width: 360px;
    height: 100%;
    padding: 20px;
    overflow-x: hidden; /* prevent scrollbar when collapsing */
    overflow-y: auto;
    background: var(--column-bg);
    box-shadow: var(--drop-shadow);
    z-index: 10;
    transition: .3s;
  }

  .sidebar.closed {
    width: calc( var(--standard-margin) * 2 + 20px );
    padding: 20px 0;
  }
  .sidebar.closed .top-bar h2 {
    display: none;
  }
  .sidebar.closed .sidebar-normal {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .sidebar.closed .sidebar-normal ul a {
    padding: 0 3px;
    border-radius: 2px;
  }

  .sidebar .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
  }

  .sidebar .top-bar button {
    margin: 0;
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
  }

  .sidebar-normal > ul li:not(:first-child) {
    margin-top: 16px;
  }

  .sidebar .workspaces-list li a {
    color: black;
    padding: 5px;
    border-radius: 5px;
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
