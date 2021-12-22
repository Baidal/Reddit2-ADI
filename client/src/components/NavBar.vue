<template>
    <nav class="flex justify-between bg-dark-grey p-6 text-gray-300 w-full top-0 fixed z-50">
        <router-link to="/">
            <div class="flex items-center flex-shrink-0 mr-6 border-red-400">
                
                    <img alt="Reddit Logo" src="../assets/reddit.png" class="h-14">
                    <p>Reddit 2</p>
                
            </div>
        </router-link>
        <div class="w-1/4 my-auto flex space-x-2">
            <div class="flex rounded-sm w-3/4  bg-light-grey h-10 hover:border-gray-400 focus:border-gray-400 border border-gray-300">
                <div class="my-auto pl-4">
                    <SearchIcon class="w-5 h-5"/>
                </div>
                <input class="block pl-4 bg-light-grey  rounded-md focus:outline-none w-full" placeholder="Buscar en reddit...">
            </div>
            <div class="w-1/4 h-10 my-auto border border-solid border-gray-300 rounded-sm">
                <select name="searchOption" class="bg-light-grey  rounded-md h-full w-full">
                    <option value="community">Comunidad</option>
                    <option value="post">Post</option>
                </select>
            </div>
        </div>
        <div v-if="user">
            <div class="flex border-2 border-gray-700 p-2 px-7 rounded-lg relative" v-if="user">
                <div class="flex justify-center items-center ml-2 space-x-4">
                    <router-link :to="{name: 'perfil', params: {name: this.user.nick}}" class="flex justify-center items-center space-x-4">
                        <img v-bind:src="getProfileUrl()" class="rounded-full max-h-8 max-w-8 my-auto w-8 h-8">
                        <p class="text-center hover:bg-light-grey rounded-md p-1">{{user.nick}}</p>
                    </router-link>
                    <p class="text-center">{{generateCommunityNumberString()}}</p>
                    <router-link :to="{name: 'newCommunity'}" class="hover:bg-light-grey rounded-md p-1">
                        Nueva comunidad
                    </router-link>
                    <button @click.prevent="logout" class="hover:bg-light-grey rounded-md p-1">Cerrar sesión</button>
                </div>
            </div>
            
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
import {getProfileImage} from '../utils/utils'

export default {
    name: 'NavBar',
    components: {SearchIcon},
    methods: {
        logout() {
            this.$store.dispatch('auth/logout')
        },
        generateCommunityNumberString() {
            if(this.getNumCommunities == 0)
                return "Ninguna comunidad"
            
            if(this.getNumCommunities == 1)
                return "1 Comunidad"
            
            return this.getNumCommunities + " Comunidades"
        },
        getProfileUrl(){
            return getProfileImage(this.user.url_image)
        }
    },
    props: {
        user: {}
    },
    computed:{
        getNumCommunities(){
            return this.$store.getters['auth/getUserCommunities']
        }
    }
}
</script>
