<template>
  <v-app>
    <router-view></router-view>
    <v-snackbar v-model="success" :timeout="2500" bottom color="success" multi-line>
      {{ success }}
      <v-btn text @click="$store.commit('SET_SUCCESS', false)">
        {{ 'Close' }}
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="warning" :timeout="6000" bottom color="warning" multi-line>
      {{ warning }}
      <v-btn text @click="$store.commit('SET_WARNING', false)">
        {{ 'Close' }}
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="error" :timeout="7000" bottom class="error-snackbar" color="error" multi-line>
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
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'App',
    created () {
      //TODO get settings from backend
      this.$store.commit('userSettings/SET_SETTINGS', {})
    },
    watch: {
      '$vuetify.lang.current' () {
        this.$store.dispatch('mainPage/getAllGenres')
      },
      isLoggedIn(v) {
        if (v) {
          this.$store.dispatch('userSettings/getSettings')
        }
      }
    },
    computed: {
      ...mapState(['overlay']),
      ...mapGetters({
        isLoggedIn: 'auth/isLoggedIn'
      }),
      success: {
        get: function () {
          return this.$store.state.success
        },
        set: function (e) {
          if (!e) this.$store.commit('SET_SUCCESS', null)
        }
      },
      warning: {
        get: function () {
          return this.$store.state.warning
        },
        set: function (e) {
          if (!e) this.$store.commit('SET_WARNING', null)
        }
      },
      error: {
        get: function () {
          return this.$store.state.error
        },
        set: function (e) {
          if (!e) this.$store.commit('SET_ERROR', null)
        }
      }
    },
    beforeDestroy () {
      this.$store.commit('RESET_SNACKBAR')
    }
  }
</script>

<style>
  :root {
    color-scheme: var(--colorTheme);
  }
</style>
