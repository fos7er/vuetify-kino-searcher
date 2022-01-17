<template>
  <div>
    <movie-list @movieClick="movieClickHandler" />
    <v-dialog v-model="movieDialog" max-width="1100px">
      <movie-dialog-content @closeDialog="movieDialog = false" />
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
    }
  },
  methods: {
    movieClickHandler() {
      this.movieDialog = true
      this.$store.commit('auth/login', { some: 1 })
    },
  },
}
</script>

<style lang="scss" scoped></style>
