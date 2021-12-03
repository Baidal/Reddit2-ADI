<template>
    <div class="flex m-3 border-gray-600 border-thin rounded-md">
        <p class="text-white">{{comment.text}}</p>
    </div>
</template>

<script>
export default {
    name: 'CommentCard',
    props: {
        comment: {}
    }
}
</script>