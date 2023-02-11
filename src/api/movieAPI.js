import store from '@/store'
import axios from 'axios'

class MovieAPI {
  constructor (axios) {
    let service = axios.create({
      baseURL: process.env.VUE_APP_BASE_API_URL,
      timeout: 5000,
      params: {
        api_key: process.env.VUE_APP_API_KEY,
        include_adult: false
      }
    })
    service.interceptors.request.use((config) => this.addRequestParams(config))
    service.interceptors.response.use(this.handleSuccess, this.handleError)
    this.service = service
  }

  get language () {
    return store.getters['userSettings/lang']
  }

  static _required () {
    throw 'missing required parameter'
  }

  static _error (e) {
    const message = e?.data?.status_message || 'Something went wrong'
    store.commit('SET_ERROR', message)
  }

  addRequestParams (config) {
    config.params.language = this.language
    return config
  }

  handleSuccess (response) {
    return response.data
  }

  handleError = (err) => {
    MovieAPI._error(err.response)
    return Promise.reject(err.response)
  }

  async getAllMovies ({ sortBy = 'popularity', page = 1, genres = '' } = {}) {
    store.commit('ADD_OVERLAY')
    let url = `/discover/movie?sort_by=${sortBy}.desc&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
    if (genres.length) {
      url += `&with_genres=${genres}`
    }
    try {
      return await this.get(url)
    } catch (e) {
      return Promise.reject(e)
    } finally {
      store.commit('REMOVE_OVERLAY')
    }
  }

  async getAllGenres () {
    const url = '/genre/movie/list'
    try {
      return await this.get(url)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async getMovie (movieID = MovieAPI._required()) {
    const url = `/movie/${movieID}`
    store.commit('ADD_OVERLAY')
    try {
      return await this.get(url)
    } catch (e) {
      return Promise.reject(e)
    } finally {
      store.commit('REMOVE_OVERLAY')
    }
  }

  async getMovieCredits (movieID = MovieAPI._required()) {
    const url = `/movie/${movieID}/credits`
    try {
      return await this.get(url)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async searchMovies (query = MovieAPI._required(), sortBy = 'popularity') {
    const url = `/search/movie?query=${query}&page=1`
    try {
      const res = await this.get(url)
      return res.results.sort((a, b) => {
        return a[sortBy] < b[sortBy] ? 1 : -1
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async get (url) {
    return this.service.get(url)
  }

  async post (url, payload) {
    return this.service.request({
      data: payload,
      method: 'POST',
      url
    })
  }
}

export default new MovieAPI(axios)
