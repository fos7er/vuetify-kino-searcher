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
              <movie-rating :score="movie.vote_average"/>
              <btn-favorite :movieID="movieID"/>
              <btn-watch-later :movieID="movieID"/>
            </v-row>
          </div>
          <div class="d-flex font-italic text--secondary mt-6">
            <h4 v-if="movie.tagline">{{ movie.tagline }}</h4>
          </div>
          <h3>{{ $t('yourRating') }}</h3>
          <v-rating
            class="py-2"
            @input="setRating"
            background-color="orange lighten-3"
            hover
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
    <dialog-confirm ref="dialogConfirm"/>
  </v-card>
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
      ratingValue () {
        return this.$store.getters['movies/userRating'](this.movie.id)
      },
      movieID () {
        return +this.$route.params.movieID
      }
    },
    methods: {
      loadIMGHandler () {
        this.imgLoaded = true
      },
      async setRating (userRating) {
        const data = {
          id: this.movie.id,
          userRating
        }
        await this.$store.dispatch('movies/updateMovie', data)
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
