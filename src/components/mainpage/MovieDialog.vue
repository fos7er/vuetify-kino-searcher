<template>
  <v-dialog v-model="dialog" max-width="1100px">
    <v-card class="card">
      <v-container>
        <v-btn class="closeBtn" icon @click="close">
          <v-icon> mdi-close</v-icon>
        </v-btn>
        <v-row>
          <v-col cols="12" md="4">
            <v-img :src="posterSrcFull"></v-img>
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
                <v-btn class="custom-btn">
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn class="custom-btn">
                  <v-icon>mdi-heart-outline</v-icon>
                </v-btn>
                <v-btn class="custom-btn">
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn>
                <v-btn class="custom-btn">
                  <v-icon>mdi-bookmark-outline</v-icon>
                </v-btn>
              </v-row>
            </div>
            <div class="d-flex font-italic text--secondary mt-6">
              <h4 v-if="movie.tagline">{{ movie.tagline }}</h4>
            </div>
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
  import movieRating from '../common/MovieRating.vue'

  export default {
    components: {
      movieRating
    },
    props: ['movie'],
    data () {
      return {
        dialog: false
      }
    },
    methods: {
      close () {
        this.dialog = false
      },
      open () {
        this.dialog = true
      }
    },
    computed: {
      posterSrcFull () {
        return `${process.env.VUE_APP_IMAGES_PATH}${this.movie.poster_path}`
      },
      releaseDateYear () {
        return new Date(this.movie.release_date).getFullYear()
      },
      duration () {
        const hours = Math.floor(this.movie.runtime / 60)
        const minutes = this.movie.runtime % 60
        return `${hours} h ${minutes} m`
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
      // margin-top: -4px;
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
    }
  }
</style>
