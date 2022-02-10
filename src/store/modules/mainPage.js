const state = {
  movieList: [],
}

const getters = {
  movies: (state) => (page) => {
    return state.movieList.filter((movie) => movie.page === page)
  },
}

const mutations = {
  SET_MOVIES(state, movies) {
    state.movieList.push(...movies)
  },
}

const actions = {
  getAllMovies({ commit, state }, payload) {
    if (state.movieList.some((movie) => movie.page === payload.page)) {
      console.log('already has this page, load from cache')
      return false
    }
    this._vm.movieAPI.discover(payload).then((response) => {
      response.results.forEach((item) => (item.page = payload.page))
      commit('SET_MOVIES', response.results)
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
