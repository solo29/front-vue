<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-flex class="pa-5" md4 v-for="product in products.rows" :key="product.product_id">
          <v-card :to="'/product/'+product.product_id">
            <v-img :src="'https://backendapi.turing.com/images/products/'+product.thumbnail"></v-img>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{product.name}}</div>
                <div v-if="_.get(product, 'discounted_price')>0">
                  <span class="line-through">{{product.price}}$</span> &nbsp;
                  <span>{{product.discounted_price}}$</span>
                </div>
                <div v-else>
                  <span>{{product.price}}$</span>
                </div>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>

      <v-pagination v-if="products.count" v-model="page" :length="Math.ceil(products.count / productPerPage)"></v-pagination>
    </v-container>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["products", "productPerPage"]),
    page: {
      set(val) {
        this.$store.dispatch("changePage", val);
      },
      get() {
        return this.$store.state.page;
      }
    }
  }
};
</script>
<style lang="css" >
.line-through {
  text-decoration: line-through;
}
</style>


