<template>
  <v-app>
    <v-toolbar color="teal" dark app>
      <v-toolbar-title class="headline text-uppercase">
        <v-btn flat to="/">
          <span class="mr-2">Shop Mate</span>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn color="primary" to="/customer" v-if="_.has(customer,'name')">{{customer.name}}</v-btn>
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
        <v-card>
          <cart/>
          <v-btn to="/checkout" @click="dialog=false">Checkout</v-btn>
        </v-card>
      </v-dialog>
      <v-dialog v-if="!accessToken" v-model="registerDialog" width="300">
        <template v-slot:activator="{ on }">
          <v-btn class="hidden-xs-only" color="primary" dark v-on="on">Register</v-btn>
        </template>
        <register/>
      </v-dialog>
      <v-dialog v-if="!accessToken" v-model="loginDialog" width="300">
        <template v-slot:activator="{ on }">
          <v-btn class="hidden-xs-only" color="red" dark v-on="on">Login</v-btn>
        </template>
        <login/>
      </v-dialog>

      <v-facebook-login class="hidden-xs-only" v-if="!accessToken" version="v2.2" v-on:login="fbLogin" app-id="352854622106208"></v-facebook-login>
      <v-btn color="red" v-if="accessToken" @click="$store.dispatch('logout')">LOGOUT</v-btn>
      <v-menu v-if="!accessToken" bottom left>
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on" class="display-xs-only hidden-sm-and-up">
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>

        <v-list class="display-xs-only hidden-sm-and-up">
          <v-list-tile @click="loginDialog=true">
            <v-list-tile-title>Login</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="registerDialog=true">
            <v-list-tile-title>Register</v-list-tile-title>
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
import VFacebookLogin from "vue-facebook-login-component";
import { mapState } from "vuex";
import cart from "./components/Cart";
import register from "./components/Register";
import login from "./components/Login";
export default {
  name: "App",
  components: {
    cart,
    register,
    login,
    VFacebookLogin
  },
  data() {
    return {
      dialog: false,
      registerDialog: false,
      loginDialog: false
    };
  },
  methods: {
    fbLogin(e) {
      if (_.get(e, "status") == "connected") {
        //  this.$store.commit("SET_TOKEN", e.authResponse.accessToken);
        this.$store.dispatch("setCustomerFB", e.authResponse.accessToken);
        console.log(e);
      }
    }
  },
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
