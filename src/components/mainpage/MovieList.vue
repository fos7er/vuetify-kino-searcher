<template>
  <v-container>
    <v-row align="stretch">
      <v-col v-for="movie in movies" :key="movie.id" colls="12" sm="6" md="4" lg="3">
        <movie-card :movie="movie" @click.native="movieClick(movie.id)" />
      </v-col>
    </v-row>
    <v-row v-show="movies.length" justify="center">
      <v-pagination v-model="page" :length="500" :total-visible="9"></v-pagination>
    </v-row>
  </v-container>
</template>

<script>
import movieCard from './MovieCard'
export default {
  components: {
    movieCard,
  },
  data() {
    return {
      page: 1,
      genres: '',
    }
  },
  computed: {
    movies() {
      return this.$store.getters['mainPage/movies'](this.page)
    },
  },
  created() {
    this.$store.commit('mainPage/CLEAR_MOVIES')
    if (this.$route.path.includes('genre') && this.$route.params?.id) {
      this.genres = this.$route.params.id
    }
    this.getAllMovies()
  },
  methods: {
    movieClick(movieID) {
      this.movieAPI.getMovie(movieID).then((response) => {
        this.$emit('movieClick', response)
      })
    },
    getAllMovies() {
      const data = {
        page: this.page,
        genres: this.genres,
      }
      this.$store.dispatch('mainPage/getAllMovies', data)
    },
  },
  watch: {
    page() {
      this.getAllMovies()
    },
  },
}
</script>

<style lang="scss" scoped></style>
