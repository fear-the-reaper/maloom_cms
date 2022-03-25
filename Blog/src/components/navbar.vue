<template>
<div>
  <b-navbar class="bg-dark py-2" toggleable="lg" type="dark">
    <b-navbar-brand class="d-flex" href="#">
      <section v-if="isLogged">
        <b-button v-b-toggle.sidebar-backdrop>Toggle Sidebar</b-button>

        <b-sidebar id="sidebar-backdrop" title="Sidebar with backdrop" backdrop-variant="dark" backdrop shadow>
          <div class="px-3 py-2">
            <b-form-group label="Backdrop variant" label-for="backdrop-variant">
              <b-form-select id="backdrop-variant" ></b-form-select>
            </b-form-group>
          </div>
        </b-sidebar>
      </section>
      NavBar
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="mx-5 text-white" href="#">About</b-nav-item>
        <b-nav-item class="mx-5 text-white"  href="#">Help</b-nav-item>
        <b-nav-item v-if="!isLogged" class="mx-5 text-white"  href="/signin">Login</b-nav-item>
        <b-nav-item v-if="isLogged" class="mx-5 text-white"  href="/logout">Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
  name: 'navbar',
  computed: {
    isLogged() {
      return this.$store.getters.isLoggedin;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg-dark {
  background-color: black!important;;
}



.textColor {
  color: white;
}
</style>
