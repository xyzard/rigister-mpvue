import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
let store = new Vuex.Store({
  state: {
    isShowAuth: true
  },
  getters: {},
  mutations: {},
  actions: {}
})

Vue.prototype.$store = store
export default store
