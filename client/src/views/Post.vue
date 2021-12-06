<template>
    <div class="block w-1/2 mx-auto space-y-6">
        <PostCard :post="post"/>
        <div class="space-y-3 bg-dark-grey p-4 rounded border border-light-grey m-3 mb-40">
            <textarea class="box-border pl-4 pt-2 block w-full bg-medium-gray h-24 border border-light-grey focus:outline-none focus:ring-1 focus:ring-gray-600 text-gray-300" placeholder="Nuevo comentario..."></textarea>
            <button class="bg-white-gray rounded-full px-3 py-1 text-xs font-bold">Comentar</button>
            <CommentCard v-for="comment in this.post.Comments" :key="comment.id" :comment="comment"/>
        </div>
        
    </div>
</template>

<script>
import postService from "../services/postService";

import CommentCard from "../components/CommentCard.vue";
import PostCard from "../components/PostCard.vue";

export default {
    name: "Post",
    data() {
        return {
            post: {},
            postId: this.$route.params.id,
            commentPage: 1,
            commentLimit: 15
        };
    },
    components: {
        PostCard,
        CommentCard
    },
    async beforeMount() {
        this.getPostData().then(res => this.post = res.data.post).catch(() => this.$router.push({name: 'error', params: {error: `No se ha encontrado el post con id ${this.postId}`}}))
    },
    methods: {
        getPostData(){
            return  postService.getPost(this.postId, this.commentPage, this.commentLimit)
        }
    },
};
</script>
