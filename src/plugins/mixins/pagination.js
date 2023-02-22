export default {
  created () {
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
