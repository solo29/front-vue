<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>SHOP MATE</span>
        <v-btn flat to="/">
          <span class="mr-2">Home</span>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-text-field v-model="searchString" clearable hide-details prepend-icon="search" single-line></v-text-field>

      <v-dialog v-model="dialog" width="800">
        <template v-slot:activator="{ on }">
          <v-btn color="warning" dark v-on="on">
            <v-icon>shopping_cart</v-icon>
          </v-btn>
          <v-badge left>
            <template v-slot:badge>
              <span>{{cart ? cart.length: '' }}</span>
            </template>
          </v-badge>
        </template>
        <cart/>
      </v-dialog>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import cart from "./components/Cart";
export default {
  name: "App",
  components: {
    cart
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {},
  computed: {
    ...mapState(["categories", "products", "departments", "cart"]),
    searchString: {
      set(val) {
        console.log(val);
        this.$store.dispatch("searchProducts", val);
      },
      get() {
        return this.$store.state.searchString;
      }
    }
  },
  mounted() {
    this.$store.dispatch("getCategories");
    this.$store.dispatch("getProducts");
    this.$store.dispatch("getDepartments");
  }
};
</script>
