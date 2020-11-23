<template>
  <div class="footer mt-6">
    <v-card>
      <v-footer padless>
        <v-card flat tile width="100%" class="grey darken-3 text-center">
          <v-card-text>
            <v-row
              align="center"
              class="justify-space-around justify-md-center"
            >
              <v-btn
                v-for="(link, index) in links"
                :key="index"
                :href="link.url"
                target="_blank"
                dark
                small
                outlined
                text
                class="mb-2"
              >
                {{ link.name }}
              </v-btn>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="white--text">
            2010 - {{ new Date().getFullYear() }} |
            <strong>SaznajNovo.com</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    links: [
      { name: "Kontakt", url: "https://www.saznajnovo.com/kontakt/" },
      { name: "Saradnja", url: "https://www.saznajnovo.com/marketing/" },
      { name: "O blogu", url: "https://www.saznajnovo.com/o-blogu/" },
      { name: "O autoru", url: "https://www.saznajnovo.com/o-autoru/" },
      { name: "Podrži blog", url: "https://www.saznajnovo.com/podrzi-blog/" },
    ],
  }),
};
</script>