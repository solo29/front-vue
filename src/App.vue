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
      <v-btn to="/customer" v-if="_.has(customer,'name')">{{customer.name}}</v-btn>
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
      <v-dialog v-if="!accessToken" v-model="registerDialog" width="300">
        <template v-slot:activator="{ on }">
          <v-btn color="info" dark v-on="on">Register</v-btn>
        </template>
        <register/>
      </v-dialog>
      <v-dialog v-if="!accessToken" v-model="loginDialog" width="300">
        <template v-slot:activator="{ on }">
          <v-btn color="info" dark v-on="on">Login</v-btn>
        </template>
        <login/>
      </v-dialog>
      <v-btn @click="$store.dispatch('logout')">LOGOUT</v-btn>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import cart from "./components/Cart";
import register from "./components/Register";
import login from "./components/Login";
export default {
  name: "App",
  components: {
    cart,
    register,
    login
  },
  data() {
    return {
      dialog: false,
      registerDialog: false,
      loginDialog: false
    };
  },
  methods: {},
  computed: mapState([
    "categories",
    "products",
    "departments",
    "cart",
    "customer",
    "accessToken"
  ]),
  mounted() {
    this.$store.dispatch("getCategories");
    this.$store.dispatch("getProducts");
    this.$store.dispatch("getDepartments");
  }
};
</script>
