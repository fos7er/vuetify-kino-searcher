<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="10">
        <h3 class="mb-2">{{ $t('favorites') }}</h3>
        <v-data-table
          :footer-props="{ 'items-per-page-text': '', 'items-per-page-options': [15, 30, 50, 100] }"
          :headers="headers"
          :items="tableData"
          :loading="loading"
          :options.sync="tableOptions"
          :search="search"
          calculate-widths
          class="pagination-display-none"
          mobile-breakpoint="200"
          must-sort
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                v-model.trim="search"
                :label="$t('Search')"
                append-icon="mdi-magnify"
                clearable
                hide-details
              />
            </v-toolbar>
          </template>
          <template v-slot:item.genres="{ item }">
            {{ movieGenreText(item.genres) }}
          </template>
          <template v-slot:item.release_date="{ item }">
            {{ movieYear(item.release_date) }}
          </template>
          <template v-slot:item.vote_average="{ item }">
            {{ item.vote_average.toFixed(2) }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import dayjs from '@/utils/dayjs'
  export default {
    name: 'Favorites',
    components: {},
    data () {
      return {
        tableOptions: {
          itemsPerPage: 15,
          page: 1,
          sortBy: ['dateAdded'],
          sortDesc: [false]
        },
        headers: [
          { text: this.$t('title'), align: 'left', value: 'title' },
          { text: this.$t('genre'), align: 'left', value: 'genres', sortable: false },
          { text: this.$t('year'), align: 'left', value: 'release_date', width: '200' },
          { text: this.$t('time,Min'), align: 'left', value: 'runtime', width: '200' },
          { text: this.$t('Rating'), align: 'left', value: 'revenue', width: '300' },
          { text: this.$t('yourRating'), align: 'right', value: 'vote_average', width: '200' }
        ],
        search: ''
      }
    },
    created () {
      this.$store.dispatch('movies/getFavoriteMovies')
    },
    watch: {
      userMovies: {
        handler () {
          this.$store.dispatch('movies/getFavoriteMovies')
        },
        deep: true
      }
    },
    computed: {
      tableData () {
        return this.$store.getters['movies/favoritesList']
      },
      loading () {
        return false
      },
      userMovies () {
        return this.$store.getters['movies/userMovies']
      }
    },
    methods: {
      dropTable () {
        this.tableOptions.page = 1
      },
      movieGenreText (arr) {
        return arr.reduce((acc, current, i) => {
          i === arr.length - 1 ? acc += `${current.name}` : acc += `${current.name}, `
          return acc
        }, '')
      },
      movieYear(date) {
        return dayjs(date).format('YYYY')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
