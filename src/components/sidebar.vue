<template>
  <div class="sidebar">

  	<div class="top-bar">
			<i class="fas fa-times"></i>
			<a href="">Clipboard</a>
  	</div>

		<ul class="workspaces-list">
			<li><a href=""><i class="fas fa-columns "></i> Workspace 1</a></li>
			<li><a href=""><i class="fas fa-columns "></i> Workspace 2</a></li>
			<li><a href=""><i class="fas fa-columns "></i> Workspace 3</a></li>
		</ul>

		<a href=""><i class="fas fa-user-circle"></i> Account</a>

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
