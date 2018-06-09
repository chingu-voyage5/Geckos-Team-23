<template>
    <div class="workspaces">
        <h1>Workspaces</h1>
        <button v-on:click="logOut">Log Out</button>
        <br><br>
        <router-link to="/">Go to main</router-link>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'workspaces',
  data () {
    return {

    }
  },
  methods: {
    logOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('/')
      })
    }
  }
}
</script>
