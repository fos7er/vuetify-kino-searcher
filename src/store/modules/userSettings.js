import languages from '@/locales/languages'
import i18n from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'

const state = {
  lang: null,
  availableLanguages: languages
}

const getters = {
  lang (state) {
    return state.lang
  },
  allLang (state) {
    const languages = state.availableLanguages
    const result = []
    for (const key in languages) {
      result.push(languages[key])
    }
    return result
  }
}

const mutations = {
  SET_LANG (state, payload) {
    state.lang = payload
    vuetify.framework.lang.current = state.lang
    i18n.locale = state.lang
    localStorage.setItem('lang', payload)
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
