<template>
  <div>
    <Login />
  </div>
</template>

<script>
import Login from '../components/Login'
import Signup from '../components/Signup'

export default {
  name: 'Home',
  components: {
    'login': Login,
    'signup': Signup,
  },
  data () {
    return {

    }
  }
}
</script>

<style>

</style>