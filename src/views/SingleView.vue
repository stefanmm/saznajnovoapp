<template>
  <div id="singleHolder">
    <v-container class="pa-0" v-if="!postLoaded">
      <v-row no-gutters>
        <v-col cols="12">
          <v-skeleton-loader
            class="mx-auto mb-6"
            elevation="3"
            type="image"
          ></v-skeleton-loader>

          <v-skeleton-loader
            class="mx-auto"
            elevation="3"
            type="card"
            max-width="400"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
    <div v-if="postLoaded">
      <v-container class="pa-0">
        <v-row no-gutters>
          <v-img
            :aspect-ratio="1.9047619"
            class="white--text align-end"
            :src="postData._embedded['wp:featuredmedia']['0'].source_url"
            gradient="to top, rgba(0,0,0,0.7) 10%, rgba(0,0,0,0) 60%"
          >
            <p
              class="text-h5 text-sm-h4 text-md-h3 px-3 text-center"
              v-html="postData.title.rendered"
            ></p>
          </v-img>
        </v-row>
      </v-container>

      <v-container>
        <v-row>
          <v-subheader class="px-3 text-center full-width">
            <v-icon small class="mr-2"> mdi-account </v-icon> Stefan Marjanov
            <v-icon small> mdi-circle-small </v-icon>
            <v-icon small class="mr-2"> mdi-calendar </v-icon>
            {{ postData.date | luxon({ output: "dd.MM.yyyy." }) }}
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="
                $vuetify.goTo('#comments', {
                  duration: 500,
                  easing: 'easeInOutCubic',
                })
              "
            >
              <v-icon>mdi-chat</v-icon>
            </v-btn>
          </v-subheader>
        </v-row>
      </v-container>

      <v-container id="postContent" class="pa-0">
        <v-row no-gutters>
          <v-card class="pa-4">
            <div
              v-html="postData.content.rendered"
              class="postContentText"
            ></div>

            <v-card
              class="mt-n12 mx-auto text-center"
              elevation="6"
              link
              :href="postData.link"
              target="_blank"
            >
              <v-card-text class="text-h6 blue--text"
                >Nastavi sa čitanjem na blogu
                <v-icon class="ml-2 blue--text">
                  mdi-open-in-new
                </v-icon></v-card-text
              >
            </v-card>
          </v-card>
        </v-row>
      </v-container>

      <v-container id="postMetaBottom">
        <v-row>
          <div class="pa-2 full-width">
            <v-icon small class="mr-2"> mdi-folder </v-icon>
            <v-chip
              v-for="(kategorija, index) in postData._embedded['wp:term']['0']"
              :key="index"
              class="ml-2"
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
          <div class="pa-2 full-width">
            <v-icon small class="mr-2"> mdi-tag </v-icon>
            <v-chip
              v-for="(oznaka, index) in postData._embedded['wp:term']['1']"
              :key="index"
              class="ml-2"
              color="primary"
              label
              small
              link
              :to="{
                name: 'Tag',
                params: { tagid: parseInt(oznaka.id), tagname: oznaka.name },
              }"
            >
              {{ oznaka.name }}
            </v-chip>
          </div>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center title">
            <v-banner single-line>
              <p><v-icon> mdi-vector-link </v-icon> Povezane objave</p>
            </v-banner>
          </v-col>
        </v-row>
      </v-container>
      <v-lazy
        v-model="isActive"
        :options="{
          threshold: 0.7,
        }"
       
        transition="fade-transition"
      >
        <Related
          :cats="postData.categories"
          :tags="postData.tags"
          :thisid="thisid"
        ></Related>
      </v-lazy>

      <v-container>
        <v-row>
          <v-col cols="12" class="text-center title">
            <v-banner single-line>
              <p><v-icon> mdi-chat </v-icon> Komentari</p>
            </v-banner>
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <v-row class="justify-center">
          <v-btn
            color="primary"
            elevation="2"
            large
            :disabled="loadingComments"
            :loading="loadingComments"
            raised
            rounded
            outlined
            @click="loadComments(postData.id)"
          >
            {{ commentBtnText }}
          </v-btn>
        </v-row>
      </v-container>
      <v-container id="comments">
        <v-card
          v-for="(comment, index) in commentsData"
          :key="index"
          elevation="2"
          class="mb-3"
        >
          <v-card-title class="headline">
            <v-icon class="mr-2"> mdi-account-circle </v-icon>
            {{ comment.author_name }}
          </v-card-title>

          <v-card-subtitle>{{
            comment.date | luxon({ output: "dd.MM.yyyy." })
          }}</v-card-subtitle>
          <v-card-text v-plaintext>
            {{ comment.content.rendered }}
          </v-card-text>
          <v-card-actions>
            <v-btn outlined small :href="comment.link" target="_blank">
              Odgovori
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </div>
  </div>
</template>
  
<script>
import Related from "../components/RelatedPosts";

export default {
  name: "SingleView",
  components: {
    Related,
  },
  data() {
    return {
      isActive: false,
      commentBtnText: "Učitaj komentare",
      loadingComments: false,
      postLoaded: false,
      thisid: this.$route.params.postid,
      baseUrl: process.env.VUE_APP_MAINURL+"/posts/" +
        this.$route.params.postid +
        "?_embed",
      commentsUrl: process.env.VUE_APP_MAINURL+"/comments/",
      postData: [],
      commentsData: [],
    };
  },
  mounted() {
    this.getSinglePost();
  },
  methods: {
    getSinglePost() {
      this.$http
        .get(this.baseUrl)
        .then((response) => {
          this.postData = response.data;
          this.postLoaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadComments: function (postid) {
      this.loadingComments = true;
      this.$http
        .get(this.commentsUrl, { params: { post: postid } })
        .then((response) => {
          if (!response.data.length) {
            this.commentBtnText = "Nema komentara";
          } else {
            this.commentsData = response.data;
          }

          this.loadingComments = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  watch: {
    // re-render "this" component on router params changed while on same page
    $route(to, from) {
      if (to !== from) {
        window.location.reload();
      }
    },
  },
};
</script>

<style >
.full-width {
  width: 100%;
}
.theme--dark .postContentText:before {
  background: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-stop(50%, #000),
    to(transparent)
  );
  background: -o-linear-gradient(bottom, rgb(0, 0, 0) 50%, transparent 100%);
  background: linear-gradient(to top, rgb(0, 0, 0) 50%, transparent 100%);
}
.postContentText:before {
  content: "";
  position: absolute;
  display: block;
  left: 0;
  bottom: 0;
  right: 0;
  height: 150px;
  background: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-stop(50%, #fff),
    to(transparent)
  );
  background: -o-linear-gradient(bottom, #fff 50%, transparent 100%);
  background: linear-gradient(to top, #fff 50%, transparent 100%);
}
.postContentText .wp-embed-aspect-16-9 {
  position: relative;
  padding-bottom: 56.25%; /* proportion value to aspect ratio 16:9 (9 / 16 = 0.5625 or 56.25%) */
  height: 0;
  overflow: hidden;
}
.postContentText .wp-embed-aspect-16-9 iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.postContentText img {
  width: 100%;
  height: auto;
}
</style>