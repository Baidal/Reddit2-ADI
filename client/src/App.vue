<template>
  <div id="nav">
    <NavBar :user="getUser"/>
    <router-link to="/" class="mr-2">Home</router-link> |
    <router-link to="/login" class="mr-2">Login</router-link>
    <router-link to="/register" class="mr-2">Register</router-link>

  </div>
  <router-view/>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
  name: 'App',
  components: {
    NavBar
  },
  computed: {
    getUser(){
      return this.$store.state.auth.actualUser?.user
    }
  }
}
</script>

<style>
body{
  background-color: #4B5563;
}
</style>
