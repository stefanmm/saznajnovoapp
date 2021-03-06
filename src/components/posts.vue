<template>
  <div>
    <v-row v-if="postsLoading">
      <v-col cols="12">
        <v-skeleton-loader
          class="mx-auto"
          elevation="3"
          type="card"
          max-width="400"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-if="noPosts">
       <v-col cols="12">
      <v-alert
        class="text-center mt-6 text-h6"
        icon="mdi-emoticon-sad-outline"
        type="warning"
        outlined
        border="top"
        >Nema rezultata za traženi kriterijum</v-alert
      >
       </v-col>
    </v-row>
    <v-row v-if="!postsLoading">
      <v-col
        v-for="(post, index) in posts"
        :key="`${index}`"
        cols="12"
        md="6"
        lg="4"
        xl="2"
      >
        <v-card class="mx-auto" max-width="400" elevation="3">
          <v-img
            class="white--text align-end"
            :src="post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia']['0'].source_url : require('@/assets/noimage.jpg')"
            gradient="to top, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0) 60%"
          >
            <div class="postlist__categories-holder">
              <v-chip
                v-for="(kategorija, index) in post._embedded['wp:term']['0']"
                :key="index"
                class="ml-2 postlist__single-cat"
                color="primary"
                label
                small
                link
                :to="{
                  name: 'Kategorija',
                  params: {
                    catid: parseInt(kategorija.id),
                    catname: kategorija.name,
                  },
                }"
              >
                {{ kategorija.name }}
              </v-chip>
            </div>
            <v-card-title
              class=""
              @click="$router.push({ path: `/single/${post.id}` })"
              v-html="post.title.rendered"
            ></v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            <v-icon small> mdi-account </v-icon>
            <span
              v-for="(author, index) in post._embedded.author"
              :key="index"
              >{{ author.name }}</span
            >
            |
            <v-icon small> mdi-calendar </v-icon>
            {{ post.date | luxon({ output: "dd.MM.yyyy." }) }}
          </v-card-subtitle>

          <v-card-text class="text--primary mt-3">
            <div v-html="post.excerpt.rendered"></div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" outlined :to="'/single/' + post.id">
              Pročitaj
            </v-btn>
            <v-spacer></v-spacer>
            <LikeThis :id="post.id" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <pagination
      :pagination="pagination"
      @prev="
        --postsData.page;
        getPosts();
      "
      @next="
        postsData.page++;
        getPosts();
      "
    >
    </pagination>
  </div>
</template>
  
<script>
import pagination from "./pagination.vue";
import LikeThis from "./LikeThis";

export default {
  props: {
    categoryid: { type: Number, default: 0 },
    tagid: { type: Number, default: 0 },
    postids: { type: Array, default: () => [] },
    searchterm: { type: String, default: "" },
    sortby: { type: String, default: "relevance" },
    sort: { type: String, default: "asc" },
  },
  mounted() {
    this.getPosts(); // get posts on view load
  },
  components: {
    pagination: pagination,
    LikeThis,
  },
  data() {
    return {
      postsLoading: true, // by default on page load posts will be in state of loading
      noPosts: false,
      posts: [],
      postsUrl: process.env.VUE_APP_MAINURL + "/posts?_embed", // use ?_embed so we can get featured img etc.
      // Set the default params to pass to WP REST
      postsData: {
        per_page: 10,
        page: 1,
      },
      pagination: {
        prevPage: "",
        nextPage: "",
        totalPages: "",
        from: "",
        to: "",
        total: "",
      },
    };
  },
  methods: {
    getPosts() {
      // If category/tag IDs are passed then add it to the postData
      // so we can do the query with them

      if (this.categoryid && this.categoryid > 0) {
        this.postsData.categories = this.categoryid;
      } else if (this.tagid && this.tagid > 0) {
        this.postsData.tags = this.tagid;
      }

      if (this.postids && this.postids.length > 0) {
        this.postsData.include = this.postids;
      }

      if (this.searchterm && this.searchterm != "") {
        this.postsData.search = this.searchterm;
        this.postsData.orderby = this.sortby;
        this.postsData.order = this.sort;
      }

      window.scrollTo(0, 0); // Scroll to top when we ask for new posts
      this.postsLoading = true;
      this.$http
        .get(this.postsUrl, { params: this.postsData })
        .then((response) => {
          if (response.data.length != 0) {
            this.posts = response.data;
            this.configPagination(response.headers); // Change the pagination state
            this.noPosts = false;
          } else {
            this.noPosts = true;
          }
          this.postsLoading = false; // Posts loaded, change the flag
        })
        .catch((error) => {
          console.log(error);
        });
    },

    configPagination(headers) {
      this.pagination.total = +headers["x-wp-total"];
      this.pagination.totalPages = +headers["x-wp-totalpages"];
      this.pagination.from = this.pagination.total
        ? (this.postsData.page - 1) * this.postsData.per_page + 1
        : " ";
      this.pagination.to =
        this.postsData.page * this.postsData.per_page > this.pagination.total
          ? this.pagination.total
          : this.postsData.page * this.postsData.per_page;
      this.pagination.prevPage =
        this.postsData.page > 1 ? this.postsData.page : "";
      this.pagination.nextPage =
        this.postsData.page < this.pagination.totalPages
          ? this.postsData.page + 1
          : "";
    },
  },
};
</script>

<style scoped>
.postlist__categories-holder {
  position: absolute;
  top: 10px;
}
</style>