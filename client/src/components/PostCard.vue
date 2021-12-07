<template>
    <div class="flex border-light-grey border-thin m-3 rounded-md relative">
        <!-- Panel de la izquierda-->
        <div class="w-10  bg-medium-gray flex flex-col items-center text-white p-2">
            <button v-on:click="upVotePost"><ChevronUpIcon class="w-4 h-4"/></button>
            <p class="my-1 text-sm">{{this.post.votes}}</p>
            <button v-on:click="downVotePost"><ChevronDownIcon class="w-4 h-4 mb-3"/></button>
        </div>
        <div v-if="this.userOwnsPost()" class="block flex-1 z-10 top-2 right-0 absolute cursor-pointer">
            <TrashIcon class="text-gray-400 float-right h-5 w-5 mr-2" v-on:click="this.showDeleteCard()">Eliminar</TrashIcon>
        </div>
        <!-- Contenido del post-->
        <router-link class="flex flex-col content-between text-left text-white-gray bg-dark-grey w-full p-2" :to="{path: '/r/post/' + this.post?.id}">
                <!-- Datos del post-->
            <div>
                <div class="block">
                    <div class="flex justify-start items-center space-x-2">
                        <h1 class="text-lg font-bold">{{this.post.title}}</h1>
                        <p class="text-xs text-gray-600">Creado {{this.post?.User ? 'por ' + this.post?.User.nick : ''}} {{this.getPostTime()}}</p>
                        

                    </div>
                    <p>{{this.post.text}}</p>
                </div>
            </div>
            
            <div v-if="this.post.url_image">
                <img  v-bind:src="getPostUrlImage()" class="mt-3">
            </div>
            <div v-else class="h-5">

            </div>

            <!-- Footer del post-->
            <div class="flex text-gray-600 text-sm items-center mt-2">
                <ChatAltIcon class="w-4 h-4"/>
                <p class="mr-4">{{this.getNumCommentsString}}</p>
                <ShareIcon class="w-4 h-4"/>
                <p class="mr-4">Compartir</p>
            </div>
        </router-link>
        <DeleteCard v-if="deleteCard" :whatToDelete="'post'" @deleteCancel="showDeleteCard()" @delete="deletePost()"/>
    </div>
    
</template>

<script>
import {ChevronUpIcon, ChevronDownIcon, ShareIcon} from '@heroicons/vue/outline'
import {ChatAltIcon, TrashIcon} from '@heroicons/vue/solid'
import DeleteCard from './DeleteCard.vue'

import moment from 'moment'
import postService from '../services/postService'

export default {
    name: "PostCard",
    components: {
        ChevronDownIcon,
        ChevronUpIcon,
        ChatAltIcon,
        ShareIcon,
        TrashIcon,
        DeleteCard
    },
    data(){
        return {
            deleteCard: false
        }
    },
    props: {
        post: {},
    },
    emits: ['update-votes', 'deletePost'],
    computed: {
        getNumCommentsString(){
            if(!this.post.numComments)
                return "0 Comentarios"
            else if(this.post.numComments == 1)
                return "1 Comentario"
            else
                return `${this.post.numComments} Comentarios`
            
        },
        loggedIn() {
            return this.$store.getters['auth/userLoggedIn']
        },
        userLoggedIn(){
            return this.$store.getters['auth/getUser']
        }
    },
    methods: {
        getPostUrlImage(){
            return "http://localhost:3000" + this.post.url_image
        },
        
        getPostTime(){
            return moment(this.post.createdAt).locale('es').fromNow()
        },
        upVotePost(){
            postService.votePost(this.post.id, 1).then((resp) => {
                const new_votes = resp.post.votes
                this.$emit('update-votes', new_votes, this.post.id)
            })
        },
        downVotePost(){
            postService.votePost(this.post.id, -1).then((resp) => {
                const new_votes = resp.post.votes
                this.$emit('update-votes', new_votes, this.post.id)
            })
        },
        userOwnsPost(){
            if(this.loggedIn && this.post.UserId == this.userLoggedIn.id)
                return true
            return false
        },
        showDeleteCard(){
            this.deleteCard = !this.deleteCard
        },
        deletePost(){
            this.showDeleteCard()
            this.$emit('deletePost', this.post.id)
        }
    }
}
</script>

<style>
    .border-thin{
        border-width: 0.03cm;
    }
</style>