<template>
  <v-dialog v-model="dialog" max-width="1100px">
    <v-card class="card">
      <v-container>
        <v-btn class="closeBtn" icon @click="close">
          <v-icon> mdi-close</v-icon>
        </v-btn>
        <v-row>
          <v-col cols="12" md="4">
            <v-skeleton-loader
              v-show="!imgLoaded"
              type="image"
              height="100%"
            ></v-skeleton-loader>
            <v-img :src="posterSrcFull" :class="{invisible:!imgLoaded}" @load="loadIMGHandler"></v-img>
          </v-col>
          <v-col class="card__right-column" md="8">
            <v-card-title pt-0>
              <h2>{{ movie.title }}</h2>
              <span class="release-year">&nbsp;({{ releaseDateYear }})</span>
            </v-card-title>
            <v-card-subtitle class="mt-n3">
              <span v-for="genre in movie.genres" :key="genre.id">{{ genre.name }}&nbsp;</span> &#9679;
              <span>{{ duration }}</span>
            </v-card-subtitle>
            <div class="my-4 pl-2">
              <v-row align="center">
                <movie-rating :score="movie.vote_average"/>
                <v-btn
                  v-if="!isFavorite"
                  class="custom-btn"
                  @click="addToFav">
                  <v-icon>mdi-heart-outline</v-icon>
                </v-btn>
                <v-btn
                  v-if="isFavorite"
                  class="custom-btn"
                  @click="removeFromFav">
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn
                  v-if="!isWatchLater"
                  class="custom-btn"
                  @click="addToWatchLater">
                  <v-icon>mdi-timer-star-outline</v-icon>
                </v-btn>
                <v-btn
                  v-if="isWatchLater"
                  class="custom-btn"
                  @click="removeFromWatchLater">
                  <v-icon>mdi-timer-remove</v-icon>
                </v-btn>
              </v-row>
            </div>
            <div class="d-flex font-italic text--secondary mt-6 mb-2">
              <h4 v-if="movie.tagline">{{ movie.tagline }}</h4>
            </div>
            <h3>{{ $t('rating') }}</h3>
            <v-rating
              class="py-2"
              @input="setRating"
              background-color="orange lighten-3"
              hover
              color="orange"
              length="10"
              :value="ratingValue"
            ></v-rating>
            <v-divider/>
            <h3>{{ $t('overview') }}</h3>
            <v-card-text class="pt-1">
              {{ movie.overview || $t('noDescription') }}
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <dialog-confirm ref="dialogConfirm"/>
  </v-dialog>
</template>

<script>
  import dayjs from '@/utils/dayjs'
  import movieRating from '@/components/common/MovieRating'

  export default {
    components: {
      movieRating
    },
    props: ['movie'],
    data () {
      return {
        dialog: false,
        imgLoaded: false
      }
    },
    watch: {
      posterSrcFull() {
        this.imgLoaded = false
      }
    },
    computed: {
      posterSrcFull () {
        return `${process.env.VUE_APP_IMAGES_PATH}${this.movie.poster_path}`
      },
      releaseDateYear () {
        return dayjs(this.movie.release_date || 0).format('YYYY')
      },
      duration () {
        return dayjs.duration(this.movie.runtime || 0, 'minutes').format('HH:mm')
      },
      isFavorite () {
        return this.$store.getters['movies/isFavorite'](this.movie.id)
      },
      isWatchLater () {
        return this.$store.getters['movies/isWatchLater'](this.movie.id)
      },
      ratingValue () {
        return this.$store.getters['movies/userRating'](this.movie.id)
      }
    },
    methods: {
      loadIMGHandler () {
        this.imgLoaded = true
      },
      close () {
        this.dialog = false
      },
      open () {
        this.dialog = true
      },
      addToFav () {
        const data = {
          id: this.movie.id,
          inFavorites: true,
          dateAddedToFavorites: new Date().toISOString()
        }
        this.$store.dispatch('movies/updateMovie', data)
      },
      async removeFromFav () {
        const confirmDialogText = {
          title: this.$t('delete'),
          message: this.$t('deleteFromFavorites')
        }
        if (await this.$refs.dialogConfirm.open(confirmDialogText)) {
          const data = {
            id: this.movie.id,
            inFavorites: null,
            dateAddedToFavorites: null
          }
          await this.$store.dispatch('movies/updateMovie', data)
        }
      },
      addToWatchLater () {
        const data = {
          id: this.movie.id,
          inWatchLater: true,
          dateAddedToWatchLater: new Date().toISOString()
        }
        this.$store.dispatch('movies/updateMovie', data)
      },
      async removeFromWatchLater () {
        const confirmDialogText = {
          title: this.$t('delete'),
          message: this.$t('deleteFromWatchLater')
        }
        if (await this.$refs.dialogConfirm.open(confirmDialogText)) {
          const data = {
            id: this.movie.id,
            inWatchLater: null,
            dateAddedToWatchLater: null
          }
          await this.$store.dispatch('movies/updateMovie', data)
          this.$refs.dialogConfirm.close()
        }
      },
      async setRating (userRating) {
        const data = {
          id: this.movie.id,
          userRating
        }
        await this.$store.dispatch('movies/updateMovie', data)
      }
    },
    updated () {
      console.log(this.movie)
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    position: relative;

    & .release-year {
      font-size: 1.7rem;
      opacity: 0.8;
      font-weight: 400;
    }

    & .v-card__subtitle {
      font-size: 1rem;
    }

    & .card__right-column div {
      padding-left: 0;
    }

    & .closeBtn {
      position: absolute;
      top: 5px;
      right: 5px;
    }

    .custom-btn {
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
  }
</style>
