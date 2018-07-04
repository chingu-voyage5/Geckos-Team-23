<template>
  <div class="workspaces">
    <Sidebar />
    <Navigation />
  <h1>Workspaces</h1>
  
  <br><br>
  <!--<router-link to="/">Go to main</router-link>-->
  </div>
</template>

<script>
import firebase from 'firebase'
import Sidebar from '../components/Sidebar'
import Navigation from '../components/Navigation'

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
    Sidebar,
    Navigation
  }
}
</script>

<style>

</style>
