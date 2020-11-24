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
            <v-col cols="6">
              <v-select
                v-model="sortPosts"
               
                :items="sortPostsList"
                item-text="name"
                item-value="value"
                label="Sortiraj po"
                persistent-hint
                return-object
                single-line
                solo
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="orderPosts"
               
                :items="orderPostsList"
                item-text="name"
                item-value="value"
                label="Redosled"
                persistent-hint
                return-object
                single-line
                solo
              ></v-select>
            </v-col>
          </v-row>
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
      <posts
        v-if="reloadPosts != null"
        :searchterm="term"
        :key="reloadPosts"
        :sortby="sortPosts.value"
        :sort="orderPosts.value"
      ></posts>
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
      sortPosts: { name: 'Relevantnost', value: 'relevance' },
        sortPostsList: [
          { name: 'Relevantnost', value: 'relevance' },
          { name: 'Vreme objave', value: 'date' },
          { name: 'Vreme ažuriranja', value: 'modified' },
          { name: 'Naslov', value: 'title' },
        ],
        orderPosts: { name: 'Uzlazno', value: 'asc' },
        orderPostsList: [
          { name: 'Uzlazno', value: 'asc' },
          { name: 'Silazno', value: 'desc' },
          
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
