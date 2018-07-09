<template>
  <nav>
    <ul class="dashboard-navigation">
      <li>User Dashboard</li>
      <li><CreateWorkspace /></li>
    </ul>
  </nav>
</template>
<script>
import CreateWorkspace from './CreateWorkspace'

export default {
  name: 'Navigation',
  data () {
    return {

    }
  },
  methods: {

  },
  components: {
    CreateWorkspace
  }
}
</script>
<style lang="scss">
.dashboard-navigation {
  list-style-type: none;
  margin: 0px;
  padding: 0px;
}
li {
  display: inline-block;
  padding: 5px;
}
</style>
