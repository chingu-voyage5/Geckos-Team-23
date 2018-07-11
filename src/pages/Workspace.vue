<template>
  <div class="workspace">

    <Sidebar />

    <div id="workspace-content">

      <ul class="workspace__list">
		  	<div v-for="(column, idx) in workspace.columns" :key="idx" class="column">
					<div class="column__header">
						<h3>{{ column.title }}</h3>
						<i class="fas fa-ellipsis-v"></i>

						<div class="dropdown">
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

      <div class="workspace__add-button"
         @click="addColumn">
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
  import Column from '../components/Column'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        userId: firebase.auth().currentUser.uid,
        workspace: []
      }
    },
    firestore () {
      return {
        workspace: db.collection('workspaces').doc(this.$route.params.id)
      }
    },
    methods: {
      addColumn () {
        this.$store.commit('addColumn', { title: 'Column', id: this.columns.length + 1 })
      }
    },
    computed: {
      ...mapState([
        'columns'
      ])
    },
    components: {
      Sidebar,
      Column
    }
  }
</script>
