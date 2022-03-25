<template>
  <section class="mx-auto">
    <section v-if="havePosts()">
      <!-- CARD GRID -->
      <b-container class="my-3">
        <b-row  class="d-flex flex-wrap justify-content-center">
          <card v-for="post in this.$store.getters.getPosts" :key="post.id" :title="post.Title" :desc="post.desc" :id="post.id"></card>
        </b-row>
      </b-container>
      <!-- LOAD MORE BTN -->
      <section class="d-flex justify-content-center">
          <b-button @click="loadMore" class="my-2 mx-auto" variant="outline-primary" size="sm">
            Load more
          </b-button>
      </section>
    </section>
    <section v-if="!havePosts()">
      <h2 class="text-center my-5">YOU DON'T HAVE</h2>
    </section>
  </section>
</template>

<script>
// @ is an alias to /src
import card from "../components/card";
import renderPosts from "../mixins/renderPosts"
import loadMore from "../mixins/loadMore"
export default {
  name: 'Home',
  mixins: [renderPosts, loadMore],
  components: {
    card
  },
  async created(){
    await this.$store.dispatch("getStartPost");
  },
  async destroyed(){
    console.log("destroyed home & resettign posts");
    await this.$store.dispatch("getStartPost");
  }
}
</script>
<style scoped>
</style>