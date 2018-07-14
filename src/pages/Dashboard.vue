<template>
  <div class="dashboard-container">

    <Sidebar />

    <div id="dashboard-content">
      <DashboardView />
    </div>

  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import DashboardView from '../components/DashboardView'

export default {
  name: 'Dashboard',
  components: {
    Sidebar,
    DashboardView
  }
}
</script>

<style lang="scss">

	.dashboard-container {
	  display: flex;
	  height: 100vh;
	}

	#dashboard-content {
	  width: 100%;
	  padding: 20px 40px;
	  display: flex;
	  justify-content: center;
		overflow-y: auto;
	}

</style>
