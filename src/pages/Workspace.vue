<template>
  <div class="workspace">

    <Sidebar />

    <div id="workspace-content">

      <ul class="workspace__list">
        <div v-for="(column, idx) in workspace.columns" :key="idx" ref="column" class="column" v-bind:id="column.id">
          <div class="column__header">
            <input class="column__input" type="text" v-model="column.title" v-on:change="saveWorkspace">
            <i class="fas fa-ellipsis-v"></i>

            <div class="dropdown" v-show="false">
              <i class="fas fa-caret-up dropdown__arrow"></i>
              <div class="dropdown__body"></div>
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

				// Create Item Node
				const ItemClass = Vue.extend(Item);
				const itemInstance = new ItemClass({
				  propsData: data
				}).$mount();

				// Add column to workspace
        console.log( this.workspace.columns[2].items.push(data) )

				// Add Item Node to DOM
				columnItems.appendChild(itemInstance.$el)

				// Save workspace snapshot to DB
        // this.saveWorkspace()
      }
    },
    components: {
      Sidebar,
			Item
    }
  }
</script>
