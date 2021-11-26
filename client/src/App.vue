<template>
  <div id="nav" class="block">
    <NavBar :user="getUser"/>

  </div>
  <div class="mt-36">
    <router-view/>
  </div>
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
  background-color: #030303;
}
</style>
