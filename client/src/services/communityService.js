import axios from "axios";
import urls from "./apiUrl";

import {getPaginationUrlString} from '../utils/utils'
import getUserToken from "./getUserToken";


const comunidadesUrl = urls.DEFAULT_API + 'comunidades';
const comunidadUrl = urls.COMUNIDAD_API 

export default {
    async getCommunities(offset, limit){
        return await axios.get(comunidadesUrl + getPaginationUrlString(offset, limit))
    },
    async getCommunity(communityName, offset, limit){
        return await axios.get(comunidadUrl + `/${communityName}` + getPaginationUrlString(offset, limit))
    },
    async followUnfollowCommunity(communityName){
        return await axios.get(comunidadUrl + `/usuario/${communityName}`, {
            headers: getUserToken()
        })
    },
    async userFollowsCommunity(communityName){
        const TOKEN =  getUserToken()
        
        if(!TOKEN)
            return false
        
        return (await axios.get(comunidadUrl + `/${communityName}/usuario`, {
            headers: TOKEN
        })).data.siguiendo
    }
}