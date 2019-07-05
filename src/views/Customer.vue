<template>
  <v-form ref="form">
    <v-card class="pa-3" v-if="customer">
      <v-text-field v-model="customer.name" readonly solo></v-text-field>
      <v-text-field v-model="customer.email" readonly solo></v-text-field>
      <v-text-field v-model="customer.address_1" :rules="[rules.required]" label="address_1" clearable solo></v-text-field>
      <v-text-field v-model="customer.address_2" label="address_2" clearable solo></v-text-field>
      <v-text-field v-model="customer.city" :rules="[rules.required]" label="city" clearable solo></v-text-field>
      <v-text-field v-model="customer.region" :rules="[rules.required]" label="region" clearable solo></v-text-field>
      <v-text-field v-model="customer.country" :rules="[rules.required]" label="country" clearable solo></v-text-field>
      <v-text-field v-model="customer.postal_code" :rules="[rules.required]" label="postal_code" clearable solo></v-text-field>
      <v-select v-model="customer.shipping_region_id" :rules="[rules.required]" :items="regions" item-value="shipping_region_id" item-text="shipping_region" label="Regions" solo></v-select>

      <v-text-field v-model="customer.day_phone" label="day_phone" clearable solo></v-text-field>
      <v-text-field v-model="customer.eve_phone" label="eve_phone" clearable solo></v-text-field>
      <v-text-field v-model="customer.mob_phone" label="mob_phone" clearable solo></v-text-field>
      <v-text-field v-model="customer.credit_card" mask="credit-card" :rules="[rules.min16char]" label="credit_card" clearable solo></v-text-field>
      <v-btn @click="updateCustomer">UPDATE</v-btn>
    </v-card>
  </v-form>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      regions: [],
      rules: {
        required: value => !!value || "Required.",
        min16char: v => {
          if (v) {
            return v.length == 16 ? true : "Invalid Card";
          } else {
            return true;
          }
        }
      }
    };
  },
  methods: {
    updateCustomer() {
      if (!this.$refs.form.validate()) return;

      this.$store.dispatch("updateCustomer", this.customer);
    }
  },
  mounted() {
    this.$store.dispatch("getCustomer");

    axios.get("https://backendapi.turing.com/shipping/regions").then(res => {
      this.regions = res.data;
    });
  },
  computed: mapState(["customer"])
};
</script>
<style scoped>
.v-card {
  max-width: 400px;
  display: block;
  margin: auto;
}
</style>


