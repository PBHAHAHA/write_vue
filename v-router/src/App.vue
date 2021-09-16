<template>
  <div id="app">
    hello
    <router-link to="/home">home</router-link>
    <router-link to="/about">about</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  mounted() {
    console.log(this.$router,this.$route)
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
