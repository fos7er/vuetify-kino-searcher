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
    prepend-icon="mdi-magnify"
    return-object
    solo
  ></v-autocomplete>
</template>

<script>
  import debounce from '@/utils/debounce'

  export default {
    data () {
      return {
        model: null,
        items: [],
        isLoading: false,
        searchValue: null
      }
    },
    methods: {
      search (query) {
        this.isLoading = true
        this.movieAPI
          .searchMovies(query)
          .then((res) => {
            return (this.items = res.results.map((item) => {
              if (item.release_date) {
                item.titleWithYear = `${item.title} (${new Date(item.release_date).getFullYear()})`
              } else {
                item.titleWithYear = item.title
              }
              return item
            }))
          })
          .finally(() => {
            this.isLoading = false
          })
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
    },
    created () {
      //make search with debounce
      this.search = debounce(this.search, 300)
    }
  }
</script>

<style lang="scss" scoped></style>
