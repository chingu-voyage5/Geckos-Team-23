<template>
  <div>
		<!-- Safety Commmit -->
    <ul class="workspaces-list-dashboard">
      <li class="workspace-tile-li" v-bind:style="{ backgroundColor: workspace.color }" v-for="(workspace, idx) in userDB.workspaces" :key="idx">
        <a class="workspace-tile-a" v-bind:href="'#/dashboard/' + workspace.id">{{ workspace.title }}</a>
      </li>
      <CreateWorkspace />
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
.workspace-tile-li {
  display: inline-block;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
}
.workspace-tile-a {
  width: 200px;
  height: 200px;
  display: block;
  text-decoration: none;
}
</style>
