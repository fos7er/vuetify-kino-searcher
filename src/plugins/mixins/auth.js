import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
      userName:'userSettings/userName'
    })
  }

}
