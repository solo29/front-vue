<template>
  <v-form ref="form">
    <v-card class="pa-3">
      <v-text-field
        :error-messages="errors"
        v-model="name"
        :rules="[rules.min8char, rules.required]"
        label="Name"
        required
        solo
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="[rules.email, rules.required]"
        label="E-mail"
        required
        solo
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[rules.min8char, rules.required]"
        type="password"
        label="Password"
        required
        solo
      ></v-text-field>
      <v-btn @click="submit">Register</v-btn>
    </v-card>
  </v-form>
</template>
<script>
export default {
  data() {
    return {
      errors: [],
      name: "",
      email: "",
      password: "",
      rules: {
        required: value => !!value || "Required.",

        charRange: v => {
          if (v) {
            return v.length > 1 && v.length < 20 ? true : "Min 2 Chars Max 20";
          } else {
            return true;
          }
        },
        engChars: v =>
          !/[^A-Za-z\s]/.test(v) || "Only English characters is allowed",
        min8char: v => {
          if (v) {
            return v.length > 5 ? true : "Min 5 Chars";
          } else {
            return true;
          }
        },
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
    };
  },
  methods: {
    submit() {
      this.errors = [];
      if (!this.name || !this.email || !this.password) return;
      if (!this.$refs.form.validate()) return;
      axios
        .post("https://backendapi.turing.com/customers", {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(res => {
          this.$store.dispatch("login", {
            email: this.email,
            password: this.password
          });
        })
        .catch(error => {
          if (error) {
            this.errors.push(error.response.data.error.message);
          }
        });
    }
  }
};
</script>

