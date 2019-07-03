<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{product}}
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  mounted() {
    this.$store.dispatch("getProduct", +this.$route.params.id);
  },
  computed: mapState(["product"])
};
</script>
