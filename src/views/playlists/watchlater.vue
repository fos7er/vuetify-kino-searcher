<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="10">
        <h3 class="mb-2">{{ $t('favorites') }}</h3>
        <v-data-table
          @click:row="openDialog"
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
                :label="$t('search')"
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
          <template v-slot:item.userRating="{ item }">
            {{ item.userRating || '—' }}
          </template>
          <template v-slot:item.vote_average="{ item }">
            {{ item.vote_average.toFixed(2) }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn icon @click.stop="removeFromWatchLater(item.id)">
              <v-icon v-text="'mdi-delete'"/>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <movie-dialog :movie="movieDialogData" ref="dialog"/>
    <dialog-confirm ref="dialogConfirm"/>
  </v-container>
</template>

<script>
  import dayjs from '@/utils/dayjs'
  import MovieDialog from '@/components/mainpage/MovieDialog'

  export default {
    name: 'WatchLater',
    components: {
      MovieDialog
    },
    data () {
      return {
        tableOptions: {
          itemsPerPage: 15,
          page: 1,
          sortBy: ['dateAddedToWatchLater'],
          sortDesc: [false]
        },
        headers: [
          { text: this.$t('title'), align: 'left', value: 'title' },
          { text: this.$t('genre'), align: 'left', value: 'genres', sortable: false },
          { text: this.$t('year'), align: 'left', value: 'release_date' },
          { text: this.$t('time,Min'), align: 'left', value: 'runtime' },
          { text: this.$t('yourRating'), align: 'left', value: 'userRating' },
          { text: this.$t('rating'), align: 'left', value: 'vote_average' },
          { text: this.$t('actions'), align: 'center', value: 'actions', sortable: false }

        ],
        search: '',
        movieDialogData: {}
      }
    },
    created () {
      this.$store.dispatch('movies/getWatchLaterMovies')
    },
    watch: {
      userMovies: {
        handler () {
          this.$store.dispatch('movies/getWatchLaterMovies')
        },
        deep: true
      }
    },
    computed: {
      tableData () {
        return this.$store.getters['movies/watchLaterList']
      },
      loading () {
        return this.$store.getters['movies/loading']
      },
      userMovies () {
        return this.$store.getters['movies/userMovies']
      }
    },
    methods: {
      dropTable () {
        this.tableOptions.page = 1
      },
      async removeFromWatchLater (id) {
        const confirmDialogText = {
          title: this.$t('delete'),
          message: this.$t('deleteFromWatchLater')
        }
        if (await this.$refs.dialogConfirm.open(confirmDialogText)) {
          const data = {
            id,
            inWatchLater: null,
            dateAddedToWatchLater: null
          }
          await this.$store.dispatch('movies/updateMovie', data)
          this.$refs.dialogConfirm.close()
        }
      },
      movieGenreText (arr) {
        return arr.reduce((acc, current, i) => {
          i === arr.length - 1 ? acc += `${current.name}` : acc += `${current.name}, `
          return acc
        }, '')
      },
      movieYear (date) {
        return dayjs(date).format('YYYY')
      },
      openDialog (row) {
        this.movieDialogData = row
        this.$refs.dialog.open()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
