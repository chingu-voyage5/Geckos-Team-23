<template>
  <div class="workspace">

    <Sidebar />

    <div id="workspace-content">

      <ul class="workspace__list">
        <div v-for="(column, idx) in workspace.columns" :key="idx" ref="column" class="column" v-bind:id="column.id">
          <div class="column__header">
            <input class="column__input" type="text" v-model="column.title" v-on:change="saveWorkspace">

						<div class="dropdown-menu">
							<button v-on:click="toggleDropDown($event)"><i class="fas fa-ellipsis-v"></i></button>
							<div class="dropdown">
								<i class="fas fa-caret-up dropdown__arrow"></i>
								<div class="dropdown__body">
									<button v-on:click="deleteColumn($event)"><i class="fas fa-trash"></i> Delete</button>
								</div>
							</div>
						</div>
          </div>

          <div class="column-items">
            <Item v-for="(item, idx) in column.items" :key="idx" class="item" v-bind:color="workspace.color">{{item.title}}</Item>
          </div>

          <div class="column__add-item" v-on:click="addItem($event)">
            <i class="fa fa-plus column__icon"></i>
          </div>
        </div>
      </ul>

      <div class="workspace__add-button" v-on:click="addColumn">
        <i class="fas fa-plus"></i>
      </div>
    </div>

  </div><!-- end of workspace -->
</template>

<script>
  import firebase from 'firebase'
  import { db } from '../main'
  import Sidebar from '../components/Sidebar'
  import Item from '../components/Item'
  import Vue from 'vue'

  export default {
    data () {
      return {
        userId: firebase.auth().currentUser.uid,
        newColTitle: 'New Column ',
        newItemTitle: 'New Item 😀 ',
        workspace: []
      }
    },
    firestore () {
      return {
        workspace: db.collection('workspaces').doc(this.$route.params.id)
      }
    },
    methods: {
      saveWorkspace () {
        db.collection('workspaces').doc(this.$route.params.id).set(this.workspace)
      },
      addColumn () {
        // retrieve DB columns
        let columns = this.workspace.columns

        // create new column
        const data = {
          id: Date.now(),
          title: this.newColTitle + (this.workspace.columns.length + 1),
          items: []
        }

        // Add column to workspace
        this.workspace.columns.push(data)

        // Save workspace snapshot to DB
        this.saveWorkspace()
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
      deleteColumn (event) {
        const column = event.target.parentNode.parentNode.parentNode.parentNode.parentNode
        const allMenus = document.querySelectorAll('.dropdown')

        const workspaceColumns = document.getElementsByClassName('workspace__list')[0]
        const columnIndex = Array.prototype.indexOf.call(workspaceColumns.children, column)
        this.workspace.columns.splice(columnIndex, 1)

        // close all open menus
        for (let i = 0; i < allMenus.length; i++) {
          allMenus[i].classList.remove('visible')
        }

        // Save workspace snapshot to DB
        this.saveWorkspace()
      },
      addItem (event) {
        const column = event.target.parentNode
        const columnItems = column.getElementsByClassName('column-items')[0]

        // create new item
        const data = {
          id: Date.now(),
          title: this.newItemTitle,
          content: '',
          color: this.workspace.color
        }

        // Add column to workspace
        const workspaceColumns = document.getElementsByClassName('workspace__list')[0]
        const columnIndex = Array.prototype.indexOf.call(workspaceColumns.children, column)
        this.workspace.columns[columnIndex].items.push(data)

        // Save workspace snapshot to DB
        this.saveWorkspace()
      }
    },
    components: {
      Sidebar,
      Item
    }
  }
</script>
