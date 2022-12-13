import store from '@/store'

class movieAPI {
  constructor (axios) {
    let service = axios.create({
      baseURL: process.env.VUE_APP_BASE_API_URL,
      timeout: 5000
    })
    service.interceptors.response.use(this.handleSuccess, this.handleError)
    this.service = service
    this.API_KEY = process.env.VUE_APP_API_KEY
  }

  get language () {
    return store.getters['userSettings/lang']
  }

  static _reqiured () {
    throw 'missing required parameter'
  }

  static _error (e) {
    const message = e.data?.errors || 'Something went wrong'
    store.commit('SET_ERROR', message)
    console.error(e)
  }

  handleSuccess (response) {
    return response.data
  }

  handleError = (err) => {
    return Promise.reject(err.response)
  }

  discover ({ sortBy = 'popularity', page = 1, genres = '' } = {}) {
    store.commit('SET_OVERLAY', true)
    let path = `/discover/movie?api_key=${this.API_KEY}&language=${this.language}&sort_by=${sortBy}.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
    if (genres.length) {
      path += `&with_genres=${genres}`
    }
    return this.get(path)
      .catch((e) => {
        movieAPI._error(e)
      })
      .finally(() => {
        store.commit('SET_OVERLAY')
      })
  }

  getAllGenres () {
    const path = `/genre/movie/list?api_key=${this.API_KEY}&language=${this.language}`
    return this.get(path).catch((e) => {
      movieAPI._error(e)
    })
  }

  getMovie (movieID = movieAPI._reqiured()) {
    const path = `/movie/${movieID}?api_key=${this.API_KEY}&language=${this.language}`
    return this.get(path)
      .catch((e) => {
        movieAPI._error(e)
      })
      .finally(() => {
        store.commit('SET_OVERLAY')
      })
  }

  searchMovies (query = movieAPI._reqiured(), sortBy = 'popularity') {
    const path = `/search/movie?api_key=${this.API_KEY}&language=${this.language}&query=${query}&page=1&include_adult=false`
    return this.get(path)
      .then((res) => {
        res.results = res.results.sort((a, b) => {
          return a[sortBy] < b[sortBy] ? 1 : -1
        })
        return res
      })
      .catch((e) => {
        movieAPI._error(e)
      })
  }

  get (path) {
    return this.service.get(path)
  }

  post (path, payload) {
    return this.service.request({
      method: 'POST',
      url: path,
      data: payload
    })
  }
}

export { movieAPI }
