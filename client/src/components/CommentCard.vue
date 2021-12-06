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
            </div>
            <div class="flex flex-col space-y-1">
                <p class="text-sm text-white-gray">{{this.comment?.text}}</p>
                <div class="flex justify-start space-x-2 text-gray-500 items-center mb-3">
                    <button><ChevronUpIcon class="w-4 h-4"/></button>
                    <p class="text-sm">{{this.comment.votes}}</p>
                    <button><ChevronDownIcon class="w-4 h-4"/></button>
                    <button v-if="!this.comment?.is_subComment" class="flex items-center" v-on:click="showNewSubCommentArea()"><ChatAltIcon class="w-4 h-4" />Comentar</button>
                    
                </div>
                <div class="block space-y-2 pb-2" v-if="subCommentArea">
                    <textarea v-model="new_comment" class="box-border pl-4 pt-2 block w-full bg-medium-gray h-24 border border-light-grey focus:outline-none focus:ring-1 focus:ring-gray-600 text-gray-300" placeholder="Nuevo comentario..."></textarea>
                    <button v-on:click="newComment" class="bg-white-gray rounded-full px-3 py-1 text-xs font-bold" :class="{'cursor-not-allowed': this.canComment(), 'text-gray-400': this.canComment()}">Comentar</button>

                </div>
                <CommentCard v-for="subComment in this.comment?.subComments" :key="subComment.id" :comment="subComment"/>
            </div>
        </div>
    </div>
    
</template>

<script>
import {ChevronUpIcon, ChevronDownIcon} from '@heroicons/vue/outline'
import {ChatAltIcon} from '@heroicons/vue/solid'
import {getProfileImage} from '../utils/utils'

import moment from 'moment'


export default {
    name: 'CommentCard',
    props: {
        comment: {},
    },
    data(){
        return {
            new_comment: '',
            subCommentArea: false
        }
    },
    emits: {
        newSubComment: null
    }
    ,
    components: {
        ChevronDownIcon,
        ChevronUpIcon,
        ChatAltIcon
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
        }
    }
}
</script>