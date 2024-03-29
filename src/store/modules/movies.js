/**
 *  This is List of all users movies which stores data in firebase about user interaction with movies
 *  in DB we have JSON like this:
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
 *  to delete property from DB send null value
 * **/
import MovieAPI from '@/api/movieAPI'
import { DB, onValue, ref, update } from '@/firebase'
import { deepMerge } from '@/utils/deep'

const state = {
  movies: [],
  subscribed: false,
  userMovies: {},
  isLoading: false
}

const getters = {
  userMovies (state) {
    return state.userMovies
  },
  movies () {
    return state.movies.map(movie => {
      const userMovie = state.userMovies[movie.id]
      return deepMerge({}, movie, userMovie)
    })
  },
  loading (state) {
    return state.isLoading
  },
  favoritesList (state, getters) {
    return getters.movies.filter(item => getters.isFavorite(item.id))
  },
  watchLaterList (state, getters) {
    return getters.movies.filter(item => getters.isWatchLater(item.id))
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
  },
  userRating (state) {
    return (id) => state.userMovies[id]?.userRating || 0
  },
  userNote (state) {
    return (id) => state.userMovies[id]?.note || ''
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
    deepMerge(state.userMovies[payload.id], payload)
  },
  SET_USER_MOVIES (state, payload) {
    if (!payload) return
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
    state.isLoading = true
    const userID = rootGetters['auth/userID']
    const settings = ref(DB, `users/${userID}/movies`)
    if (!state.subscribed) {
      onValue(settings, (snapshot) => {
        const data = snapshot.val()
        commit('SET_USER_MOVIES', data)
        state.isLoading = false
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
  async getFavoriteMovies ({ state, getters, dispatch }) {
    const favoritesToFetch = Object.values(getters.userMovies).filter(movie => getters.isFavorite(movie.id) && !state.movies.find(el => el.id === movie.id))
    await dispatch('getMovies', favoritesToFetch)
  },
  async getWatchLaterMovies ({ state, getters, dispatch }) {
    const watchLaterToFetch = Object.values(getters.userMovies).filter(movie => getters.isWatchLater(movie.id) && !state.movies.find(el => el.id === movie.id))
    await dispatch('getMovies', watchLaterToFetch)
  },
  async getMovies ({ state }, movies) {
    const promises = []
    movies.forEach(movie => promises.push(MovieAPI.getMovie(movie.id)))
    try {
      state.isLoading = true
      state.movies.push(...await Promise.all(promises))
    } finally {
      state.isLoading = false
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
