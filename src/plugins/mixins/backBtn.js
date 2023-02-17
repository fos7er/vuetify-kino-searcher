export default {
  created() {
    const unregisterRouterGuard = this.$router.beforeEach((to, from, next) => {
      if (this.dialog) {
        this.dialog = false
        next(false)
        return
      }

      next()
    })
    this.$once('hook:destroyed', () => {
      //unregister our guard
      unregisterRouterGuard()
    })
  }
}
