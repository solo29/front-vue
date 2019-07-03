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
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",

  methods: {},
  computed: mapState(["categories", "products", "departments"]),
  mounted() {
    this.$store.dispatch("getCategories");
    this.$store.dispatch("getProducts");
    this.$store.dispatch("getDepartments");
  }
};
</script>
