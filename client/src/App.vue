<template>
  <div class=" .font-sans">
    <NavBar/>
    <router-link to="/">Home</router-link>
  </div>
  <router-view/>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
  }
}
</script>

<style>
body{
  background-color: #4B5563;
}
</style>
