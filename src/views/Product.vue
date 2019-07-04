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
    <div class="review-container">
      <v-card v-for="(review,i) in reviews" :key="i" class="grid-container mt-2 pa-3">
        <div class="name">
          <v-rating :value="i"></v-rating>
          <p>{{review.name}}</p>
        </div>
        <div class="date">
          Posted On
          <p>{{ new Date(review.created_on).toUTCString()}}</p>
        </div>
        <div class="comment">
          <p>{{review.review}}</p>
        </div>
      </v-card>
    </div>
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
.review-container {
  max-width: 700px;
  left: 0;
  right: 0;
  display: block;
  margin: auto;
}
.product-container .v-card {
  display: flex;
}

.grid-container {
  max-width: 700px;

  margin: auto;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: "name comment comment" "date comment comment";
  justify-content: center;
  align-content: center;
  text-align: center;
  vertical-align: center;
}

.name {
  grid-area: name;
}

.date {
  grid-area: date;
}

.comment {
  grid-area: comment;
}
</style>

