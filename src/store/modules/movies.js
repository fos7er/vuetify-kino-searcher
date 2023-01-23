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
  list: [],
  subscribed: false,
  movies: {}
}

const getters = {
  movies (state) {
    return state.movies
  },
  favoritesList (state) {
    const result = []
    for (const item of Object.values(state.movies)) {
      if (item.inFavorites) {
        //TODO ADD DEEP-CLONE
        result.push(item)
      }
    }
    return result
  },
  watchLaterList (state) {
    const result = []
    for (const item of Object.values(state.movies)) {
      if (item.inWatchLater) {
        //TODO ADD DEEP-CLONE
        result.push(item)
      }
    }
    return result
  },
  isFavorite (state) {
    return (id) => {
      return state.movies[id]?.inFavorites === true
    }
  },
  isWatchLater (state) {
    return (id) => {
      return state.movies[id]?.inWatchLater === true
    }
  }
}

const mutations = {
  SET_MOVIE (state, payload) {
    state.movies[payload.id] = payload
  },
  UPDATE_MOVIE (state, payload) {
    if (!state.movies[payload.id]) {
      state.movies[payload.id] = {}
    }
    state.movies[payload.id] = { ...state.movies[payload.id], ...payload }
  },
  SET_MOVIES (state, payload) {
    state.movies = payload
  },
  CLEAR_MOVIES (state) {
    state.movies = {}
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
        commit('SET_MOVIES', data)
      })
      commit('SUBSCRIBE')
    }
  },
  async updateMovie ({ commit, state, rootGetters }, payload) {
    const userID = rootGetters['auth/userID']
    const movieID = payload.id
    if (!userID || !movieID) throw Error('no id')
    const updates = {}
    updates[`users/${userID}/movies/${movieID}`] = { ...state.movies[movieID], ...payload }
    await update(ref(DB), updates)
    commit('UPDATE_MOVIE', payload)
  },
  async getFavoriteMovies ({ state, getters }) {
    console.log('get FAVS')
    const promises = []
    getters.favoritesList.forEach(item => {
      if (getters.isFavorite(item.id) && !state.list.find(el => el.id === item.id)) {
        console.log('new ID in favorites ', item.id)
        promises.push(MovieAPI.getMovie(item.id))
      }
    })
    state.list.push(...await Promise.all(promises))
  },
  async getWatchLaterMovies ({ state, getters }) {
    console.log('get WL')
    const promises = []
    getters.watchLaterList.forEach(item => {
      if (getters.isWatchLater(item.id) && !state.list.find(el => el.id === item.id)) {
        console.log('new ID in watchLater ', item.id)
        promises.push(MovieAPI.getMovie(item.id))
      }
    })
    state.list.push(...await Promise.all(promises))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
