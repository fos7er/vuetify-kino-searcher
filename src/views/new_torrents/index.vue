<template>
  <v-row justify="center" align="center">
    <v-col xl="10">
      <Progress v-if="loading" color="primary" :capacity="18000" style="margin-top:40vh"/>
      <torrents-list v-show="!loading" @movieClick="openMovieDialog"/>
      <movie-dialog :movie="movieDialogData" ref="dialog"/>
    </v-col>
  </v-row>
</template>

<script>
  import MovieDialog from '@/components/mainpage/MovieDialog'
  import Progress from '@/components/common/Progress'
  import TorrentsList from '@/components/new_torrents/TorrentsList'

  export default {
    components: {
      MovieDialog,
      Progress,
      TorrentsList
    },
    data () {
      return {
        movieDialogData: {}
      }
    },
    computed: {
      loading() {
        return this.$store.state.torrents.isLoading
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
