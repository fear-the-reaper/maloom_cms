export default {
    methods: {
        async loadMore() {
            try {
                await this.$store.dispatch("loadMore");
            } catch (error) {
                console.log(error);
            }
        }
    }
};