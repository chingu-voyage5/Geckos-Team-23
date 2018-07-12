<template>
  <div class="dashboard-container">
    <div id="sidebar-container">
      <Sidebar />
    </div>
    <div id="dashboard-content">
      <Navigation />
      <DashboardView />
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import Navigation from '../components/Navigation'
import DashboardView from '../components/DashboardView'

export default {
  name: 'Dashboard',
  data () {
    return {
    }
  },
  methods: {
  },
  components: {
    Sidebar,
    Navigation,
    DashboardView
  }
}
</script>

<style lang="scss">
.dashboard-container {
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  height: 100vh;
}
#sidebar-container {
  flex-grow: 1;
  width: 40%;
  height: 100%;
}
#dashboard-content {
  flex-grow: 1;
  width: 100%;
  height: 100%;
}
</style>
