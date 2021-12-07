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
    getCommunity(communityName, offset, limit){
        return axios.get(comunidadUrl + `/${communityName}` + getPaginationUrlString(offset, limit))
    },
    async followUnfollowCommunity(communityName){
        return await axios.post(comunidadUrl + `/usuario/${communityName}`, {},{
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
    },
    createCommunity(communityName, communityDescription){
        const TOKEN = getUserToken()

        const payLoad = {name: communityName, description: communityDescription}

        return axios.post(comunidadUrl, payLoad, { headers: TOKEN}).then(resp => {
            return resp.data
        }).catch(err => {
            return err.response.data
        })

    }
}