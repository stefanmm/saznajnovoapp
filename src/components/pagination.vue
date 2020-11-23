<template>
  <nav class="pagination">
    <v-container class="text-center">
      <v-row>
        <v-col>
          <v-btn color="primary" elevation="2" rounded
            v-if="pagination.prevPage"
            @click="$emit('prev')"
            ><v-icon left> mdi-arrow-left-drop-circle-outline </v-icon>
            Nazad</v-btn
          >
          <v-btn color="primary" elevation="0" rounded
            v-else
            disabled
            ><v-icon left> mdi-arrow-left-drop-circle-outline </v-icon>
            Nazad</v-btn
          >
        </v-col>
        <v-col>
          <v-btn color="primary" elevation="2" rounded
             v-if="pagination.nextPage"
              @click="$emit('next')"
            >Napred
            <v-icon right> mdi-arrow-right-drop-circle-outline </v-icon></v-btn
          >
          <v-btn color="primary" elevation="2" rounded
             v-else
             disabled
            >Napred
            <v-icon right> mdi-arrow-right-drop-circle-outline </v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-container>

  </nav>
</template>

<script>
export default {
  props: ["pagination"],
};
</script>