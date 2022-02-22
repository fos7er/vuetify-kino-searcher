import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/css/style.scss'
import { movieAPI } from './api/movieAPI'
import i18n from './plugins/i18n'

Vue.prototype.movieAPI = new movieAPI(axios)
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
