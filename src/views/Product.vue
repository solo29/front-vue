<template>
  <div class="about">
    <div class="product-container">
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12 md6>
              <v-carousel height="400" v-if="product.image">
                <v-carousel-item :src="'https://backendapi.turing.com/images/products/'+product.image"></v-carousel-item>
                <v-carousel-item :src="'https://backendapi.turing.com/images/products/'+product.image_2"></v-carousel-item>
              </v-carousel>
            </v-flex>
            <v-flex md6 xs12 class="pa-5">
              <div v-for="location in locations" :key="location.category_id">
                <v-chip>{{location.category_name}}</v-chip>
                <v-chip>{{location.department_name}}</v-chip>
              </div>
              <h1>{{product.name}}</h1>
              <p>{{product.description}}</p>
              <div>
                <div v-if="_.get(product, 'discounted_price')>0">
                  <span class="line-through">{{product.price}}$</span> &nbsp;
                  <h2>{{product.discounted_price}}$</h2>
                </div>
                <div v-else>
                  <h2>{{product.price}}$</h2>
                </div>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </div>
    <v-card v-for="(review,i) in reviews" :key="i" class="ma-3 pa-3">
      <v-rating :value="i"></v-rating>
      <p>{{review.review}}</p>
    </v-card>
    {{reviews}}
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      locations: [],
      reviews: []
    };
  },
  mounted() {
    this.$store.dispatch("getProduct", +this.$route.params.id);

    axios
      .get(
        `https://backendapi.turing.com/products/${+this.$route.params
          .id}/locations`
      )
      .then(res => (this.locations = res.data));
    axios
      .get(
        `https://backendapi.turing.com/products/${+this.$route.params
          .id}/reviews`
      )
      .then(res => (this.reviews = res.data));
  },
  computed: mapState(["product"])
};
</script>
<style scoped>
.product-container {
  max-width: 700px;
  left: 0;
  right: 0;
  display: block;
  margin: auto;
}
.product-container .v-card {
  display: flex;
}
</style>

