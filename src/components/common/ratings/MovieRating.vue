<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <div class="d-inline-block" v-on="on">
          <v-rating
            :readonly="!isLoggedIn || loading"
            :value="value"
            background-color="orange lighten-3"
            class="py-2 d-inline-block"
            color="orange"
            hover
            length="10"
            small
            @input="setRating"
          ></v-rating>
        </div>
      </template>
      <span>{{ toolTipText }}</span>
    </v-tooltip>
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
        return this.$store.getters['movies/userRating'](this.movieID)
      },
      toolTipText () {
        return this.isLoggedIn ? this.$t('yourRating') : this.$t('loginToRate')
      },
      loading () {
        return this.$store.getters['movies/loading']
      }
    },
    methods: {
      async setRating (userRating) {
        const data = {
          id: this.movieID,
          userRating
        }
        await this.$store.dispatch('movies/updateMovie', data)
      }
    }

  }
</script>
