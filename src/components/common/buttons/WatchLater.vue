<template>
  <div>
    <v-btn
      v-if="!isWatchLater"
      id="custom-btn"
      @click="addToWatchLater">
      <v-icon>mdi-timer-star-outline</v-icon>
    </v-btn>
    <v-btn
      v-if="isWatchLater"
      id="custom-btn"
      @click="removeFromWatchLater">
      <v-icon>mdi-timer-remove</v-icon>
    </v-btn>
    <dialog-confirm ref="dialogConfirm"/>
  </div>
</template>

<script>
  export default {
    props: {
      movieID: {
        type: Number,
        required: true
      }
    },
    computed: {
      isWatchLater () {
        return this.$store.getters['movies/isWatchLater'](this.movieID)
      }
    },
    methods: {
      async addToWatchLater () {
        const data = {
          id: this.movieID,
          inWatchLater: true,
          dateAddedToWatchLater: new Date().toISOString()
        }
        await this.$store.dispatch('movies/updateMovie', data)
      },
      async removeFromWatchLater () {
        const confirmDialogText = {
          title: this.$t('delete'),
          message: this.$t('deleteFromWatchLater')
        }
        if (await this.$refs.dialogConfirm.open(confirmDialogText)) {
          const data = {
            id: this.movieID,
            inWatchLater: null,
            dateAddedToWatchLater: null
          }
          await this.$store.dispatch('movies/updateMovie', data)
          this.$refs.dialogConfirm.close()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  #custom-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    background-color: #2b577c;
    min-width: 0;

    &.theme--light {
      background-color: #c4c4c5;
    }
  }
</style>
