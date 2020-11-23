<template>
  <div>
    <v-container>
      <p class="subtitle-1 text-center">
        <v-icon small> mdi-tag </v-icon> Objave sa oznakom
      </p>
      <p class="display-1 primary--text text-center font-weight-bold">
        {{ tagname }}
      </p>
      <posts :tagid="parseInt(tagid)" :key="componentKey"></posts>
    </v-container>
  </div>
</template>

<script>
import Posts from "../components/posts.vue";
export default {
  name: "TagList",
  components: { Posts },
  watch: {
   // re-render "posts" component on roter params changed while on same page
    $route(to, from) {
      if (to !== from) {
        this.tagid = to.params.tagid;
        this.tagname = to.params.tagname;
        this.componentKey = this.tagid; // This will refresh component
      }
    },
  },

  data() {
    return {
      componentKey: 0,
      tagid: this.$route.params.tagid,
      tagname: this.$route.params.tagname,
    };
  },
};
</script>
