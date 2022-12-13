import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@/firebase'

const state = {
  isAuthorized: false,
  signInPassword: null,
  user: null
}

const getters = {}

const mutations = {
  SET_USER (state, payload) {
    state.user = payload
  }
}

const actions = {
  register ({ commit }, { email, password }) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        commit('SET_SUCCESS', 'SUCCESS!!!!!', { root: true })
      })
      .catch((error) => {
        commit('SET_ERROR', error.message, { root: true })
      })
  },
  login ({ commit }, { email, password }) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
        const user = userCredential.user
        commit('SET_USER', user)
        commit('SET_SUCCESS', 'SUCCESS!!!!!', { root: true })
      })
      .catch((error) => {
        commit('SET_ERROR', error.message, { root: true })
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
