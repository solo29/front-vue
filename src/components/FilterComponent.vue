<template>
  <v-container>
    <v-layout text-xs-center wrap>Filter</v-layout>

    <v-select v-model="selectedDepartment" @change="changeDepartment" clearable :items="departments" item-value="department_id" item-text="name" label="Departments" solo></v-select>
    <v-select v-model="selectedCategory" @change="changeCategory" clearable :items="selectedDepartment ?  categories.rows.filter(x=>x.department_id ==selectedDepartment ) : categories.rows" item-value="category_id" item-text="name" label="Categories" solo></v-select>
    <v-btn @click="reset">RESET</v-btn>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      chip: true,
      selectedDepartment: null,
      selectedCategory: null
    };
  },
  methods: {
    reset() {
      this.selectedDepartment = null;
      this.selectedCategory = null;
      this.$store.dispatch("resetFilter");
    },
    changeCategory(id) {
      if (id) {
        this.$store.dispatch("changeCategory", id);
      } else {
        reset();
      }
    },
    changeDepartment(id) {
      if (id) {
        this.$store.dispatch("changeDepartment", id);
      } else {
        reset();
      }
    }
  },

  computed: mapState(["departments", "categories"])
};
</script>





