<template>
    <div class="flex flex-col items-center justify-items-start h-screen select-none">
        <div class="flex flex-col mt-10 bg-white px-8 py-8 rounded-xl shadow-2xl  w-full max-w-4xl border-l-4 border-purple-600">
            <div class="font-medium self-center text-base uppercase w-60 text-center bg-purple-600 shadow-2xl p-4 rounded-full text-white">
                Registro
            </div>
            <div class="mt-10">
                <div class="flex justify-between">
                    <div class="relative w-full mb-3 mx-3.5">
                        <label for="nombre" class="text-red-600 font-light">*</label>
                        <label for="nombre" class="text-gray-700 font-light"> Nombre</label> 
                        <input 
                        name="nombre" 
                        class="border-2 border-red-600 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" 
                        placeholder="Nombre..." 
                        style="transition: all 0.15s ease 0s;" />
                        <label for="nombre" class="text-red-600 font-thin">Has de introducir un nombre</label>
                    </div>
                    <div class="relative w-full mb-3 mx-3.5">
                        <label for="apellidos" class="text-red-600 font-light">*</label>
                        <label for="apellidos" class="text-gray-700 font-light"> Apellidos</label> 
                        <input 
                        name="apellidos" 
                        class="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" 
                        placeholder="Apellidos..." 
                        style="transition: all 0.15s ease 0s;" />
                    </div>
                </div>
                <div class="flex justify-items-start">
                    <div class="w-1/3 mb-3 mx-3.5">
                        <label for="DNI" class="text-red-600 font-light">*</label>
                        <label for="DNI" class="text-gray-700 font-light"> DNI</label> 
                        <input 
                        name="DNI" 
                        class="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" 
                        placeholder="32674754X..." 
                        style="transition: all 0.15s ease 0s;" />
                    </div>
                    <div class="w-1/3 mb-3 mx-3.5">
                        <label for="numero" class="text-red-600 font-light">*</label>
                        <label for="numero" class="text-gray-700 font-light"> Teléfono</label> 
                        <input 
                        name="numero" 
                        class="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" 
                        placeholder="+34 ..." 
                        style="transition: all 0.15s ease 0s;" />
                    </div>
                    <div class="w-1/3 mb-3 mx-3.5">
                        <label for="CP" class="text-gray-700 font-light"> Código Postal</label> 
                        <input 
                        name="CP" 
                        class="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" 
                        placeholder="02387" 
                        style="transition: all 0.15s ease 0s;" />
                    </div>
                </div>
                <div class="flex justify-items-start">
                    <div class="w-2/4 mb-3 mx-3.5">
                        <label for="direccion" class="text-gray-700 font-light"> Calle</label> 
                        <input 
                        name="direccion" 
                        class="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" 
                        placeholder="Dirección..." 
                        style="transition: all 0.15s ease 0s;" />
                    </div>
                    <div class="w-1/5 mb-3 mx-3.5">
                        <label for="Piso" class="text-gray-700 font-light"> Piso</label> 
                        <input 
                        name="Piso" 
                        class="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" 
                        placeholder="Piso..." 
                        style="transition: all 0.15s ease 0s;" />
                    </div>
                    <div class="w-1/5 mb-3 mx-3.5">
                        <label for="puerta" class="text-gray-700 font-light"> Puerta</label> 
                        <input 
                        name="puerta" 
                        class="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" 
                        placeholder="Puerta..." 
                        style="transition: all 0.15s ease 0s;" />
                    </div>
                </div>
                <div class="flex">
                    <div class="w-full mb-3 mx-3.5">
                        <label for="Facturación" class="text-gray-700 font-light"> Dirección de facturación</label> 
                        <input 
                        name="Facturación" 
                        class="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" 
                        placeholder="Calle..." 
                        style="transition: all 0.15s ease 0s;" />
                        <label class="text-gray-700 font-light"><input type="checkbox"> Igual a la dirección</label>
                    </div>
                </div>
                <div class="flex justify-items-start">
                    <div class="w-1/2 mb-3 mx-3.5">
                        <label for="email" class="text-red-600 font-light">*</label>
                        <label for="email" class="text-gray-700 font-light"> Email</label> 
                        <input 
                        name="email" 
                        class="border-2 border-red-600 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" 
                        placeholder="Email..." 
                        style="transition: all 0.15s ease 0s;" />
                        <label for="email" class="text-red-600 font-thin">El email ya existe</label>
                    </div>
                    <div class="w-1/2 mb-3 mx-3.5">
                        <label for="nick" class="text-red-600 font-light">*</label>
                        <label for="nick" class="text-gray-700 font-light"> Nombre de usuario</label> 
                        <input 
                        name="nick" 
                        class="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" 
                        placeholder="Nombre de usuario..." 
                        style="transition: all 0.15s ease 0s;" />
                    </div>
                </div>
                <div class="flex">
                    <div class="w-full mb-3 mx-3.5 border-gray-300 border-0 rounded shadow p-4 text-justify">
                        <label for="sexo" class="text-gray-700 font-light mr-5"> Sexo</label> 
                        <select name="sexo" id="cars" class="text-gray-700 font-light">
                            <option value="volvo" selected>Prefiero no decirlo</option>
                            <option value="saab">Hombre</option>
                            <option value="mercedes">Mujer</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="text-center mt-12">
                <button 
                    class="p-3 rounded-lg bg-purple-600 outline-none text-white shadow w-32 justify-center focus:bg-purple-700 hover:bg-purple-500"
                >
                    Iniciar sesión
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Register'
}
</script>