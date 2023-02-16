import RutorAPI from '@/api/rutorAPI'

const state = {
  movieList: [],
  isLoading: false
}

const getters = {
  movies: state => page => {
    return state.movieList.filter(movie => movie.page === page)
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
  async getMoviesOnTorrents ({ commit, state }, page) {
    try {
      state.isLoading = true
      if (!state.movieList.some(item => item.page === page)) {
        const res = await RutorAPI.getNewReleases(page)
        commit('SET_MOVIES', res.results)
      }
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
