import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		sidebarClosed: true
  },
  getters: {
    // functions to return the state if dynamic
    getColumnTitle: state => {
      return state.columns
    }
  },
  mutations: {
    // functions to mutate the state
    toggleSidebar (state) {
      state.sidebarClosed = !state.sidebarClosed
    }
  },
  actions: {
    // functions that commit mutations, these can contain async code
		
  }
})
