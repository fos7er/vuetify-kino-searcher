import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import en from 'vuetify/lib/locale/en'
import ru from 'vuetify/lib/locale/ru'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { ru, en },
    current: 'en'
  },
  //theme: { dark: true },
  theme: {
    themes: {
      dark: {
        accent: colors.amber.darken4
      }
    },
    dark:true
  }
})
