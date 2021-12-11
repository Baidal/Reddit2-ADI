<template>
    <div class="container mx-auto sm:w-1/2 md:w-2/5 lg:w-2/5 xl:w-2/5 2xl:w-4/12 border border-line-gray border-solid rounded-md flex flex-col justify-center items-center bg-light-grey space-y-4 p-10"> 
        <img v-bind:src="this.getProifleUrl" class="w-1/4 max-h-56 rounded-sm">
        <div class="flex flex-col items-center justify-center">
            <div class="flex flex-col text-meta-text text-sm space-x-2 justify-center items-center" v-if="!this.editar">
                <p class="text-text-gray text-2xl font-bold" >{{this.getUserNick()}}</p>
                <div class="flex justify-center items-center space-x-2">
                    <p>/u/{{this.getUserNick()}}</p>
                    <p>{{this.getCommunityNumberString}}</p>
                </div>
                <p class="text-meta-text text-sm">Se unió {{this.getUserAge()}}</p>

            </div>
            <form v-else class="w-7/12 border-2 p-2 border-line-gray mb-2" enctype="multipart/form-data" @submit.prevent="handleEditSubmit">
                <label class="text-xs text-gray-500">Nick</label>
                <input v-model="this.newUserInfo.nick" class="box-border pl-1 w-full border text-sm border-gray-600 bg-light-grey text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-600 rounded-sm" placeholder="Nick...">
                
                <label class="text-xs text-gray-500">Password</label>
                <input v-model="this.newUserInfo.password" class="box-border pl-1 w-full border text-sm border-gray-600 bg-light-grey text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-600 rounded-sm" placeholder="Password..." type="password">

                <label class="text-xs text-gray-500">Descripción</label>
                <textarea v-model="this.newUserInfo.description" class="box-border pl-1 w-full h-36 border text-sm border-gray-600 bg-light-grey text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-600 rounded-sm" placeholder="Descripción..." type="password"></textarea>
            
                <div class="z-10 cursor-pointer w-full border border-gray-600 bg-light-grey rounded-xl outline-gray text-gray-500 text-center relative h-12">
                    <input type="file" accept="image/*" @change="handleFileChange($event.target.files)" class="opacity-0 absolute top-0 left-0 w-full h-12 z-0 cursor-pointer">
                    <p v-if="this.newUserInfo.fileName" class="mt-3 flex justify-center items-center">{{this.newUserInfo.fileName}}</p> 
                    <p v-else class="mt-3">Nueva foto...</p>
                    <button v-if="this.newUserInfo.fileName" v-on:click="removeFile()" class="text-gray-600 w-full text-center mt-2 flex items-center"><XCircleIcon class="h-4 w-4 text-white"/> Eliminar imagen</button>

                </div>
                
                <div v-if="this.updateErrors" >
                    <p v-for="error in updateErrors" class="text-red-800 text-sm" :key="error">* {{error}}</p>
                </div>

                <div class="flex justify-center">
                    <button class="mx-auto w-2/3 mt-6 py-1 px-1 bg-gray-100 rounded-full font-bold text-sm text-center hover:bg-gray-200">Editar perfil</button>
                </div>

            </form>
            
        </div>
        <div class="text-text-gray text-sm border-2 border-line-gray p-2 w-2/3 rounded-md" v-if="this.user.description">
            <p class="text-meta-text text-lg text-center">Descripción</p>
            <p>{{this.user.description}}</p>
        </div>
        <router-link :to="{name: 'newCommunity'}" class="w-1/3 py-1 px-3 bg-gray-100 rounded-full font-bold text-sm text-center hover:bg-gray-200">Nueva comunidad</router-link>
        <button class="w-1/3 py-1 px-3 bg-gray-100 rounded-full font-bold text-sm text-center hover:bg-gray-200" v-if="userCanEdit()" v-on:click="this.editar = !this.editar" type="submit">Editar</button>
    </div>
    <div class="text-center mt-4">
        <h1 class="text-text-gray">Comunidades</h1>
    </div>
    <div class="container mx-auto sm:w-1/2 md:w-2/5 lg:w-2/5 xl:w-2/5 2xl:w-4/12 mt-2 space-y-3 mb-4">
        <CommunityCard v-for="community in userCommunities" :key="community.id" :community="community"/>
    </div>
</template>

<script>
import CommunityCard from '../components/CommunityCard.vue'
import {XCircleIcon} from '@heroicons/vue/solid'


import {getProfileImage} from '../utils/utils'
import userService from "../services/userService"
import moment from "moment"

export default {
    name: 'Perfil',
    data(){
        return {
            userNick: this.$route.params.name,
            user: {},
            userCommunities: [],
            editar: false,
            newUserInfo: {
                nick: '',
                description: '',
                password: '',
                fileName: '',
                userImage: []
            },
            updateErrors: []
        }
    },
    computed: {
        loggedIn() {
            return this.$store.getters['auth/userLoggedIn']
        },
        userLoggedIn(){
            return this.$store.getters['auth/getUser']
        },
        getCommunityNumber(){
            return this.userCommunities ? this.userCommunities.length : 0 
        },
        getCommunityNumberString(){
            if(this.getCommunityNumber === 0)
                return 'Ninguna comunidad creada'
            else if(this.getCommunityNumber === 1)
                return this.getCommunityNumber + ' Comunidad'
            else
                return this.getCommunityNumber + ' Comunidades' 
        },
        getProifleUrl(){return getProfileImage(this.user.url_image)},
        getUserInfo(){
            
            return this.$store.getters['auth/getUser'] 
        },
    },
    components: {
        CommunityCard,
        XCircleIcon
    },
    async beforeMount(){
        this.user = this.getUserInfo
        this.getUserCommunities()
        this.setUserInfo()
    },
    methods: {
        
        getUserNick(){
            return this.user?.nick
        },
        getUserAge(){
            return moment(this.user?.createdAt).locale("es").fromNow()
        },
        getUserCommunities(){
            return userService.getUserCommunities(this.user?.id).then(res => this.userCommunities = res)
        },
        userCanEdit(){
            return this.loggedIn && this.userLoggedIn.id == this.user.id   
        },
        setUserInfo(){
            this.newUserInfo.nick = this.user?.nick
            this.newUserInfo.description = this.user?.description
        },
        handleFileChange(file){
            this.newUserInfo.fileName = file[0].name
            this.newUserInfo.userImage = file[0]
        },
        removeFile(){
            this.newUserInfo.fileName = ""
            this.newUserInfo.userImage = null
        },
        newUserInfoIsOk(){
            return this.newUserInfo.nick !== ""
        },
        handleEditSubmit(){
            if(!this.loggedIn)
                return this.$router.push({name: 'login'})

            this.updateErrors = []

            if(!this.newUserInfoIsOk())
                return this.updateErrors.push('El nombre no puede estar vacío')

            let formData = new FormData();
            
            formData.append('nick', this.newUserInfo.nick)
            formData.append('description', this.newUserInfo.description)
            formData.append('password', this.newUserInfo.password)
            formData.append('userImage', this.newUserInfo.userImage)

            userService.updateUser(formData).then(res => {
                const user = res.data.user
                this.$store.commit('auth/updateUser', user)
                this.editar = !this.editar
            })
        }

        
    }
}
</script>