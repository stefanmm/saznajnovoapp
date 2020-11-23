<template>
  <div>
    <v-container>
      <p class="subtitle-1 text-center">
        <v-icon small> mdi-folder </v-icon> Objave iz kategorije
      </p>
      <p class="display-1 primary--text text-center font-weight-bold">
        {{ catname }}
      </p>
      <posts :categoryid="parseInt(catid)" :key="componentKey"></posts>
    </v-container>
  </div>
</template>

<script>
import Posts from "../components/posts.vue";
export default {
  name: "CategoryList",
  components: { Posts },
  watch: {
   // re-render "posts" component on router params changed while on same page
    $route(to, from) {
      if (to !== from) {
        this.catid = to.params.catid;
        this.catname = to.params.catname;
        this.componentKey = this.catid; // This will refresh component
      }
    },
  },

  data() {
    return {
      componentKey: 0,
      catid: this.$route.params.catid,
      catname: this.$route.params.catname,
    };
  },
};
</script>
