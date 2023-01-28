import './styles/style.scss'
import App from './App.vue'
import i18n from './plugins/i18n'
import MovieAPI from './api/movieAPI'
import router from './router'
import Vue from 'vue'
import vuetify from './plugins/vuetify'
import store from './store'
import { VueMaskDirective } from 'v-mask'
import globalRules from '@/plugins/mixins/globalRules'
import authMixin from '@/plugins/mixins/auth'
import DialogConfirm from './components/common/DialogConfirm'

Vue.prototype.MovieAPI = MovieAPI
Vue.config.productionTip = false
document.documentElement.style.setProperty('--colorTheme', store.getters['userSettings/theme'])

Vue.directive('mask', VueMaskDirective)
Vue.component('dialog-confirm', DialogConfirm)

Vue.mixin({
  data () {
    return {
      globalRules: globalRules.call(this)
    }
  },
  ...authMixin
})

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
