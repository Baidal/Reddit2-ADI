<template>
    <form class="flex justify-center">
        <div class="w-1/2 text-center space-y-6">
            <h1 class="text-gray-400 text-3xl font-bold">Nueva comunidad</h1>
            <input  v-model="this.comName" class="w-3/4 border border-gray-600 bg-light-grey text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600 rounded-sm" placeholder=" Nombre de la comunidad..."/>
            <textarea v-model="this.comDescription" class="w-3/4 border border-gray-600 bg-light-grey text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600 h-40 rounded-sm" placeholder=" Descripción..."></textarea>
            <p class="text-gray-500 text-sm font-bold">/r/{{this.comName}}</p>
            <button class="text-gray-400  bg-light-grey p-2 rounded-full hover:bg-gray-300 hover:text-black w-2/12">Crear</button>
        
            <p v-for="error in errors" :key="error" class="text-xs text-red-600">* {{error}}</p>
        </div>
    </form>
</template>

<script>
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
        handleNewDescriptionSubmit(){
            if(this.comName === ""){
                this.errors.push("El nombre no puede estar vacío")
                return 
            }

            
        }
    }
};
</script>
