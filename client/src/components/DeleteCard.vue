<template>
    <div class="fixed top-0 left-0 w-screen h-screen bg-light-grey opacity-80 z-20">
        <div class="absolute top-1/3 left-1/2 -mt-12 -ml-40 w-80 border border-line-gray rounded-md shadow-md bg-dark-grey opacity-100">
            <h1 class="text-gray-300 text-center text-lg font-bold">
                {{this.generateDeleteMsg()}}
            </h1>
            <div class="h-20"></div>
            <div class="flex justify-center space-x-4 mb-6">
                <button class="text-gray-300 font-bold px-4 py-2 bg-light-grey rounded-lg" v-on:click="this.delete()">Elimínalo!</button>
                <button class="text-gray-300 font-bold px-4 py-2 bg-light-grey rounded-lg" v-on:click="cancelDelete()">Mejor no...</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DeleteCard',
    props: {
        whatToDelete: {
            type: String,
            default: ''
        } //Aquí se indica que tipo de elemento estamos eliminado, si un post o un comentario (en un futuro podrían ser más cosas)
            // whatToDelete: 'comment' || 'post'
    },
    emits: {
        deleteCancel: null,
        delete: null,
    },
    methods: {
        generateDeleteMsg(){
            if(this.whatToDelete === 'comment')
                return 'Seguro que deseas eliminar el comentario?'
            else if(this.whatToDelete === 'post')
                return 'Seguro que deseas eliminar el post?'
        },
        cancelDelete(){
            this.$emit('deleteCancel')
        },
        delete(){
            this.$emit('delete')
        }
    },
}
</script>