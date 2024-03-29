<template>
  <v-dialog v-model="dialog" :fullscreen="breakpoint" max-width="1100px">
    <v-card class="card pa-0">
      <div class="closeBtn d-flex justify-end">
        <v-btn icon @click="close">
          <v-icon> mdi-close</v-icon>
        </v-btn>
      </div>
      <v-container class="mt-n3">
        <v-row>
          <v-col cols="12" md="4">
            <v-skeleton-loader
              v-show="posterSrcFull && !imgLoaded"
              height="530px"
              type="image"
            ></v-skeleton-loader>
            <v-img
              :class="{invisible:!imgLoaded}"
              :src="posterSrcFull"
              @load="loadIMGHandler"
            />
          </v-col>
          <v-col class="card__right-column" md="8">
            <v-card-title pt-0>
              <h2>{{ movie.title }}</h2>
              <span class="release-year">&nbsp;({{ releaseDateYear }})</span>
            </v-card-title>
            <v-card-subtitle class="mt-n3">
              <div class="py-1">
                <span v-for="genre in movie.genres" :key="genre.id">{{ genre.name }}&nbsp;</span> &#9679;
                <span>{{ duration }}</span>
              </div>
              <div class="py-1">{{ movieCast }}</div>
            </v-card-subtitle>
            <div class="my-4 pl-2">
              <v-row align="center">
                <round-rating :score="movie.vote_average"/>
                <btn-favorite :movieID="movie.id"/>
                <btn-watch-later :movieID="movie.id"/>
                <btn-pirate :movieTitle="movie.title"/>
              </v-row>
            </div>
            <div class="d-flex font-italic text--secondary mt-6 mb-2">
              <h4 v-if="movie.tagline">{{ movie.tagline }}</h4>
            </div>
            <h3>{{ $t('yourRating') }}</h3>
            <movie-rating :movieID="movie.id"/>
            <v-divider/>
            <h3>{{ $t('overview') }}</h3>
            <v-card-text class="pt-1">
              {{ movie.overview || $t('noDescription') }}
            </v-card-text>
            <note v-if="isLoggedIn" :movieID="movie.id"/>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  import BtnFavorite from '@/components/common/buttons/Favorite'
  import BtnPirate from '@/components/common/buttons/Parate'
  import BtnWatchLater from '@/components/common/buttons/WatchLater'
  import dayjs from '@/utils/dayjs'
  import mixinBackBtn from '@/plugins/mixins/backBtn'
  import MovieRating from '@/components/common/ratings/MovieRating'
  import Note from '@/components/common/fields/Note'
  import RoundRating from '@/components/common/ratings/RoundRating'

  export default {
    components: {
      BtnFavorite,
      BtnPirate,
      BtnWatchLater,
      MovieRating,
      Note,
      RoundRating
    },
    mixins: [mixinBackBtn],
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
      breakpoint () {
        return this.$vuetify.breakpoint.name === 'xs'
      },
      posterSrcFull () {
        return this.movie.poster_path ? `${process.env.VUE_APP_IMAGES_PATH}${this.movie.poster_path}` : ''
      },
      releaseDateYear () {
        return dayjs(this.movie.release_date || 0).format('YYYY')
      },
      duration () {
        return dayjs.duration(this.movie.runtime || 0, 'minutes').format('HH:mm')
      },
      movieCast () {
        if (this.movie?.cast) {
          return this.movie.cast?.slice(0, 5).map(actor => actor.name).join(', ')
        }
        return ''

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
      }
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
      position: sticky;
      top: 3px;
      z-index: 999;
    }
  }
</style>
