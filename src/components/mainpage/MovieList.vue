<template>
  <v-container>
    <v-row align="stretch" justify="center">
      <v-col v-for="movie in movies" :key="movie.id" cols="12" lg="3" md="4" sm="6">
        <movie-card :movie="movie" @click.native="movieClick(movie.id)"/>
      </v-col>
    </v-row>
    <v-row v-show="movies.length" justify="center">
      <v-pagination v-model="page" :length="500" :total-visible="totalVisible"></v-pagination>
    </v-row>
  </v-container>
</template>

<script>
  import movieCard from './MovieCard'
  import { deepMerge } from '@/utils/deep'

  export default {
    components: {
      movieCard
    },
    data () {
      return {
        page: +this.$router.currentRoute.query.page || 1,
        genres: ''
      }
    },
    computed: {
      movies () {
        return this.$store.getters['mainPage/movies'](this.page)
      },
      totalVisible () {
        return this.$vuetify.breakpoint.name === 'xs' ? 5 : 9
      }
    },
    created () {
      this.$store.commit('mainPage/CLEAR_MOVIES')
      if (this.$route.path.includes('genre') && this.$route.params?.genreID) {
        this.genres = this.$route.params.genreID
      }
      this.getAllMovies()
    },
    methods: {
      async movieClick (movieID) {
        const [movie, credits] = await Promise.all([
          this.MovieAPI.getMovie(movieID),
          this.MovieAPI.getMovieCredits(movieID)
        ])
        this.$emit('movieClick', deepMerge(movie, credits))
      },
      getAllMovies () {
        const data = {
          page: this.page,
          genres: this.genres
        }
        this.$store.dispatch('mainPage/getAllMovies', data)
        window.history.replaceState(null, null, `?page=${this.page}`)
      }
    },
    watch: {
      page (val) {
        this.getAllMovies()
      }
    }
  }
</script>

<style lang="scss" scoped></style>
