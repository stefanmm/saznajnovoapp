<template>
  <v-app id="app">
    <v-app-bar app color="primary" dark elevate-on-scroll>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link tag="div" class="d-flex align-center" to="/">
        <v-img
          alt="SaznajNovo Logo"
          class="shrink"
          contain
          src="@/assets/logo-2020.svg"
          transition="scale-transition"
          width="150"
        />
      </router-link>
      <v-spacer></v-spacer>
      <v-btn icon v-on:click="toggle_dark_mode">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-navigation-drawer v-model="drawer" fixed temporary width="350">
        <Drawer />
      </v-navigation-drawer>

      <router-view />
      <BottomNav />
      <Footer />
    </v-main>
    <v-offline @detected-condition="amIOnline"></v-offline>
    <v-bottom-sheet v-model="onLine" hide-overlay>
      <v-card tile>
        <v-list>
          <v-list-item>
            <v-list-item-icon class="mr-2">
              <v-btn icon color="warning">
                <v-icon>mdi-wifi-strength-alert-outline</v-icon>
              </v-btn>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                >Veza sa internetom je prekinuta</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-bottom-sheet>
  </v-app>
</template>
<script>
import Drawer from "@/components/Drawer.vue";
import Footer from "@/components/Footer.vue";
import BottomNav from "@/components/BottomNav.vue";
import VOffline from "v-offline";

export default {
  name: "App",
  components: {
    Drawer,
    Footer,
    VOffline,
    BottomNav,
  },
  data() {
    return {
      drawer: false,

      onLine: null,
    };
  },
  methods: {
    toggle_dark_mode: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    },
    amIOnline(e) {
      this.onLine = !e;
    },
  },

  mounted() {
    const theme = localStorage.getItem("dark_theme");
    if (theme) {
      if (theme == "true") {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    }
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
