<template>
  <v-dialog v-model="dialog" max-width="1100px">
    <v-card class="card pa-5 pa-md-0">
      <v-btn class="closeBtn" icon @click="close">
        <v-icon> mdi-close</v-icon>
      </v-btn>
      <v-container>
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
                <btn-favorite :movieID="movie.id"/>
                <btn-watch-later :movieID="movie.id"/>
              </v-row>
            </div>
            <div class="d-flex font-italic text--secondary mt-6 mb-2">
              <h4 v-if="movie.tagline">{{ movie.tagline }}</h4>
            </div>
            <h3>{{ $t('yourRating') }}</h3>
            <v-rating
              class="py-2"
              @input="setRating"
              background-color="orange lighten-3"
              hover
              small
              color="orange"
              length="10"
              :value="ratingValue"
              :readonly="!isLoggedIn"
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
  </v-dialog>
</template>

<script>
  import btnFavorite from '@/components/common/buttons/Favorite'
  import btnWatchLater from '@/components/common/buttons/WatchLater'
  import dayjs from '@/utils/dayjs'
  import movieRating from '@/components/common/MovieRating'

  export default {
    components: {
      btnFavorite,
      btnWatchLater,
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
      posterSrcFull () {
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

    .release-year {
      font-size: 1.7rem;
      opacity: 0.8;
      font-weight: 400;
    }

    .v-card__subtitle {
      font-size: 1rem;
    }

    .card__right-column div {
      padding-left: 0;
    }

    .closeBtn {
      position: absolute;
      top: 3px;
      right: 3px;
    }
  }
</style>

<style lang="scss">
  @media screen and (max-width: 480px) {
    .card {
      .v-rating .v-icon {
        padding: 0.2rem;
      }
    }
  }
</style>
