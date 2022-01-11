import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import './assets/css/style.scss'

const movieAPI = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
  timeout: 5000,
})

Vue.prototype.movieAPI = movieAPI
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app')
