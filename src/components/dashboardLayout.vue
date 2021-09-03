<template>
  <div class="dashboardUser">
    <v-parallax
      :src="require('@/assets/background.png')"
      height="auto"
      width="50%"
    >
      <v-app-bar app height="60px" color="rgb(255, 255, 255, 0.6)">
        <v-img
          class="mr-3"
          :src="require('@/assets/logo.png')"
          max-width="100"
          @click="$router.push('/home')"
        />

        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text router to="/dashboard"> Home </v-btn>
          <v-btn text router to="/todolist"> To Do List </v-btn>
          <v-btn text router to="/register"> Register </v-btn>
          <v-btn text router to="/login"> Login </v-btn>
          <v-btn text router @click="logout" v-if="loggedIn">
            <v-icon>{{ loggedIn ? "mdi-logout" : "mdi-login" }}</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-app-bar>
      <div class="fullheight pa-5">
        <router-view></router-view>
      </div>

      <!-- <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
      {{ error_message }}
    </v-snackbar> -->
    </v-parallax>
  </div>
</template>

<script>
export default {
  name: "DashboardLayout",
  data() {
    return {
      drawer: true,
      snackbar: false,
      snackbar2: false,
      dialogConfirm: false,
      dialog: false,
      logouts: "LogOut Success",

      items: [
        { title: "Home", to: "/dashboard" },
        { title: "To Do List", to: "/todolist" },
        { title: "Register", to: "/register" },
        { title: "Login", to: "/login" },
      ],
    };
  },

  methods: {
    logout() {
      if (this.loggedIn) {
        var url = this.$api + "/logout";
        this.$http
          .get(url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            localStorage.removeItem("id");
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            location.reload();
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
          });
      } else this.$router.push("/login");
    },
  },
  computed: {
    loggedIn() {
      return localStorage.getItem("token") != null;
    },
  },
};
</script>

<style scoped>
.fullheight {
  min-height: 100vh !important;
}
</style>
