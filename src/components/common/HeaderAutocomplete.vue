<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="searchValue"
    color="white"
    hide-no-data
    hide-selected
    hide-details
    item-text="titleWithYear"
    item-value="id"
    label="Поиск"
    placeholder="Введите название фильма"
    prepend-icon="mdi-magnify"
    return-object
    solo
    dense
  ></v-autocomplete>
</template>

<script>
import debounce from '@/utils/debounce'
export default {
  data() {
    return {
      model: null,
      items: [],
      isLoading: false,
      searchValue: null,
    }
  },
  methods: {
    search(query) {
      this.movieAPI.searchMovies(query).then((res) => {
        console.log(res)
        return (this.items = res.results.map((item) => {
          if (item.release_date) {
            item.titleWithYear = `${item.title} (${new Date(item.release_date).getFullYear()})`
          } else {
            item.titleWithYear = item.title
          }
          return item
        }))
      })
    },
  },
  watch: {
    searchValue(val) {
      if (!val) return
      this.search(val)
    },
    model(val) {
      if (!val || !val.id) return
      this.$router.push('/movie/' + val.id)
    },
  },
  created() {
    //make search with debounce
    this.search = debounce(this.search, 300)
  },
}
</script>

<style lang="scss" scoped></style>
