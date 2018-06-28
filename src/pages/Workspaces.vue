import firebase from 'firebase'
import sidebar from '../components/sidebar'
import Workspace from '../components/Workspace'

<template>
<<<<<<< HEAD
  <div class="workspaces">
    <Workspace/>
  </div>
       
  <div class="workspaces">
		<sidebar/>
    <h1>Workspaces</h1>
    <button v-on:click="logOut">Log Out</button>
    <br><br>
    <router-link to="/">Go to main</router-link>
	</div>
=======
    <div class="workspaces">
        <h1>Workspaces</h1>
        <router-link to="/">Go to main</router-link>
        <router-link to="/Login">Go to Login</router-link>
    </div>
>>>>>>> homepage
</template>

<script>

export default {
  name: 'workspaces',
  data () {
    return {

    }
  },
	components: {
		sidebar,
    Workspace
	},
  methods: {
    logOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('/')
      })
    },
    showUsers: function () {
      db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`)
          })
      })
    }
  }
}
</script>


<style>
  .workspaces {
    padding: 2.5rem;
  }
</style>
