<template>
  <div id="bottomNav">
  <v-bottom-navigation
   v-model="value"
   :background-color="navBgcolor"
    color="white"
    fixed	

    shift
  >
    <v-btn to="/">
      <span>Početna</span>

      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn to="/favorites">
      <span>Omiljeno</span>

      <v-icon>mdi-heart</v-icon>
    </v-btn>
    <v-btn to="/search">
      <span>Pretraga</span>

      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    
  </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  data() {
    return {
value: 0,
    }
    },
  computed: {
      navBgcolor () {
        switch (this.value) {
          case 0: return 'blue'
          case 1: return 'red'
          case 2: return 'green'
          case 3: return 'indigo'
          default: return 'blue'
        }
      },
}
}
</script>