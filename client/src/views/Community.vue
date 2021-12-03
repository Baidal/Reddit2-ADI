<template>
    <!-- Cabecera de la comunidad-->
    <div class="container mx-auto block sm:w-full md:w-4/5 lg:w-4/5 xl:w-4/5 2xl:w-8/12 min-height">   
       <div class="space-x-2 flex justify-items-start">
            <div class="my-auto">
                <h1 class="text-left text-gray-400 text-3xl font-bold">{{this.name}}</h1>
            </div>
            <div class="my-auto">
                <button class="py-1 px-3 rounded-full bg-gray-300 font-bold hover:bg-gray-400" v-on:click="followUnfollowCommunity">{{this.getFollowUnfollowButtonString()}}</button>
            </div>
       </div>
        <h2 class="text-left text-gray-600 font-bold ">/r/{{this.name}}</h2>

        <div class="block relative">
            <!-- Información de la comunidad -->
            <div class="border shadow border-gray-600 top-0 right-0 w-2/6 rounded-md text-center bg-light-grey text-gray-400 absolute">
                <div class="mx-2">
                    <h1 class="text-left font-bold text-gray-500 text-sm  mb-5">Información de la comunidad</h1>
                    <p class="text-left text-gray-300 text-sm mb-2">{{this.community.description}}</p>
                    <div class="flex text-gray-300 text-s">
                        <p>{{this.getNumFollowersString}}</p>
                    </div>
                    <div class="border-b border-gray-700 mx-1 my-2"/>
                    <button class="py-1 rounded-full bg-gray-300 font-bold hover:bg-gray-400 w-full text-black mb-3" v-on:click="followUnfollowCommunity">{{this.getFollowUnfollowButtonString()}}</button>
                    <router-link :to="{name: 'newPost'}" class="flex py-1 rounded-full bg-gray-300 font-bold hover:bg-gray-400 w-full text-black mb-3 justify-center">
                        Nuevo post
                    </router-link>
                </div>
            </div>
            <div class="w-4/6" v-if="this.community.Posts?.length !== 0">
                <PostCard v-for="post in this.community.Posts" :key="post.id" :post="post"/>
            </div>
            <div v-else class="flex text-white">
                <h1>Esta comunidad aún no cuenta con ningún post. </h1><p> Sé el primero en postear!</p>
            </div>
        </div>
    </div>
</template>

<script>
import communityService from "../services/communityService"

import PostCard from "../components/PostCard.vue"

export default {
    name: 'Community',
    components: {
        PostCard,
    },
    data(){
        return {
            name: this.$route.params.comName,
            community: [],
            postPage: 1,
            postLimit: 15,
            userFollowsCommunity: false
        }
    },
    async mounted(){
        this.userFollowsCommunity = await communityService.userFollowsCommunity(this.name) 
        
        try{
            this.community = await (await communityService.getCommunity(this.name, this.postPage, this.postLimit)).data
        }catch(e){
            this.$router.push({name: 'error', params: {error: `No se ha encontrado la comunidad ${this.name}`}})
        }
    
    },
    computed: {
        loggedIn() {
            return this.$store.getters['auth/userLoggedIn']
        },
        
        getNumFollowersString(){
            if(!this.community.numFollowers)
                return '0 seguidores'
            else if(this.community.numFollowers == 1)
                return '1 seguidor'
            
            return this.community.numFollowers + ' seguidores'
        }
    },
    methods: {
        async followUnfollowCommunity(){
            if(!this.loggedIn){
                this.$router.push({name: 'login'})
                return
            }

            
            communityService.followUnfollowCommunity(this.name)
            
            if(this.userFollowsCommunity)
                this.community.numFollowers--
            else
                this.community.numFollowers++
            
            this.userFollowsCommunity = !this.userFollowsCommunity
            

        },
        getFollowUnfollowButtonString(){
            if(this.userFollowsCommunity)
                return 'Dejar de seguir'
            
            return 'Seguir' 
        }
    }
}
</script>
<style scoped>
.min-height {
        min-height: 600px;
    }
</style>