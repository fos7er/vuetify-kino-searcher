<template>
  <v-app-bar
    ref="appBar"
    :clipped-left="$store.getters['controls/isClipped']"
    app
    fixed
    height="80"
    hide-on-scroll
    scroll-threshold="100"
  >
    <v-app-bar-nav-icon @click.stop="toggleDrawer"/>
    <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
      <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
    </v-btn> -->
    <v-btn class="d-none d-md-flex" icon @click.stop="toggleFooter">
      <v-icon>mdi-minus</v-icon>
    </v-btn>
    <router-link to="/">
      <img
        :src="theme === 'dark' ? require('@/assets/images/logo-white.png') : require('@/assets/images/logo-black.png') "
        class="ml-12 logo d-none d-md-block"
        height="64"
        width="auto"
        alt="Logo"
      />
    </router-link>
    <v-container>
      <v-row align="center">
        <v-col>
          <autocomplete/>
        </v-col>
        <v-col cols="3">
          <v-select
            ref="selectRef"
            :item-text="selectText"
            :items="allLang"
            :value="$store.getters['userSettings/lang']"
            class="ml-auto lang-select elevation-0"
            dense
            hide-details
            item-value="id"
            solo
            @change="changeLang"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
    <header-menu/>
  </v-app-bar>
</template>

<script>
  import autocomplete from '@/components/controls/header/HeaderAutocomplete'
  import HeaderMenu from '@/components/controls/header/HeaderMenu'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      autocomplete,
      HeaderMenu
    },
    mounted () {
      this.$watch(
        () => {
          return this.$refs.selectRef.isMenuActive
        },
        (isOpen) => {
          this.setSelectText(isOpen)
        }
      )
      this.$store.commit('controls/SET_HEADER_HEIGHT', this.$refs.appBar.$el.clientHeight || this.$refs.appBar.$el.offsetHeight)
    },
    data () {
      return {
        selectText: 'shortName',
        title: 'KINO Searcher'
      }
    },
    computed: {
      ...mapGetters({
        allLang: 'userSettings/allLang',
        theme: 'userSettings/theme'
      }),
      name () {
        return this.data
      }
    },
    methods: {
      toggleFooter () {
        this.$store.commit('controls/TOGGLE_FOOTER')
      },
      toggleDrawer () {
        this.$store.commit('controls/TOGGLE_DRAWER')
      },
      changeLang (lang) {
        this.$store.commit('userSettings/UPDATE_SETTINGS', { lang })
      },
      setSelectText (isOpen) {
        if (isOpen) {
          this.selectText = 'name'
          return
        }
        this.selectText = 'shortName'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .lang-select {
    width: 115px;

    &.v-list-item__title {
      font-size: 1rem !important;
    }
  }
</style>
