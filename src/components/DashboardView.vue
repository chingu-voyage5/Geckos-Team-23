<template>
  <div>
    <!-- <ul class="workspaces-list">
      <li v-for="(workspace, idx) in userDB.workspaces" :key="idx">
        <a href=""><i class="fas fa-columns"></i> {{ workspace.title }}</a>
      </li>
    </ul>
  <p>{{ userDB }}</p> -->
  </div>
</template>
<script>
import firebase from 'firebase'
import Sidebar from '../components/Sidebar'
import { db } from '../main'

export default {
  name: 'DashboardView',
  data () {
    return {
    }
  },
  methods: {

  },
  components: {
    Sidebar
  }
}
</script>
<style lang="scss">

</style>
