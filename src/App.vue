<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat to="/">
        <span class="mr-2">Home</span>
      </v-btn>
      <v-btn flat to="/product">
        <span class="mr-2">Product</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    HelloWorld
  },
  methods: {},
  computed: mapState(["categories", "products"]),
  mounted() {
    this.$store.dispatch("getCategories");
    this.$store.dispatch("getProducts");
  }
};
</script>
