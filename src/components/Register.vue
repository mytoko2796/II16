<template>
  <div>
    <v-card
      class="mx-auto pa-8 my-16"
      elevation="24"
      outlined
      max-width="450px"
    >
      <v-img
        class="mx-auto mt-10"
        :src="require('@/assets/logo.png')"
        max-width="180"
      />
      <v-card-text align="center">
        <p class="h1 text--primary">
          Sign Up
        </p>
        <p>Hello, Please Register</p>
      </v-card-text>
      <v-form align="center" ref="form" v-model="valid" lazy-validation>
        <v-text-field
          dense
          outlined
          v-model="email"
          label="E-mail"
          type="email"
          placeholder="example@mail.com"
          :rules="emailRules"
        ></v-text-field>
        <v-text-field
          dense
          outlined
          v-model="password"
          label="Password"
          :rules="passwordRules"
          :type="show1 ? 'text' : 'password'"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
        ></v-text-field>
        <v-btn block elevation="24" class="grey darken-4" dark @click="submit"
          >Sign Up</v-btn
        >
      </v-form>
    </v-card>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
      {{ error_message }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    // error: "",
    valid: true,
    show1: false,
    load: false,
    snackbar: false,
    error_message: "",
    color: "",
    // valid: false,
    email: "",
    password: "",
    // passwordRules: [(v) => !!v || "Password tidak boleh kosong"],
    emailRules: [(v) => !!v || "E-mail tidak boleh kosong"],
  }),
  computed: {},

  methods: {
    register() {
      this.$router.push("/register");
    },
    submit() {
      if (this.$refs.form.validate()) {
        let url = this.$api + "/register";
        this.$http
          .post(url, {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            // localStorage.setItem("id", response.data.user.id);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", this.email);

            this.$router.replace("/");
            console.table(response);
            this.error_message = "response.data.message";
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            this.clear();
            this.create = false;
            this.$router.replace("/");
          })
          .catch((e) => {
            //   this.$refs.form.submit();
            this.error_message = e.response.data.message;
            //   this.error_message = "Email / Password salah";
            this.color = "red";
            this.snackbar = true;
            this.load = false;
          });
      }
    },
    clear() {
      this.$refs.form.reset(); //Clear form login
    },
  },
};
</script>
