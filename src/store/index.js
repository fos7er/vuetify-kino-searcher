import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
console.log(modules)
Vue.use(Vuex)

const state = {
  movieDialog: false,
}

const getters = {}

const mutations = {}

const actions = {}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
})
