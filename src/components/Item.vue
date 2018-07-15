<template>
  <div class="item">
    <div class="item__header" v-bind:style="{ background: color}">

      <slot></slot>

      <div class="dropdown-menu">
        <button v-on:click="toggleDropDown($event)"><i class="fas fa-ellipsis-v"></i></button>
        <div class="dropdown">
          <span class="dropdown__arrow"></span>
          <div class="dropdown__body">
            <button v-on:click="deleteItem($event)"><i class="fas fa-trash"></i> Delete</button>
          </div>
        </div>
      </div>

    </div><!-- end of item__header -->

    <div class="item__body">
      <div class="text-item-content">
				<textarea class="styled-textarea" placeholder="Write some notes here..." v-model="itemContent" v-on:keyup="saveItem">
          {{content}}
        </textarea>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import db from '../components/firebaseInit'

  export default {
    props: [
      'title',
      'color',
			'id',
			'content'
    ],
    data () {
      return {
        routeId: this.$route.params.id,
        workspace: {},
				itemContent: ''
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
			saveItem (event) {
				const column = event.target.parentNode.parentNode.parentNode.parentNode.parentNode
        const columnItems = column.querySelectorAll('.item')
				const item = event.target.parentNode.parentNode.parentNode
        const itemIndex = Array.prototype.indexOf.call(columnItems, item)

				const workspaceColumns = document.getElementsByClassName('workspace__list')[0]
        const columnIndex = Array.prototype.indexOf.call(workspaceColumns.children, column)

        // Save data
        this.workspace.columns[columnIndex].items[itemIndex].content = this.itemContent
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
      deleteItem (event) {
        const item = event.target.parentNode.parentNode.parentNode.parentNode.parentNode
        const columnItems = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes

        const column = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        const workspaceColumns = document.getElementsByClassName('workspace__list')[0]
        const columnIndex = Array.prototype.indexOf.call(workspaceColumns.children, column)

        const allMenus = document.querySelectorAll('.dropdown')
        const itemIndex = Array.prototype.indexOf.call(columnItems, item)

        this.workspace.columns[columnIndex].items.splice(itemIndex, 1)

        // close all open menus
        for (let i = 0; i < allMenus.length; i++) {
          allMenus[i].classList.remove('visible')
        }

        // Save workspace snapshot to DB
        this.saveWorkspace()
      }
    }
  }
</script>
<style lang="scss">
.styled-textarea {
  width: 100%;
  min-height: 200px;
  border: 0px;
  outline: none;
  resize: none;
}
</style>
