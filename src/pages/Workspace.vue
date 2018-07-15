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
                <span class="dropdown__arrow"></span>
                <div class="dropdown__body">
                  <button v-on:click="deleteColumn($event)"><i class="fas fa-trash"></i> Delete</button>
                </div>
              </div>
            </div>
          </div>

          <div class="column-items">
            <Item v-for="(item, idx) in column.items" :key="idx" v-bind:color="workspace.color" v-bind:id="item.id" v-bind:content="item.content">
              <input class="item__input" type="text" v-model="item.title" v-on:change="saveWorkspace">
            </Item>
          </div>

          <div class="column__add-item">

						<button class="" v-on:click="toggleAddItemDropdown($event)"><i class="fa fa-plus"></i></button>

						<div class="add-item-dropdown">
							<button class="add-item-btn" v-on:click="addItem($event, 'text')"><i class="fa fa-font"></i> Text</button>
							<button class="add-item-btn"><i class="fa fa-folder"></i> Folder</button>
							<button class="add-item-btn" v-on:click="addItem($event, 'media')"><i class="fa fa-video"></i> Media</button>
						</div>

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
  import db from '../components/firebaseInit'
  import Sidebar from '../components/Sidebar'
  import Item from '../components/Item'

  export default {
    data () {
      return {
        userId: firebase.auth().currentUser.uid,
        newColTitle: 'New Column ',
        newItemTitle: 'New Item ',
        workspace: {},
        // use this to update when route changes
        routeId: this.$route.params.id
      }
    },
    created () {
      const workspacesRef = db.collection('workspaces')

      // Load open workspace data
      workspacesRef.doc(this.routeId).onSnapshot((workspace) => {
        const data = {
          'title': workspace.data().title,
          'color': workspace.data().color,
          'columns': workspace.data().columns,
          'userIDs': workspace.data().userIDs
        }
        this.workspace = data
      })
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
			toggleAddItemDropdown (event) {
				const addItemDropdownBtn = event.target
				const addItemDropdown = event.target.nextElementSibling
				addItemDropdownBtn.classList.toggle('open')
				if (addItemDropdownBtn.classList.contains('open')) {
					addItemDropdown.style.height = 'auto'
				}
				else {
					addItemDropdown.style.height = '0'
				}
			},
      addItem (event, type) {
        const column = event.target.parentNode.parentNode.parentNode
        const columnItems = column.getElementsByClassName('column-items')[0]

        // create new item
        const data = {
          id: Date.now(),
					type: type,
          title: this.newItemTitle + (columnItems.children.length + 1),
          color: this.workspace.color,
          content: ''
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
