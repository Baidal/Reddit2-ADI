<template>
  <div id="nav">
    <NavBar/>
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link>
  </div>
  <router-view/>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
body{
  background-color: #4B5563;
}
</style>
