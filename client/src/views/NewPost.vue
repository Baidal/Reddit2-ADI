<template>
    <form @submit.prevent="handleNewPostSubmit" enctype="multipart/form-data" class="flex justify-center">
        <div class="w-1/2 text-center space-y-6 flex justify-center flex-col items-center">
            <h1 class="text-gray-400 text-3xl font-bold">Nuevo post</h1>
            <p class="text-gray-400 bg-medium-gray rounded-md w-2/5 text-center border border-light-grey">/r/{{this.comName}}</p>
            <input v-model="this.postTitle" class="w-3/4 border border-gray-600 bg-light-grey text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600 rounded-sm" placeholder=" Título del post..."/>
            <textarea v-model="this.postText" class="w-3/4 border border-gray-600 bg-light-grey text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600 h-40 rounded-sm" placeholder=" Texto del post..."></textarea>
            <div class="z-10 cursor-pointer w-3/4 border border-gray-600 bg-light-grey rounded-xl outline-gray text-gray-500 text-center relative h-12">
                <input type="file" accept="image/*" @change="handleFileChange($event.target.files)" class="opacity-0 absolute top-0 left-0 w-full h-12 z-0 cursor-pointer">
                <p v-if="fileName" class="mt-3 flex justify-center items-center">{{fileName}}</p> 
                <p v-else class="mt-3">Arrastra un archivo aquí o haz click para elegirlo...</p>
            </div>
            <button v-if="fileName" v-on:click="removeFile()" class="text-gray-600 flex items-center"><XCircleIcon class="h-4 w-4 text-white"/> Eliminar imagen</button>
            <p v-for="error in errors" :key="error" class="text-xs text-red-600">* {{error}}</p>
            
            <button class="text-gray-400  bg-light-grey p-2 rounded-full hover:bg-gray-300 hover:text-black w-2/12">Crear post</button>
            
        </div>
    </form>
</template>

<script>
import postService from '../services/postService'

import {XCircleIcon} from '@heroicons/vue/solid'

export default {
    name: 'NewPost',
    components: {
        XCircleIcon
    },
    data(){
        return {
            comName: this.$route.params.comName,
            postTitle: "",
            postText: "",
            postImage: null,
            fileName: "",
            errors: []
        }
    },
    computed: {
        loggedIn() {
            return this.$store.getters['auth/userLoggedIn']
        }
    },
    methods: {
        handleFileChange(file){
            this.fileName = file[0].name
            this.postImage = file[0]
        },
        removeFile(){
            this.fileName = ""
            this.postImage = null
        },
        async handleNewPostSubmit(){
            if(!this.loggedIn)
                this.$router.push({name: 'login'})
            
            if(this.postTitle === "")
                return this.errors.push("El título del post no puede estar vacío")

            let formData = new FormData()

            formData.append('postImage', this.postImage)
            formData.append('title', this.postTitle)
            formData.append('text', this.postText)

            const response = await postService.newPost(this.comName, formData)

            if(response.errores){
                response.errores.forEach(error => {
                    this.errors.push(error.error)
                });
                return
            }

            /**
             * TODO:
             * - Cambiar el router por el de la página del post
             */
            this.$router.push({name: 'Home'})
        }
    }
}
</script>