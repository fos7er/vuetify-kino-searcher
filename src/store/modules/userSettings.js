import languages from '@/locales/languages'
import i18n from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'
import { LocalStorage } from '@/utils/WebStorage'
import defaultLang from '@/utils/defaultLang'
import { DB, onValue, ref, update } from '@/firebase'

const state = {
  availableLanguages: languages,
  subscribed: false,
  settings: LocalStorage.settings || {
    lang: defaultLang(),
    theme: vuetify.framework.theme.dark === true ? 'dark' : 'light'
  }
}

const getters = {
  lang (state) {
    return state.settings.lang
  },
  allLang (state) {
    const languages = state.availableLanguages
    const result = []
    for (const key in languages) {
      result.push(languages[key])
    }
    return result
  },
  theme (state) {
    return state.settings.theme
  }
}

const mutations = {
  SET_SETTINGS (state, payload) {
    //TODO check settings: every settings in default settings
    state.settings = { ...state.settings, ...payload }
    vuetify.framework.lang.current = i18n.locale = state.settings.lang
    LocalStorage.settings = state.settings
    vuetify.framework.theme.dark = state.settings.theme === 'dark'
    document.documentElement.style.setProperty('--colorTheme', state.settings.theme)
  },
  SUBSCRIBE (state) {
    state.subscribed = true
  }
}

const actions = {
  async setSettings ({ commit, rootGetters }, payload) {
    const userID = rootGetters['auth/userID']
    if (!userID) throw Error('no user id')
    const updates = {}
    updates[`users/${userID}/settings`] = { ...state.settings, ...payload }
    await update(ref(DB), updates)
    commit('SET_SETTINGS', payload)
  },
  getSettings ({ commit, state, rootGetters }) {
    const userID = rootGetters['auth/userID']
    const settings = ref(DB, `users/${userID}/settings`)
    if (!state.subscribed) {
      onValue(settings, (snapshot) => {
        const data = snapshot.val()
        commit('SET_SETTINGS', data)
      })
      commit('SUBSCRIBE')
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
