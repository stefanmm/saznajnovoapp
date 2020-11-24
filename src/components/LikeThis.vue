<template>
  <div class="likethis">
    <v-btn icon :color="liked" v-on:click="toggle_like(id)">
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      liked: null,
      likedPosts: [],
    };
  },
  mounted() {
    const likedPosts = localStorage.getItem("likedPosts");

    if (likedPosts) {
      this.likedPosts = likedPosts;
    } else {
      // Create localStorage with empty array if not exist
      localStorage.setItem("likedPosts", JSON.stringify(this.likedPosts));
    }
    if (this.likedPosts.includes(this.id)) {
      this.liked = "red";
    } else {
      this.liked = "grey";
    }
  },
  methods: {
    toggle_like: function (id) {
      let vm = this;

      vm.likedPosts = JSON.parse(localStorage.getItem("likedPosts")); // Always retreive latest list

      if (vm.likedPosts.includes(id)) {
        var index = vm.likedPosts.indexOf(id);
        vm.likedPosts.splice(index, 1);
        localStorage.setItem("likedPosts", JSON.stringify(vm.likedPosts));
        vm.liked = "grey";
      } else {
        vm.likedPosts.push(id);
        localStorage.setItem("likedPosts", JSON.stringify(vm.likedPosts));
        vm.liked = "red";
      }
    },
  },
};
</script>