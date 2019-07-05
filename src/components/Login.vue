<template>
  <v-form ref="form">
    <v-card class="pa-3">
      <v-text-field v-model="email" :rules="[rules.email, rules.required]" label="E-mail" required solo></v-text-field>
      <v-text-field v-model="password" :rules="[rules.min8char, rules.required]" type="password" label="Password" required solo></v-text-field>
      <v-btn @click="submit">Login</v-btn>
    </v-card>
  </v-form>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      rules: {
        required: value => !!value || "Required.",
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
      if (!this.email || !this.password) return;
      if (!this.$refs.form.validate()) return;

      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

