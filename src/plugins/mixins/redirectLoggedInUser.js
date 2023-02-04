export default {
  watch: {
    isLoggedIn(v) {
      if (v) {
        this.$router.push('/')
      }
    }
  }
}
