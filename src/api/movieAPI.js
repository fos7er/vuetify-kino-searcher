import store from '@/store'
import axios from 'axios'

class movieAPI {
  constructor (axios) {
    let service = axios.create({
      baseURL: process.env.VUE_APP_BASE_API_URL,
      timeout: 5000
    })
    service.interceptors.request.use( (config) => this.addRequestParams(config))
    service.interceptors.response.use(this.handleSuccess, this.handleError)
    this.service = service
    this.API_KEY = process.env.VUE_APP_API_KEY
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
    console.error(e)
  }

  handleSuccess (response) {
    return response.data
  }

  handleError = (err) => {
    return Promise.reject(err.response)
  }

  addRequestParams (config) {
    let startSymbol = '&'
    if (config.url.indexOf('?') === -1) {
      startSymbol = '?'
    }
    config.url = `${config.url}${startSymbol}api_key=${this.API_KEY}&language=${this.language}`

    return config
  }

  async getAllMovies ({ sortBy = 'popularity', page = 1, genres = '' } = {}) {
    store.commit('ADD_OVERLAY')
    let path = `/discover/movie?sort_by=${sortBy}.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
    if (genres.length) {
      path += `&with_genres=${genres}`
    }
    try {
      return await this.get(path)
    } catch (e) {
      movieAPI._error(e)
    } finally {
      store.commit('REMOVE_OVERLAY')
    }
  }

  async getAllGenres () {
    const path = '/genre/movie/list'
    try {
      return await this.get(path)
    } catch (e) {
      movieAPI._error(e)
    }
  }

  async getMovie (movieID = movieAPI._required()) {
    const path = `/movie/${movieID}`
    try {
      return await this.get(path)
    } catch (e) {
      movieAPI._error(e)
    } finally {
      store.commit('REMOVE_OVERLAY')
    }
  }

  async searchMovies (query = movieAPI._required(), sortBy = 'popularity') {
    const path = `/search/movie?query=${query}&page=1&include_adult=false`
    try {
      const res = await this.get(path)
      return res.results.sort((a, b) => {
        return a[sortBy] < b[sortBy] ? 1 : -1
      })
    } catch (e) {
      movieAPI._error(e)
    }
  }

  async get (path) {
    return this.service.get(path)
  }

  async post (path, payload) {
    return this.service.request({
      method: 'POST',
      url: path,
      data: payload
    })
  }
}

export default new movieAPI(axios)
