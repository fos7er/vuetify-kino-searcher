export default {
  watch: {
    isLoggedIn(v) {
      if (v) {
        this.$router.push({ path: this.$route.query.redirect || '/' })
      }
    }
  }
}
