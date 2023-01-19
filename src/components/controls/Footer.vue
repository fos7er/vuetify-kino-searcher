<template>
  <v-footer :absolute="!isFixedFooter" app>
    <span>&copy; {{ new Date().getFullYear() }}</span>
  </v-footer>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        isFixedFooter: 'controls/isFixedFooter'
      })
    }
  }
</script>

