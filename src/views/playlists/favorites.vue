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
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

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
          { text: 'Название', align: 'left', value: 'title' },
          { text: 'Жанр', align: 'left', value: 'genres', sortable: false },
          { text: 'Год', align: 'left', value: 'release_date', width: '200' },
          { text: 'Время, мин', align: 'left', value: 'runtime', width: '200' },
          { text: 'Ваша оценка', align: 'left', value: 'revenue', width: '300' },
          { text: 'Рейтинг', align: 'right', value: 'vote_average', width: '200' }
        ],
        search: ''
      }
    },
    created () {
      this.getTableData()
    },
    watch: {},
    computed: {
      tableData () {
        return [{
          'adult': false,
          'backdrop_path': '/5kAGbi9MFAobQTVfK4kWPnIfnP0.jpg',
          'belongs_to_collection': {
            'id': 1071588,
            'name': 'M3GAN Collection',
            'poster_path': '/fS57wFKda3h5dtWS3sc9JffE05R.jpg',
            'backdrop_path': '/uXEJwb8y67vFLaJb4wvHbSH6PjT.jpg'
          },
          'budget': 12000000,
          'genres': [
            {
              'id': 878,
              'name': 'Science Fiction'
            },
            {
              'id': 27,
              'name': 'Horror'
            },
            {
              'id': 35,
              'name': 'Comedy'
            }
          ],
          'homepage': 'https://www.m3ganmovie.com',
          'id': 536554,
          'imdb_id': 'tt8760708',
          'original_language': 'en',
          'original_title': 'M3GAN',
          'overview': 'A brilliant toy company roboticist uses artificial intelligence to develop M3GAN, a life-like doll programmed to emotionally bond with her newly orphaned niece. But when the doll\'s programming works too well, she becomes overprotective of her new friend with terrifying results.',
          'popularity': 3751.058,
          'poster_path': '/7CNCv9uhqdwK7Fv4bR4nmDysnd9.jpg',
          'production_companies': [
            {
              'id': 33,
              'logo_path': '/8lvHyhjr8oUKOOy2dKXoALWKdp0.png',
              'name': 'Universal Pictures',
              'origin_country': 'US'
            },
            {
              'id': 3172,
              'logo_path': '/kDedjRZwO8uyFhuHamomOhN6fzG.png',
              'name': 'Blumhouse Productions',
              'origin_country': 'US'
            },
            {
              'id': 76907,
              'logo_path': '/hGW1a2skOGoCjK9i7jmLMJjxI7B.png',
              'name': 'Atomic Monster',
              'origin_country': 'US'
            },
            {
              'id': 89115,
              'logo_path': '/zQwTHJVIruUlGsa7zIdfXuSm9GG.png',
              'name': 'Divide / Conquer',
              'origin_country': 'US'
            }
          ],
          'production_countries': [
            {
              'iso_3166_1': 'US',
              'name': 'United States of America'
            }
          ],
          'release_date': '2022-12-28',
          'revenue': 93000000,
          'runtime': 102,
          'spoken_languages': [
            {
              'english_name': 'English',
              'iso_639_1': 'en',
              'name': 'English'
            }
          ],
          'status': 'Released',
          'tagline': 'Friendship has evolved.',
          'title': 'M3GAN',
          'video': false,
          'vote_average': 7.017,
          'vote_count': 346
        }]
      },
      loading () {
        return false
      }
    },
    methods: {
      async getTableData () {
        await this.$store.dispatch('movies/getFavoriteMovies')
      },
      dropTable () {
        this.tableOptions.page = 1
      },
      movieGenreText (arr) {
        return arr.reduce((acc, current, i) => {
          i === arr.length - 1 ? acc += `${current.name}` : acc += `${current.name}, `
          return acc
        }, '')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
