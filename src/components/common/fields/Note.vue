<template>
  <div>
    <v-textarea
      :disabled="loading"
      :label="$t('note')"
      :loadin="loading"
      :value="value"
      auto-grow
      max-he
      row-height="20"
      rows="2"
      @change="save"
    ></v-textarea>
  </div>
</template>

<script>
  export default {
    props: {
      movieID: {
        type: Number,
        required: true
      }
    },
    computed: {
      value () {
        return this.$store.getters['movies/userNote'](this.movieID)
      },
      loading () {
        return this.$store.getters['movies/loading']
      }
    },
    methods: {
      async save (note) {
        const data = {
          id: this.movieID,
          note
        }
        await this.$store.dispatch('movies/updateMovie', data)
      }
    }
  }
</script>
