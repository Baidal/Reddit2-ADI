<template>
    <div class="flex border-gray-600 border-thin m-3 rounded-md">
        <!-- Panel de la izquierda-->
        <div class="w-10  bg-medium-gray flex flex-col items-center text-white p-2">
            <button><ChevronUpIcon class="w-4 h-4"/></button>
            <p class="my-1 text-sm">{{this.post.votes}}</p>
            <button><ChevronDownIcon class="w-4 h-4 mb-3"/></button>
        </div>
        <!-- Contenido del post-->
        <router-link class="block text-left text-white-gray bg-dark-grey w-full" :to="{name: 'post', params: {id: this.post.id}}">
            <div class="m-2">
                <!-- Datos del post-->
                <h1 class="text-lg font-bold">{{this.post.title}}</h1>
                <p>{{this.post.text}}</p>
                <img v-if="this.post.url_image" v-bind:src="getPostUrlImage()" class="mt-3">
            </div>

            <!-- Footer del post-->
            <div class="flex text-gray-600 text-sm items-center ml-4 mb-2">
                <ChatAltIcon class="w-4 h-4"/>
                <p class="mr-4">{{this.getNumCommentsString()}}</p>
                <ShareIcon class="w-4 h-4"/>
                <p class="mr-4">Compartir</p>
            </div>
        </router-link>
    </div>
    
</template>

<script>

import {ChevronUpIcon, ChevronDownIcon, ShareIcon} from '@heroicons/vue/outline'
import {ChatAltIcon} from '@heroicons/vue/solid'

export default {
    name: "PostCard",
    components: {
        ChevronDownIcon,
        ChevronUpIcon,
        ChatAltIcon,
        ShareIcon
    },
    props: {
        post: {}
    },
    methods: {
        getPostUrlImage(){
            return "http://localhost:3000" + this.post.url_image
        },
        getNumCommentsString(){
            if(!this.post.numComments)
                return "0 Comentarios"
            else if(this.post.numComments == 1)
                return "1 Comentario"
            else
                return `${this.post.numComments} Comentarios`
            
        }
    }
}
</script>

<style>
    .border-thin{
        border-width: 0.03cm;
    }
</style>