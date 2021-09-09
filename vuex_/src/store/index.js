import Vue from 'vue'
import Vuex from './vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    age: 10
  },
  getters: {
    myAge(state) {
      return state.age + 10
    }
  },
  mutations: {
    syncAdd(state,payload) {
      state.age += payload
    },
    syncRemove(state,payload){
      state.age -= payload
    }
  },
  actions: {
    asyncRemove({commit,dispatch},payload){
      commit('syncRemove',payload)
    },
  },
  modules: {
  }
})
