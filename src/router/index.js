import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  base: '/',
  mode: 'history',
  routes,
})

const auth = {
  isLoggedIn() {
    return false
  },
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !auth.isLoggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    })
  } else next()
})

export default router
