import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/dashboard",
    // name: "dashboard",
    // route level code-splitting
    // this generates a separate chunk (dashboard.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
    children: [
      {
        path: "/:namespaceId",
        name: "namespaces",
        component: () =>
          import(
            /* webpackChunkName: "get" */ "../components/view-parts/dashboard/Namespaces.vue"
          )
      },
      {
        path: "name/",
        name: "name",
        component: () =>
          import(
            /* webpackChunkName: "get" */ "../components/view-parts/dashboard/Name.vue"
          )
      },
      {
        path: "test",
        name: "test",
        component: () =>
          import(
            /* webpackChunkName: "get" */ "../components/view-parts/dashboard/Test.vue"
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
    component: () => import(/* webpackChunkName: "get" */ "../views/Get.vue")
  },
  {
    path: "/post",
    name: "post",
    // route level code-splitting
    // this generates a separate chunk (post.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "post" */ "../views/Post.vue")
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
];

const router = new VueRouter({
  routes
  // mode: "history"
  // set up server to always return the base url.... whatever it is.
  // https://router.vuejs.org/guide/essentials/history-mode.html
});

export default router;
