<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :label="$t('search')"
    :loading="isLoading"
    :placeholder="$t('enterMovieName')"
    :search-input.sync="searchValue"
    color="white"
    dense
    hide-details
    hide-no-data
    hide-selected
    item-text="titleWithYear"
    item-value="id"
    :prepend-icon="icon"
    return-object
    solo
    append-icon=""
  >
  </v-autocomplete>
</template>

<script>
  import debounce from '@/utils/debounce'

  export default {
    created () {
      //make search with debounce
      this.search = debounce(this.search, 300)
    },
    data () {
      return {
        model: null,
        items: [],
        isLoading: false,
        searchValue: null
      }
    },
    computed: {
      icon () {
        return this.$vuetify.breakpoint.name === 'xs' ? '' : 'mdi-magnify'
      }
    },
    methods: {
      async search (query) {
        this.isLoading = true
        try {
          const res = await this.MovieAPI.searchMovies(query)
          return (this.items = res.map((item) => {
            if (item.release_date) {
              item.titleWithYear = `${item.title} (${new Date(item.release_date).getFullYear()})`
            } else {
              item.titleWithYear = item.title
            }
            return item
          }))
        } finally {
          this.isLoading = false
        }
      }
    },
    watch: {
      searchValue (val) {
        if (!val) return
        this.search(val)
      },
      model (val) {
        if (!val || !val.id) return
        this.$router.push('/movie/' + val.id)
      }
    }
  }
</script>
