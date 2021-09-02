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
    {
      path: "/",
      redirect: { name: "dashboardLayout" },
      component: importComponent("dashboardLayout"),
      children: [
        //To do list
        {
          path: "/todolist",
          name: "todolist",
          component: importComponent("todolist"),
        },
        {
          path: "/dashboard",
          name: "dashboard",
          meta: { title: "Dashboard" },
          component: importComponent("dashboard"),
        },
      ],
    },

    {
      path: "/login",
      name: "login",
      meta: { title: "Login" },
      component: importComponent("login"),
    },
    {
      path: "/register",
      name: "register",
      meta: { title: "Register" },
      component: importComponent("register"),
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

// router.beforeEach((to, from, next) => {
// 	document.title = to.meta.title;

// 	// Kalau belum login redirect ke view login
// 	if (to.matched.some((record) => record.meta.requiresAuth)) {
// 		if (!localStorage.getItem("token")) {
// 			next({ name: "login" });
// 		}
// 	}

// 	// Kalau bukan admin redirect ke view home
// 	else if (to.matched.some((record) => record.meta.adminArea)) {
// 		if (localStorage.getItem("email") !== "admin@admin.com") {
// 			next({ name: "home" });
// 		}
// 	}

// 	next();
// });

export default router;
