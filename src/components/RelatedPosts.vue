<template>
  <div class="relatedposts mb-4">
    
    <v-container class="pa-0" v-if="loadingRelatedPosts">
      <v-row no-gutters>
        <v-col cols="12">
          <v-skeleton-loader
            class="mx-auto"
            elevation="3"
            type="card"
            max-width="400"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>

    <v-sheet class="mx-auto" v-if="!loadingRelatedPosts">
      <div class="title text-center" v-if="noRelated">Nema povezanih objava</div>
      <v-slide-group>
        <v-slide-item v-for="(post, index) in relatedPosts" :key="index">
          <v-card
            class="ma-2"
            width="300"
            link
            :to='"/single/"+post.id'
           
          >
            <v-img
              :aspect-ratio="1.9047619"
              :src="post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia']['0'].source_url : require('@/assets/noimage.jpg')"
            >
            </v-img>
            <v-card-text
              class="font-weight-bold subtitle-1"
              v-html="post.title.rendered"
            >
            </v-card-text>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: "RelatedPosts",
  props: ["cats", "tags", "thisid"],

  data() {
    return {
     
      loadingRelatedPosts: true,
      noRelated: false,
      postsUrl: process.env.VUE_APP_MAINURL+"/posts?_embed&tags=" +
        this.tags +
        "&categories=" +
        this.cats,
      postData: {
        per_page: 8,
        exclude: this.thisid, // exclude current post from related
      },

      relatedPosts: [],
    };
  },
  mounted() {
    this.getRelatedPost(); // get posts on view load
  },
  methods: {
    getRelatedPost() {
      this.$http
        .get(this.postsUrl, { params: this.postData })
        .then((response) => {
          
          this.loadingRelatedPosts = false;
          if (!response.data.length) {
            this.noRelated = true;
          } else {
            this.noRelated = false;
            this.relatedPosts = response.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>