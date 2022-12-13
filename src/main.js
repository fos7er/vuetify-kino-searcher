import './assets/css/style.scss'
import App from './App.vue'
import i18n from './plugins/i18n'
import movieAPI from './api/movieAPI'
import router from './router'
import store from './store'
import Vue from 'vue'
import vuetify from './plugins/vuetify'
import { VueMaskDirective } from 'v-mask'
import globalRules from '@/plugins/mixins/globalRules'

Vue.prototype.movieAPI = movieAPI
Vue.config.productionTip = false

vuetify.framework.theme.dark = true

Vue.directive('mask', VueMaskDirective)

Vue.mixin({
  data () {
    return {
      globalRules: globalRules.call(this)
    }
  }
})

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
