<template>
  <v-row justify="center">
    <v-col xl="10">
      <h2 v-if="genreName" class="text-center"> {{ $t('genresPageTitle', [genreName]) }}</h2>
      <movie-list :key="$route.params.genreID" @movieClick="openMovieDialog"/>
      <movie-dialog :movie="movieDialogData" ref="dialog"/>
    </v-col>
  </v-row>


</template>

<script>
  import MovieList from '@/components/mainpage/MovieList'
  import MovieDialog from '@/components/mainpage/MovieDialog'

  export default {
    components: {
      MovieDialog,
      MovieList
    },
    data () {
      return {
        movieDialogData: {}
      }
    },
    computed: {
      genreName () {
        const genreID = +this.$route.params.genreID || null
        return this.$store.getters['mainPage/genre'](genreID)?.name || ''
      }
    },
    methods: {
      openMovieDialog (payload) {
        this.movieDialogData = payload
        this.$refs.dialog.open()
      }
    }

  }
</script>
