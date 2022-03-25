import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signin from "../views/Signin.vue"
import Logout from "../views/Logout.vue"
import Dashboard from "../views/Dashboard.vue"
import addPost from "../views/addPosts.vue"
import delPost from "../views/delPost.vue"
import editPost from "../views/editPost.vue"
import post from "../views/posts.vue"



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/signin",
    name: "Sign in",
    component: Signin

  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
        path: "/dashboard/add",
        component: addPost,
        meta: {
          requiresAuth: true
        }
  },
  {
        path: "/dashboard/edit",
        component: editPost,
        meta: {
          requiresAuth: true
        }
  },
  {
        path: "/dashboard/delete",
        component: delPost,
        meta: {
          requiresAuth: true
        }
  },
  {
    path: "/post/:id",
    component: post
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
