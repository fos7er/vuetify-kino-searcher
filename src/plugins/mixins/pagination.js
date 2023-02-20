export default {
  created () {
    if (+this.$route.query?.page !== this.page) {
      this.$router.replace({ query: { page: `${this.page}` } })
    }
    this.getPage()
  },
  data () {
    return {
      page:  +this.$route.query?.page || 1
    }
  },
  watch: {
    page () {
      this.getPage()
    },
    '$route.query.page' (val) {
      this.page = parseInt(val) || 1
    }
  }
}
