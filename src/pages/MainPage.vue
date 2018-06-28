<template>
    <div class="index">
        <h1>Main Page</h1>
        <router-link to="/workspaces">Go to workspaces</router-link>
        <router-link to="/Login">Go to Login</router-link>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      helloMsg: 'msg'
    })
  }
}

</script>

<style>

</style>
