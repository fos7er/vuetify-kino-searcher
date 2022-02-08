<template>
  <v-app>
    <router-view></router-view>
    <v-snackbar :value="success" bottom multi-line :timeout="2500" color="success">
      {{ success }}
      <v-btn text @click="$store.commit('SET_SUCCESS', false)">
        {{ 'Close' }}
      </v-btn>
    </v-snackbar>
    <v-snackbar :value="warning" bottom multi-line :timeout="6000" color="warning">
      {{ warning }}
      <v-btn text @click="$store.commit('SET_WARNING', false)">
        {{ 'Close' }}
      </v-btn>
    </v-snackbar>
    <v-snackbar :value="error" bottom class="error-snackbar" multi-line :timeout="7000" color="error">
      {{ error }}
      <v-btn text @click="$store.commit('SET_ERROR', false)">
        {{ 'Close' }}
      </v-btn>
    </v-snackbar>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',

  components: {
    //HelloWorld,
  },

  data: () => ({}),
  computed: {
    ...mapState(['overlay', 'success', 'warning', 'error']),
  },
  beforeDestroy() {
    this.$store.commit('RESET_SNACKBAR')
  },
}
</script>
