<template>
  <div>
    <movie-list :key="$route.fullPath" @movieClick="movieClickHandler"/>
    <v-dialog v-model="movieDialog" max-width="1100px">
      <movie-dialog-content :movie="movieDialogData" @closeDialog="movieDialog = false"/>
    </v-dialog>
  </div>
</template>

<script>
  import MovieList from '../components/mainpage/MovieList.vue'
  import movieDialogContent from '../components/mainpage/MovieDialog.vue'

  export default {
    components: {
      MovieList,
      movieDialogContent
    },
    data () {
      return {
        movieDialog: false,
        movieDialogData: {}
      }
    },
    methods: {
      movieClickHandler (payload) {
        this.movieDialogData = payload
        this.movieDialog = true
      }
    }
  }
</script>

<style lang="scss" scoped></style>
