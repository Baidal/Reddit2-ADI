<template>
    <div class="block w-1/2 mx-auto space-y-6 mb-10">
        <PostCard :post="post" @update-votes="updateVotes" @delete-post="deletePost"/>
        <div class="space-y-3 bg-dark-grey p-4 rounded border border-light-grey m-3">
            <form class="space-y-3" @submit.prevent="newComment">
                <textarea v-model="new_comment" class="box-border pl-4 pt-2 block w-full bg-medium-gray h-24 border border-light-grey focus:outline-none focus:ring-1 focus:ring-gray-600 text-gray-300" placeholder="Nuevo comentario..."></textarea>
                <button class="bg-white-gray rounded-full px-3 py-1 text-xs font-bold" :class="{'cursor-not-allowed': this.canComment(), 'text-gray-400': this.canComment()}">Comentar</button>
            </form>
            <CommentCard v-for="comment in this.post.Comments" :key="comment.id" :comment="comment" @new-sub-comment="newSubComment" :post-owner-id="this.post.UserId" @deleteComment="deleteComment"/>
        </div>
        
    </div>
</template>

<script>
import postService from "../services/postService";
import commentService from "../services/commentService";

import CommentCard from "../components/CommentCard.vue";
import PostCard from "../components/PostCard.vue";

export default {
    name: "Post",
    data() {
        return {
            post: {},
            postId: this.$route.params.id,
            commentPage: 1,
            commentLimit: 15,
            new_comment: '',
            noMoreComments: false
        };
    },
    components: {
        PostCard,
        CommentCard
    },
    async beforeMount() {
        this.getPostData().then(res => this.post = res.data.post).catch(() => this.$router.push({name: 'error', params: {error: `No se ha encontrado el post con id ${this.postId}`}}))
    },
    mounted(){
        this.getNextComments()
    },
    methods: {
        getPostData(){
            return  postService.getPost(this.postId, this.commentPage, this.commentLimit)
        },
        canComment(){
            return this.new_comment === ''
        },
        async newComment(){
            if(this.new_comment === '')
                return

            const response = await commentService.createComment(this.postId, this.new_comment, -1)
            const new_comment = response.new_comment
            new_comment.subComments = [] //cuando creamos el objeto, este no viene con el array de subComments
            if(response.errors)
                return
            
            this.post.Comments.unshift(response.new_comment)
            this.new_comment = ''
            this.post.numComments++
        },
        async newSubComment(props){
            const response = await commentService.createComment(props.postId, props.new_comment, props.commentId)
            this.post.Comments[this.post.Comments.findIndex((comment) => comment.id == props.commentId)].subComments.unshift(response.new_subcomment)
            this.post.numComments++
        },
        getNextComments(){
            window.onscroll = async () => {
                //Sacado de https://www.digitalocean.com/community/tutorials/vuejs-implementing-infinite-scroll 
                const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
                if (bottomOfWindow && !this.noMoreComments) {
                    
                    this.commentPage++;

                    const new_comments = (await this.getPostData()).data.post.Comments
                    this.post.Comments = this.post.Comments.concat(new_comments)

                    //no hay mas posts
                    if(new_comments.length === 0)
                        this.noMoreComments = true
                }
            }
        },
        updateVotes(new_votes){
            this.post.votes = new_votes
        },
        async deletePost(postId){
            const response = await postService.deletePost(postId)
            
            if(!response.errores){
                this.$router.push({name: 'Home'})
            }else{
                alert("No se ha podido eliminar el post o careces de permisos para ello")
            }
        },
        deleteComment(commentId){
            commentService.deleteComment(commentId).then(() => {
                for(let i = 0; i < this.post.Comments.length; i++){
                    if(this.post.Comments[i].id == commentId){
                        this.post.Comments.splice(i,1)
                        return
                    }

                    //buscamos en los subcomentarios del comentario
                    for(let y = 0; y < this.post.Comments[i].subComments.length; y++){
                        if(this.post.Comments[i].subComments[y].id == commentId){
                            this.post.Comments[i].subComments.splice(y,1)
                            return
                        }
                    }
                }
            })
        }
    },
};
</script>
