<template>
    <div class="container mx-auto block sm:w-full md:w-4/5 lg:w-3/5 xl:w-3/5 2xl:w-6/12 relative min-height">
        <!-- Buscador de comunidades -->
        <div class="border shadow border-gray-600 top-0 right-0 w-1/4 rounded-md text-center bg-light-grey text-gray-400 absolute">
            <h1 class="border-b border-gray-400 p-1">Comunidades destacadas</h1>
            <div class="flex p-2 justify-center">
                <div class="flex items-center">
                    <ArrowCircleUpIcon class="w-4 h-4 mr-1 "/>
                </div>
                r/Comunidad 1
            </div>
            <div class="flex p-2 justify-center">
                <div class="flex items-center">
                    <ArrowCircleUpIcon class="w-4 h-4 mr-1 "/>
                </div>
                r/Comunidad 2
            </div>
            <div class="flex p-2 justify-center">
                <div class="flex items-center">
                    <ArrowCircleUpIcon class="w-4 h-4 mr-1 "/>
                </div>
                r/Comunidad 3
            </div>
            <div class="flex p-2 justify-center">
                <div class="flex items-center">
                    <ArrowCircleUpIcon class="w-4 h-4 mr-1 "/>
                </div>
                r/Comunidad 4
            </div>
        </div>
        <div class="w-3/4">
            <PostCard v-for="post in posts" :key="post.id" :post="post"/>

        </div>


        <h1>dsd</h1>
    </div >

</template>

<script>
import postService from "../services/postService"

import {ArrowCircleUpIcon} from '@heroicons/vue/outline'
import PostCard from "../components/PostCard.vue"


export default {
    name: 'Home',
    components: {
        ArrowCircleUpIcon,
        PostCard
    },
    data(){
        return {
            posts: [],
            offset: 1,
            limit: 10,
            noMorePosts: false //indica si ya no quedan mas posts para el scroll infinito
        }
    },
    computed: {
        loggedIn() {
            return this.$store.getters['auth/userLoggedIn']
        }
    },
    async beforeMount(){
        this.posts = await this.getPostsData()
    },
    async mounted(){
       this.getNextPosts()
    },
    methods: {
        getNextPosts(){
            window.onscroll = async () => {
                //Sacado de https://www.digitalocean.com/community/tutorials/vuejs-implementing-infinite-scroll 
                const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
                if (bottomOfWindow && !this.noMorePosts) {
                    
                    this.offset++;

                    const new_posts = await this.getPostsData()

                    this.posts = this.posts.concat(new_posts)

                    //no hay mas posts
                    if(new_posts.length === 0)
                        this.noMorePosts = true
                }
            }
        },
        async getPostsData() {
            return await (await postService.getPosts(this.offset, this.limit)).data
        }
    }

}
</script>

<style scoped>
    .min-height {
        min-height: 600px;
    }
</style>