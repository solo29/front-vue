<template>
  <div>
    <h1>This is an products page</h1>
    <v-container>
      <v-layout row wrap>
        <v-flex md4 v-for="product in products.rows" :key="product.product_id">
          {{product}}
          <v-card>
            <v-img :src="'https://backendapi.turing.com/images/products/'+product.thumbnail"></v-img>crara
          </v-card>
        </v-flex>
      </v-layout>

      <!-- <v-pagination v-model="page" :length="Math.ceil(sortedByVisiblePosts.length / postPerPage)" :total-visible="10"></v-pagination> -->
    </v-container>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["products"])
};
</script>

