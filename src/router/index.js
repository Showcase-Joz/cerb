import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import { Auth } from "aws-amplify";

Vue.use(Router);

const router = new Router({
  mode: "history",
  // set up server to always return the base url.... whatever it is.
  // https://router.vuejs.org/guide/essentials/history-mode.html
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/settings",
      name: "settings",
      // route level code-splitting
      // this generates a separate chunk (settings.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/dashboard/",
      // name: "dashboard",
      // route level code-splitting
      // this generates a separate chunk (dashboard.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
        meta: { requiresAuth: true },

      children: [
        {
          path: "/",
          name: "namespaces",
          component: () =>
            import(
              /* webpackChunkName: "get" */ "../components/dashboard-areas/dashboard/Namespaces.vue"
            ),
          meta: { requiresAuth: true }
        },
        {
          path: "namespace/",
          name: "name",
          component: () =>
            import(
              /* webpackChunkName: "get" */ "../components/dashboard-areas/dashboard/Name.vue"
            ),
          meta: { requiresAuth: true }
        },
        {
          path: "test",
          name: "test",
          component: () =>
            import(
              /* webpackChunkName: "get" */ "../components/dashboard-areas/dashboard/Test.vue"
            )
        }
      ]
    },
    {
      path: "/get",
      name: "get",
      // route level code-splitting
      // this generates a separate chunk (get.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "get" */ "../views/Get.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/post",
      name: "post",
      // route level code-splitting
      // this generates a separate chunk (post.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "post" */ "../views/Post.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue")
    }
  ]
});

// stuff
router.beforeResolve(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    try {
      await Auth.currentAuthenticatedUser();
      next();
    } catch (err) {
      next({
        path: "/",
        query: {
          redirect: to.fullPath
        }
      });
    }
  }
  next();
});

export default router;
