<template>
    <div class="flex flex-col items-center justify-items-start h-screen select-none">
        <div class="flex flex-col mt-10 bg-white px-8 py-8 rounded-xl shadow-2xl  w-full max-w-4xl border-l-4 border-gray-300">
            <div class="font-medium self-center text-base uppercase w-60 text-center bg-gray-600 shadow-2xl p-4 rounded-full text-white">
                Registro
            </div>
            <div class="mt-10">
                <form @submit.prevent="submitRegister">
                    <div class="flex justify-center">
                        <div class="relative w-1/2 mb-3 mx-3.5">
                            <label for="nick" class="text-red-600 font-light">*</label>
                            <label for="nick" class="text-gray-700 font-light"> Nick</label> 
                            <input
                            v-model="nick.actualNick"
                                name="nick" 
                                class="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" 
                                placeholder="Nick..." 
                                style="transition: all 0.15s ease 0s;" />
                            <label for="nombre" class="text-red-600 font-thin" v-if="nick.errorNick">*{{nick.errorNick}}</label>
                        </div>
                        
                    </div>
                    <div class="flex justify-center">
                        <div class="w-1/2 mb-3 mx-3.5">
                            <label for="email" class="text-red-600 font-light">*</label>
                            <label for="email" class="text-gray-700 font-light"> Email</label> 
                            <input
                                v-model="email.actualEmail"
                                name="email"
                                type="email" 
                                class="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" 
                                placeholder="Email..." 
                                style="transition: all 0.15s ease 0s;" />
                            <label for="email" class="text-red-600 font-thin" v-if="email.errorEmail">*{{email.errorEmail}}</label>
                            
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <div class="w-2/4 mb-3 mx-3.5">
                            <label for="password" class="text-red-600 font-light">*</label>
                            <label for="password" class="text-gray-700 font-light"> Contraseña</label> 
                            <input
                                v-model="password.actualPassword"
                                name="password"
                                type="password"
                                class="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" 
                                placeholder="Contraseña..." 
                                style="transition: all 0.15s ease 0s;" />
                            <label for="email" class="text-red-600 font-thin" v-if="password.errorPassword">*{{password.errorPassword}}</label>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <div class="w-2/4 mb-3 mx-3.5">
                            <label for="password-repeat" class="text-red-600 font-light">*</label>
                            <label for="password-repeat" class="text-gray-700 font-light"> Repite contraseña</label> 
                            <input
                                v-model="repeatedPassword.actualRepeatedPassword"
                                type="password"
                                name="password-repeat"
                                class="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" 
                                placeholder="Contraseña..." 
                                style="transition: all 0.15s ease 0s;" />
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <div class="w-1/2 mb-3 mx-3.5">
                            <label for="password" class="text-gray-700 font-light"> Descripción</label> 
                            <textarea
                                v-model="description"
                                name="description"
                                class="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" 
                                placeholder="Descripción..." 
                                style="transition: all 0.15s ease 0s;" ></textarea>
                        </div>
                    </div>
                    <div class="text-center mt-12">
                        <button 
                            class="p-3 rounded-lg bg-purple-600 outline-none text-white shadow w-32 justify-center focus:bg-purple-700 hover:bg-purple-500"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            nick: {
                actualNick: "",
                errorNick: ""
            },
            email: {
                actualEmail: "",
                errorEmail: ""
            },
            password: {
                actualPassword: "",
                errorPassword: ""
            },
            repeatedPassword: {
                actualRepeatedPassword: "",
            },
            description: ""
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
        allInputsAreCorrect() {
            let error = false
            if(this.password.actualPassword === ""){
                this.password.errorPassword = "Debes introducir una contraseña"
                error = true
            }

            if(this.email.actualEmail === ""){
                this.email.errorEmail = "Debes introducir un email"
                error = true
            }

            if(!this.nick.actualNick){
                this.nick.errorNick = "Debes introducir un nick"
                error = true
            }

            return !error;
        },
        clearAllErrors(){
            this.password.errorPassword = ""
            this.nick.errorNick = ""
            this.email.errorEmail = ""
        },
        parseError(error){
            if(error.includes("email"))
                this.email.errorEmail = error

            if(error.includes("nick"))
                this.nick.errorNick = error

            if(error.includes("contraseña"))
                this.password.errorPassword = error
        },
        async submitRegister() {

            if(!this.allInputsAreCorrect())
                return

            //comprobamos que las contraseñas son iguales
            if(this.password.actualPassword !== this.repeatedPassword.actualRepeatedPassword){
                this.password.errorPassword = "Las contraseñas no coinciden"
            }

            this.clearAllErrors()

            
            const payLoad = {
                email: this.email.actualEmail,
                nick: this.nick.actualNick,
                password: this.password.actualPassword,
                description: this.description.actualDescription
            }

            const response = await this.$store.dispatch('auth/register', payLoad)

            if(response.errores)
                response.errores.forEach(error => {
                    this.parseError(error.error)
                });
            else
                this.$router.push('/login')
        }
    }
}
</script>