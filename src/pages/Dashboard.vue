<template>
  <div class="workspaces">
    <Sidebar></Sidebar>
  <h1>Workspaces</h1>
  <button v-on:click="logOut">Log Out</button>
  <br><br>
  <router-link to="/">Go to main</router-link>
  </div>
</template>

<script>
import firebase from 'firebase'
import Sidebar from '../components/Sidebar'

export default {
  name: 'Dashboard',
  data () {
    return {

    }
  },
  methods: {
    logOut: function () {
      firebase.auth().signOut().then(() => {
      this.$router.replace('/')
      })
    },
    showUsers: function () {
      // db.collection('users').get().then((querySnapshot) => {
      // querySnapshot.forEach((doc) => {
      //   console.log(`${doc.id} => ${doc.data()}`)
      //   })
      // })
    }
  },
  components: {
    Sidebar
  }
}
</script>

<style>
  .workspaces {
    padding: 2.5rem;
  }
</style>
