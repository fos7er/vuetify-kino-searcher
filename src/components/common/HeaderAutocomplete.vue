<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
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
  ></v-autocomplete>
</template>

<script>
export default {
  data() {
    return {
      model: null,
      items: [],
      isLoading: false,
      search: null,
    }
  },
  watch: {
    search(val) {
      if (!val) return
      this.movieAPI.searchMovies(val).then((res) => {
        console.log(res)
        return (this.items = res.results.map((item) => {
          item.titleWithYear = `${item.title} (${new Date(item.release_date).getFullYear()})`
          return item
        }))
      })
    },
    model(val) {
      if (!val || !val.id) return
      this.$router.push('/movie/' + val.id)
    },
  },
}
</script>

<style lang="scss" scoped></style>
