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
        page: +this.$route.query?.page || 1
      }
    },
    computed: {
      movies () {
        return this.$store.getters['mainPage/movies'](this.page)
      },
      totalVisible () {
        return this.$vuetify.breakpoint.name === 'xs' ? 5 : 9
      },
      genreID() {
        return this.$route.params.genreID
      }
    },
    created () {
      this.$store.commit('mainPage/CLEAR_MOVIES')
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
          genres: this.genreID
        }
        this.$store.dispatch('mainPage/getAllMovies', data)
        if ( +this.$route.query?.page !== this.page ){
          this.$router.push({ query: { page: `${this.page}` } })
        }
      }
    },
    watch: {
      page () {
        this.getAllMovies()
      },
      '$route.query.page'(val) {
        this.page = parseInt(val) || 1
      },
      '$vuetify.lang.current' () {
        this.$store.commit('mainPage/CLEAR_MOVIES')
        this.getAllMovies()
      }
    }
  }
</script>

<style lang="scss" scoped></style>
