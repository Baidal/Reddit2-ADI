<template>
    <div class="container mx-auto block sm:w-full md:w-4/5 lg:w-4/5 xl:w-4/5 2xl:w-8/12 relative min-height">
        <!-- Buscador de comunidades -->
        <div class="border shadow border-gray-600 top-0 right-0 w-1/4 rounded-md text-center bg-light-grey text-gray-400 absolute">
            <h1 class="border-b border-gray-400 p-1">Comunidades destacadas</h1>
            <div v-for="community in communities" :key="community.id">
                <router-link :to="{name: 'community', params: {comName: community.name}}" class="flex p-2 justify-center">
                    <div class="flex items-center">
                        <ArrowCircleUpIcon class="w-4 h-4 mr-1 "/>
                    </div>
                    {{community.name}}
                </router-link>
            </div>
            <div class="text-center mt-2">
                <button v-if="!showLessCommunities" v-on:click="fetchMoreCommunities">Cargar más</button>
                <button v-if="showLessCommunities" v-on:click="removeCommunities">Cargar menos</button>

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
import communityService from "../services/communityService"

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
            page: 1,
            limit: 10,
            noMorePosts: false, //indica si ya no quedan mas posts para el scroll infinito
            communities: [],
            communitiesPage: 1,
            communitiesLimit: 5,
            showLessCommunities: false
        }
    },
    computed: {
        loggedIn() {
            return this.$store.getters['auth/userLoggedIn']
        }
    },
    async beforeMount(){
        this.posts = await this.getPostsData()
        this.communities = await this.getCommunities()
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
                    
                    this.page++;

                    const new_posts = await this.getPostsData()

                    this.posts = this.posts.concat(new_posts)

                    //no hay mas posts
                    if(new_posts.length === 0)
                        this.noMorePosts = true
                }
            }
        },
        async getPostsData() {
            return await (await postService.getPosts(this.page, this.limit)).data
        },
        async getCommunities(){
            return await (await communityService.getCommunities(this.communitiesPage, this.communitiesLimit)).data
        },
        async fetchMoreCommunities() {
            this.communitiesPage++;
            
            const new_communities = await this.getCommunities()

            //no quedan comunidades
            if(new_communities.length === 0){
                this.communitiesPage--;
                this.showLessCommunities = true
                return
            }

            //el número de comunidades es menor que el límite, no quedan más comunidades en la bd
            if(new_communities.length < this.communitiesLimit)
                this.showLessCommunities = true

            this.communities = this.communities.concat(new_communities);
        },
        removeCommunities(){
            

            //Eliminamos las últimas comunidades
            if(this.communities.length <= this.communitiesLimit){
                this.communities = []
                this.showLessCommunities = false
                this.communitiesPage = 0
            }else{
                this.communities.splice(this.communities.length - this.communitiesLimit, this.communitiesLimit)
                this.communitiesPage--
            }
        }

    }

}
</script>

<style scoped>
    .min-height {
        min-height: 600px;
    }
</style>