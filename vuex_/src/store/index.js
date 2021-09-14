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
  // 把项目分成很多的模块
  modules: {
    a: {
      state: {
        x: 1
      },
      modules: {
        c: {
          state:{z:3}
        }
      }
    },
    b: {
      state: {
        y: 1
      }
    }
  }
})
