
/**
 *  This is List of all users movies which stores data in firebase about user interaction with movies
 *  in DB we have JSON like this
 *
 *  to delete property from DB send null value
 *  {
 *    245: {
 *      userRating: 9,
 *      inFavorites: true,
 *      dateAddedToFavorites: '2023-01-22T09:22:23.295Z'
 *      inWatchLater: true,
 *      dateAddedToWatchLater: '2023-01-22T09:29:30.622Z',
 *      note: 'nice action movie!'
 *    },
 *    756: {
 *      inWatchLater: true,
 *      dateAddedToWatchLater: '2023-01-22T09:32:10.521Z',
 *    }
 *  }
 * **/

import { DB, ref, update } from '@/firebase'

const state = {
  movies: {}
}

const getters = {}

const mutations = {
  SET_MOVIE (state, payload) {
    state.movies[payload.id] = payload
  },
  UPDATE_MOVIE (state, payload) {
    if (!state.movies[payload.id]) {
      state.movies.id = {}
    }
    state.movies.id = { ...state.movies.id, ...payload }
  },
  SET_MOVIES (state, payload) {
    state.movies = payload
  }
}

const actions = {
  getAllMovies () {

  },
  async updateMovie ({ commit, state, rootGetters }, payload) {
    const userID = rootGetters['auth/userID']
    const movieID = payload.id
    if (!userID || !movieID) throw Error('no id')
    const updates = {}
    updates[`users/${userID}/movies/${movieID}`] = { ...state.movies[movieID], ...payload }
    await update(ref(DB), updates)
    commit('SET_MOVIE', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
