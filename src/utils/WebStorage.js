const handlers = {
  get(target, prop) {
    return JSON.parse(target.getItem(prop))
  },
  set(target, prop, value) {
    target.setItem(prop,JSON.stringify(value))
    return true
  }
}

const LocalStorage = new Proxy(localStorage, handlers)

const SessionStorage =  new Proxy(sessionStorage, handlers)

export  { LocalStorage, SessionStorage }
