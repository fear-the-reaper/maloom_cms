<template>
  <b-container fluid class="text-center">
    <h2>EDIT POSTS</h2>
    <b-container v-if="havePosts()" class="my-5">
        <div @click.prevent="edit(post.id, post.Title, post.desc, post.Author)" class="mx-auto my-5 py-3 border" v-for="post in this.$store.getters.getPosts" :key="post.id">
          {{post.Title}}
        </div>
        <section class="d-flex justify-content-center">
          <b-button @click="loadMore" class="my-2 mx-auto" variant="outline-primary" size="sm">
            Load more
          </b-button>
        </section>
    </b-container>
    <b-container v-if="!havePosts()">
        sdndnfnsfnlksnflnnfd
        <h2>YOU HAVE NO POSTS!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h2>
    </b-container>
  </b-container>
</template>

<script>
import havePosts from "../mixins/renderPosts"
import loadMore from "../mixins/loadMore"
export default {
  name: "edit",
  mixins: [havePosts, loadMore],
  methods: {
    edit(id, title, desc, author){
      this.$router.push({
        path: `/dashboard/add`,
        query: {
          isEdit: true,
          id: id,
          title: title,
          desc: desc,
          author: author
        }
      });  
    }
  },
  async created(){
    await this.$store.dispatch("getStartPost");
  }

}
</script>

<style>

</style>