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
  import mixinPagination from '@/plugins/mixins/pagination'
  import movieCard from './MovieCard'
  import { deepMerge } from '@/utils/deep'

  export default {
    components: {
      movieCard
    },
    mixins:[mixinPagination],
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
    beforeCreate () {
      this.$store.commit('mainPage/CLEAR_MOVIES')
    },
    methods: {
      async movieClick (movieID) {
        const [movie, credits] = await Promise.all([
          this.MovieAPI.getMovie(movieID),
          this.MovieAPI.getMovieCredits(movieID)
        ])
        this.$emit('movieClick', deepMerge(movie, credits))
      },
      async getPage () {
        const data = {
          page: this.page,
          genres: this.genreID
        }
        if ( +this.$route.query?.page !== this.page ){
          await this.$router.push({ query: { page: `${this.page}` } })
        }
        await this.$store.dispatch('mainPage/getAllMovies', data)
      }
    },
    watch: {
      '$vuetify.lang.current' () {
        this.$store.commit('mainPage/CLEAR_MOVIES')
        this.getPage()
      }
    }
  }
</script>
