<template>
  <div>
    <v-container>
      <p class="headline red--text text-center font-weight-bold">
        <v-icon color="red"> mdi-heart </v-icon> Omiljene objave
      </p>

      <posts
        :postids="likedPosts"
        :key="Date.now()"
        v-if="hasLikedPosts"
      ></posts>
      <v-alert
        class="text-center mt-6 text-h6"
        v-else
        icon="mdi-heart-broken"
        type="warning"
        outlined
        border="top"
        >Nema omiljenih objava</v-alert
      >
    </v-container>
  </div>
</template>

<script>
import Posts from "../components/posts.vue";
export default {
  name: "Favorites",
  components: { Posts },

  data() {
    return {
      hasLikedPosts: false,
      likedPosts: [],
   
    };
  },
  mounted() {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts"));

    if (likedPosts && likedPosts.length > 0) {
      this.hasLikedPosts = true;
      this.likedPosts = likedPosts;
    } else {
      this.hasLikedPosts = false;
    }
  },
};
</script>
