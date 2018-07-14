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
      <div class="item__button" v-bind:style="{ background: color}">
        <i class="fas fa-plus item__icon"></i>
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
      'color'
    ],
    data () {
      return {
        routeId: this.$route.params.id,
        workspace: {}
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
