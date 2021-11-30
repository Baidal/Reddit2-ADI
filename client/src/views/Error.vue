<template>
    <div class="box border-1 border-white mt-10">
        <h1 class="font-bold text-white text-center">
            {{this.error}}
        </h1>
    </div>
</template>

<script>
export default {
    name: 'error',
    data(){
        return {
            error: this.$route.params.error
        }
    }
}
</script>