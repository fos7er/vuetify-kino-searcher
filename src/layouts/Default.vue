<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      :style="`padding-top:${appBarHeight}px`"
    >
      <v-list>
        <v-list-item v-for="(item, i) in drawerItems" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      hide-on-scroll
      scroll-threshold="100"
      height="80"
      ref="appBar"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->
      <v-btn class="d-none d-md-flex" icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <router-link to="/"
        ><img
          class="ml-12 logo d-none d-md-block"
          :src="require('../assets/images/logo-white.png')"
          height="64"
          width="auto"
      /></router-link>
      <v-container>
        <v-row align="center">
          <v-col><autocomplete /></v-col>
          <v-col cols="3">
            <v-select
              class="ml-auto lang-select"
              solo
              dense
              hide-details
              :items="allLang"
              :item-text="selectText"
              item-value="id"
              :value="$store.getters['userSettings/lang']"
              @change="changeLang"
              ref="selectRef"
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
      <v-menu offset-y left transition="slide-y-transition">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" fab text>
            <v-avatar size="30">
              <img src="@/assets/images/avatar-placeholder.svg" alt="Avatar" />
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item exact to="/settings/profile">
            <v-list-item-action>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-action>
            <v-list-item-title v-text="$t('profile')" />
          </v-list-item>
          <v-divider />
          <v-list-item exact to="/settings">
            <v-list-item-action>
              <v-icon>mdi-tune-variant</v-icon>
            </v-list-item-action>
            <v-list-item-title v-text="$t('settings')" />
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item exact to="/logout">
            <v-list-item-action>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-action>
            <v-list-item-title v-text="$t('logout')" />
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main class="wrapper">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </div>
</template>

<script>
import autocomplete from '@/components/common/HeaderAutocomplete'
export default {
  components: {
    autocomplete,
  },
  name: 'DefaultLayout',
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      appBarHeight: 55,
      selectText: 'shortName',
      //genres
      drawerItems: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      title: 'KINO Searcher',
    }
  },
  methods: {
    changeLang(lang) {
      this.$store.commit('userSettings/setLang', lang)
    },
    setSelectText(isOpen) {
      if (isOpen) {
        this.selectText = 'name'
        return
      }
      this.selectText = 'shortName'
    },
    getAllGenres() {
      this.movieAPI.getAllGenres().then((res) => {
        this.generateGenres(res.genres)
      })
    },
    generateGenres(genres) {
      this.drawerItems = genres.map((genre) => {
        return {
          icon: 'mdi-chart-bubble',
          title: genre.name,
          to: `/genre/${genre.id}`,
        }
      })
    },
  },
  computed: {
    allLang() {
      return this.$store.getters['userSettings/allLang']
    },
  },
  mounted() {
    this.$watch(
      () => {
        return this.$refs.selectRef.isMenuActive
      },
      (isOpen) => {
        this.setSelectText(isOpen)
      }
    )
    this.appBarHeight = this.$refs.appBar.$el.clientHeight || this.$refs.appBar.$el.offsetHeight
  },
  created() {
    this.getAllGenres()
  },
  watch: {
    '$vuetify.lang.current'() {
      this.getAllGenres()
    },
  },
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
