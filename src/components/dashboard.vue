<template>
  <v-main>
    <h4 class="black--text">Hello {{ this.email }}</h4>

    <v-card class="mx-auto" align="center" color="rgb(0, 0, 0, 0.0)">
      <v-card-title>
        <h1>Your to do lists and personal reminders - all in one place</h1>
      </v-card-title>

      <v-card-text>
        <h2>YuDo will help you stay organized and productive</h2>
      </v-card-text>
    </v-card>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      nama: "",
      email: "",
      token: null,
    };
  },
  methods: {
    isLogin() {
      //   alert("Masuk");
      //   console.log(localStorage.getItem("token"));
      //   console.log(this.token);
      if (localStorage.getItem("token") != null) {
        this.nama = "Dummy";
      }
    },
  },
  async created() {
    await this.isLogin();
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.email = localStorage.getItem("email");
  },
};
</script>
