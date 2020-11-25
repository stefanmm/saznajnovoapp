<template>
  <div class="home">
    <v-container class="pa-0" v-if="!sliderLoaded">
      <v-row no-gutters>
        <v-col cols="12">
          <v-skeleton-loader
            class="mx-auto"
            elevation="3"
            type="image"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="pa-0" v-if="sliderLoaded && featuredPosts.length > 0">
      <v-row no-gutters>
        <v-responsive :aspect-ratio="1.9047619">
          <v-carousel cycle dark height="100%" interval="2500" hide-delimiters>
            <v-carousel-item
              v-for="(featuredPost, index) in featuredPosts"
              :key="`${index}`"
              :to="'/single/' + featuredPost.id"
              :src="featuredPost._embedded['wp:featuredmedia']['0'].source_url"
            >
              <v-row
                class="fill-height bottom-gradient pa-3"
                align="end"
                justify="center"
              >
                <div class="text-center px-4 pb-3" align="end">
                  <span
                    class="white--text text-h5"
                    v-html="featuredPost.title.rendered"
                  ></span>
                </div>
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </v-responsive>
      </v-row>
    </v-container>
    <v-container>
      <p class="headline primary--text text-center" color="primary" dark>
        <v-icon large color="primary"> mdi-access-point </v-icon> Najnovije
      </p>
      <posts></posts>
    </v-container>
  </div>
</template>

<style scoped>
.bottom-gradient {
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    transparent 60%
  );
}
</style>

<script>
import Posts from "../components/posts.vue";

// @ is an alias to /src

export default {
  name: "Home",
  components: { Posts },
  mounted() {
    this.getFeaturedPosts();
   
  },
  data() {
    return {
      sliderLoaded: false,
      postsUrl: process.env.VUE_APP_MAINURL+"/posts?_embed",
      featuredPosts: [],
      right: null,
    };
  },
  methods: {
    getFeaturedPosts() {
      this.$http
        .get(this.postsUrl, { params: { categories: 498 } })
        .then((response) => {
          this.featuredPosts = response.data;
          this.sliderLoaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
