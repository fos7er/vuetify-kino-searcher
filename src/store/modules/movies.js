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

import { DB, onValue, ref, update } from '@/firebase'
import MovieAPI from '@/api/movieAPI'

const state = {
  movies: [],
  subscribed: false,
  userMovies: {}
}

const getters = {
  userMovies (state) {
    return state.userMovies
  },
  favoritesList (state, getters) {
    return state.movies.filter( item => getters.isFavorite(item.id))
  },
  watchLaterList (state) {
    return state.movies.filter( item => getters.isWatchLater(item.id))
  },
  isFavorite (state) {
    return (id) => {
      return state.userMovies[id]?.inFavorites === true
    }
  },
  isWatchLater (state) {
    return (id) => {
      return state.userMovies[id]?.inWatchLater === true
    }
  }
}

const mutations = {
  SET_USER_MOVIE (state, payload) {
    state.userMovies[payload.id] = payload
  },
  UPDATE_USER_MOVIE (state, payload) {
    if (!state.userMovies[payload.id]) {
      state.userMovies[payload.id] = {}
    }
    state.userMovies[payload.id] = { ...state.userMovies[payload.id], ...payload }
  },
  SET_USER_MOVIES (state, payload) {
    state.userMovies = payload
  },
  CLEAR_USER_MOVIES (state) {
    state.userMovies = {}
    state.subscribed = false
  },
  SUBSCRIBE (state) {
    state.subscribed = true
  }
}

const actions = {
  getUserMovies ({ commit, state, rootGetters }) {
    const userID = rootGetters['auth/userID']
    const settings = ref(DB, `users/${userID}/movies`)
    if (!state.subscribed) {
      onValue(settings, (snapshot) => {
        const data = snapshot.val()
        commit('SET_USER_MOVIES', data)
      })
      commit('SUBSCRIBE')
    }
  },
  async updateMovie ({ commit, state, rootGetters }, payload) {
    const userID = rootGetters['auth/userID']
    const movieID = payload.id
    if (!userID || !movieID) throw Error('no id')
    const updates = {}
    updates[`users/${userID}/movies/${movieID}`] = { ...state.userMovies[movieID], ...payload }
    await update(ref(DB), updates)
    commit('UPDATE_USER_MOVIE', payload)
  },
  async getFavoriteMovies ({ state, getters }) {
    console.log('get FAVS')
    const promises = []
    Object.values(getters.userMovies).forEach(item => {
      if (getters.isFavorite(item.id) && !state.movies.find(el => el.id === item.id)) {
        console.log('new ID in favorites ', item.id)
        promises.push(MovieAPI.getMovie(item.id))
      }
    })
    state.movies.push(...await Promise.all(promises))
  },
  async getWatchLaterMovies ({ state, getters }) {
    console.log('get WL')
    const promises = []
    Object.values(getters.userMovies).forEach(item => {
      if (getters.isWatchLater(item.id) && !state.movies.find(el => el.id === item.id)) {
        console.log('new ID in watchLater ', item.id)
        promises.push(MovieAPI.getMovie(item.id))
      }
    })
    state.movies.push(...await Promise.all(promises))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
