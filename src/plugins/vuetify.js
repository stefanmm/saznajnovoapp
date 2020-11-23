import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
          primary: "#3176DA",
          secondary: colors.grey.darken1,
          accent: colors.shades.black,
          error: colors.red.accent3,
        },
        dark: {
            primary: "#3176DA"
        },
      },
      
    },
  })

export default vuetify
