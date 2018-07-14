<template>
  <div>
    <Login />
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../components/firebaseInit'
import Login from '../components/Login'

export default {
  name: 'Home',
  components: {
    'Login': Login
  }
}
</script>

<style>

</style>
