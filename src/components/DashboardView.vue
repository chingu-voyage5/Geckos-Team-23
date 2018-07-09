<template>
  <div>
    <ul class="workspaces-list">
      <li v-for="(workspace, idx) in userDB.workspaces" :key="idx">
        <a href=""><i class="fas fa-columns"></i> {{ workspace.title }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
import firebase from 'firebase'
import { db } from '../main'

export default {
  name: 'DashboardView',
  data () {
    return {
      userDB: []
    }
  },
  firestore () {
		return {
			userDB: db.collection('users').doc(this.userId)
		}
	},
  methods: {

  },
  components: {

  }
}
</script>
<style lang="scss">

</style>
