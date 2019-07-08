<template>
  <div class="about">
    <div class="product-container">
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12 md6>
              <v-carousel class="mb-5" height="380" v-if="product.image">
                <v-carousel-item
                  :src="'https://backendapi.turing.com/images/products/'+product.image"
                ></v-carousel-item>
                <v-carousel-item
                  :src="'https://backendapi.turing.com/images/products/'+product.image_2"
                ></v-carousel-item>
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
                <div class="color-picker">
                  <v-radio-group v-model="color" row>
                    <v-radio color="red" value="red" hide-details></v-radio>

                    <v-radio color="green" value="green" hide-details></v-radio>

                    <v-radio color="indigo" value="indigo" hide-details></v-radio>

                    <v-radio color="blue " value="blue" hide-details></v-radio>
                  </v-radio-group>
                </div>
                <div class="quantity-container">
                  <v-btn color="primary" fab small @click="++quantity">+</v-btn>
                  <input type="text" disabled v-model.number="quantity" />
                  <v-btn
                    color="pink"
                    class="white--text"
                    fab
                    small
                    @click="quantity>1 ? --quantity: quantity=1"
                  >-</v-btn>
                  <v-btn
                    color="success"
                    @click="$store.dispatch('addToCart', {product_id: product.product_id,cart_id, quantity, attributes: size+', '+color});"
                  >Add To Cart</v-btn>
                </div>

                <v-bottom-nav :active.sync="size" :value="true" absolute>
                  <v-btn color="teal" flat value="XS">
                    <span>XS</span>
                  </v-btn>
                  <v-btn color="teal" flat value="S">
                    <span>S</span>
                  </v-btn>
                  <v-btn color="teal" flat value="M">
                    <span>M</span>
                  </v-btn>
                  <v-btn color="teal" flat value="XL">
                    <span>XL</span>
                  </v-btn>
                  <v-btn color="teal" flat value="XXL">
                    <span>XXL</span>
                  </v-btn>
                </v-bottom-nav>
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

export default {
  data() {
    return {
      locations: [],
      reviews: [],
      color: "red",
      size: "M",
      quantity: 1
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
  methods: {},
  computed: mapState(["product", "cart_id"])
};
</script>
<style scoped>
.quantity-container {
  display: flex;
  justify-content: flex-start;
  max-width: 30px;
}
.quantity-container input {
  width: 18px;
}
.color-picker {
  display: flex;
  justify-content: flex-start;
}
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

