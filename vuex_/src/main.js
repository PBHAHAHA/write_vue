import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

var a = new Vue({
  name: "root",
  data: {
    aa: 1
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')

console.log(a);