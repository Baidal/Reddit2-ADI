<template>
    <nav class="flex justify-between bg-gray-900 p-6 text-gray-300">
        <div class="flex items-center flex-shrink-0 mr-6">
            <img alt="Reddit Logo" src="../assets/reddit.png" class="h-14">
            <p>Reddit 2</p>
        </div>
        <div class="flex rounded-lg w-1/4 my-6 bg-gray-800 hover:border-gray-400 focus:border-gray-400">
            <div class="my-auto pl-4">
                <SearchIcon class="w-5 h-5"/>
            </div>
            <input class="w-9/12 block pl-4 bg-gray-800 rounded-md focus:outline-none" placeholder="Buscar en reddit...">
        </div>
        <a href="perfil">
            <div class="flex border-2 border-gray-700 p-2 px-7 rounded-lg relative">
            <img src="https://pbs.twimg.com/profile_images/1143183093160980481/cKqlEov2_normal.jpg" class="rounded-full max-h-13 max-w-13 my-auto">
            <div class="flex flex-col justify-between ml-2">
                <p>Baidal17</p>
                <p>17 Comunidades </p>
                <a href="ada" class="hover:bg-gray-700 rounded-md">Cerrar sesión</a>
            </div>
        </div>
        </a>
        
    </nav>
    
</template>

<script>

import {SearchIcon} from '@heroicons/vue/outline'

/**
 * <div class="flex flex-grow justify-center my-1 mr-6">
            <SearchIcon class="w-5 h-5"/>
            <input class="w-9/12 bg-gray-800 rounded-md border border-gray-800 hover:border-gray-400 focus:border-gray-400" type="text">
        </div>
 */
export default {
    name: 'NavBar',
    components: {SearchIcon},
    setup() {
        
    },
}
</script>
