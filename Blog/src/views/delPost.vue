<template>
    <b-container fluid class="text-center">
        <b-form class="w-25 mx-auto mt-4 my-2">
            <b-form-input v-model="name" placeholder="Enter your name"></b-form-input>
        </b-form>

        <!-- CARD GRID -->
        <b-container v-if="havePosts()" class="my-5">
            <div @click.prevent="delPost(post.id)" class="mx-auto my-5 py-3 border" v-for="post in this.$store.getters.getPosts" :key="post.id">
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
    name: "delPost",
    data(){
        return {
            name: ''
        }
    },
    mixins: [havePosts, loadMore],
    methods: {
        async delPost(id){
            try {
                await this.$store.dispatch("deletePost", id);
            } catch (error) {
                console.log(error)
            }
        }
    },
    async created(){
        await this.$store.dispatch("getStartPost");
    }
}
</script>

<style>

</style>