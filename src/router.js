import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path) {
  return () => import(`./components/${path}.vue`);
}
Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  routes: [
    //To do list
    {
      path: "/todolist",
      name: "todolist",
      component: importComponent("Todolist"),
    },
    {
      path: "/login",
      name: "login",
      meta: { title: "Login" },
      component: importComponent("Login"),
    },
    {
      path: "/register",
      name: "register",
      meta: { title: "Register" },
      component: importComponent("Register"),
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   if (to.name != "login" && localStorage.getItem("token") == null) {
//     next("login");
//   }
//   document.title = to.meta.title;
//   next();
// });

export default router;
