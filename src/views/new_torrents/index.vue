<template>
  <v-row justify="center">
    <v-col xl="10">
      <torrents-list @movieClick="openMovieDialog"/>
      <movie-dialog :movie="movieDialogData" ref="dialog"/>
    </v-col>
  </v-row>
</template>

<script>
  import TorrentsList from '@/components/new_torrents/TorrentsList'
  import MovieDialog from '@/components/mainpage/MovieDialog'

  export default {
    components: {
      MovieDialog,
      TorrentsList
    },
    data () {
      return {
        movieDialogData: {}
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
