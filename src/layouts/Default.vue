<template>
  <div>
    <Drawer/>
    <Header/>
    <v-main class="wrapper">
      <v-container @click="setDrawer(false)">
        <router-view></router-view>
      </v-container>
    </v-main>
    <Footer/>
  </div>
</template>

<script>

  import Drawer from '@/components/controls/Drawer'
  import Footer from '@/components/controls/Footer'
  import Header from '@/components/controls/header/Index'

  export default {
    components: {
      Drawer,
      Footer,
      Header
    },
    name: 'DefaultLayout',
    methods: {
      setDrawer (value) {
        this.$store.commit('controls/SET_DRAWER', value)
      }
    }
  }
</script>
