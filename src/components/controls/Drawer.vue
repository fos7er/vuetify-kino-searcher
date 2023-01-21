<template>
  <v-navigation-drawer
    :value="$store.getters['controls/isShowDrawer']"
    :clipped="$store.getters['controls/isClipped']"
    :mini-variant="$store.getters['controls/isMiniDrawer']"
    :style="`padding-top:${$store.getters['controls/headerHeight']}px`"
    fixed
  >
    <v-list>
      <template v-for="item in menu">
        <template v-if="item.type === 'link'">
          <v-list-item :to="item.to" :key="item.id" exact router>
            <v-list-item-action clas>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.name"/>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-if="item.type === 'group'">
          <v-list-group
            :key="item.id"
            :prepend-icon="item.icon"
            :value="item.expanded"
          >
            <template v-slot:activator>
              <v-list-item-title v-text="item.name"/>
            </template>
            <v-list-item
              v-for="link in item.group"
              :key="link.id"
              :to="link.to"
              exact
            >
              <v-list-item-icon v-if="link.icon">
                <v-icon :class="{ 'white-black-color': item.accent }" v-text="link.icon"/>
              </v-list-item-icon>
              <div v-else-if="mini" class="mr-5">
                <v-icon :class="{ 'white-black-color': item.accent }" v-text="'mdi-circle-small'"/>
              </div>
              <div v-else class="mr-5"></div>
              <v-list-item-title class="white-black-color" v-text="link.name"/>
            </v-list-item>
          </v-list-group>
        </template>
      </template>
    </v-list>

    <template #append>
      <v-list dense>
        <v-list-item @click="setDrawer(false)" class="drawer-list">
          <v-list-item-icon>
            <v-icon
              v-text="$store.getters['controls/isMiniDrawer'] ? 'mdi-arrow-collapse-right' : 'mdi-arrow-collapse-left'"/>
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
      menu () {
        return [
          {
            id: 0,
            type: 'link',
            name: this.$t('favorites'),
            to: '/favorites',
            icon: 'mdi-cards-heart'
          },
          {
            id: 1,
            type: 'link',
            name: this.$t('watchLater'),
            to: '/watch-later',
            icon: 'mdi-clock'
          },
          {
            id: 3,
            type: 'group',
            name: this.$t('genres'),
            icon: 'mdi-list',
            group: this.$store.getters['mainPage/genres']
          }

        ]
      },
      mini () {
        return this.$store.getters['controls/isMiniDrawer']
      }
    },
    methods: {
      setDrawer (value) {
        this.$store.commit('controls/SET_DRAWER', value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-list-item {
    min-height: 42px;

    &__action {
      margin: 8px 0;
    }
  }
</style>
