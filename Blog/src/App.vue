<template>
  <div id="app">
    <!-- NAVBAR -->
    <div id="nav">
        <navbar></navbar>
        <router-view/>        
    </div>
    
  </div>
</template>

<script>
import navbar from "./components/navbar";
export default {
  components: {
    navbar
  }
}
</script>


<style>

</style>
