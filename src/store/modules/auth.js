import { auth, DB, ref, set, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@/firebase'
import AuthError from '@/error/authError'

const state = {
  signInPassword: null,
  user: null,
  isLoading: false
}

const getters = {
  isLoggedIn (state) {
    const user = state.user
    return !!user &&
      !!user.stsTokenManager &&
      !!user.stsTokenManager.accessToken &&
      !!user.stsTokenManager.refreshToken
  },
  userID(state) {
    return state.user?.uid || null
  }
}


const mutations = {
  SET_USER (state, payload) {
    state.user = payload
  },
  CLEAR_USER (state) {
    state.user = null
  }
}

const actions = {
  async register ({ commit, state, getters }, { email, password }) {
    try {
      state.isLoading = true
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      if (!validUser(userCredential.user)) return commit('SET_ERROR', 'Invalid user structure', { root: true })
      commit('SET_USER', userCredential.user)
      state.isLoading = false
      const userID = getters.userID
      console.log(42,JSON.stringify(state.user))

      await set(ref(DB, `users/${userID}`), {
        //playLists:'{}',
        userID:userID
        //settings: '{}',
        //movies: '{}'
      })

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
      if (!validUser(userCredential.user)) return commit('SET_ERROR', 'Invalid user structure', { root: true })
      commit('SET_USER', userCredential.user)
      state.isLoading = false
    } catch (e) {
      state.isLoading = false
      throw new AuthError(e)
    }
  },
  async logout ({ commit, state }) {
    try {
      await signOut(auth)
      commit('CLEAR_USER')
    } catch (e) {
      state.isLoading = false
      throw new AuthError(e)
    }
  },
  async refresh ({ commit }) {
    try {
      state.isLoading = true
      return new Promise((resolve) => {
        auth.onAuthStateChanged(async user => {
          if (user === null) {
            commit('CLEAR_USER')
          } else {
            if (!validUser(user)) return commit('SET_ERROR', 'Invalid user structure', { root: true })
            commit('SET_USER', user)
          }
          state.isLoading = false
          resolve()
        })
      })
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

function validUser (user) {
  return !!user &&
    !!user.stsTokenManager &&
    !!user.stsTokenManager.accessToken &&
    !!user.stsTokenManager.refreshToken &&
    !!user.stsTokenManager.expirationTime
}
