<template>
  <v-card class="cart">
    <v-container>
      <v-layout wrap v-for="(item, i) in cart" :key="item.item_id" class="mt-2">
        <v-flex md2>
          <v-img width="100" :src="'https://backendapi.turing.com/images/products/'+item.image"></v-img>
        </v-flex>
        <v-flex md3 hidden-xs-only>
          <b v-if="i==0">name</b>
          <br>
          <br>
          {{item.name}}
        </v-flex>
        <v-flex md2 hidden-xs-only>
          <b v-if="i==0">attributes</b>
          <br>
          <br>
          {{item.attributes}}
        </v-flex>
        <v-flex md2 hidden-xs-only>
          <b v-if="i==0">quantity</b>
          <br>
          <br>
          <div class="cart-quantity-container">
            <v-btn fab small @click="$store.dispatch('updateCart',{quantity: ++item.quantity, item_id: item.item_id})">+</v-btn>
            <span>{{item.quantity}}</span>
            <v-btn fab small @click="item.quantity>1 ? $store.dispatch('updateCart',{quantity: --item.quantity, item_id: item.item_id}): quantity=1">-</v-btn>
          </div>
        </v-flex>
        <v-flex md2>
          <b v-if="i==0">subtotal</b>
          <br>
          <br>
          {{item.subtotal}}
        </v-flex>
        <v-flex md1>
          <br>
          <v-btn @click="$store.dispatch('removeProduct', item.item_id)" fab small color="error">X</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["cart_id", "cart"]),
  mounted() {
    this.$store.dispatch("generateUniqueId");
    this.$store.dispatch("getCart");
  }
};
</script>
<style scoped>
.cart {
  max-width: 800px;
  display: block;
  margin: auto;
  text-align: center;
}
.cart-quantity-container {
  display: flex;
  max-width: 30px;
}
.cart-quantity-container .v-btn {
  margin-top: -10px;
}
</style>


