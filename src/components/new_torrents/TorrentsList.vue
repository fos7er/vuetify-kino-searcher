<template>
  <v-container>
    <v-row align="stretch" justify="center">
      <v-col v-for="movie in movies" :key="movie.id" cols="12" lg="3" md="4" sm="6">
        <movie-card :movie="movie" @click.native="movieClick(movie.id)"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import movieCard from '@/components/mainpage/MovieCard'
  import { deepMerge } from '@/utils/deep'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      movieCard
    },
    created () {
      this.$store.dispatch('torrents/getMoviesOnTorrents')
    },
    computed: {
      ...mapGetters({
        movies: 'torrents/movies'
      })
    },
    methods: {
      async movieClick (movieID) {
        const [movie, credits] = await Promise.all([
          this.MovieAPI.getMovie(movieID),
          this.MovieAPI.getMovieCredits(movieID)
        ])
        this.$emit('movieClick', deepMerge(movie, credits))
      }
    }
  }
</script>
