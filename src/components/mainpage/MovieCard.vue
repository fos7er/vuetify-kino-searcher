<template>
  <v-card class="mx-auto card" max-width="344">
    <v-img height="200px" :key="srcFull" :src="srcFull" lazy-src="@/assets/images/placeholder-image-white.png">
      <template v-if="srcFull !== ''" v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>

    <v-card-title class="card__title"> {{ movie.title }}</v-card-title>

    <v-card-subtitle> {{ movie.original_title }}</v-card-subtitle>

    <v-row align="center" class="mx-4">
      <v-rating
        :value="movie.vote_average / 2"
        color="amber"
        dense
        half-increments
        readonly
        size="14"
      ></v-rating>
      <div class="grey--text ms-4">
        {{ `${movie.vote_average}` }}
      </div>
    </v-row>

    <v-card-actions>
      <v-btn color="orange lighten-2" text> {{ $t('explore') }}</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          {{ movie.overview }}
        </v-card-text>
      </div>
    </v-expand-transition>

  </v-card>
</template>

<script>
  export default {
    props: ['movie'],
    data () {
      return {
        show: false
      }
    },
    computed: {
      srcFull () {
        return this.movie.backdrop_path ? `${process.env.VUE_APP_IMAGES_PATH}${this.movie.backdrop_path}` : ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    cursor: pointer;
    transition: all 0.2s;

    &__title {
      min-height: 95px;
    }

    &:hover {
      transform: scale(1.02);
    }
  }
</style>
