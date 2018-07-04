<template>
  <div class="dashboard-container">
    <div id="sidebar-container">
      <Sidebar />
    </div>
    <div id="dashboard-content">
      <Navigation />
      <h1>Dashboard</h1>
    </div>
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

<style lang="scss">
.dashboard-container {
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  height: 100vh;
}
#sidebar-container {
  flex-grow: 1;
  width: 40%;
  height: 100%;
}
#dashboard-content {
  flex-grow: 1;
  width: 100%;
  height: 100%;
}
</style>
