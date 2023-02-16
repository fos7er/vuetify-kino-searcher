import store from '@/store'
import axios from 'axios'

class RutorAPI {
  constructor (axios) {
    let service = axios.create({
      baseURL: process.env.VUE_APP_RUTOR_PARSER_URL,
      timeout: 15000
    })
    service.interceptors.response.use(this.handleSuccess, this.handleError)
    this.service = service
  }


  static _required () {
    throw 'missing required parameter'
  }

  static _error (e) {
    const message = e?.data?.status_message || 'Something went wrong'
    store.commit('SET_ERROR', message)
  }


  handleSuccess (response) {
    return response.data
  }

  handleError = (err) => {
    RutorAPI._error(err.response)
    return Promise.reject(err.response)
  }

  getNewReleases(page) {
    return this.service.get(`/new/${page}`)
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

export default new RutorAPI(axios)
