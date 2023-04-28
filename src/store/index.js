import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

const state = {
  overlay: false,
  snacks: []
}

const getters = {}

const mutations = {
  ADD_OVERLAY (state) {
    state.overlay = true
  },
  REMOVE_OVERLAY (state) {
    state.overlay = false
  },
  SET_SUCCESS: (state, data) => state.snacks.push({ id: Date.now(), type: 'success', data, timeout: 2500 }),
  SET_WARNING: (state, data) => state.snacks.push({ id: Date.now(), type: 'warning', data, timeout: 6000 }),
  SET_ERROR: (state, data) => state.snacks.push({ id: Date.now(), type: 'error', data, timeout: 7000 }),
  REMOVE_SNACK: (state, i) => state.snacks.splice(i, 1),
  CLEAR_SNACKS: (state) => state.snacks = []
}

const actions = {}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
})
