<template>
    <nav class="flex justify-between bg-dark-grey p-6 text-gray-300 w-full top-0 fixed z-50">
        <router-link to="/">
            <div class="flex items-center flex-shrink-0 mr-6">
                
                    <img alt="Reddit Logo" src="../assets/reddit.png" class="h-14">
                    <p>Reddit 2</p>
                
            </div>
        </router-link>
        <div class="flex rounded-lg w-1/4 my-auto bg-light-grey h-10 hover:border-gray-400 focus:border-gray-400 border border-gray-300">
            <div class="my-auto pl-4">
                <SearchIcon class="w-5 h-5"/>
            </div>
            <input class="block pl-4 bg-light-grey  rounded-md focus:outline-none w-full" placeholder="Buscar en reddit...">
        </div>
        <div v-if="user">
            <a href="perfil">
                <div class="flex border-2 border-gray-700 p-2 px-7 rounded-lg relative" v-if="user">
                    <img v-bind:src="getProfileUrl()" class="rounded-full max-h-13 max-w-13 my-auto w-16 h-16">
                    <div class="flex flex-col justify-between ml-2">
                        <p class="text-center">{{user.nick}}</p>
                        <p class="text-center">{{generateCommunityNumberString()}}</p>
                        <button @click.prevent="logout" class="hover:bg-gray-700 rounded-md">Cerrar sesión</button>
                    </div>
                </div>
            </a>
        </div>
        <div v-else class="my-auto mx-3.5">
            <router-link to="/register" class="border rounded-full border-gray-300 p-2 hover:bg-gray-200 mx-8 hover:text-black">
                Registrate
            </router-link>
            <router-link to="/login" class="border rounded-full border-gray-300 p-2 hover:bg-gray-200 hover:text-black">
                Login
            </router-link>
            
        </div>
        
    </nav>
    
</template>

<script>

import {SearchIcon} from '@heroicons/vue/outline'


export default {
    name: 'NavBar',
    components: {SearchIcon},
    methods: {
        logout() {
            this.$store.dispatch('auth/logout')
        },
        generateCommunityNumberString() {
            if(this.user.numCommunities == 0)
                return "Ninguna comunidad"
            
            if(this.user.numCommunities == 1)
                return "1 Comunidad"
            
            return this.user.numCommunities + " Comunidades"
        },
        getProfileUrl(){
            return this.user.url_image ? "http://localhost:3000" + this.user.url_image : require('../assets/reddit-avatar.png')
        }
    },
    props: {
        user: {}
    }
}
</script>
