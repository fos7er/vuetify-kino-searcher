import movieAPI from '@/api/movieAPI'

const state = {
  movieList: []
}

const getters = {
  movies: (state) => (page) => {
    return state.movieList.filter((movie) => movie.page === page)
  }
}

const mutations = {
  SET_MOVIES (state, movies) {
    state.movieList.push(...movies)
  },
  CLEAR_MOVIES (state) {
    state.movieList = []
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
