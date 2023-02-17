<template>
  <v-container>
    <v-row align="stretch" justify="center">
      <v-col v-for="movie in movies" :key="movie.id" cols="12" lg="3" md="4" sm="6">
        <movie-card :movie="movie" @click.native="movieClick(movie.id)"/>
      </v-col>
    </v-row>
    <v-row v-show="movies.length" justify="center">
      <v-pagination v-model="page" :length="3"/>
    </v-row>
  </v-container>
</template>

<script>
  import mixinPagination from '@/plugins/mixins/pagination'
  import movieCard from '@/components/mainpage/MovieCard'
  import { deepMerge } from '@/utils/deep'

  export default {
    components: {
      movieCard
    },
    mixins:[mixinPagination],
    computed: {
      movies() {
        return this.$store.getters['torrents/movies'](this.page)
      }
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
        if (+this.$route.query?.page !== this.page) {
          await this.$router.push({ query: { page: `${this.page}` } })
        }
        await this.$store.dispatch('torrents/getMoviesOnTorrents', this.page)
      }
    }
  }
</script>
