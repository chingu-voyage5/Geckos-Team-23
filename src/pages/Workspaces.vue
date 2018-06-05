<template>
  <div class="workspaces">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="view">
      <h1>Workspace View</h1>
      <div class="tiles">
        <div class="col-1">
          <h1>WORKSPACE COMPONENT</h1>
        </div>
        <div class="col-2">
          <h1>WORKSPACE COMPONENT</h1>
        </div>
        <div class="col-3">
          <h1>WORKSPACE COMPONENT</h1>
        </div>
      </div>
    </div>
    <router-link to="/">Go to main</router-link>
  </div>
</template>

<script>
  import Sidebar from '../components/Sidebar.vue'
  export default {
    name: 'Workspace',
    components: {
      Sidebar
    }
  }
</script>

<style lang="scss">
.workspaces {
  padding: 2%;
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-column-gap: 2%;
  grid-row-gap: 2%;
}
.sidebar {
  grid-column-start: 1;
  grid-column-end: 2;
}
.view {
  grid-column-start: 2;
  grid-column-end: 3;
}

.tiles {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 1%;
  grid-row-gap: 1%;
}

.col-1 {
  grid-column-start: 1;
  grid-column-end: 2;
  background-color: green;
  color: white;
}

.col-2 {
  grid-column-start: 2;
  grid-column-end: 3;
  background-color: blue;
  color: white;
}

.col-3 {
  grid-column-start: 3;
  grid-column-end: 4;
  background-color: green;
  color: white;
}

</style>
