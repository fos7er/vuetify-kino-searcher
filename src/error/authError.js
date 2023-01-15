import store from '@/store'

export default class AuthError {
  constructor(e) {
    this.message =  e.message || 'something went wrong'
    this.showMessage()
  }

  showMessage = () => {
    const msg = this.message
    store.commit('SET_ERROR', msg, { root: true })
  }
}
