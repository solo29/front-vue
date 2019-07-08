<template>
  <div>
    <cart />
    <vue-stripe-checkout
      ref="checkoutRef"
      :name="name"
      :description="description"
      :currency="currency"
      :amount="amount"
      :allow-remember-me="false"
      @done="done"
      @opened="opened"
      @closed="closed"
      @canceled="canceled"
    ></vue-stripe-checkout>
    <v-card class="pa-3 center" v-if="!_.isEmpty(cart)">
      <v-select
        @change="fetchShippings"
        v-model="customer.shipping_region_id"
        :items="regions"
        item-value="shipping_region_id"
        item-text="shipping_region"
        label="Region"
        solo
      ></v-select>
      <v-select
        v-model="selectedShippingId"
        :items="shippings"
        item-value="shipping_id"
        item-text="shipping_type"
        label="Shipping Method"
        solo
      ></v-select>
      <v-btn :disabled="!selectedShippingId" @click="checkout">Pay</v-btn>
    </v-card>
  </div>
</template>
<script>
import cart from "../components/Cart";
import { mapState } from "vuex";
export default {
  components: {
    cart
  },
  computed: mapState(["customer", "cart_id", "cart"]),
  mounted() {
    this.fetchShippings();
    axios.get("https://backendapi.turing.com/shipping/regions/").then(res => {
      this.regions = res.data;
    });
  },
  data() {
    return {
      name: "Shut up and take my money!",
      description: "CRAP",
      currency: "USD",
      amount: null,
      shippings: [],
      regions: [],
      selectedShippingId: null
    };
  },
  methods: {
    fetchShippings() {
      axios
        .get(
          "https://backendapi.turing.com/shipping/regions/" +
            this.customer.shipping_region_id
        )
        .then(res => {
          this.shippings = res.data;
        });
    },
    async checkout() {
      let res = await axios.post("https://backendapi.turing.com/orders/", {
        cart_id: this.cart_id,
        shipping_id: this.selectedShippingId,
        tax_id: 1
      });
      let orderId = _.get(res, "data.orderId");

      // token - is the token object
      // args - is an object containing the billing and shipping address if enabled
      if (!orderId) {
        alert("Cant Place Order");
        return;
      }
      let order = await axios.get(
        "https://backendapi.turing.com/orders/" + orderId
      );
      this.$store.dispatch("resetCart");
      let finalPrice = order.data.reduce(
        (acc, curr) => acc + +curr.subtotal,
        0
      );
      console.log(order, finalPrice);
      finalPrice = Math.ceil(finalPrice * 100);
      this.amount = finalPrice;
      const { token, args } = await this.$refs.checkoutRef.open();
      console.log(token, args);
      const stripeRes = await axios.post(
        "https://backendapi.turing.com/stripe/charge/",
        {
          stripeToken: token.id,
          order_id: orderId,
          description: "crap Shirt",
          amount: finalPrice
        }
      );
      if (_.get(stripeRes, "data.paid")) {
        this.$router.push("order/" + orderId);
      }
    },
    done({ token, args }) {
      // token - is the token object
      // args - is an object containing the billing and shipping address if enabled
      // do stuff...
    },
    opened() {
      // do stuff
    },
    closed() {
      // do stuff
    },
    canceled() {
      // do stuff
    }
  }
};
</script>
<style scoped>
.center {
  display: block;
  max-width: 800px;
  margin: auto;
}
</style>
