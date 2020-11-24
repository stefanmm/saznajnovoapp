<template>
  <div>
    <v-container>
      <p class="headline green--text text-center font-weight-bold">
        <v-icon color="green"> mdi-magnify </v-icon> Pretraži objave
      </p>
    </v-container>

    <v-container>
      <v-form lazy-validation v-model="valid" @submit.prevent="fetchResults">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="term"
                label="Pretraži"
                :rules="termRules"
                clearable
                color="green"
                append-outer-icon="mdi-magnify"
                required
                @click:append-outer="fetchResults"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-container>

    <v-container>
      <posts v-if="reloadPosts != null" :searchterm="term" :key="reloadPosts"></posts>
    </v-container>
  </div>
</template>

<script>
import Posts from "../components/posts.vue";
export default {
  name: "Search",
  components: { Posts },

  data() {
    return {
      valid: true,
      term: "",
      fetch: false,
      reloadPosts: null,
      termRules: [
        (v) => !!v || "Unesi pojam za pretragu",
        (v) => (v && v.length >= 3) || "Unesi makar 3 karaktera",
      ],
    };
  },
  mounted() {},
  methods: {
    fetchResults: function () {
      this.reloadPosts = Date.now();
     
    },
  },
};
</script>
