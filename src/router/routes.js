// essential for functionality
import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/store";
// add packages
import Auth from "@aws-amplify/auth";
// add package config
import awsExports from "../aws-exports"
// add route end-points
import Home from "../views/Home.vue";
import LoginView from "../views/authorisation/LoginView.vue";
import LogoutView from "../views/authorisation/LogoutView.vue";
import SignupView from "../views/authorisation/SignupView.vue";

Auth.configure(awsExports);

Vue.use(VueRouter);
Vue.use(Auth);

const router = new VueRouter({
  mode: "history",

  routes: [
    // =========================
    // AUTH ROUTES =============
    // Login
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        public: true,
        onlyWhenLoggedOut: true
      }
    },
    // Register
    {
      path: "/register",
      name: "register",
      component: SignupView,
      meta: {
        public: true,
        onlyWhenLoggedOut: true
      }
    },
    // Logout
    {
      path: "/logout",
      name: "logout",
      component: LogoutView
    },
    // ===========================
    // PUBLIC ROUTES =============
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        public: true,
        onlyWhenLoggedOut: false
      }
    },
    {
      path: "/about",
      name: "about",
      meta: {
        public: true,
        onlyWhenLoggedOut: false
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue")
    },
    // ============================
    // PRIVATE ROUTES =============
    // Dashboard
    {
      path: "/dashboard/",
      // name: "dashboard",
      // route level code-splitting
      // this generates a separate chunk (dashboard.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),

        // =========================
        // GROUPED CHILD ROUTES ====
      children: [
        {
          // Namespaces
          path: "/",
          name: "namespaces",
          component: () =>
            import(
              /* webpackChunkName: "get" */ "../components/dasboard-areas/dashboard/Namespaces.vue"
            )
        },
        {
          // Names
          path: "namespace/",
          name: "name",
          component: () =>
            import(
              /* webpackChunkName: "get" */ "../components/dasboard-areas/dashboard/Name.vue"
            )
        },
        {
          // Events
          path: "events",
          name: "events",
          component: () =>
            import(
              /* webpackChunkName: "get" */ "../components/dasboard-areas/dashboard/Events.vue"
            )
        }
      ],
    },
    {
      path: "/settings",
      name: "settings",
      // route level code-splitting
      // this generates a separate chunk (settings.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "settings" */ "../views/Settings.vue")
    },
    {
      path: "/get",
      name: "get",
      // route level code-splitting
      // this generates a separate chunk (get.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "get" */ "../views/Get.vue")
    },
    {
      path: "/post",
      name: "post",
      // route level code-splitting
      // this generates a separate chunk (post.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "post" */ "../views/Post.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(
    record => record.meta.onlyWhenLoggedOut
  );
  const loggedIn = !!store.state.authorisation.user;
  // console.log(isPublic, onlyWhenLoggedOut, loggedIn);

  if (!isPublic && !loggedIn) {
    return next({
      path: "/login",
      query: { redirect: to.fullPath } //Store the full path to redirect the user to after login
    });
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (!isPublic && onlyWhenLoggedOut && loggedIn) {
    return next("/");
  }

  next();
});

export default router;
