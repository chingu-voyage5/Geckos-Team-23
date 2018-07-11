<template>
  <div class="workspace">

    <Sidebar />

    <div id="workspace-content">

      <ul class="workspace__list">
		  	<div v-for="(column, idx) in workspace.columns" :key="idx" class="column">
					<div class="column__header">
						<input class="column__input" type="text" v-model="column.title" v-on:change="updateColTitle($event)">
						<i class="fas fa-ellipsis-v"></i>

						<div class="dropdown" v-show="false">
							<i class="fas fa-caret-up dropdown__arrow"></i>
							<div class="dropdown__body"></div>
						</div>
					</div>

					<div v-for="(item, idx) in column.items" :key="idx" class="item">
						<div class="item__header">
							<h3>{{ item.title }}</h3>
							<i class="fas fa-ellipsis-v"></i>
						</div>

						<div class="item__body">
							<div class="item__button">
								<i class="fas fa-plus item__icon"></i>
							</div>
						</div>
					</div>

					<div class="column__add-item">
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
  import Navigation from '../components/Navigation'

  export default {
    data () {
      return {
        userId: firebase.auth().currentUser.uid,
				newColTitle: 'New Column ',
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
				let columns = this.workspace.columns;

				// create new column
				const data = {
					title: this.newColTitle + (this.workspace.columns.length + 1),
					items: []
				}

				// Add column to workspace
				this.workspace.columns.push(data)

				// Save workspace snapshot to DB
				this.saveWorkspace()
      },
			updateColTitle (event) {
				console.log( event )
			},
			addItem () {

			}
    },
    components: {
      Sidebar
    }
  }
</script>
