import Vue from 'vue'
import App from './App.vue'
import Router from "./router/index"
import store from "./store/store"
// importing bootstrap-vue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false


// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


Router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem("access_token")) {
      next({
        path: '/signin'
      })
    } else {
      next()
    }
  }
  else {
    next() // make sure to always call next()!
  }
})

// Event bus:
const eventBus = new Vue();


new Vue({
  render: h => h(App),
  router: Router,
  store: store
}).$mount('#app')

export {
  eventBus
}