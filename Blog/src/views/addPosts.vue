<template>
    <b-container>
        <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
            <b-form-row class="p-4 mx-auto">
                <b-col cols="4">
                    <b-form-group id="input-group-1" label="Title:" label-for="Title">
                        <b-form-input class="w-75" id="Title" v-model="form.title" type="text" placeholder="Enter The Title" required>
                            {{this.form.title}}
                        </b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="4">
                       <b-form-group id="input-group-2" label="Author:" label-for="Author">
                        <b-form-input class="w-75" id="Author" v-model="form.author" type="text" placeholder="Enter The Author" required>
                            {{this.form.author}}
                        </b-form-input>
                    </b-form-group>
                </b-col>
            </b-form-row>
            <b-form-row class="p-4 mx-auto">
                <b-col cols="12">
                    <b-form-group id="input-group-3" label="Description:" label-for="desc">
                        <b-form-textarea class="w-100" rows="8" id="desc" v-model="form.desc" type="email" placeholder="Write your post....." required>
                            {{this.form.desc}};
                        </b-form-textarea>
                    </b-form-group>
                </b-col>
            </b-form-row>
            <b-button v-if="!form.isEdit" class="mx-4 px-4" type="submit" variant="primary">Submit</b-button>
            <b-button v-if="form.isEdit" class="mx-4 px-4" type="submit" variant="primary">Edit</b-button>
            <b-button class="mx-4 px-4" type="reset" variant="danger">Reset</b-button>
        </b-form>
        <section v-if="form.title != '' || form.author != '' || form.desc != ''">
            <h3 class="text-center">Here's what your post looks like!</h3>
            <section class="p-3">
                <h2>
                    {{form.title}}:
                </h2> 
                <p v-html="form.desc" class="px-1 width-desc">

                </p>

                By: {{form.author}}

            </section>
        </section>
        <section v-else class="px-4 my-5">
            <h2>
                Write something!
            </h2>
        </section>
    </b-container>
</template>

<script>
export default {
    data() {
        return {
            form: {
                isEdit: false,
                id: '',
                title: '',
                desc: '',
                author: ''
            }
        }
    },
    methods: {
        async onSubmit(){
            if (this.form.isEdit === "true") {
                await this.editPost();
            } else {
                await this.addPost();
            }
        },
        onReset(){
            this.form.title = ''
            this.form.author = ''
            this.form.desc = ''
        },
        async addPost(){
            const found = await this.$store.dispatch("isDuplicated", this.form.title);
            console.log(found);
            if (found) {
                alert("The post exist bub");
            } else {
                const { data, error } = await this.$store.dispatch("addPost", this.form);
                if(error) {
                    alert(error);
                }
                else{
                    alert(`post ${data.Title} created`);
                }
            }
        },
        async editPost(){
            const { error } = await this.$store.dispatch("editPost", this.form);
            if(error) {
                alert(error);
            }
            else{
                alert(`Post ${this.form.id} updated`);
            }
        }
    },
    created() {
        if (this.$route.query.isEdit === "true") {
            console.log("This is an edit Post!");
            const query = this.$route.query;
            this.form.id = query.id;
            this.form.isEdit  = query.isEdit;
            this.form.title  = query.title
            this.form.desc = query.desc;
            this.form.author = query.author;
        }else {
            console.log("This is a create post!");
        }
    },
}
</script>

<style scoped>

    .center{
        align-items: baseline;
    }
    .width-desc{
        max-width: 100%;
        word-wrap: break-word;
    }


</style>
