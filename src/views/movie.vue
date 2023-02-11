<template>
  <v-card class="card">
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
        <v-col class="card__right-column" cols="12" md="8">
          <v-card-title pt-0>
            <h2>{{ movie.title }}</h2>
            <span class="release-year">&nbsp;({{ releaseDateYear }})</span>
          </v-card-title>
          <v-card-subtitle class="mt-n3">
            <span v-for="genre in movie.genres" :key="genre.id">{{ genre.name }}&nbsp;</span> &#9679;
            <span> {{ $t('duration') }} {{ duration }}</span>
          </v-card-subtitle>
          <div class="my-4 pl-2">
            <v-row align="center">
              <round-rating :score="movie.vote_average"/>
              <btn-favorite :movieID="movieID"/>
              <btn-watch-later :movieID="movieID"/>
              <btn-pirate :movieTitle="movie.title"/>
            </v-row>
          </div>
          <div class="d-flex font-italic text--secondary mt-6">
            <h4 v-if="movie.tagline">{{ movie.tagline }}</h4>
          </div>
          <h3>{{ $t('yourRating') }}</h3>
          <movie-rating :movieID="movieID"/>
          <v-divider/>
          <h3>{{ $t('overview') }}</h3>
          <v-card-text class="pt-1">
            {{ movie.overview || $t('noDescription') }}
          </v-card-text>
          <note v-if="isLoggedIn" :movieID="movieID"/>
        </v-col>
      </v-row>
    </v-container>
    <dialog-confirm ref="dialogConfirm"/>
  </v-card>
</template>

<script>
  import BtnFavorite from '@/components/common/buttons/Favorite'
  import BtnWatchLater from '@/components/common/buttons/WatchLater'
  import BtnPirate from '@/components/common/buttons/Parate'
  import dayjs from '@/utils/dayjs'
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
    data () {
      return {
        movie: {
          release_date: '2023-01-01',
          runtime: 60
        },
        imgLoaded: false
      }
    },
    watch: {
      'movieID' () {
        this.getMovie()
      }
    },
    computed: {
      posterSrcFull () {
        return this.movie.poster_path ? `${process.env.VUE_APP_IMAGES_PATH}${this.movie.poster_path}` : ''
      },
      releaseDateYear () {
        return dayjs(this.movie.release_date).format('YYYY')
      },
      duration () {
        return dayjs.duration(this.movie.runtime, 'minutes').format('HH:mm')
      },
      movieID () {
        return +this.$route.params.movieID
      }
    },
    methods: {
      loadIMGHandler () {
        this.imgLoaded = true
      },
      getMovie () {
        this.$store.commit('ADD_OVERLAY')
        this.MovieAPI
          .getMovie(this.movieID)
          .then((res) => (this.movie = res))
          .catch(e => {
            if (e.status === 404) {
              this.$router.push('/404')
            }
          })
          .finally(() => this.$store.commit('REMOVE_OVERLAY'))
      }
    },
    created () {
      this.getMovie()
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
      // margin-top: -4px;
    }

    & .card__right-column div {
      padding-left: 0;
    }
  }
</style>
