import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

const state = {
  overlay: false,
  success: null,
  warning: null,
  error: null
}

const getters = {}

const mutations = {
  ADD_OVERLAY (state) {
    state.overlay = true
  },
  REMOVE_OVERLAY (state) {
    state.overlay = false
  },
  RESET_SNACKBAR (state) {
    state.success = state.warning = state.error = null
  },
  SET_SUCCESS (state, payload) {
    state.success = payload
  },
  SET_WARNING (state, payload) {
    state.warning = payload
  },
  SET_ERROR (state, payload) {
    state.error = payload
  }
}

const actions = {}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
})
