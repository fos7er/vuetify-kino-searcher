<template>
  <div>
    <v-tooltip v-if="!isFavorite" bottom>
      <template v-slot:activator="{on}">
        <div v-on="on">
          <v-btn
            id="custom-btn"
            :disabled="!isLoggedIn"
            @click="addToFav"
          >
            <v-icon>mdi-heart-outline</v-icon>
          </v-btn>
        </div>
      </template>
      <span>{{ toolTipText }}</span>
    </v-tooltip>

    <v-btn
      v-if="isFavorite"
      id="custom-btn"
      @click="removeFromFav"
    >
      <v-icon>mdi-heart</v-icon>
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
      isFavorite () {
        return this.$store.getters['movies/isFavorite'](this.movieID)
      },
      toolTipText () {
        return this.isLoggedIn ? this.$t('addToFavorites') : this.$t('loginToAdd')
      }
    },
    methods: {
      async addToFav () {
        const data = {
          id: this.movieID,
          inFavorites: true,
          dateAddedToFavorites: new Date().toISOString()
        }
        await this.$store.dispatch('movies/updateMovie', data)
      },
      async removeFromFav () {
        const confirmDialogText = {
          title: this.$t('delete'),
          message: this.$t('deleteFromFavorites')
        }
        if (await this.$refs.dialogConfirm.open(confirmDialogText)) {
          const data = {
            id: this.movieID,
            inFavorites: null,
            dateAddedToFavorites: null
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
