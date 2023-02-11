<template>
  <div v-if="isLoggedIn && $store.getters['userSettings/settings'].pirate">
    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <div v-on="on">
          <v-btn
            id="custom-btn"
            @click="search"
            v-on="on"
          >
            <v-icon>mdi-pirate</v-icon>
          </v-btn>
        </div>
      </template>
      <span>{{ toolTipText }}</span>
    </v-tooltip>
  </div>
</template>

<script>
  export default {
    props: {
      movieTitle: {
        type: String,
        required: true
      }
    },
    computed: {
      toolTipText () {
        return this.$t('searchOnRutor')
      }
    },
    methods: {
      search() {
        window.open(`http://rutor.info/search/0/0/000/2/${this.movieTitle}`,'_blank')
      }
    }
  }
</script>

<style lang="scss" scoped>
  #custom-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    background-color: #2b577c;
    min-width: 0;

    &.theme--light {
      background-color: #c4c4c5;
    }
  }
</style>
