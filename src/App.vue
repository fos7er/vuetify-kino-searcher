<template>
  <v-app>
    <router-view></router-view>
    <v-snackbar
      v-for="(item, i) in snacks"
      :key="item.id"
      :class="{'error-snackbar': item.type === 'error'}"
      :color="item.type"
      :style="`bottom:${80*i}px`"
      :timeout="item.timeout"
      :value="item"
      bottom
      multi-line
      @input="removeSnack(i)"
    >
      <template #default>{{ item.data }}
      </template>
      <template #action>
        <v-btn
          text
          @click="removeSnack(i)"
          v-text="$t('Close')"
        />
      </template>
    </v-snackbar>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
  import { mapGetters, mapMutations, mapState } from 'vuex'

  export default {
    name: 'App',
    created () {
      this.$store.dispatch('auth/refresh')
      this.$store.commit('userSettings/UPDATE_SETTINGS')
    },
    watch: {
      '$vuetify.lang.current' () {
        this.$store.dispatch('mainPage/getAllGenres')
      },
      isLoggedIn (v) {
        if (v) {
          this.$store.dispatch('userSettings/getSettings')
          this.$store.dispatch('movies/getUserMovies')
        }
      }
    },
    computed: {
      ...mapState(['overlay', 'snacks']),
      ...mapGetters({
        isLoggedIn: 'auth/isLoggedIn'
      })
    },
    methods: {
      ...mapMutations({
        removeSnack: 'REMOVE_SNACK'
      })
    }
  }
</script>

<style>
  :root {
    color-scheme: var(--colorTheme);
  }
</style>
