<template>
  <div class="workspace-list-wraper">
    <div class="workspaces-list-dashboard">

      <div class="workspace" v-for="(workspace, idx) in userWorkspaces" :key="idx" v-bind:style="{ background: workspace.color }" v-bind:id="workspace.id">
        <div class="top-bar">
          <span class="title">{{ workspace.title }}</span>

          <div class="dropdown-menu">
            <button v-on:click="toggleDropDown($event)"><i class="fas fa-ellipsis-v"></i></button>
            <div class="dropdown">
              <span class="dropdown__arrow"></span>
              <div class="dropdown__body">
                <button v-on:click="deleteWorkspace($event)"><i class="fas fa-trash"></i> Delete</button>
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
import Sidebar from './Sidebar'

export default {
  name: 'DashboardView',
  data () {
    return {
      newWorkspaceTitle: 'New Workspace',
      userId: firebase.auth().currentUser.uid,
			userWorkspaces: []
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
				console.log(workspace.data())
				const data = {
					'id': workspace.id,
					'title': workspace.data().title,
					'color': workspace.data().color,
					'columns': workspace.data().columns, // optional ?
					'userIDs': workspace.data().userIDs
				}
				this.userWorkspaces.push(data)
			})
		})
	},
  methods: {
    pastelColors () {
      const r = (Math.round(Math.random() * 127) + 127).toString(16)
      const g = (Math.round(Math.random() * 127) + 127).toString(16)
      const b = (Math.round(Math.random() * 127) + 127).toString(16)
      return '#' + r + g + b
    },
    toggleDropDown (event) {
      const dropDownMenu = event.target.nextElementSibling
      const allMenus = document.querySelectorAll('.dropdown')
      const clickedMenu = Array.prototype.indexOf.call(allMenus, dropDownMenu)

      // close all open menus except clicked one
      allMenus.forEach((menu, index) => {
        if (menu !== allMenus[clickedMenu]) {
          menu.classList.remove('visible')
        }
      })

      // open clicked menu
      dropDownMenu.classList.toggle('visible')
    },
    addWorkspace () {
      db.collection('workspaces').add({
          title: this.newWorkspaceTitle,
          color: this.pastelColors(),
          columns: [],
					userIDs: {'id': this.userId}
      })
    },
		deleteWorkspace (event) {

		}
  },
  components: {
    Sidebar
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
