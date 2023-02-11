import RutorAPI from '@/api/rutorAPI'
import store from '@/store'

const state = {
  movieList: []
}

const getters = {
  movies: (state) =>  {
    return state.movieList
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
  async getMoviesOnTorrents ({ commit, state }) {
    try {
      store.commit('ADD_OVERLAY')
      if (!state.movieList.length) {
        const res = await RutorAPI.getNewReleases()
        commit('SET_MOVIES',res.results)
      }
    } finally {
      store.commit('REMOVE_OVERLAY')
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
