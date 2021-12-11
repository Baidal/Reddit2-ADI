<template>
    <router-link :to="{name: 'community', params: {comName: community.name}}" class="flex flex-col space-y-2 border border-line-gray rounded-md justify-center items-center p-2 bg-light-grey">
            <p class="text-text-gray text-md font-bold">{{community.name}}</p>
            <p class="text text-gray-400 text-sm">{{community.description}}</p>
    </router-link>
</template>

<script>
export default {
    name: 'CommunityCard',
    props: {
        community: {}
    }
}
</script>