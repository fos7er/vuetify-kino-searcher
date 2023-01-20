import movieAPI from '@/api/movieAPI'
import { movieGenreIcons } from '@/dicts'

const state = {
  movieList: [],
  genreList: []
}

const getters = {
  movies: (state) => (page) => {
    return state.movieList.filter((movie) => movie.page === page)
  },
  genres: (state) => {
    return state.genreList.map((genre) => {
      return {
        id: genre.id,
        icon: movieGenreIcons[genre.id],
        name: genre.name,
        to: `/genre/${genre.id}`
      }
    })
  },
  genre: (state, getters) => id => {
    return getters.genres.find( item => item.id === id ) || null
  }
}

const mutations = {
  SET_MOVIES (state, movies) {
    state.movieList.push(...movies)
  },
  CLEAR_MOVIES (state) {
    state.movieList = []
  },
  SET_GENRES (state, genres) {
    state.genreList = genres
  }
}

const actions = {
  async getAllMovies ({ commit, state }, payload) {
    if (state.movieList.some((movie) => movie.page === payload.page)) {
      console.log('already has this page, load from cache')
      return false
    }
    const res = await movieAPI.getAllMovies(payload)
    res.results.forEach((item) => (item.page = payload.page))
    commit('SET_MOVIES', res.results)
  },
  async getAllGenres ({ commit }) {
    const res = await movieAPI.getAllGenres()
    commit('SET_GENRES', res.genres)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
