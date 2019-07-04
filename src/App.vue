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
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Department</v-btn>
        </template>
        <v-list>
          <v-list-tile v-for="(department, index) in departments" :key="index" @click="$store.dispatch('changeDepartment', department.department_id)">
            <v-list-tile-title>{{ department.name }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Category</v-btn>
        </template>
        <v-list>
          <v-list-tile v-for="(category, index) in categories.rows" :key="index" @click="$store.dispatch('changeCategory', category.category_id)">
            <v-list-tile-title>{{ category.name }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
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
      dialog
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
