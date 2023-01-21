import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store/index'

Vue.use(VueRouter)

const router = new VueRouter({
  base: '/',
  mode: 'history',
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.reqAuth && !store.getters['auth/isLoggedIn']) {
    await store.dispatch('auth/refresh')
    if (!store.getters['auth/isLoggedIn']) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else next()

  } else next()
})

export default router
