<template>
    <form @submit.prevent="handleNewCommunitySubmit" class="flex justify-center">
        <div class="w-1/2 text-center space-y-6">
            <h1 class="text-gray-400 text-3xl font-bold">Nueva comunidad</h1>
            <input  v-model="this.comName" class="box-border pl-4 w-3/4 border border-gray-600 bg-light-grey text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600 rounded-sm" placeholder="Nombre de la comunidad..."/>
            <textarea v-model="this.comDescription" class="box-border pl-4 pt-2 w-3/4 border border-gray-600 bg-light-grey text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600 h-40 rounded-sm" placeholder="Descripción..."></textarea>
            <p class="text-gray-500 text-sm font-bold">/r/{{this.comName}}</p>
            <p v-for="error in errors" :key="error" class="text-xs text-red-600">* {{error}}</p>
            
            <button class="text-gray-400  bg-light-grey p-2 rounded-full hover:bg-gray-300 hover:text-black w-2/12">Crear</button>
        
        </div>
    </form>
</template>

<script>

import communityService from "../services/communityService";

export default {
    name: "New community",
    data(){
        return {
            comName: "",
            comDescription: "",
            errors: []
        }
    },
    computed: {
        loggedIn() {
            return this.$store.getters['auth/userLoggedIn']
        }
    },
    created(){
        if(!this.loggedIn)
            this.$router.push("/")
    },
    methods: {
        async handleNewCommunitySubmit(){
            if(!this.loggedIn)
                return this.$router.push({name: 'login'})
            
            if(this.comName === ""){
                this.errors.push("El nombre no puede estar vacío")
                return 
            }

            const response = await communityService.createCommunity(this.comName, this.comDescription)
            
            if(response.errores){
                response.errores.forEach(error => {
                    this.errors.push(error.error)
                });
                return
            }
            this.$store.commit('auth/incrementCommunities')
            this.$router.push({name: 'community', params: {comName: this.comName}})
        }
    }
};
</script>
