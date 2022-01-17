<template>
  <v-container>
    <v-row align="stretch">
      <v-col
        v-for="movie in movies"
        :key="movie.id"
        colls="12"
        sm="6"
        md="4"
        lg="3"
      >
        <movie-card :movie="movie" @click.native="movieClick(movie.id)" />
      </v-col>
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
      movies: [],
    }
  },
  created() {
    const url =
      '/discover/movie?api_key=98f3df32cd6ce21c4254fd6007f462a1&language=ru-RU&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'
    this.movieAPI
      .get(url)
      .then((response) => (this.movies = response.data.results))
  },
  methods: {
    movieClick(movieID) {
      this.$emit('movieClick', { id: movieID })
      const url = `/movie/${movieID}?api_key=98f3df32cd6ce21c4254fd6007f462a1&language=ru-RU`
      this.movieAPI.get(url).then((response) => console.log(response.data))
    },
  },
}
</script>

<style lang="scss" scoped></style>
