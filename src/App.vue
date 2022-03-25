<template>
  <v-app>
    <router-view></router-view>
    <v-snackbar v-model="success" bottom multi-line :timeout="2500" color="success">
      {{ success }}
      <v-btn text @click="$store.commit('SET_SUCCESS', false)">
        {{ 'Close' }}
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="warning" bottom multi-line :timeout="6000" color="warning">
      {{ warning }}
      <v-btn text @click="$store.commit('SET_WARNING', false)">
        {{ 'Close' }}
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="error" bottom class="error-snackbar" multi-line :timeout="7000" color="error">
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
    ...mapState(['overlay']),
    success: {
      get: function () {
        return this.$store.state.success
      },
      set: function (e) {
        if (!e) this.$store.commit('SET_SUCCESS', null)
      },
    },
    warning: {
      get: function () {
        return this.$store.state.warning
      },
      set: function (e) {
        if (!e) this.$store.commit('SET_WARNING', null)
      },
    },
    error: {
      get: function () {
        return this.$store.state.error
      },
      set: function (e) {
        if (!e) this.$store.commit('SET_ERROR', null)
      },
    },
  },
  beforeDestroy() {
    this.$store.commit('RESET_SNACKBAR')
  },
}
</script>
