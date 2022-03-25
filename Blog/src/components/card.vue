<template>
    <b-col align-self="start" cols="4">
    <b-card 
        @click.prevent="goToPost()"
        v-bind:title="title"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
    >
        <b-card-text>
        {{this.desc.slice(0, 150) + "..."}}
        </b-card-text>

        <div v-if="this.$store.getters.isLoggedin">
            XXXXXXXXXXXXXXXXXXXXXXX
        </div>


        <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
    </b-col>
</template>

<script>
export default {
    name: 'card',
    props: {
        id: String,
        title: String,
        desc: String
    },
    methods: {
        goToPost() {
            this.$router.push({
                path: `post/${this.id}`,
                query: {
                    title: this.title,
                    desc: this.desc
                }
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
