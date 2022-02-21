import languages from '@/locales/languages'

const state = {
  lang: getDefaultLanguage(),
  avaliableLanguages: languages,
}

const getters = {
  lang(state) {
    return state.lang
  },
  allLang(state) {
    const languages = state.avaliableLanguages
    const result = []
    for (const key in languages) {
      result.push(languages[key])
    }
    return result
  },
}

const mutations = {
  setLang(state, payload) {
    state.lang = payload
  },
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

function getDefaultLanguage() {
  if (localStorage.getItem('lang')) {
    return localStorage.getItem('lang')
  }
  const browserLang = navigator.language || navigator.userLanguage
  if (languages[browserLang]) {
    return browserLang
  }
  return 'ru-RU'
}
