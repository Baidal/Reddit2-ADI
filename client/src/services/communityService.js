import axios from "axios";
import urls from "./apiUrl";

import {getPaginationUrlString} from '../utils/utils'

const comunidadesUrl = urls.DEFAULT_API + 'comunidades';
const comunidadUrl = urls.COMUNIDAD_API 

export default {
    async getCommunities(offset, limit){
        return await axios.get(comunidadesUrl + getPaginationUrlString(offset, limit))
    },
    async getCommunity(name, offset, limit){
        return await axios.get(comunidadUrl + `/${name}` + getPaginationUrlString(offset, limit))
    },
    async followCommunity(){

    }
}