import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        posts: null,
        token: localStorage.getItem("access_token") || null,
        start: 0
    },
    getters: {
        isLoggedin: (state) => {
            return state.token != null
        },
        getPosts: state => {
            return state.posts;
        },
        getToken: state => {
            return state.token;
        },
        getStart: state => {
            return state.start;
        },
        havePosts: state => {
            return state.posts != null
        }
    },
    mutations: {
        setToken: (state, token) => {
            state.token = token
        },
        setPost: (state, posts) => {
            if (posts.length === 0) {
                state.posts = null;
            } else {
                state.posts = posts;
            }
        },
        setStart: (state, start) => {
            state.start = start;
        },
        destroyToken: (state) => {
            state.token = null;
            localStorage.removeItem("access_token");
            console.log("JWT destroyed");
        },
        incStart: (state, inc) => {
            console.log("HERE: ", inc);
            state.start += inc;
        },
        addPost: (state, morePosts) => {
            state.posts = state.posts.concat(morePosts);
        },
        filterDeltedPosts: (state, deletedId) => {
            state.posts = state.posts.filter(value => {
                return value.id != deletedId
            });
            if (state.posts.length === 0) {
                state.posts = null;
            }
        }
    },
    actions: {
        async getToken(context, userInfo) {
            const { email, password } = userInfo;
            const { data } = await axios.post("http://localhost:1337/auth/local", {
                identifier: email,
                password: password
            });
            const { jwt } = data;
            if (!jwt) {
                context.commit("setToken", null);
            } else {
                console.log("JWT DONE");
                localStorage.setItem("access_token", jwt)
                context.commit("setToken", jwt);
                return jwt; 
            }
        },
        async isDuplicated(context, title) {
            const queryString = new URLSearchParams({
                Title: title
            });
            const req = `http://localhost:1337/posts/count?${queryString.toString()}`;
            const jwt = context.getters.getToken
            try {
                const { data } = await axios.get(req, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    }
                });
                return data
            } catch (error) {
                console.log(error);
                return 1;
            }
        },
        async addPost(context, {title, author, desc}) {
            const jwt = `Bearer ${context.getters.getToken}`;
            try {
                const { data } = await axios.post('http://localhost:1337/posts',
                    {
                        Title: title,
                        desc: desc,
                        Author: author
                    },
                    {
                        headers: {
                            'Authorization': jwt
                        }
                    }
                );
                if (data) {
                    return { data };
                }
            } catch (error) {
                return {error};
            }
        },
        async loadMore(context) {
            const start = context.getters.getStart;
            try {
                const { data } = await axios.get(`http://localhost:1337/posts?_start=${start}&_limit=3`);
                console.log(data);
                const lenOfPosts = data.length;
                if (lenOfPosts) {
                    context.commit("incStart", lenOfPosts);
                    context.commit("addPost", data);
                }
            } catch (error) {
                return error
            }
        },
        async getStartPost(context) {
            console.log("IN GETSTARTPOST => CREATED WAS CALLED");
            const { data } = await axios.get("http://localhost:1337/posts?_start=0&_limit=6");
            if (data) {
                console.log("HAS THIS HAPPENDED");
                context.commit("setPost", data);
                context.commit("setStart", 6);
                // this.isLoading = false;
            }
        },
        async deletePost(context, id) {
            const jwt = `Bearer ${context.getters.getToken}`;
            const { data } = await axios.delete(`http://localhost:1337/posts/${id}`, {
                headers: {
                    'Authorization': jwt
                }
            });
            context.commit("filterDeltedPosts", data.id);
        },
        async editPost(context, form){
            const jwt = `Bearer ${context.getters.getToken}`;
            try {
                const queryString = `http://localhost:1337/posts/${form.id}`;
                const { data } = await axios.put(queryString,
                    {
                        Title: form.title,
                        desc: form.desc,
                        Author: form.author
                    },
                    {
                        headers: {
                            'Authorization': jwt
                        }
                    }
                );
                if (data) {
                    return { data };
                }
            } catch (error) {
                return {error};
            }
        }
    },
    plugins: [
        createPersistedState({
            paths: ['posts', 'start']
        })
    ]
})

