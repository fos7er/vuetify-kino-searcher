<template>
  <div>
    <movie-list @movieClick="movieClickHandler" :key="$route.fullPath" />
    <v-dialog v-model="movieDialog" max-width="1100px">
      <movie-dialog-content :movie="movieDailogData" @closeDialog="movieDialog = false" />
    </v-dialog>
  </div>
</template>

<script>
import MovieList from '../components/mainpage/MovieList.vue'
import movieDialogContent from '../components/mainpage/MovieDialog.vue'
export default {
  components: {
    MovieList,
    movieDialogContent,
  },
  data() {
    return {
      movieDialog: false,
      movieDailogData: {},
    }
  },
  methods: {
    movieClickHandler(payload) {
      this.movieDailogData = payload
      this.movieDialog = true
      this.$store.commit('auth/login', { some: 1 })
    },
  },
}
</script>

<style lang="scss" scoped></style>
