class movieAPI {
  constructor(axios) {
    let service = axios.create({
      baseURL: process.env.VUE_APP_BASE_API_URL,
      timeout: 5000,
    })
    service.interceptors.response.use(this.handleSuccess, this.handleError)
    this.service = service
  }

  handleSuccess(response) {
    return response
  }

  handleError = (err) => {
    return Promise.reject(err)
  }

  get(path) {
    return this.service.get(path)
  }

  post(path, payload) {
    return this.service.request({
      method: 'POST',
      url: path,
      data: payload,
    })
  }
}

export { movieAPI }
