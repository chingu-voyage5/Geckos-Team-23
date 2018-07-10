<template>
  <div>
    <ul class="workspaces-list-dashboard">
      <li v-for="(workspace, idx) in userDB.workspaces" :key="idx">
        <a href="">{{ workspace.title }}</a>
      </li>
      <li><CreateWorkspace /></li>
    </ul>
  </div>
</template>
<script>
import firebase from 'firebase'
import { db } from '../main'
import Sidebar from '../components/Sidebar'
import CreateWorkspace from './CreateWorkspace'

export default {
  name: 'DashboardView',
  data () {
    return {
      userId: firebase.auth().currentUser.uid,
      userDB: []
    }
  },
  firestore () {
    return {
      userDB: db.collection('users').doc(this.userId)
    }
  },
  methods: {

  },
  components: {
    Sidebar,
    CreateWorkspace
  }
}
</script>
<style lang="scss">

</style>
