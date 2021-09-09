<template>
  <div id="app">
   {{$store.state.age}}
   年龄
   {{$store.getters.myAge}}

    <br>
   <button @click="addFunc">add 10</button>
   <button @click="removeFunc">remove 10</button>
  </div>
</template>
<script>
export default {
  name: "APP",
  data(){
    return {
      a: 1
    }
  },
  mounted() {
    console.log(this.$store)
    // setTimeout(()=> {
    //   this.$store.state.age = 100
    // },1000)
  },
  methods: {
    addFunc(){
      this.$store.commit('syncAdd',10)
    },
    removeFunc(){
      this.$store.dispatch('asyncRemove',10)
    }
  },
}
</script>
<style>

</style>
