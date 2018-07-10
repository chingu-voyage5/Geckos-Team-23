<template>
  <div class="workspace">

    <Sidebar />

    <div id="workspace-content">
      <ul class="workspace__list">
        <Column v-for="column in columns"
            :key="column.id"
            :columnId="column.id">
          <input class="column__input" type="text" v-model="column.title">
        </Column>
      </ul>

      <div class="workspace__add-button"
         @click="addColumn">
        <i class="fas fa-plus"></i>
      </div>
    </div>

  </div><!-- end of workspace -->
</template>

<script>
  import Sidebar from '../components/Sidebar'
  import Navigation from '../components/Navigation'
  import Column from '../components/Column'
  import { mapState } from 'vuex'

  export default {
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
