<template>
    <div class="sidebar">
            SIDEBAR2
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Sidebar',
  components: 'Sidebar',
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>

	.sidebar {
		position: absolute;
		top: 0;
		left: 0;
		width: 400px;
		height: 100%;
		background: var(--column-bg-light);
	}


</style>
