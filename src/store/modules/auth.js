import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@/firebase'
import AuthError from '@/error/authError'

const state = {
  isAuthorized: false,
  signInPassword: null,
  user: null,
  accessToken: null,
  refreshToken: null,
  expirationTime: null,
  isLoading: false
}

const getters = {}

const mutations = {
  SET_USER (state, payload) {
    state.user = payload
    const { accessToken, refreshToken, expirationTime } = payload.stsTokenManager
    state.accessToken = accessToken
    state.refreshToken = refreshToken
    state.expirationTime = expirationTime

  }
}

const actions = {
  async register ({ commit, state }, { email, password }) {
    try {
      state.isLoading = true
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      if (!validUser(userCredential.user)) return commit('SET_ERROR','Invalid user structure', { root: true })
      state.isLoading = false

      return userCredential
    } catch (e) {
      state.isLoading = false
      throw new AuthError(e)
    }
  },
  async login ({ commit, state }, { email, password }) {
    try {
      state.isLoading = true
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log(userCredential)
      if (!validUser(userCredential.user)) return commit('SET_ERROR','Invalid user structure', { root: true })
      commit('SET_USER', userCredential.user)
      state.isLoading = false
    } catch (e) {
      state.isLoading = false
      throw new AuthError(e)
    }
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

function validUser(user) {
  return !!user &&
    !!user.stsTokenManager &&
    !!user.stsTokenManager.accessToken &&
    !!user.stsTokenManager.refreshToken &&
    !!user.stsTokenManager.expirationTime
}
