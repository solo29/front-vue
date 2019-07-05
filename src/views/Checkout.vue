<template>
  <div>
    <cart/>
    <vue-stripe-checkout ref="checkoutRef" :name="name" :description="description" :currency="currency" :amount="amount" :allow-remember-me="false" @done="done" @opened="opened" @closed="closed" @canceled="canceled"></vue-stripe-checkout>
    <v-btn @click="checkout">Pay</v-btn>
  </div>
</template>
<script>
import cart from "../components/Cart";
export default {
  components: {
    cart
  },
  data() {
    return {
      name: "Shut up and take my money!",
      description: "CRAP",
      currency: "USD",
      amount: 99999
    };
  },
  methods: {
    async checkout() {
      // token - is the token object
      // args - is an object containing the billing and shipping address if enabled
      const { token, args } = await this.$refs.checkoutRef.open();
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
