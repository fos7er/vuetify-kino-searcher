<template>
  <v-navigation-drawer
    :value="$store.getters['controls/isShowDrawer']"
    :clipped="$store.getters['controls/isClipped']"
    :mini-variant="$store.getters['controls/isMiniDrawer']"
    :style="`padding-top:${$store.getters['controls/headerHeight']}px`"
    fixed
  >
    <v-list>
      <v-list-item  @click="setDrawer(false)" v-for="(item, i) in items" :key="i" :to="item.to" exact router>
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.name"/>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template #append>
      <v-list dense>
        <v-list-item @click="setDrawer(false)">
          <v-list-item-icon>
            <v-icon v-text="$store.getters['controls/isMiniDrawer'] ? 'mdi-arrow-collapse-right' : 'mdi-arrow-collapse-left'"/>
          </v-list-item-icon>
          <v-list-item-title v-text="$t('collapse')"/>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>

  export default {
    created () {
      this.$store.dispatch('mainPage/getAllGenres')
    },
    computed: {
      items() {
        return this.$store.getters['mainPage/genres']
      }
    },
    methods: {
      setDrawer(value) {
        this.$store.commit('controls/SET_DRAWER', value)
      }
    }
  }
</script>
