<template>
    <div class="flex">
        <div class="w-6 flex flex-col items-center">
            <img v-bind:src="getProfileImage()" class="rounded-full max-h-8 max-w-8 my-auto w-6 h-6">
            <div class="border border-line-gray w-0 h-full mt-2"></div>
        </div>
        <div class="flex rounded-md flex-col w-full ml-2">
            <div class="flex justify-start items-center space-x-2">
                
                <p class="text-xs font-bold text-gray-600">{{this.comment.User?.nick}}</p>
                <p class="text-xs font-bold text-gray-600">{{this.getCommentTime()}}</p>
                <TrashIcon v-if="this.userCanDeleteComment()" v-on:click="showDeleteCard()" class="text-gray-600 float-right h-4 w-4 mr-2 cursor-pointer"/>

            </div>
            <div class="flex flex-col space-y-1">
                <p class="text-sm text-white-gray">{{this.comment?.text}}</p>
                <div class="flex justify-start space-x-2 text-gray-500 items-center mb-3">
                    <button v-on:click="upVoteComment"><ChevronUpIcon class="w-4 h-4"/></button>
                    <p class="text-sm">{{this.votes}}</p>
                    <button v-on:click="downVoteComment"><ChevronDownIcon class="w-4 h-4"/></button>
                    <button v-if="!this.comment?.is_subComment" class="flex items-center text-sm" v-on:click="showNewSubCommentArea()"><ChatAltIcon class="w-4 h-4" />Comentar</button>
                    
                </div>
                <div class="block space-y-2 pb-2" v-if="subCommentArea">
                    <textarea v-model="new_comment" class="box-border pl-4 pt-2 block w-full bg-medium-gray h-24 border border-light-grey focus:outline-none focus:ring-1 focus:ring-gray-600 text-gray-300" placeholder="Nuevo comentario..."></textarea>
                    <button v-on:click="newComment" class="bg-white-gray rounded-full px-3 py-1 text-xs font-bold" :class="{'cursor-not-allowed': this.canComment(), 'text-gray-400': this.canComment()}">Comentar</button>

                </div>
                <CommentCard v-for="subComment in this.comment?.subComments" :key="subComment.id" :comment="subComment" @delete-sub-comment="deleteSubComment"/>
            </div>
        </div>
        <DeleteCard :whatToDelete="'comment'" @deleteCancel="cancelDelete" v-if="deleteCard" @delete="deleteComment()"/>
    </div>
    
</template>

<script>
import {ChevronUpIcon, ChevronDownIcon} from '@heroicons/vue/outline'
import {ChatAltIcon, TrashIcon} from '@heroicons/vue/solid'
import {getProfileImage} from '../utils/utils'

import DeleteCard from './DeleteCard.vue'

import moment from 'moment'
import commentService from '../services/commentService'


export default {
    name: 'CommentCard',
    props: {
        comment: {},
        postOwnerId: {
            default: 0,
        }
    },
    data(){
        return {
            new_comment: '',
            subCommentArea: false,
            votes: this.comment.votes,
            deleteCard: false
        }
    },
    emits: {
        newSubComment: null,
        deleteComment: null,
        deleteSubComment: null
    }
    ,
    components: {
        ChevronDownIcon,
        ChevronUpIcon,
        ChatAltIcon,
        TrashIcon,
        DeleteCard
    },
    computed: {
        loggedIn() {
            return this.$store.getters['auth/userLoggedIn']
        },
        userLoggedIn(){
            return this.$store.getters['auth/getUser']
        }
    },
    methods: {
        getProfileImage(){
            return getProfileImage(this.comment?.User?.url_image)
        },
        getCommentTime(){
            return moment(this.comment?.createdAt).locale('es').fromNow()
        },
        showNewSubCommentArea(){
            this.subCommentArea = !this.subCommentArea
        },
        canComment(){
            return this.new_comment === ''
        },
        async newComment(){
            this.$emit('newSubComment', {
                postId: this.comment.PostId, 
                new_comment: this.new_comment,
                commentId: this.comment.id
            })

            this.new_comment = ''
            this.subCommentArea = false
        },
        upVoteComment(){
            commentService.voteComment(this.comment.id, 1).then(res => {
                const new_votes = res.commentToVote.votes
                this.votes = new_votes
            })
        },
        downVoteComment(){
            commentService.voteComment(this.comment.id, -1).then(res => {
                const new_votes = res.commentToVote.votes
                this.votes = new_votes
            })
        },
        userCanDeleteComment(){
            if(this.loggedIn && (this.userLoggedIn.id === this.postOwnerId || this.userLoggedIn.id === this.comment.UserId))
                return true

            return false
        },
        showDeleteCard(){
            this.deleteCard = !this.deleteCard
        },
        cancelDelete(){
            this.showDeleteCard()
        },
        deleteComment(){
            if(this.comment.is_subComment){
                this.$emit('deleteSubComment', this.comment.id)
            }else{
                this.$emit('deleteComment', this.comment.id)

            }
        },
        deleteSubComment(subCommentId){
            this.$emit('deleteComment', subCommentId)
        }
    }
}
</script>