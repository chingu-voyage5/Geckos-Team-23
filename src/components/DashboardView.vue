<template>
  <div>
    <div class="workspaces-list-dashboard">
      <router-link v-for="(workspace, idx) in userDB.workspaces" :key="idx" v-bind:to="'/dashboard/' + workspace.id">
        <div class="workspace" v-bind:style="{ background: workspace.color }">
          {{ workspace.title }}
        </div>
      </router-link>

      <button v-on:click="addWorkspace">
        <i class="fas fa-plus"></i>
      </button>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase'
import { db } from '../main'
import Sidebar from '../components/Sidebar'
// import CreateWorkspace from './CreateWorkspace'

export default {
  name: 'DashboardView',
  data () {
    return {
      title: 'New Workspace',
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
    saveUser () {
      db.collection('users').doc(this.userId).update(this.userDB)
    },
    pastelColors () {
      var r = (Math.round(Math.random() * 127) + 127).toString(16)
      var g = (Math.round(Math.random() * 127) + 127).toString(16)
      var b = (Math.round(Math.random() * 127) + 127).toString(16)
      return '#' + r + g + b
    },
    addWorkspace () {
      var color = this.pastelColors()
      var title = this.title
      db.collection('workspaces').add({
          title: title,
          color: color,
          columns: []
      }).then((docRef) => {
        console.log(typeof docRef)
        // const path = 'workspaces/' + docRef.id
        this.userDB.workspaces.push(
          db.doc('workspaces/' + docRef.id)
        )
        this.saveUser()
      })
    }
  },
  components: {
    Sidebar,
    // CreateWorkspace
  }
}
</script>
<style>

	.workspaces-list-dashboard {
		display: flex;
		padding: calc( var(--standard-margin) / 2 );
		background: lightblue;
	}

  .workspaces-list-dashboard button, .workspaces-list-dashboard .workspace {
    display: inline-block;
    width: var(--dashboard-workspace-width);
    height: var(--dashboard-workspace-width);
    border: none;
    border-radius: var(--standard-border-radius);
    background: var(--column-bg);
		margin: calc( var(--standard-margin) / 2 );
    cursor: pointer;
  }

</style>
