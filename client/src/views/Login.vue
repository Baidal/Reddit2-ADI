<template>
    <div class="flex flex-col items-center justify-items-start h-screen select-none">
        <div class="flex flex-col mt-14 bg-light-grey px-8 py-8 rounded-xl shadow-lg  w-full max-w-md border-l-4 border-gray-300">
            <div class="font-medium self-center text-base uppercase w-60 text-center bg-gray-600 shadow-2xl p-6 rounded-full text-white">
                Iniciar sesión
            </div>
            <div class="mt-10">
                <form @submit.prevent="submitLogin">
                    <div class="relative w-full mb-3">
                        <input 
                            v-model="nickEmail" 
                            name="email" 
                            class="border-0 p-4 placeholder-gray-400 text-gray-500 bg-dark-grey rounded text-sm shadow focus:outline-none focus:ring w-full" 
                            placeholder="Nick o Email..." 
                            style="transition: all 0.15s ease 0s;" />
                    </div>
                    <div class="relative w-full mb-3">
                        <input 
                            v-model="password"
                            type="password" 
                            name="password" 
                            class="border-0 p-4 placeholder-gray-400 text-gray-500 bg-dark-grey rounded text-sm shadow focus:outline-none focus:ring w-full" 
                            placeholder="Contraseña..." 
                            style="transition: all 0.15s ease 0s;" />
                    </div>
                    <div class="text-center">
                        <small v-for="error in errores" :key="error.error" class="p-2 text-red-500">*{{error.error}}</small>
                    </div>
                    <div class="text-center mt-6">
                        <button 
                            class="p-3 rounded-lg bg-blue-400 outline-none text-white shadow w-32 justify-center focus:bg-gray-400 hover:bg-gray-300 hover:text-black"
                        >
                            Iniciar sesión
                        </button>
                    </div> 
                </form>
            </div>
        </div>
        
        <!-- <input v-model="nickEmail" placeholder="Introduce el nick o el email">
        <br>
        <input v-model="password" placeholder="Introduce la contraseña">
        <br>
        <button @click.prevent="submitLogin">Login</button> -->

    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            nickEmail: "",
            password: "",
            errores: ""
        }
    },
    computed: {
        loggedIn() {
            return this.$store.getters['auth/userLoggedIn']
        }
    },
    created() {
        if(this.loggedIn){
            this.$router.push('/')
        }
    },
    methods: {
        async submitLogin() {
            if(this.nickEmail === "" ||this.password === "")
                return

            const response = await this.$store.dispatch('auth/login', {
                nickEmail: this.nickEmail,
                password: this.password
            })
            
            if(response.errores) {
                this.errores = response.errores
            }else {
                this.nickEmail = ""
                this.password = ""
                this.$router.push("/")
            }
        }
    }

}
</script>

<style scoped>

</style>