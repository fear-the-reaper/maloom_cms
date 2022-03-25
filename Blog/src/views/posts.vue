<template>
    <b-container class="mt-5 mb-2 mx-auto">
        <h2> {{this.title}} </h2>

        <p v-html="this.desc" class="px-1 width-desc">

        </p>    

    </b-container>
</template>

<script>
export default {
    data() {
        return {
            title: null,
            desc: null
        }
    },
    beforeMount(){
        this.title = this.$route.query.title;
        this.desc = this.$route.query.desc;
    }
}
</script>

<style scoped>
    .width-desc{
        max-width: 100%;
        word-wrap: break-word;
    }
</style>