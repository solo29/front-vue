<template>
  <div>
    <v-alert :value="!_.isEmpty(order)" type="success">Your Order {{_.get(_.head(order),'order_id')}} was paid successfully</v-alert>
    <div class="text-xs-center" v-for="product in order" :key="product.order_id">
      <v-chip color="red" text-color="white">{{product.quantity}}</v-chip>
      <v-chip color="primary" text-color="white">{{product.product_name}}</v-chip>
      <v-chip color="green" text-color="white">{{product.subtotal}}$</v-chip>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      order: null
    };
  },
  mounted() {
    axios
      .get(`https://backendapi.turing.com/orders/${+this.$route.params.id}`)
      .then(res => (this.order = res.data));
  }
};
</script>
