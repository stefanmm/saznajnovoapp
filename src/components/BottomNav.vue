<template>
  <div id="bottomNav">
  <v-bottom-navigation
   
    color="primary"
    fixed	

    shift
  >
    <v-btn to="/">
      <span>Početna</span>

      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn to="/favorite">
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