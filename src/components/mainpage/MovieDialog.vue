<template>
  <v-card class="card">
    <v-container>
      <v-row>
        <v-col colls="12" md="4">
          <v-img height="250" :src="posterSrcFull"></v-img>
        </v-col>
        <v-col colls="12" md="8">
          <v-card-title pt-0>
            <h2>{{ title }}</h2>
            <span class="release-year">&nbsp;({{ releaseDateYear }})</span>
          </v-card-title>
          <v-card-subtitle class="mt-n3">
            <span v-for="genre in genres" :key="genre.id">{{ genre.name }}&nbsp;</span> &#9679;
            <span>1h</span>
          </v-card-subtitle>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      title: 'Spider man: No way home',
      posterPath: '/1Rr5SrvHxMXHu5RjKpaMba8VTzi.jpg',
      releaseDate: '2021-12-18',
      genres: [
        {
          id: 16,
          name: 'мультфильм',
        },
        {
          id: 35,
          name: 'комедия',
        },
        {
          id: 10751,
          name: 'семейный',
        },
        {
          id: 10402,
          name: 'музыка',
        },
      ],
      vote_average: '7.5',
      tagline: 'First rule of fight club never talk about fight club',
      runtime: 112,
      overview:
        'Тяжело быть продюсером, когда ты коала и у тебя лапки. Еще сложнее, когда твоя верная помощница древнее печатной машинки. И совсем весело, когда твоя труппа — это танцующий без остановки пухляш, колючая девочка-панк, застенчивая школьница, верзила-гангстер и многодетная мама, чьи дети — поросята в прямом смысле слова. Рецепт успеха прост — рвануть в мировую столицу развлечений, завербовать легендарного рок-музыканта и взорвать сцену новым шоу.',
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    },
  },
  computed: {
    posterSrcFull() {
      return `${process.env.VUE_APP_IMAGES_PATH}${this.posterPath}`
    },
    releaseDateYear() {
      return new Date(this.releaseDate).getFullYear()
    },
    duration() {
      const hours = Math.floor(this.runtime / 60)
      const minutes = this.runtime % 60
      return `${hours} h ${minutes} m`
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  & .release-year {
    font-size: 1.7rem;
    opacity: 0.8;
    font-weight: 400;
  }
  & .v-card__subtitle {
    font-size: 1rem;
    // margin-top: -4px;
  }
}
</style>
