import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import './assets/css/style.scss'
import movieAPI from './api/movieAPI'
import i18n from './plugins/i18n'

Vue.prototype.movieAPI = movieAPI
Vue.config.productionTip = false

vuetify.framework.theme.dark = true

Vue.mixin({
  data () {
    return {
      globalRules: {
        required: (v) => !!v || this.$t('inputRequired'),
        email: (v) =>
          (v ? /^[A-Za-z0-9._%-]+@[a-z0-9.-]+[.][a-z]+$/.test(v) && /^.{1,64}@.{1,250}$/.test(v) : true) ||
          this.$t('incorrectEmail'),
        same: (one) => {
          return (another) => {
            return one === another ? true : this.$t('notIdenticalPasswords')
          }
        },
        minLength: (length) => {
          return (v) => {
            return v.length >= length ? true : `${this.$t('minLength')} ${length - 1} ${this.$t('characters')}`
          }
        }
      }
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
