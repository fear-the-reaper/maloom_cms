<template>
  <section></section>
</template>

<script>
export default {
    created() {
        this.$store.commit("destroyToken");
        this.$router.push("/signin");        
    }
}
</script>

<style>

</style>