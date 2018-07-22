<template>
	<div class="column">
		<div class="column__header">
			<input class="column__input" type="text" v-model="colTitle" v-on:keyup="saveWorkspace">

			<div class="dropdown-menu">
				<button v-on:click="toggleDropDown($event)"><i class="fas fa-ellipsis-v"></i></button>
				<!-- <div class="dropdown"
					<span class="dropdown__arrow"></span>
					<div class="dropdown__body">
						<button v-on:click="deleteColumn($event)"><i class="fas fa-trash"></i> Delete</button>
					</div>
				</div> -->
			</div>
		</div>

		<div class="column-items">
			<Item v-for="(item, idx) in colItems" :key="idx" v-bind:color="item.color" v-bind:id="item.id" v-bind:content="item.content" v-bind:height="item.height">
				<input class="item__input" type="text" v-model="item.title" v-on:keyup="saveWorkspace">
			</Item>
		</div>

		<div class="column__add-item">

			<button class="" v-on:click="addItem($event, 'text')"><i class="fa fa-plus"></i></button>

			<div class="add-item-dropdown">
				<button class="add-item-btn" v-on:click=""><i class="fa fa-font"></i> Text</button>
			</div>

		</div>
	</div>
</template>

<script>
	import firebase from 'firebase'
	import db from '../components/firebaseInit'
	import Item from '../components/Item'

	export default {
		props: [
			'title',
			'id'
		],
		data () {
			return {
				colID: this.id,
				colTitle: '',
				colItems: [],
				workspace: [],
				routeId: this.$route.params.id
			}
		},
		created () {
      this.colTitle = this.title

			const workspacesRef = db.collection('workspaces')

      // Load open workspace data
      workspacesRef.doc(this.routeId).onSnapshot((workspace) => {
        const data = {
          'title': workspace.data().title,
          'color': workspace.data().color,
          'columns': workspace.data().columns,
					'columnIDs': workspace.data().columnIDs,
          'userIDs': workspace.data().userIDs
        }
        this.workspace = data
      })

			const itemsRef = db.collection('items')
			const columnItems = itemsRef.where('columnID', '==', this.colID)

	    // Load and Update Data
	    columnItems
	    .onSnapshot(querySnapshot => {
	      querySnapshot.forEach(item => {
	        const data = {
						'id': item.id,
	          'title': item.data().title,
						'color': item.data().color,
						'height': item.data().height,
						'content': item.data().content,
	          'columnID': item.data().columnID,
						'type': item.data().type
	        }
	        this.colItems.push(data)
	      })
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
      addItem (event, type) {

        const column = event.target.parentNode.parentNode.parentNode
        const columnItems = column.getElementsByClassName('column-items')[0]

        const workspaceColumns = document.getElementsByClassName('workspace__list')[0]
        const columnIndex = Array.prototype.indexOf.call(workspaceColumns.children, column)

        db.collection('items').add({
          type: type,
          title: type.capitalize() + ' item ' + (columnItems.children.length + 1),
          color: this.workspace.color,
          content: '',
          height: '',
					columnID: this.colID
        })

        // this.saveWorkspace()
      }
		},
		components: {
			Item
		}
	}
</script>
