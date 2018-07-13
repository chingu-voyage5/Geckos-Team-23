<template>
  <div class="workspace-list-wraper">
    <div class="workspaces-list-dashboard">

			<p>{{userWorkspaces}}</p>

      <div class="workspace" v-for="(workspace, idx) in userWorkspaces" :key="idx" v-bind:style="{ background: workspace.color }">
        <div class="top-bar">
          <span class="title">{{ workspace.title }}</span>

          <div class="dropdown-menu">
            <button v-on:click="toggleDropDown($event)"><i class="fas fa-ellipsis-v"></i></button>
            <div class="dropdown">
              <span class="dropdown__arrow"></span>
              <div class="dropdown__body">
                <button v-on:click="deleteColumn($event)"><i class="fas fa-trash"></i> Delete</button>
              </div>
            </div>
          </div>

        </div>
        <router-link class="router-link" v-bind:to="'/dashboard/' + workspace.id"></router-link>
      </div>

      <button v-on:click="addWorkspace">
        <i class="fas fa-plus"></i>
      </button>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase'
import db from './firebaseInit'
import Sidebar from '../components/Sidebar'
// import CreateWorkspace from './CreateWorkspace'

export default {
  name: 'DashboardView',
  data () {
    return {
      title: 'New Workspace',
      userId: firebase.auth().currentUser.uid,
      userName: firebase.auth().currentUser.displayName,
      userDB: [],
			userWorkspaces: []
    }
  },
	created () {

		const workspacesRef = db.collection('workspaces')
		const userWorkspaces = workspacesRef.where('userIDs.id', '==', this.userId)

		// Load Data
		userWorkspaces
    .onSnapshot(querySnapshot => {
			this.userWorkspaces = []
			querySnapshot.forEach(workspace => {
				console.log(workspace.data())
				// alert('changed')
				this.userWorkspaces.push(workspace.data())
			})
		})

	},
  methods: {
    updateDOM () {
			this.$router.go(0)
    },
    pastelColors () {
      var r = (Math.round(Math.random() * 127) + 127).toString(16)
      var g = (Math.round(Math.random() * 127) + 127).toString(16)
      var b = (Math.round(Math.random() * 127) + 127).toString(16)
      return '#' + r + g + b
    },
    toggleDropDown (event) {
      const dropDownMenu = event.target.nextElementSibling
      const allMenus = document.querySelectorAll('.dropdown')
      const clickedMenu = Array.prototype.indexOf.call(allMenus, dropDownMenu)

      // close all open menus except clicked one
      for (let i = 0; i < allMenus.length; i++) {
        if (allMenus[i] !== allMenus[clickedMenu]) {
          allMenus[i].classList.remove('visible')
        }
      }

      // open clicked menu
      dropDownMenu.classList.toggle('visible')
    },
    addWorkspace () {
      var color = this.pastelColors()
      var title = this.title
      db.collection('workspaces').add({
          title: title,
          color: color,
          columns: []
      }).then((workspaceRef) => {
        // Ensure workspaceIDs is updated with latest id
        this.userDB.workspaceIDs.push(workspaceRef.id)
        db.collection('users').doc(this.userId).set({
          workspaceIDs: this.userDB.workspaceIDs
        }, { merge: true })

        // Delete all workspace references from workspaces
        this.userDB.workspaces = []

        // Populate workspaces with newly created references
        for (let i = 0; i < this.userDB.workspaceIDs.length; i++) {
          this.userDB.workspaces.push(db.collection('workspaces').doc(this.userDB.workspaceIDs[i]))
        }

        // Update DB
        db.collection('users').doc(this.userId).set({
          workspaces: this.userDB.workspaces
        }, { merge: true })

        // Update DOM
        // this.updateDOM()
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  components: {
    Sidebar
    // CreateWorkspace
  }
}
</script>
<style>

  .workspace-list-wraper {
    /* background: steelblue; */
  }

  .workspaces-list-dashboard {
    max-width: calc( (var(--dashboard-workspace-width) + (var(--standard-margin) * 2)) * 5 - (var(--standard-margin) * 4) );
    display: flex;
    flex-wrap: wrap;
    padding: calc( var(--standard-margin) / 2 );
    /* Compensate for padding and margin */
    transform: translateY( calc( var(--standard-margin) * -1 ) );
    /* background: lightblue; */
  }

  .workspaces-list-dashboard > button, .workspaces-list-dashboard .workspace {
    display: inline-block;
    width: var(--dashboard-workspace-width);
    height: var(--dashboard-workspace-width);
    border: none;
    border-radius: var(--standard-border-radius);
    background: var(--column-bg);
    padding: var(--standard-margin);
    margin: calc( var(--standard-margin) / 2 );
    cursor: pointer;
  }

  .workspaces-list-dashboard .workspace {
    position: relative;
  }

  .workspaces-list-dashboard .top-bar {
    width: calc( 100% - (var(--standard-margin) * 2) );
    position: absolute;
    top: var(--standard-margin);
    left: var(--standard-margin);
    z-index: 1;

    display: flex;
    justify-content: space-between;
  }

  .workspaces-list-dashboard .router-link {
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    left: 0;
  }

</style>
