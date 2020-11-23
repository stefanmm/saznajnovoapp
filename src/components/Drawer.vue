<template>
  <div class="drawer">
  
    <v-card class="pa-md-4 mx-auto" color="primary" tile>
      <v-card-text>
        <router-link tag="div" class="d-flex align-center" to="/">
          <v-img
            alt="SaznajNovo Logo"
            class="shrink"
            contain
            src="@/assets/logo-2020.svg"
           
            width="200"
          />
        </router-link>
      </v-card-text>
    </v-card>

    <v-divider></v-divider>

    <v-list dense nav rounded>
      <v-list-item-group color="primary">
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon> mdi-home </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Početna</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Iterate menu items -->
        <template v-for="(singleNav, index) in drawerItems">
          <!-- If item has childs -->
          <v-list-group
            v-if="singleNav.childs"
            :key="index"
            :prepend-icon="singleNav.icon"
          >
            <template v-slot:activator>
              <v-list-item-title>{{ singleNav.title }}</v-list-item-title>
            </template>

            <v-list-item
              v-for="(singleSubNav, index) in singleNav.childs"
              :key="index"
              link
              class="pl-5"
              :to="{
                name: 'Kategorija',
                params: {
                  catid: parseInt(singleSubNav.id),
                  catname: singleSubNav.title,
                },
              }"
            >
              <v-list-item-icon>
                <v-icon>{{ singleSubNav.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ singleSubNav.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <!-- If item doesn't has childs -->
          <v-list-item
            v-else
            :key="singleNav.id"
            link
            :to="{
              name: 'Kategorija',
              params: {
                catid: parseInt(singleNav.id),
                catname: singleNav.title,
              },
            }"
          >
            <v-list-item-icon>
              <v-icon>{{ singleNav.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ singleNav.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>

    <!-- /NAV  -->
<v-divider class="my-5"></v-divider>

    <!-- Social icons  -->
    <template>
  <div class="text-center">
    
    <v-btn
    v-for="(social, index) in socialmedia" :key="index"
      class="ma-2"
      outlined
      fab
      :color="social.color"
      small
      :href="social.link"
      target="_blank"
    >
      <v-icon>{{social.icon}}</v-icon>
    </v-btn>
    
    
  </div>
</template>

  </div>
</template>

<script>
export default {
  name: "Drawer",
  components: {},
  data() {
    return {
      socialmedia: [
        {icon: "mdi-facebook", link: "https://www.facebook.com/saznaj.novo", color: "#4664AA"},
        {icon: "mdi-youtube", link: "https://www.youtube.com/user/saznajnovo", color: "#FF0000"},
        {icon: "mdi-twitter", link: "https://twitter.com/saznajnovo", color: "#3E9BE9"},
        {icon: "mdi-email", link: "http://eepurl.com/c05_Gb", color: "#e8c800"},
      ],
      drawerItems: [
        {
          title: "IT Vesti",
          icon: "mdi-earth",
          id: 68,
          childs: [
            { title: "Događaji", icon: "mdi-calendar-range", id: 550 },
            { title: "Sve objave", icon: "mdi-menu", id: 68 },
          ],
        },

        {
          title: "Internet",
          icon: "mdi-web",
          id: 10,
          childs: [
            {
              title: "Društvene mreže",
              icon: "mdi-account-multiple-outline",
              id: 11,
            },
            { title: "Sajtovi", icon: "mdi-link", id: 12 },
            { title: "Sigurnost", icon: "mdi-lock", id: 48 },
            { title: "Sve objave", icon: "mdi-menu", id: 10 },
          ],
        },
        {
          title: "Računari",
          icon: "mdi-desktop-classic",
          id: 3,
          childs: [
            {
              title: "Operativni sistemi",
              icon: "mdi-microsoft-windows",
              id: 13,
            },
            { title: "Hardver", icon: "mdi-memory", id: 4 },
            { title: "Softver", icon: "mdi-download", id: 5 },
            { title: "Zaštita", icon: "mdi-security", id: 41 },
            { title: "Gejming", icon: "mdi-gamepad-variant", id: 8 },
            { title: "Sve objave", icon: "mdi-menu", id: 3 },
          ],
        },
        {
          title: "Mobilni",
          icon: "mdi-cellphone-android",
          id: 377,
          childs: [
            { title: "Android", icon: "mdi-android", id: 74 },
            { title: "iOS", icon: "mdi-apple", id: 483 },
            { title: "Sve objave", icon: "mdi-menu", id: 377 },
          ],
        },
        { title: "Kako da...", icon: "mdi-check-circle-outline", id: 19 },
      ],
    };
  },
};
</script>