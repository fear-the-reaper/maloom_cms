export default {
    methods: {
        havePosts(){
            console.log("adei sigh idhar atei ho");
            console.log(this.$store.getters.havePosts);
            return this.$store.getters.havePosts;
        }
    }
}